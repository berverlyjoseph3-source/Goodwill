import { GetStaticProps, GetStaticPaths } from 'next';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  StarIcon, 
  ShoppingCartIcon, 
  HeartIcon,
  TruckIcon,
  ShieldCheckIcon,
  ArrowPathIcon,
  ChevronRightIcon 
} from '@heroicons/react/24/outline';
import { StarIcon as StarSolidIcon } from '@heroicons/react/24/solid';
import { ProductGallery } from '../../components/product/ProductGallery';
import { ProductReviews } from '../../components/product/ProductReviews';
import { RelatedProducts } from '../../components/product/RelatedProducts';
import { RecentlyViewed } from '../../components/product/RecentlyViewed';
import { useCartStore } from '../../stores/cartStore';
import toast from 'react-hot-toast';

interface Product {
  id: string;
  name: string;
  slug: string;
  sku: string;
  price: number;
  salePrice?: number;
  image: string;
  images?: string[];
  category: string;
  categorySlug: string;
  brand: string;
  rating: number;
  reviewCount: number;
  inventory: number;
  description: string;
  features?: string[];
  deliveryEstimate?: string;
  warranty?: string;
}

interface ProductPageProps {
  product: Product | null;
}

export default function ProductPage({ product }: ProductPageProps) {
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const addToCart = useCartStore((state) => state.addItem);

  if (router.isFallback) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-medical-blue" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-900 mb-4">Product Not Found</h1>
          <Link href="/shop" className="btn-primary">
            Back to Shop
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart({
      id: product.id.toString(),
      name: product.name,
      price: product.salePrice || product.price,
      image: product.image || '/images/placeholder.jpg',
      quantity: quantity,
      inventory: product.inventory
    });
    toast.success(`${product.name} added to cart`);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    router.push('/checkout');
  };

  const productImages = product.images?.length ? product.images : [product.image || '/images/placeholder.jpg'];

  return (
    <div className="bg-white">
      {/* Breadcrumb */}
      <nav className="bg-soft-gray border-y border-gray-200">
        <div className="container-padding max-w-7xl mx-auto py-3">
          <ol className="flex items-center space-x-2 text-sm">
            <li><Link href="/" className="text-slate-600 hover:text-medical-blue">Home</Link></li>
            <li><ChevronRightIcon className="w-4 h-4 text-slate-400" /></li>
            <li><Link href="/shop" className="text-slate-600 hover:text-medical-blue">Shop</Link></li>
            <li><ChevronRightIcon className="w-4 h-4 text-slate-400" /></li>
            <li className="text-slate-800 font-medium truncate">{product.name}</li>
          </ol>
        </div>
      </nav>

      <div className="container-padding max-w-7xl mx-auto py-8 lg:py-12">
        {/* Main Product Section */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Gallery */}
          <div>
            <ProductGallery 
              images={productImages}
              selectedIndex={selectedImage}
              onSelect={setSelectedImage}
              productName={product.name}
            />
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-slate-900 mb-3">{product.name}</h1>
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      i < Math.floor(product.rating) ? (
                        <StarSolidIcon key={i} className="w-5 h-5 text-yellow-400" />
                      ) : (
                        <StarIcon key={i} className="w-5 h-5 text-gray-300" />
                      )
                    ))}
                  </div>
                  <span className="ml-2 text-sm text-slate-600">{product.reviewCount} reviews</span>
                </div>
                <span className="text-sm text-slate-400">|</span>
                <span className="text-sm text-slate-600">SKU: {product.sku}</span>
              </div>
            </div>

            {/* Price & Availability */}
            <div className="border-y border-gray-200 py-4">
              <div className="flex items-baseline space-x-3">
                {product.salePrice ? (
                  <>
                    <span className="text-3xl font-bold text-medical-blue">${product.salePrice}</span>
                    <span className="text-lg text-slate-400 line-through">${product.price}</span>
                  </>
                ) : (
                  <span className="text-3xl font-bold text-slate-900">${product.price}</span>
                )}
              </div>
              
              <div className="mt-3 flex items-center space-x-4">
                <div className="flex items-center">
                  <div className={`w-3 h-3 rounded-full ${
                    product.inventory > 10 ? 'bg-green-500' :
                    product.inventory > 0 ? 'bg-yellow-500' : 'bg-red-500'
                  }`} />
                  <span className="ml-2 text-sm font-medium text-slate-700">
                    {product.inventory > 10 ? 'In Stock' :
                     product.inventory > 0 ? `Only ${product.inventory} left` : 'Out of Stock'}
                  </span>
                </div>
                <div className="flex items-center text-sm text-slate-600">
                  <TruckIcon className="w-5 h-5 mr-1" />
                  {product.deliveryEstimate || 'Free shipping'}
                </div>
              </div>
            </div>

            {/* Description */}
            <p className="text-slate-600 leading-relaxed">{product.description}</p>

            {/* Quantity & Actions */}
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <label htmlFor="quantity" className="font-medium text-slate-700">Quantity:</label>
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-3 py-2 hover:bg-gray-50">-</button>
                  <input type="number" min="1" max={product.inventory} value={quantity}
                    onChange={(e) => setQuantity(Math.min(product.inventory, parseInt(e.target.value) || 1))}
                    className="w-16 text-center border-x border-gray-300 py-2 focus:outline-none" />
                  <button onClick={() => setQuantity(Math.min(product.inventory, quantity + 1))} className="px-3 py-2 hover:bg-gray-50">+</button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button onClick={handleAddToCart} disabled={product.inventory === 0}
                  className="flex-1 btn-primary flex items-center justify-center space-x-2">
                  <ShoppingCartIcon className="w-5 h-5" />
                  <span>Add to Cart</span>
                </button>
                <button onClick={handleBuyNow} disabled={product.inventory === 0}
                  className="flex-1 bg-slate-900 text-white px-6 py-3 rounded-lg font-semibold hover:bg-slate-800">
                  Buy Now
                </button>
                <button className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50">
                  <HeartIcon className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-3 pt-4">
              <div className="flex flex-col items-center p-3 bg-soft-gray rounded-lg">
                <ShieldCheckIcon className="w-6 h-6 text-medical-blue mb-1" />
                <span className="text-xs text-slate-600">FDA Approved</span>
              </div>
              <div className="flex flex-col items-center p-3 bg-soft-gray rounded-lg">
                <ArrowPathIcon className="w-6 h-6 text-medical-blue mb-1" />
                <span className="text-xs text-slate-600">30-Day Returns</span>
              </div>
              <div className="flex flex-col items-center p-3 bg-soft-gray rounded-lg">
                <TruckIcon className="w-6 h-6 text-medical-blue mb-1" />
                <span className="text-xs text-slate-600">Free Shipping</span>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews & Related */}
        <div className="mt-16">
          {/* ✅ FIXED: Convert string ID to number */}
          <ProductReviews productId={parseInt(product.id)} />
        </div>
        <div className="mt-16">
          <RelatedProducts category={product.categorySlug} currentProductId={product.id} />
        </div>
      </div>
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const baseUrl = process.env.NEXTAUTH_URL || 'https://goodwill-production-058c.up.railway.app';
    const response = await fetch(`${baseUrl}/api/products?limit=100`);
    const data = await response.json();
    const paths = (data.products || []).map((p: any) => ({ params: { slug: p.slug } }));
    return { paths, fallback: true };
  } catch {
    return { paths: [], fallback: true };
  }
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    const baseUrl = process.env.NEXTAUTH_URL || 'https://goodwill-production-058c.up.railway.app';
    const response = await fetch(`${baseUrl}/api/products?slug=${params?.slug}`);
    const data = await response.json();
    const product = data.products?.[0] || null;
    
    if (!product) return { notFound: true };
    
    return { 
      props: { product }, 
      revalidate: 3600 
    };
  } catch {
    return { notFound: true };
  }
};