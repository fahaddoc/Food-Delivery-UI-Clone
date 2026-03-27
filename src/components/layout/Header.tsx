'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, User, Menu, X, MapPin, ChevronDown, Search } from 'lucide-react';
import { useCartItemCount } from '@/store/cartStore';
import { CartDrawer } from '@/components/cart/CartDrawer';

export function Header() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const itemCount = useCartItemCount();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/restaurants', label: 'Restaurants' },
    { href: '/offers', label: 'Offers' },
  ];

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white shadow-md'
            : 'bg-white'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-[#ff6b35] rounded-xl flex items-center justify-center shadow-lg shadow-[#ff6b35]/20">
                <span className="text-white text-xl">🍽️</span>
              </div>
              <span className="font-bold text-xl text-gray-900">
                Foodie
              </span>
            </Link>

            {/* Location Selector - Desktop */}
            <button className="hidden lg:flex items-center gap-2 px-4 py-2 bg-gray-50 hover:bg-gray-100 rounded-full transition-colors">
              <MapPin className="w-4 h-4 text-[#ff6b35]" />
              <span className="text-sm text-gray-700">Deliver to: <span className="font-medium">Current Location</span></span>
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </button>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-gray-600 hover:text-[#ff6b35] font-medium transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-3">
              {/* Search Button - Desktop */}
              <button className="hidden md:flex items-center gap-2 px-4 py-2.5 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors">
                <Search className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-500">Search...</span>
              </button>

              {/* Cart Button */}
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsCartOpen(true)}
                className="relative p-2.5 bg-[#ff6b35]/10 hover:bg-[#ff6b35]/20 rounded-full transition-colors"
              >
                <ShoppingBag className="w-5 h-5 text-[#ff6b35]" />
                {itemCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 w-5 h-5 bg-[#ff6b35] text-white text-xs font-bold rounded-full flex items-center justify-center shadow-lg"
                  >
                    {itemCount}
                  </motion.span>
                )}
              </motion.button>

              {/* Sign In Button - Desktop */}
              <button className="hidden lg:flex items-center gap-2 px-5 py-2.5 bg-[#ff6b35] hover:bg-[#e55a2b] text-white font-medium rounded-full transition-colors shadow-lg shadow-[#ff6b35]/20">
                <User className="w-4 h-4" />
                Sign In
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2.5 hover:bg-gray-100 rounded-full transition-colors"
              >
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5 text-gray-700" />
                ) : (
                  <Menu className="w-5 h-5 text-gray-700" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden overflow-hidden bg-white border-t border-gray-100"
            >
              {/* Location */}
              <div className="px-4 py-3 border-b border-gray-100">
                <button className="flex items-center gap-2 w-full px-4 py-3 bg-gray-50 rounded-xl">
                  <MapPin className="w-4 h-4 text-[#ff6b35]" />
                  <span className="text-sm text-gray-700">Current Location</span>
                  <ChevronDown className="w-4 h-4 text-gray-400 ml-auto" />
                </button>
              </div>

              <nav className="px-4 py-4 space-y-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block py-3 px-4 text-gray-700 hover:bg-gray-50 rounded-xl font-medium transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="pt-3 border-t border-gray-100 mt-3">
                  <button className="w-full py-3 px-4 bg-[#ff6b35] hover:bg-[#e55a2b] text-white font-medium rounded-xl transition-colors">
                    Sign In
                  </button>
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Cart Drawer */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}
