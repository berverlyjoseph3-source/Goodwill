import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    const {
      page = 1,
      limit = 12,
      category,
      search,
      minPrice,
      maxPrice,
      brand,
      sort = 'createdAt',
      order = 'desc',
    } = req.query;

    const skip = (Number(page) - 1) * Number(limit);
    const take = Number(limit);

    // Build where clause
    const where: any = {};

    if (category) {
      where.categoryId = category;
    }

    if (search) {
      where.OR = [
        { name: { contains: search as string, mode: 'insensitive' } },
        { description: { contains: search as string, mode: 'insensitive' } },
        { sku: { contains: search as string, mode: 'insensitive' } },
      ];
    }

    if (minPrice || maxPrice) {
      where.price = {};
      if (minPrice) where.price.gte = Number(minPrice);
      if (maxPrice) where.price.lte = Number(maxPrice);
    }

    if (brand) {
      where.brand = { in: (brand as string).split(',') };
    }

    // Get products with pagination
    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        include: {
          category: true,
          images: {
            orderBy: { order: 'asc' },
          },
        },
        orderBy: { [sort as string]: order },
        skip,
        take,
      }),
      prisma.product.count({ where }),
    ]);

    // FORCE images to work - use hardcoded paths if database images are missing
    const formattedProducts = products.map(product => {
      // Default image paths based on product name or category
      let imageUrl = '/images/placeholder.jpg';
      
      if (product.images && product.images.length > 0) {
        imageUrl = product.images[0].url;
      } else {
        // Fallback to static images based on category
        const categorySlug = product.category?.slug || '';
        switch(categorySlug) {
          case 'mobility-aids':
            imageUrl = '/images/products/wheelchair.jpg';
            break;
          case 'respiratory':
            imageUrl = '/images/products/oxygen.jpg';
            break;
          case 'hospital-furniture':
            imageUrl = '/images/products/hospital-bed.jpg';
            break;
          case 'diagnostic':
            imageUrl = '/images/products/bp-monitor.jpg';
            break;
          case 'ppe':
            imageUrl = '/images/products/ppe-mask.jpg';
            break;
          default:
            imageUrl = '/images/placeholder.jpg';
        }
      }

      return {
        id: product.id,
        name: product.name,
        slug: product.slug,
        sku: product.sku,
        price: product.price,
        salePrice: product.salePrice,
        description: product.description,
        shortDescription: product.shortDescription,
        inventory: product.inventory,
        brand: product.brand,
        rating: product.rating,
        reviewCount: product.reviewCount,
        category: product.category?.name || 'Uncategorized',
        categorySlug: product.category?.slug || '',
        tags: product.tags,
        features: product.features,
        isFeatured: product.isFeatured,
        isNew: product.isNew,
        deliveryEstimate: product.deliveryEstimate,
        warranty: product.warranty,
        createdAt: product.createdAt,
        updatedAt: product.updatedAt,
        image: imageUrl,
        images: [imageUrl],
      };
    });

    return res.status(200).json({
      success: true,
      products: formattedProducts,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / Number(limit)),
      },
    });
  } catch (error) {
    console.error('GET products error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch products',
    });
  }
}