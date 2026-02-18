import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]';
import { prisma } from '../../../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Set proper JSON header
  res.setHeader('Content-Type', 'application/json');
  
  try {
    const session = await getServerSession(req, res, authOptions);
    
    if (!session || session.user.role !== 'ADMIN') {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // Handle POST request - Create new product
    if (req.method === 'POST') {
      const { 
        name, 
        sku, 
        price, 
        salePrice, 
        inventory, 
        categoryId,
        description,
        shortDescription,
        brand,
        tags,
        features,
        specifications,
        images,
        isFeatured,
        isNew,
        deliveryEstimate,
        warranty
      } = req.body;

      // Generate slug from name if not provided
      const slug = req.body.slug || name.toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '');

      // Check if SKU already exists
      const existingSku = await prisma.product.findUnique({
        where: { sku }
      });

      if (existingSku) {
        return res.status(400).json({ 
          error: 'Product with this SKU already exists' 
        });
      }

      // Create product
      const product = await prisma.product.create({
        data: {
          name,
          sku,
          slug,
          description,
          shortDescription: shortDescription || description.slice(0, 100),
          price: parseFloat(price),
          salePrice: salePrice ? parseFloat(salePrice) : null,
          inventory: parseInt(inventory),
          categoryId,
          brand,
          tags: tags || [],
          features: features || [],
          isFeatured: isFeatured || false,
          isNew: isNew || false,
          deliveryEstimate,
          warranty,
          images: images?.length ? {
            create: images.map((url: string, index: number) => ({
              url,
              alt: name,
              order: index
            }))
          } : undefined,
          specifications: specifications?.length ? {
            create: specifications.map((spec: any) => ({
              name: spec.name,
              value: spec.value
            }))
          } : undefined
        }
      });

      return res.status(201).json({ 
        success: true, 
        message: 'Product created successfully',
        id: product.id 
      });
    }

    // Handle GET request - List products
    if (req.method === 'GET') {
      const products = await prisma.product.findMany({
        include: {
          category: true,
          images: true
        },
        orderBy: { createdAt: 'desc' }
      });

      return res.status(200).json({ products });
    }

    return res.status(405).json({ error: 'Method not allowed' });
    
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ 
      error: 'Internal server error',
      message: error.message 
    });
  }
}
