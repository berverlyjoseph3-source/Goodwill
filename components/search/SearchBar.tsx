import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { motion, AnimatePresence } from 'framer-motion';
import { useDebounce } from '../../hooks/useDebounce';
import { searchProducts } from '../../lib/api';
import { Product } from '../../types';

export const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Product[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const searchRef = useRef<HTMLDivElement>(null);
  const debouncedQuery = useDebounce(query, 300);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (debouncedQuery.length < 2) {
      setResults([]);
      return;
    }

    setIsLoading(true);
    
    searchProducts(debouncedQuery)
      .then(data => {
        setResults(data.products || []);
        setIsOpen(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [debouncedQuery]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/shop?search=${encodeURIComponent(query)}`);
      setIsOpen(false);
    }
  };

  return (
    <div ref={searchRef} className="relative w-full">
      <form onSubmit={handleSearch} className="relative">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => results.length > 0 && setIsOpen(true)}
          placeholder="Search products, brands, categories..."
          className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg 
                   focus:outline-none focus:border-medical-blue focus:ring-2 
                   focus:ring-medical-blue/20 transition-all text-sm"
          aria-label="Search"
        />
        <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
        
        {isLoading && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <div className="w-5 h-5 border-2 border-medical-blue border-t-transparent rounded-full animate-spin" />
          </div>
        )}
      </form>

      <AnimatePresence>
        {isOpen && results.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg 
                     shadow-xl border border-gray-200 overflow-hidden z-50"
          >
            <div className="max-h-96 overflow-y-auto divide-y divide-gray-100">
              {results.map((product: Product) => (
                <Link
                  key={product.id}
                  href={`/product/${product.slug}`}
                  className="flex items-center space-x-3 p-3 hover:bg-soft-gray transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  <div className="relative w-12 h-12 bg-soft-gray rounded-md overflow-hidden flex-shrink-0">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-800 truncate">
                      {product.name}
                    </p>
                    <p className="text-xs text-slate-500">
                      {product.category} • ${product.salePrice || product.price}
                    </p>
                  </div>
                </Link>
              ))}
              
              <div className="p-3 bg-soft-gray">
                <button
                  onClick={handleSearch}
                  className="w-full text-center text-sm text-medical-blue hover:text-medical-blue-dark font-medium"
                >
                  View all results for "{query}"
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};