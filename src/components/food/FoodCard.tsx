'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Plus, Star, Clock, Heart } from 'lucide-react';
import { useState } from 'react';
import { useCartStore } from '@/store/cartStore';
import type { FoodItem } from '@/types';
import { formatPrice } from '@/lib/utils';

interface FoodCardProps {
  item: FoodItem;
  index?: number;
}

export function FoodCard({ item, index = 0 }: FoodCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [imageError, setImageError] = useState(false);
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(item);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.3 }}
      whileHover={{ y: -4 }}
      className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-gray-100 transition-all duration-300"
    >
      {/* Image Container */}
      <div className="relative h-48 overflow-hidden bg-gray-100">
        {!imageError ? (
          <Image
            src={item.image}
            alt={item.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-5xl bg-gray-50">
            🍽️
          </div>
        )}

        {/* Like Button */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={(e) => {
            e.preventDefault();
            setIsLiked(!isLiked);
          }}
          className={`absolute top-3 right-3 p-2 rounded-full shadow-md transition-colors ${
            isLiked
              ? 'bg-red-500 text-white'
              : 'bg-white/90 backdrop-blur-sm text-gray-600 hover:text-red-500'
          }`}
        >
          <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
        </motion.button>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {item.isPopular && (
            <span className="px-2.5 py-1 text-xs font-semibold bg-[#ff6b35] text-white rounded-full shadow-sm">
              Popular
            </span>
          )}
          {item.discount && item.discount > 0 && (
            <span className="px-2.5 py-1 text-xs font-semibold bg-green-500 text-white rounded-full shadow-sm">
              {item.discount}% OFF
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Restaurant Name */}
        <p className="text-xs text-[#ff6b35] font-medium mb-1">
          {item.restaurantName}
        </p>

        {/* Food Name */}
        <h3 className="font-semibold text-gray-900 mb-1 line-clamp-1">
          {item.name}
        </h3>

        {/* Description */}
        <p className="text-sm text-gray-500 mb-3 line-clamp-2">
          {item.description}
        </p>

        {/* Meta Info */}
        <div className="flex items-center gap-3 mb-3">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium text-gray-900">{item.rating}</span>
            <span className="text-sm text-gray-400">({item.reviews})</span>
          </div>
          <div className="w-1 h-1 bg-gray-300 rounded-full" />
          <div className="flex items-center gap-1 text-sm text-gray-500">
            <Clock className="w-4 h-4" />
            <span>{item.deliveryTime} min</span>
          </div>
        </div>

        {/* Price & Add Button */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold text-gray-900">
              {formatPrice(item.price)}
            </span>
            {item.originalPrice && (
              <span className="text-sm text-gray-400 line-through">
                {formatPrice(item.originalPrice)}
              </span>
            )}
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleAddToCart}
            className="p-2.5 bg-[#ff6b35] hover:bg-[#e55a2b] text-white rounded-xl shadow-md shadow-[#ff6b35]/20 transition-colors"
          >
            <Plus className="w-5 h-5" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
