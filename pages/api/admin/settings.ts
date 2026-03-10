import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';
import { prisma } from '../../../lib/prisma';
import { z } from 'zod';

const settingsSchema = z.object({
  siteName: z.string().min(1),
  siteEmail: z.string().email(),
  phone: z.string(),
  address: z.string(),
  taxRate: z.number().min(0).max(100),
  freeShippingThreshold: z.number().min(0),
  enableNotifications: z.boolean(),
  enableReviews: z.boolean(),
  maintenanceMode: z.boolean(),
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);

  // Security check - Admin only
  if (!session || session.user.role !== 'ADMIN') {
    return res.status(401).json({ 
      success: false, 
      message: 'Unauthorized - Admin access required' 
    });
  }

  // GET settings
  if (req.method === 'GET') {
    try {
      // In production, fetch from database
      // For now, return default settings
      const settings = {
        siteName: 'Goodwill Diagnostics Ltd',
        siteEmail: 'goodwilldiagnosticltd60@gmail.com',
        phone: '+256775385903',
        address: 'Sure House, Plot No. 1 Bombo Road, Kampala, Uganda',
        taxRate: 8.0,
        freeShippingThreshold: 500,
        enableNotifications: true,
        enableReviews: true,
        maintenanceMode: false,
      };

      return res.status(200).json({ 
        success: true, 
        settings 
      });
    } catch (error) {
      console.error('GET settings error:', error);
      return res.status(500).json({ 
        success: false, 
        message: 'Failed to fetch settings' 
      });
    }
  }

  // UPDATE settings
  if (req.method === 'PUT' || req.method === 'PATCH') {
    try {
      const body = settingsSchema.parse(req.body);

      // In production, save to database
      // await prisma.settings.upsert({ ... });

      return res.status(200).json({ 
        success: true, 
        message: 'Settings updated successfully' 
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          success: false, 
          message: 'Validation error', 
          errors: error.errors 
        });
      }

      console.error('UPDATE settings error:', error);
      return res.status(500).json({ 
        success: false, 
        message: 'Failed to update settings' 
      });
    }
  }

  return res.status(405).json({ 
    success: false, 
    message: 'Method not allowed' 
  });
}