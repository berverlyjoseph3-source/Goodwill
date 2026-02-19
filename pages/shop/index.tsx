import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';
import { FilterSidebar } from '../../components/shop/FilterSidebar';
import { ProductGrid } from '../../components/shop/ProductGrid';
import { ProductSkeleton } from '../../components/ui/ProductSkeleton';
import { SortSelect } from '../../components/shop/SortSelect';
import { MobileFilterDrawer } from '../../components/shop/MobileFilterDrawer';
import { Pagination } from '../../components/shop/Pagination';
import { AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { ChevronRightIcon } from '@heroicons/react/24/outline';

// Define interface matching what ProductGrid expects
interface Product {
  id: number;
  name: string;
  slug: string;
  sku: string;
  price: number;
  salePrice?: number;
  image: string;
  category: string;
  categorySlug: string;
  brand: string;
  rating: number;
  reviewCount: number;
  inventory: number;
  description: string;
  deliveryEstimate: string;
  warranty: string;
}

export default function ShopPage() {
  const router = useRouter();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  const [filters, setFilters] = useState({
    category: typeof router.query.category === 'string' ? router.query.category : '',
    priceRange: [0, 5000],
    brand: [] as string[],
    availability: 'all',
    rating: 0
  });

  const [sortBy, setSortBy] = useState('featured');
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const params = new URLSearchParams();
        if (filters.category) params.append('category', filters.category);
        if (filters.priceRange[0] > 0) params.append('minPrice', filters.priceRange[0].toString());
        if (filters.priceRange[1] < 5000) params.append('maxPrice', filters.priceRange[1].toString());
        if (filters.brand.length > 0) params.append('brand', filters.brand.join(','));
        if (filters.availability !== 'all') params.append('availability', filters.availability);
        if (filters.rating > 0) params.append('rating', filters.rating.toString());
        params.append('sort', sortBy);
        params.append('page', currentPage.toString());
        params.append('limit', '12');

        const response = await fetch(`/api/products?${params.toString()}`);
        const data = await response.json();
        
        // Transform API response to match Product interface
        const transformedProducts = (data.products || []).map((p: any) => ({
          id: parseInt(p.id) || 0,
          name: p.name || '',
          slug: p.slug || '',
          sku: p.sku || `SKU-${p.id}`,
          price: p.price || 0,
          salePrice: p.salePrice,
          image: p.image || '/images/placeholder.jpg',
          category: p.category?.name || p.category || 'Uncategorized',
          categorySlug: p.categorySlug || '',
          brand: p.brand || 'Goodwill Medical',
          rating: p.rating || 0,
          reviewCount: p.reviewCount || 0,
          inventory: p.inventory || 0,
          description: p.description || '',
          deliveryEstimate: p.deliveryEstimate || '2-3 business days',
          warranty: p.warranty || '1 year'
        }));
        
        setProducts(transformedProducts);
        setTotalCount(data.pagination?.total || 0);
        setTotalPages(data.pagination?.totalPages || 1);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [filters, sortBy, currentPage]);

  // Update filters when router query changes
  useEffect(() => {
    if (router.query.category && typeof router.query.category === 'string') {
      setFilters(prev => ({ ...prev, category: router.query.category as string }));
    }
  }, [router.query.category]);

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <nav className="bg-soft-gray py-3" aria-label="Breadcrumb">
        <div className="container-padding max-w-7xl mx-auto">
          <ol className="flex items-center space-x-2 text-sm">
            <li><Link href="/" className="text-slate-600 hover:text-medical-blue">Home</Link></li>
            <li><ChevronRightIcon className="w-4 h-4 text-slate-400" /></li>
            <li className="text-slate-800 font-medium">Shop</li>
          </ol>
        </div>
      </nav>

      <div className="container-padding max-w-7xl mx-auto py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filter Sidebar - Desktop */}
          <aside className="hidden lg:block w-80 flex-shrink-0">
            <div className="sticky top-24">
              <FilterSidebar 
                filters={filters} 
                onFilterChange={setFilters}
              />
            </div>
          </aside>

          {/* Mobile Filter Button */}
          <button
            onClick={() => setIsFilterOpen(true)}
            className="lg:hidden btn-secondary w-full mb-4 flex items-center justify-center"
            aria-label="Open filters"
          >
            <AdjustmentsHorizontalIcon className="w-5 h-5 mr-2" />
            Filters
          </button>

          {/* Mobile Filter Drawer */}
          <AnimatePresence>
            {isFilterOpen && (
              <MobileFilterDrawer
                isOpen={isFilterOpen}
                onClose={() => setIsFilterOpen(false)}
                filters={filters}
                onFilterChange={setFilters}
              />
            )}
          </AnimatePresence>

          {/* Main Content */}
          <main className="flex-1">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
              <p className="text-slate-600 mb-2 sm:mb-0">
                Showing <span className="font-semibold">{products.length}</span> of 
                <span className="font-semibold"> {totalCount}</span> products
              </p>
              <SortSelect value={sortBy} onChange={setSortBy} />
            </div>

            {/* Product Grid */}
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {[...Array(8)].map((_, i) => (
                  <ProductSkeleton key={i} />
                ))}
              </div>
            ) : (
              <ProductGrid products={products} />
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <Pagination 
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            )}
          </main>
        </div>
      </div>
    </div>
  );
}