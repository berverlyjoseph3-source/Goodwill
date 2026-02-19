import { useState } from 'react';
import { GetServerSidePropsContext } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../api/auth/[...nextauth]';
import { AdminLayout } from '../../../../components/admin/AdminLayout';
import { ProductForm } from '../../../../components/admin/ProductForm';
import { ProtectedRoute } from '../../../../components/auth/ProtectedRoute';
import { prisma } from '../../../../lib/prisma';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

interface EditProductPageProps {
  product: any;
  categories: any[];
}

export default function EditProductPage({ product, categories }: EditProductPageProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (formData: any) => {
    setIsSubmitting(true);
    
    try {
      const response = await fetch(`/api/admin/products/${product.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to update product');
      }

      toast.success('Product updated successfully!');
      
      // Redirect back to products list after short delay
      setTimeout(() => {
        router.push('/admin/products');
      }, 1500);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this product?')) return;

    try {
      const response = await fetch(`/api/admin/products/${product.id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        toast.success('Product deleted successfully');
        router.push('/admin/products');
      } else {
        throw new Error('Failed to delete product');
      }
    } catch (error) {
      toast.error('Failed to delete product');
    }
  };

  return (
    <ProtectedRoute adminOnly>
      <AdminLayout>
        <div className="max-w-4xl mx-auto">
          {/* Header with back button */}
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link
                href="/admin/products"
                className="p-2 hover:bg-soft-gray rounded-lg transition-colors"
                aria-label="Back to products"
              >
                <ArrowLeftIcon className="w-5 h-5" />
              </Link>
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-slate-900">
                  Edit Product
                </h1>
                <p className="text-slate-600 mt-1">
                  Update product information
                </p>
              </div>
            </div>
            
            {/* Delete button */}
            <button
              onClick={handleDelete}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Delete Product
            </button>
          </div>

          {/* Product Form */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <ProductForm
              categories={categories}
              initialData={product}
              onSubmit={handleSubmit}
              isSubmitting={isSubmitting}
            />
          </div>

          {/* Product Info Card */}
          <div className="mt-6 bg-soft-gray rounded-xl p-4">
            <div className="flex items-center justify-between text-sm">
              <div>
                <span className="text-slate-600">Product ID:</span>
                <span className="ml-2 font-mono text-slate-800">{product.id}</span>
              </div>
              <div>
                <span className="text-slate-600">SKU:</span>
                <span className="ml-2 font-mono text-slate-800">{product.sku}</span>
              </div>
              <div>
                <span className="text-slate-600">Created:</span>
                <span className="ml-2 text-slate-800">
                  {new Date(product.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </AdminLayout>
    </ProtectedRoute>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (!session || (session.user.role !== 'ADMIN' && session.user.role !== 'MANAGER')) {
    return {
      redirect: {
        destination: '/auth/signin',
        permanent: false,
      },
    };
  }

  const { id } = context.params as { id: string };

  const [product, categories] = await Promise.all([
    prisma.product.findUnique({
      where: { id },
      include: {
        category: true,
        images: {
          orderBy: { order: 'asc' }
        },
        specifications: true,
      },
    }),
    prisma.category.findMany({
      orderBy: { name: 'asc' },
    }),
  ]);

  if (!product) {
    return {
      notFound: true,
    };
  }

  // Format product for the form
  const formattedProduct = {
    ...product,
    price: product.price.toNumber(),
    salePrice: product.salePrice?.toNumber() || null,
    images: product.images.map(img => img.url),
    tags: product.tags || [],
    features: product.features || [],
    specifications: product.specifications || [],
    categoryId: product.categoryId,
    categoryName: product.category?.name,
  };

  return {
    props: {
      product: JSON.parse(JSON.stringify(formattedProduct)),
      categories: JSON.parse(JSON.stringify(categories)),
    },
  };
}
