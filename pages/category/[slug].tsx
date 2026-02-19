import { GetStaticProps, GetStaticPaths } from 'next';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
// 🚫 REMOVE these imports:
// import { Header } from '../../components/layout/Header';
// import { Footer } from '../../components/layout/Footer';
import { PRODUCTS, CATEGORIES } from '../../constants/images';
import { Product, Category } from '../../types';
import { ChevronRightIcon } from '@heroicons/react/24/outline';

interface CategoryPageProps {
  category: Category;
  products: Product[];
}

export default function CategoryPage({ category, products }: CategoryPageProps) {
  const router = useRouter();
  const [sortBy, setSortBy] = useState('featured');

  if (router.isFallback) {
    return (
      // 🚫 REMOVE Header and Footer from loading state
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-medical-blue"></div>
      </div>
    );
  }

  return (
    // 🚫 REMOVE the fragments and Header/Footer components
    <main className="bg-white">
      {/* Breadcrumb */}
      <nav className="bg-soft-gray border-y border-gray-200">
        <div className="container-padding max-w-7xl mx-auto py-3">
          <ol className="flex items-center space-x-2 text-sm">
            <li><Link href="/" className="text-slate-600 hover:text-medical-blue">Home</Link></li>
            <li><ChevronRightIcon className="w-4 h-4 text-slate-400" /></li>
            <li><Link href="/shop" className="text-slate-600 hover:text-medical-blue">Shop</Link></li>
            <li><ChevronRightIcon className="w-4 h-4 text-slate-400" /></li>
            <li className="text-slate-800 font-medium">{category.name}</li>
          </ol>
        </div>
      </nav>

      {/* Category Hero */}
      <section className="relative h-64 md:h-80 bg-gradient-to-r from-medical-blue to-medical-blue-dark">
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src={category.image}
            alt={category.name}
            fill
            className="object-cover opacity-20"
          />
        </div>
        <div className="absolute inset-0 flex items-center justify-center text-white text-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{category.name}</h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto px-4">{category.description}</p>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-12">
        <div className="container-padding max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
            <p className="text-slate-600 mb-2 sm:mb-0">
              Showing <span className="font-semibold">{products.length}</span> products
            </p>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-medical-blue"
            >
              <option value="featured">Featured</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>

          {/* Product Grid */}
          {products.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-slate-600">No products found in this category.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
                <Link
                  key={product.id}
                  href={`/product/${product.slug}`}
                  className="group bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden"
                >
                  <div className="aspect-square relative bg-soft-gray">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {product.salePrice && (
                      <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                        Sale
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-slate-800 mb-2 group-hover:text-medical-blue line-clamp-2">
                      {product.name}
                    </h3>
                    <div className="flex items-center justify-between">
                      <div>
                        {product.salePrice ? (
                          <div className="flex items-center space-x-2">
                            <span className="text-lg font-bold text-medical-blue">${product.salePrice}</span>
                            <span className="text-sm text-slate-400 line-through">${product.price}</span>
                          </div>
                        ) : (
                          <span className="text-lg font-bold text-slate-800">${product.price}</span>
                        )}
                      </div>
                      <span className="text-sm text-slate-500">{product.reviewCount} reviews</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = CATEGORIES.map((category) => ({
    params: { slug: category.slug },
  }));

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const category = CATEGORIES.find((c) => c.slug === params?.slug);

  if (!category) {
    return {
      notFound: true,
    };
  }

  const products = PRODUCTS.filter((p) => p.categorySlug === category.slug);

  return {
    props: {
      category,
      products,
    },
    revalidate: 3600,
  };
};