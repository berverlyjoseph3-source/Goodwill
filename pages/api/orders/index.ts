import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';
import { sendOrderConfirmation } from '../../../lib/email';
import { z } from 'zod';

const orderSchema = z.object({
  items: z.array(z.object({
    productId: z.string(),
    quantity: z.number().int().positive(),
    price: z.number().positive(),
    name: z.string(),
    image: z.string().optional(),
  })),
  subtotal: z.number().positive(),
  tax: z.number().min(0),
  shippingCost: z.number().min(0),
  total: z.number().positive(),
  shippingAddress: z.object({
    firstName: z.string(),
    lastName: z.string(),
    address1: z.string(),
    address2: z.string().optional(),
    city: z.string(),
    state: z.string(),
    postalCode: z.string(),
    country: z.string(),
    phone: z.string().optional(),
  }),
  billingAddress: z.object({
    firstName: z.string(),
    lastName: z.string(),
    address1: z.string(),
    address2: z.string().optional(),
    city: z.string(),
    state: z.string(),
    postalCode: z.string(),
    country: z.string(),
    phone: z.string().optional(),
  }).optional(),
  email: z.string().email(),
  paymentMethod: z.string(),
  stripePaymentId: z.string().optional(),
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);

  // GET - Authenticated users see their orders, admins see all
  if (req.method === 'GET') {
    try {
      const { page = 1, limit = 10, status } = req.query;
      const skip = (Number(page) - 1) * Number(limit);
      const take = Number(limit);

      // Build where clause based on user role
      const where: any = {};

      if (status) {
        where.status = status;
      }

      // Non-admin users can only see their own orders
      if (!session || (session.user.role !== 'ADMIN' && session.user.role !== 'MANAGER')) {
        if (!session) {
          return res.status(401).json({
            success: false,
            message: 'Unauthorized',
          });
        }
        where.userId = session.user.id;
      }

      const [orders, total] = await Promise.all([
        prisma.order.findMany({
          where,
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
            items: true,
            shippingAddress: true,
            billingAddress: true,
          },
          orderBy: {
            createdAt: 'desc',
          },
          skip,
          take,
        }),
        prisma.order.count({ where }),
      ]);

      return res.status(200).json({
        success: true,
        orders,
        pagination: {
          page: Number(page),
          limit: Number(limit),
          total,
          pages: Math.ceil(total / Number(limit)),
        },
      });
    } catch (error) {
      console.error('GET orders error:', error);
      return res.status(500).json({
        success: false,
        message: 'Failed to fetch orders',
      });
    }
  }

  // POST - Create new order (checkout)
  if (req.method === 'POST') {
    try {
      // Validate request body
      const body = orderSchema.parse(req.body);

      // Generate order number
      const orderNumber = `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

      // Find or create user
      let userId = session?.user?.id;

      // ✅ FIXED: Don't include userId field at all for guest checkout
      const orderData: any = {
        orderNumber,
        email: body.email,
        status: 'PENDING',
        paymentStatus: 'PENDING',
        subtotal: body.subtotal,
        tax: body.tax,
        shippingCost: body.shippingCost,
        total: body.total,
        paymentMethod: body.paymentMethod,
        stripePaymentId: body.stripePaymentId,
        items: {
          create: body.items.map(item => ({
            productId: item.productId,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            image: item.image,
          })),
        },
        shippingAddress: {
          create: {
            ...body.shippingAddress,
            type: 'SHIPPING',
            // ✅ FIXED: Don't set userId for guest checkout
            ...(userId ? { userId } : {}),
          },
        },
      };

      // Only add user connection if logged in
      if (userId) {
        orderData.user = {
          connect: { id: userId }
        };
      }

      // Add billing address if provided
      if (body.billingAddress) {
        orderData.billingAddress = {
          create: {
            ...body.billingAddress,
            type: 'BILLING',
            // ✅ FIXED: Don't set userId for guest checkout
            ...(userId ? { userId } : {}),
          },
        };
      }

      // Create order
      const order = await prisma.order.create({
        data: orderData,
        include: {
          items: true,
          shippingAddress: true,
          billingAddress: true,
        },
      });

      // Update product inventory
      for (const item of body.items) {
        await prisma.product.update({
          where: { id: item.productId },
          data: {
            inventory: {
              decrement: item.quantity,
            },
          },
        });
      }

      try {
        const { sendOrderConfirmation } = await import('../../../lib/email');
        await sendOrderConfirmation(order, order.email || session?.user?.email);
      } catch (emailError) {
        console.error('Failed to send confirmation email:', emailError);
        // Don't fail the order if email fails
      }

      return res.status(201).json({
        success: true,
        message: 'Order created successfully',
        order,
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          success: false,
          message: 'Validation error',
          errors: error.errors,
        });
      }

      console.error('POST order error:', error);
      return res.status(500).json({
        success: false,
        message: 'Failed to create order',
      });
    }
  }

  return res.status(405).json({
    success: false,
    message: 'Method not allowed',
  });
}