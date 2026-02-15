import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { email } = req.body;

    const user = await prisma.user.update({
      where: { email },
      data: { role: 'ADMIN' },
    });

    return res.status(200).json({ 
      message: 'User updated to admin',
      user: { email: user.email, role: user.role }
    });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to update user' });
  }
}