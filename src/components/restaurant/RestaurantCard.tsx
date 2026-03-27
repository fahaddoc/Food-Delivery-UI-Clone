'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Star, Clock, Bike } from 'lucide-react';
import type { Restaurant } from '@/types';
import { formatPrice } from '@/lib/utils';
import { useState } from 'react';

interface RestaurantCardProps {
  restaurant: Restaurant;
  index?: number;
}

export function RestaurantCard({ restaurant, index = 0 }: RestaurantCardProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <Link href={`/restaurants/${restaurant.id}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.1, duration: 0.3 }}
        whileHover={{ y: -4 }}
        className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-gray-100 transition-all duration-300"
      >
        {/* Image */}
        <div className="relative h-44 overflow-hidden bg-gray-100">
          {!imageError ? (
            <Image
              src={restaurant.image}
              alt={restaurant.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-5xl bg-gray-50">
              🍽️
            </div>
          )}

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

          {/* Top Badges */}
          <div className="absolute top-3 left-3 flex gap-2">
            {restaurant.isFeatured && (
              <span className="px-2.5 py-1 text-xs font-semibold bg-[#ff6b35] text-white rounded-full shadow-sm">
                Featured
              </span>
            )}
          </div>

          {/* Status Badge */}
          <div className="absolute top-3 right-3">
            <span
              className={`px-2.5 py-1 text-xs font-semibold rounded-full shadow-sm ${
                restaurant.isOpen
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-500 text-white'
              }`}
            >
              {restaurant.isOpen ? 'Open' : 'Closed'}
            </span>
          </div>

          {/* Delivery Info */}
          <div className="absolute bottom-3 left-3 right-3 flex items-center gap-2">
            <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-white/95 backdrop-blur-sm rounded-full shadow-sm">
              <Clock className="w-3.5 h-3.5 text-gray-600" />
              <span className="text-xs font-medium text-gray-700">{restaurant.deliveryTime} min</span>
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-white/95 backdrop-blur-sm rounded-full shadow-sm">
              <Bike className="w-3.5 h-3.5 text-gray-600" />
              <span className="text-xs font-medium text-gray-700">
                {restaurant.deliveryFee === 0 ? 'Free delivery' : formatPrice(restaurant.deliveryFee)}
              </span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Name & Rating */}
          <div className="flex items-start justify-between mb-2">
            <h3 className="font-semibold text-gray-900 group-hover:text-[#ff6b35] transition-colors">
              {restaurant.name}
            </h3>
            <div className="flex items-center gap-1 px-2 py-0.5 bg-green-50 rounded-md">
              <Star className="w-3.5 h-3.5 fill-green-600 text-green-600" />
              <span className="text-sm font-semibold text-green-700">{restaurant.rating}</span>
            </div>
          </div>

          {/* Cuisine Tags */}
          <div className="flex flex-wrap gap-1.5 mb-3">
            {restaurant.cuisine.map((cuisine) => (
              <span
                key={cuisine}
                className="px-2 py-0.5 text-xs text-gray-600 bg-gray-100 rounded-md"
              >
                {cuisine}
              </span>
            ))}
          </div>

          {/* Reviews & Min Order */}
          <div className="flex items-center justify-between text-sm text-gray-500 pt-3 border-t border-gray-100">
            <span>{restaurant.reviews.toLocaleString()} reviews</span>
            <span>Min. order {formatPrice(restaurant.minOrder)}</span>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
