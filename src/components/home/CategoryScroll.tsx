'use client';

import { motion } from 'framer-motion';
import { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { categories } from '@/data/mockData';

interface CategoryScrollProps {
  onCategorySelect?: (categoryId: number | null) => void;
}

export function CategoryScroll({ onCategorySelect }: CategoryScrollProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState<number | null>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  const handleCategoryClick = (categoryId: number) => {
    const newCategory = activeCategory === categoryId ? null : categoryId;
    setActiveCategory(newCategory);
    onCategorySelect?.(newCategory);
  };

  const categoryColors = [
    'bg-orange-50 hover:bg-orange-100',
    'bg-red-50 hover:bg-red-100',
    'bg-pink-50 hover:bg-pink-100',
    'bg-yellow-50 hover:bg-yellow-100',
    'bg-purple-50 hover:bg-purple-100',
    'bg-blue-50 hover:bg-blue-100',
    'bg-green-50 hover:bg-green-100',
    'bg-teal-50 hover:bg-teal-100',
    'bg-amber-50 hover:bg-amber-100',
    'bg-rose-50 hover:bg-rose-100',
  ];

  return (
    <section className="py-10">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            What are you craving?
          </h2>
          <p className="text-gray-500 mt-1">
            Choose from popular categories
          </p>
        </div>

        {/* Navigation Arrows */}
        <div className="flex gap-2">
          <button
            onClick={() => scroll('left')}
            className="p-2.5 bg-white border border-gray-200 hover:border-gray-300 hover:bg-gray-50 rounded-full transition-colors shadow-sm"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>
          <button
            onClick={() => scroll('right')}
            className="p-2.5 bg-white border border-gray-200 hover:border-gray-300 hover:bg-gray-50 rounded-full transition-colors shadow-sm"
          >
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Scrollable Container */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scrollbar-hide pb-4 -mx-4 px-4"
      >
        {categories.map((category, index) => {
          const isActive = activeCategory === category.id;
          const colorClass = categoryColors[index % categoryColors.length];

          return (
            <motion.button
              key={category.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => handleCategoryClick(category.id)}
              className={`flex-shrink-0 relative transition-all duration-200`}
            >
              <div
                className={`w-28 px-4 py-5 rounded-2xl transition-all duration-200 ${
                  isActive
                    ? 'bg-[#ff6b35] shadow-lg shadow-[#ff6b35]/30'
                    : colorClass
                }`}
              >
                {/* Category Emoji */}
                <div className="text-4xl mb-2 text-center">
                  {category.image}
                </div>

                {/* Category Name */}
                <h3
                  className={`font-semibold text-sm text-center ${
                    isActive ? 'text-white' : 'text-gray-900'
                  }`}
                >
                  {category.name}
                </h3>
              </div>
            </motion.button>
          );
        })}
      </div>
    </section>
  );
}
