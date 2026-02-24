import toast from "react-hot-toast";
import { GetServerSidePropsContext } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]';
import { ProtectedRoute } from '../../components/auth/ProtectedRoute';
import { AccountLayout } from '../../components/account/AccountLayout';
import { prisma } from '../../lib/prisma';
import { WishlistGrid } from '../../components/account/WishlistGrid';
import Link from 'next/link';
import { HeartIcon } from '@heroicons/react/24/outline';

interface WishlistPageProps {
  wishlist: any[];
}

export default function WishlistPage({ wishlist }: WishlistPageProps) {
  return (
    <ProtectedRoute>
      <AccountLayout>
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-slate-900">My Wishlist</h2>
            <p className="text-sm text-slate-500">
              {wishlist.length} {wishlist.length === 1 ? 'item' : 'items'}
            </p>
          </div>

          {wishlist.length === 0 ? (
            <div className="text-center py-12">
              <div className="bg-soft-gray rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <HeartIcon className="w-8 h-8 text-slate-400" />
              </div>
              <h3 className="text-lg font-medium text-slate-900 mb-2">
                Your wishlist is empty
              </h3>
              <p className="text-slate-600 mb-6">
                Save your favorite items here
              </p>
              <Link href="/shop" className="btn-primary inline-block">
                Browse Products
              </Link>
            </div>
          ) : (
            <WishlistGrid items={wishlist} />
          )}
        </div>
      </AccountLayout>
    </ProtectedRoute>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (!session) {
    return {
      redirect: {
        destination: '/auth/signin',
        permanent: false,
      },
    };
  }

  // Safely get user email with null check
  const userEmail = session.user?.email;
  
  if (!userEmail) {
    return {
      props: {
        wishlist: [],
      },
    };
  }

  const wishlist = await prisma.wishlistItem.findMany({
    where: {
      user: {
        email: userEmail, // Use the safe variable
      },
    },
    include: {
      product: true,
    },
  });

  return {
    props: {
      wishlist: JSON.parse(JSON.stringify(wishlist.map(item => item.product))),
    },
  };
}