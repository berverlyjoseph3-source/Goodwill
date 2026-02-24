import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MagnifyingGlassIcon, 
  ShoppingCartIcon, 
  HeartIcon,
  UserIcon,
  Bars3Icon,
  XMarkIcon,
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon
} from '@heroicons/react/24/outline';
import { useCartStore } from '../../stores/cartStore';
import { MegaMenu } from './MegaMenu';
import { SearchBar } from '../search/SearchBar';
import { COMPANY_INFO, MEDICAL_IMAGES } from '../../constants/images';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false); // ✅ ADD THIS
  
  const cartItemsCount = useCartStore((state) => state.totalItems);
  const hasHydrated = useCartStore((state) => state.hasHydrated); // ✅ ADD THIS

  // ✅ FIX: Set mounted after component mounts on client
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      {/* Top Bar - Contact Info */}
      <div className="hidden lg:block bg-soft-gray border-b border-gray-200 py-2 text-sm">
        <div className="container-padding max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <a href={`tel:${COMPANY_INFO.phone1}`} className="flex items-center text-slate-600 hover:text-medical-blue transition-colors">
                <PhoneIcon className="w-4 h-4 mr-1" />
                <span>{COMPANY_INFO.phone1}</span>
              </a>
              <span className="text-slate-300">|</span>
              <a href={`tel:${COMPANY_INFO.phone2}`} className="flex items-center text-slate-600 hover:text-medical-blue transition-colors">
                <PhoneIcon className="w-4 h-4 mr-1" />
                <span>{COMPANY_INFO.phone2}</span>
              </a>
            </div>
            <div className="flex items-center space-x-6">
              <a href={`mailto:${COMPANY_INFO.email}`} className="flex items-center text-slate-600 hover:text-medical-blue transition-colors">
                <EnvelopeIcon className="w-4 h-4 mr-1" />
                <span>{COMPANY_INFO.email}</span>
              </a>
              <span className="text-slate-300">|</span>
              <span className="flex items-center text-slate-600">
                <MapPinIcon className="w-4 h-4 mr-1" />
                <span>{COMPANY_INFO.location}</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container-padding max-w-7xl mx-auto">
        <div className="flex items-center justify-between h-16 md:h-20">
          
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative w-10 h-10 md:w-12 md:h-12">
              <Image
                src={MEDICAL_IMAGES.logo.main}
                alt={COMPANY_INFO.name}
                fill
                className="object-contain group-hover:scale-105 transition-transform"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="text-lg md:text-xl font-bold text-medical-blue leading-tight">
                {COMPANY_INFO.shortName}
              </span>
              <span className="text-xs font-medium text-slate-500 -mt-1">
                Diagnostics Ltd.
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Link href="/shop" className="text-slate-700 hover:text-medical-blue font-medium transition-colors">
              Shop
            </Link>
            <MegaMenu />
            <Link href="/about" className="text-slate-700 hover:text-medical-blue font-medium transition-colors">
              About Us
            </Link>
            <Link href="/blog" className="text-slate-700 hover:text-medical-blue font-medium transition-colors">
              Blog
            </Link>
            <Link href="/contact" className="text-slate-700 hover:text-medical-blue font-medium transition-colors">
              Contact
            </Link>
          </nav>

          {/* Search Bar - Desktop */}
          <div className="hidden lg:block flex-1 max-w-xl mx-8">
            <SearchBar />
          </div>

          {/* Actions Icons */}
          <div className="flex items-center space-x-3">
            <Link 
              href="/account/wishlist" 
              className="p-2 hover:bg-soft-gray rounded-full transition-colors relative group"
              aria-label="Wishlist"
            >
              <HeartIcon className="w-5 h-5 text-slate-600 group-hover:text-medical-blue" />
            </Link>
            
            <Link 
              href="/cart" 
              className="p-2 hover:bg-soft-gray rounded-full transition-colors relative group"
              aria-label="Cart"
            >
              <ShoppingCartIcon className="w-5 h-5 text-slate-600 group-hover:text-medical-blue" />
              {/* ✅ FIX: Only show count after hydration on client */}
              {mounted && hasHydrated && cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-medical-blue text-white 
                               text-xs w-5 h-5 rounded-full flex items-center justify-center
                               animate-pulse">
                  {cartItemsCount}
                </span>
              )}
            </Link>

            <Link 
              href="/auth/signin" 
              className="p-2 hover:bg-soft-gray rounded-full transition-colors group"
              aria-label="Sign In"
            >
              <UserIcon className="w-5 h-5 text-slate-600 group-hover:text-medical-blue" />
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 hover:bg-soft-gray rounded-full transition-colors"
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {isMenuOpen ? (
                <XMarkIcon className="w-6 h-6 text-slate-600" />
              ) : (
                <Bars3Icon className="w-6 h-6 text-slate-600" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="lg:hidden pb-3">
          <SearchBar />
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t border-gray-200 shadow-lg"
          >
            <div className="container-padding max-w-7xl mx-auto py-4">
              {/* Mobile Contact Info */}
              <div className="mb-4 pb-4 border-b border-gray-200 space-y-2">
                <a href={`tel:${COMPANY_INFO.phone1}`} className="flex items-center text-slate-600 hover:text-medical-blue">
                  <PhoneIcon className="w-4 h-4 mr-2" />
                  {COMPANY_INFO.phone1}
                </a>
                <a href={`tel:${COMPANY_INFO.phone2}`} className="flex items-center text-slate-600 hover:text-medical-blue">
                  <PhoneIcon className="w-4 h-4 mr-2" />
                  {COMPANY_INFO.phone2}
                </a>
                <a href={`mailto:${COMPANY_INFO.email}`} className="flex items-center text-slate-600 hover:text-medical-blue">
                  <EnvelopeIcon className="w-4 h-4 mr-2" />
                  {COMPANY_INFO.email}
                </a>
                <span className="flex items-center text-slate-600">
                  <MapPinIcon className="w-4 h-4 mr-2" />
                  {COMPANY_INFO.location}
                </span>
              </div>

              <nav className="flex flex-col space-y-3">
                <Link 
                  href="/shop" 
                  className="py-2 px-4 text-slate-700 hover:bg-soft-gray hover:text-medical-blue rounded-lg transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Shop
                </Link>
                <Link 
                  href="/shop" 
                  className="py-2 px-4 text-slate-700 hover:bg-soft-gray hover:text-medical-blue rounded-lg transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Categories
                </Link>
                <Link 
                  href="/about" 
                  className="py-2 px-4 text-slate-700 hover:bg-soft-gray hover:text-medical-blue rounded-lg transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  About Us
                </Link>
                <Link 
                  href="/blog" 
                  className="py-2 px-4 text-slate-700 hover:bg-soft-gray hover:text-medical-blue rounded-lg transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Blog
                </Link>
                <Link 
                  href="/contact" 
                  className="py-2 px-4 text-slate-700 hover:bg-soft-gray hover:text-medical-blue rounded-lg transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Contact
                </Link>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
