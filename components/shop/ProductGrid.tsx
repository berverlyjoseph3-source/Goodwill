import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { HeartIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';
import { ShoppingCartIcon, StarIcon } from '@heroicons/react/24/solid';
import { StarIcon as StarOutlineIcon } from '@heroicons/react/24/outline';
import { QuickViewModal } from './QuickViewModal';
import toast from 'react-hot-toast';

interface Product {
  id: number;
  id_str?: string;
  name: string;
  slug: string;
  price: number;
  salePrice?: number;
  image: string;
  rating: number;
  reviewCount: number;
  inventory: number;
  category?: string;
  brand?: string;
}

interface ProductGridProps {
  products?: Product[];
}

export const ProductGrid = ({ products = [] }: ProductGridProps) => {
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);
  const [failedImages, setFailedImages] = useState<Set<number>>(new Set());

  useEffect(() => {
    setIsClient(true);
  }, []);

  const toggleWishlist = (productId: number, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setWishlist(prev =>
      prev.includes(productId.toString())
        ? prev.filter(id => id !== productId.toString())
        : [...prev, productId.toString()]
    );
    toast.success(
      wishlist.includes(productId.toString()) 
        ? 'Removed from wishlist' 
        : 'Added to wishlist',
      { icon: '❤️' }
    );
  };

  const handleAddToCart = (product: Product, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toast.success(`${product.name} added to cart`, {
      icon: '🛒',
      duration: 3000,
    });
  };

  const handleQuickView = (product: Product) => {
    const productForModal = {
      ...product,
      id_str: product.id.toString(),
      id: product.id.toString()
    };
    setQuickViewProduct(productForModal as any);
  };

  const handleImageError = (productId: number) => {
    setFailedImages(prev => new Set(prev).add(productId));
  };

  if (!isClient) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="bg-white rounded-xl shadow-sm p-4 animate-pulse">
            <div className="aspect-square bg-gray-200 rounded-lg mb-4"></div>
            <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-3"></div>
            <div className="flex justify-between items-center">
              <div className="h-6 bg-gray-200 rounded w-20"></div>
              <div className="h-8 bg-gray-200 rounded w-24"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-slate-600">No products found.</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product, index) => (
          <div
            key={product.id}
            className="group bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 relative flex flex-col"
            onMouseEnter={() => setHoveredProduct(product.id.toString())}
            onMouseLeave={() => setHoveredProduct(null)}
          >
            <button
              onClick={(e) => toggleWishlist(product.id, e)}
              className="absolute top-3 right-3 z-10 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-md hover:bg-white transition-colors"
              aria-label={wishlist.includes(product.id.toString()) ? 'Remove from wishlist' : 'Add to wishlist'}
            >
              {wishlist.includes(product.id.toString()) ? (
                <HeartSolidIcon className="w-5 h-5 text-red-500" />
              ) : (
                <HeartIcon className="w-5 h-5 text-slate-600" />
              )}
            </button>

            <Link href={`/product/${product.slug}`} className="block relative">
              <div className="aspect-square bg-gradient-to-br from-soft-gray to-gray-100 rounded-t-xl overflow-hidden relative" style={{ minHeight: '200px' }}>
                {product?.image && !failedImages.has(product.id) ? (
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority={index < 4}
                    onError={() => handleImageError(product.id)}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-6xl bg-soft-gray">
                    🏥
                  </div>
                )}

                {product.salePrice && (
                  <div className="absolute top-3 left-3 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold z-10">
                    Sale
                  </div>
                )}

                {hoveredProduct === product.id.toString() && (
                  <div className="absolute inset-0 bg-black/5 flex items-end justify-center pb-6 transition-all duration-300 z-20">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        handleQuickView(product);
                      }}
                      className="bg-white text-slate-900 px-6 py-2 rounded-lg font-medium text-sm shadow-lg hover:bg-medical-blue hover:text-white transition-colors"
                    >
                      Quick View
                    </button>
                  </div>
                )}
              </div>
            </Link>

            <div className="p-4 flex-1 flex flex-col">
              <Link href={`/product/${product.slug}`} className="flex-1">
                <h3 className="font-semibold text-slate-800 mb-2 group-hover:text-medical-blue transition-colors line-clamp-2">
                  {product.name}
                </h3>
              </Link>

              <div className="flex items-center mb-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    i < Math.floor(product.rating) ? (
                      <StarIcon key={i} className="w-4 h-4 text-yellow-400" />
                    ) : (
                      <StarOutlineIcon key={i} className="w-4 h-4 text-gray-300" />
                    )
                  ))}
                </div>
                <span className="text-xs text-slate-500 ml-2">({product.reviewCount})</span>
              </div>

              <div className="flex items-center justify-between mt-2">
                <div>
                  {product.salePrice ? (
                    <div className="flex items-center space-x-2">
                      <span className="text-xl font-bold text-medical-blue">
                        ${product.salePrice}
                      </span>
                      <span className="text-sm text-slate-400 line-through">
                        ${product.price}
                      </span>
                    </div>
                  ) : (
                    <span className="text-xl font-bold text-slate-800">
                      ${product.price}
                    </span>
                  )}
                </div>

                <button
                  onClick={(e) => handleAddToCart(product, e)}
                  disabled={product.inventory === 0}
                  className="p-2 bg-medical-blue text-white rounded-lg hover:bg-medical-blue-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="Add to cart"
                >
                  <ShoppingCartIcon className="w-5 h-5" />
                </button>
              </div>

              {product.inventory < 10 && product.inventory > 0 && (
                <p className="text-xs text-orange-600 mt-2 flex items-center">
                  <span className="w-1.5 h-1.5 bg-orange-500 rounded-full mr-1.5"></span>
                  Only {product.inventory} left in stock
                </p>
              )}

              {product.inventory === 0 && (
                <p className="text-xs text-red-600 mt-2 flex items-center">
                  <span className="w-1.5 h-1.5 bg-red-500 rounded-full mr-1.5"></span>
                  Out of Stock
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {quickViewProduct && (
        <QuickViewModal
          product={{
            ...quickViewProduct,
            id: quickViewProduct.id_str || quickViewProduct.id.toString()
          }}
          isOpen={!!quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
        />
      )}
    </>
  );
};