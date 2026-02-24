import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { PRODUCTS } from '../../constants/images';
import { Product } from '../../types';

interface RecentlyViewedProps {
  currentProductId: number;
}

export const RecentlyViewed = ({ currentProductId }: RecentlyViewedProps) => {
  const [recentProducts, setRecentProducts] = useState<Product[]>([]);

  useEffect(() => {
    try {
      // Get recently viewed from localStorage
      const viewed = localStorage.getItem('recentlyViewed');
      let recentlyViewed: number[] = viewed ? JSON.parse(viewed) : [];

      // Add current product
      if (!recentlyViewed.includes(currentProductId)) {
        recentlyViewed = [currentProductId, ...recentlyViewed].slice(0, 6); // Keep only 6
        localStorage.setItem('recentlyViewed', JSON.stringify(recentlyViewed));
      }

      // Get product details - with explicit type checking
      const foundProducts: Product[] = [];
      
      for (const id of recentlyViewed) {
        const product = PRODUCTS.find((p: Product) => p.id === id);
        if (product && product.id !== currentProductId) {
          foundProducts.push(product);
        }
        if (foundProducts.length >= 4) break;
      }

      setRecentProducts(foundProducts);
    } catch (error) {
      console.error('Failed to load recently viewed:', error);
      setRecentProducts([]);
    }
  }, [currentProductId]);

  if (recentProducts.length === 0) return null;

  return (
    <div className="mt-12">
      <h2 className="text-xl font-bold text-slate-900 mb-6">Recently Viewed</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {recentProducts.map((product: Product) => (
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
                sizes="(max-width: 768px) 50vw, 25vw"
              />
              {product.salePrice && (
                <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                  Sale
                </div>
              )}
            </div>
            <div className="p-3">
              <h3 className="text-sm font-medium text-slate-800 group-hover:text-medical-blue line-clamp-2">
                {product.name}
              </h3>
              <p className="text-sm font-bold text-slate-900 mt-1">
                ${product.salePrice || product.price}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};