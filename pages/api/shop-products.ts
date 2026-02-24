import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../lib/prisma';
import { PRODUCTS as STATIC_PRODUCTS } from '../../constants/images';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Fetch products from database
    const dbProducts = await prisma.product.findMany({
      include: {
        category: true,
        images: {
          take: 1
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    // Format database products
    const formattedDbProducts = dbProducts.map(product => ({
      id: parseInt(product.id) || 0,
      name: product.name || '',
      slug: product.slug || '',
      sku: product.sku || `SKU-${product.id}`,
      price: product.price.toNumber(),
      salePrice: product.salePrice?.toNumber() || null,
      image: product.images[0]?.url || '/images/placeholder.jpg',
      category: product.category?.name || 'Uncategorized',
      categorySlug: product.category?.slug || '',
      brand: product.brand || 'Goodwill Medical',
      rating: product.rating || 0,
      reviewCount: product.reviewCount || 0,
      inventory: product.inventory || 0,
      description: product.description || '',
      deliveryEstimate: product.deliveryEstimate || '2-3 business days',
      warranty: product.warranty || '1 year'
    }));

    // Format static products
    const formattedStaticProducts = STATIC_PRODUCTS.map(product => ({
      id: product.id,
      name: product.name,
      slug: product.slug,
      sku: product.sku,
      price: product.price,
      salePrice: product.salePrice || undefined,
      image: product.image,
      category: product.category,
      categorySlug: product.categorySlug,
      brand: product.brand,
      rating: product.rating,
      reviewCount: product.reviewCount,
      inventory: product.inventory,
      description: product.description,
      deliveryEstimate: product.deliveryEstimate,
      warranty: product.warranty
    }));

    // Combine both
    const allProducts = [...formattedDbProducts, ...formattedStaticProducts];

    res.status(200).json({ 
      products: allProducts,
      total: allProducts.length 
    });
  } catch (error) {
    console.error('Failed to fetch products:', error);
    res.status(500).json({ 
      products: STATIC_PRODUCTS,
      total: STATIC_PRODUCTS.length 
    });
  }
}