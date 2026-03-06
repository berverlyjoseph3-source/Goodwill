import { GetStaticProps, GetStaticPaths } from 'next';
import { useRouter } from 'next/router';
import { useState } from 'react';
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
import { PRODUCTS } from '../../constants/images'; // ✅ IMPORT LOCAL PRODUCTS
import { Product } from '../../types';
import toast from 'react-hot-toast';

interface ProductPageProps {
  product: Product | null;
}

export default function ProductPage({ product }: ProductPageProps) {
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [imageError, setImageError] = useState(false);
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

  // Create images array for gallery
  const productImages = product.images?.length 
    ? product.images 
    : [product.image || '/images/placeholder.jpg'];

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
            {imageError ? (
              <div className="aspect-square bg-soft-gray rounded-2xl flex items-center justify-center">
                <div className="text-center">
                  <span className="text-8xl mb-4 block">🏥</span>
                  <p className="text-slate-500">Image not available</p>
                </div>
              </div>
            ) : (
              <ProductGallery 
                images={productImages}
                selectedIndex={selectedImage}
                onSelect={setSelectedImage}
                productName={product.name}
                onImageError={() => setImageError(true)}
              />
            )}
          </div>

          {/* Product Info - Rest of your component remains the same */}
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
          <ProductReviews productId={product.id} />
        </div>
        <div className="mt-16">
          <RelatedProducts category={product.categorySlug} currentProductId={product.id} />
        </div>
        <div className="mt-16">
          <RecentlyViewed currentProductId={product.id} />
        </div>
      </div>
    </div>
  );
}

// ✅ FIXED: Use LOCAL PRODUCTS for paths
export const getStaticPaths: GetStaticPaths = async () => {
  const paths = PRODUCTS.map((product) => ({
    params: { slug: product.slug },
  }));

  return {
    paths,
    fallback: true,
  };
};

// ✅ FIXED: Use LOCAL PRODUCTS for props
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const product = PRODUCTS.find(p => p.slug === params?.slug) || null;
  
  if (!product) {
    return { notFound: true };
  }
  
  // Add images array if not present
  const productWithImages = {
    ...product,
    images: product.images || [product.image],
  };

  return { 
    props: { product: productWithImages }, 
    revalidate: 3600 
  };
};