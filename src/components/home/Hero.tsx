'use client';

import { motion } from 'framer-motion';
import { Search, MapPin, Clock, Star, Shield } from 'lucide-react';
import { useState } from 'react';
import Image from 'next/image';

export function Hero() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <section className="relative bg-gradient-to-b from-orange-50 to-white py-12 lg:py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
              Delicious food,{' '}
              <span className="text-[#ff6b35]">delivered</span> to your door
            </h1>

            <p className="text-lg text-gray-600 mb-8 max-w-lg">
              Order from the best local restaurants with easy, on-demand delivery.
              Fresh meals at your doorstep in minutes.
            </p>

            {/* Search Bar */}
            <div className="bg-white rounded-2xl shadow-xl shadow-gray-200/50 p-2 mb-8">
              <div className="flex flex-col sm:flex-row gap-2">
                {/* Location Input */}
                <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-xl flex-1">
                  <MapPin className="w-5 h-5 text-[#ff6b35]" />
                  <input
                    type="text"
                    placeholder="Enter delivery address"
                    className="bg-transparent border-none outline-none w-full text-gray-900 placeholder-gray-400"
                  />
                </div>

                {/* Search Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-8 py-3.5 bg-[#ff6b35] hover:bg-[#e55a2b] text-white font-semibold rounded-xl shadow-lg shadow-[#ff6b35]/30 transition-colors flex items-center justify-center gap-2"
                >
                  <Search className="w-5 h-5" />
                  Find Food
                </motion.button>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap gap-6">
              {[
                { icon: Clock, text: '30 min delivery' },
                { icon: Star, text: '4.8 rating' },
                { icon: Shield, text: 'Safe & hygienic' },
              ].map((badge, index) => (
                <div key={index} className="flex items-center gap-2 text-gray-600">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <badge.icon className="w-4 h-4 text-green-600" />
                  </div>
                  <span className="text-sm font-medium">{badge.text}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Content - Food Images */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <div className="relative">
              {/* Main Food Image */}
              <div className="relative w-[450px] h-[450px] mx-auto">
                <div className="absolute inset-0 bg-gradient-to-br from-[#ff6b35]/20 to-orange-100 rounded-full" />
                <div className="absolute inset-8 bg-white rounded-full shadow-2xl overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&h=500&fit=crop"
                    alt="Delicious burger"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Floating Cards */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute top-12 -left-4 bg-white rounded-2xl shadow-xl p-4 flex items-center gap-3"
              >
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center text-2xl">
                  🍕
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Pizza</p>
                  <p className="text-sm text-gray-500">50+ places</p>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                className="absolute top-32 -right-4 bg-white rounded-2xl shadow-xl p-4 flex items-center gap-3"
              >
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center text-2xl">
                  🥗
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Healthy</p>
                  <p className="text-sm text-gray-500">30+ places</p>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                className="absolute bottom-20 -left-8 bg-white rounded-2xl shadow-xl p-4"
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex -space-x-2">
                    {['🧑‍🍳', '👨‍🍳', '👩‍🍳'].map((emoji, i) => (
                      <div key={i} className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center border-2 border-white">
                        {emoji}
                      </div>
                    ))}
                  </div>
                  <span className="text-sm font-medium text-gray-900">500+ Restaurants</span>
                </div>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                  <span className="text-sm text-gray-500 ml-1">4.8 (10k+ reviews)</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Background decorations */}
      <div className="absolute top-20 right-0 w-96 h-96 bg-orange-100 rounded-full blur-3xl opacity-50 -z-10" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-yellow-100 rounded-full blur-3xl opacity-50 -z-10" />
    </section>
  );
}
