'use client';

import { Hero } from '@/components/home/Hero';
import { CategoryScroll } from '@/components/home/CategoryScroll';
import { FoodCard } from '@/components/food/FoodCard';
import { RestaurantCard } from '@/components/restaurant/RestaurantCard';
import { popularFoods, restaurants } from '@/data/mockData';
import { motion } from 'framer-motion';
import { ArrowRight, Percent, Clock, Truck } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <Hero />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full">
        {/* Categories */}
        <CategoryScroll />

        {/* How it works */}
        <section className="py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: '📍',
                title: 'Choose Location',
                description: 'Enter your delivery address to find nearby restaurants',
                color: 'bg-blue-50',
              },
              {
                icon: '🍔',
                title: 'Select Food',
                description: 'Browse menus and pick your favorite dishes',
                color: 'bg-orange-50',
              },
              {
                icon: '🚀',
                title: 'Fast Delivery',
                description: 'Your order arrives fresh at your doorstep',
                color: 'bg-green-50',
              },
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`${step.color} rounded-2xl p-6 text-center`}
              >
                <div className="text-4xl mb-4">{step.icon}</div>
                <h3 className="font-semibold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-sm text-gray-600">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Featured Restaurants */}
        <section className="py-12">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Featured Restaurants
              </h2>
              <p className="text-gray-500 mt-1">
                Top picks in your area
              </p>
            </div>
            <Link
              href="/restaurants"
              className="flex items-center gap-2 text-[#ff6b35] hover:text-[#e55a2b] font-medium transition-colors"
            >
              See all
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {restaurants.slice(0, 6).map((restaurant, index) => (
              <RestaurantCard
                key={restaurant.id}
                restaurant={restaurant}
                index={index}
              />
            ))}
          </div>
        </section>

        {/* Popular Items */}
        <section className="py-12">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Popular Right Now 🔥
              </h2>
              <p className="text-gray-500 mt-1">
                Most ordered this week
              </p>
            </div>
            <Link
              href="/menu"
              className="flex items-center gap-2 text-[#ff6b35] hover:text-[#e55a2b] font-medium transition-colors"
            >
              See all
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularFoods.map((food, index) => (
              <FoodCard key={food.id} item={food} index={index} />
            ))}
          </div>
        </section>

        {/* Promo Banner */}
        <section className="py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#ff6b35] to-orange-400"
          >
            <div className="absolute top-0 right-0 w-1/2 h-full">
              <div className="absolute top-10 right-10 text-[180px] opacity-20">🍕</div>
            </div>

            <div className="relative p-8 lg:p-12 flex flex-col lg:flex-row items-center justify-between gap-8">
              <div className="text-center lg:text-left">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-medium mb-4">
                  <Percent className="w-4 h-4" />
                  Limited Time Offer
                </div>
                <h3 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                  Get 50% OFF Your First Order!
                </h3>
                <p className="text-orange-100 text-lg mb-6 max-w-lg">
                  Use code <span className="font-bold text-white bg-white/20 px-2 py-1 rounded">WELCOME50</span> at checkout.
                </p>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-8 py-4 bg-white text-[#ff6b35] font-bold rounded-xl shadow-lg hover:shadow-xl transition-shadow"
                >
                  Order Now
                </motion.button>
              </div>

              <div className="hidden lg:block">
                <div className="relative w-48 h-48">
                  <div className="absolute inset-0 bg-white/20 rounded-full" />
                  <div className="absolute inset-4 bg-white rounded-full flex items-center justify-center shadow-2xl">
                    <span className="text-7xl">🎉</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Why Choose Us */}
        <section className="py-12 mb-12">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Why Choose Foodie?</h2>
            <p className="text-gray-500">We make food ordering simple and delightful</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Truck,
                title: 'Fast Delivery',
                description: 'Get your food delivered in 30 minutes or less',
                color: 'text-blue-500',
                bg: 'bg-blue-50',
              },
              {
                icon: Percent,
                title: 'Best Deals',
                description: 'Save more with exclusive offers and discounts',
                color: 'text-green-500',
                bg: 'bg-green-50',
              },
              {
                icon: Clock,
                title: '24/7 Service',
                description: 'Order anytime, we are always here for you',
                color: 'text-purple-500',
                bg: 'bg-purple-50',
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className={`w-16 h-16 ${feature.bg} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                  <feature.icon className={`w-8 h-8 ${feature.color}`} />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-500">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* App Download */}
        <section className="py-12 mb-12">
          <div className="bg-gray-50 rounded-3xl p-8 lg:p-12">
            <div className="flex flex-col lg:flex-row items-center gap-10">
              <div className="flex-1 text-center lg:text-left">
                <h3 className="text-3xl font-bold text-gray-900 mb-4">
                  Get the Foodie App
                </h3>
                <p className="text-gray-600 mb-6 max-w-md">
                  Download our app for exclusive offers, faster ordering, and real-time delivery tracking.
                </p>
                <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                  <button className="flex items-center gap-3 px-6 py-3 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-colors">
                    <span className="text-2xl">🍎</span>
                    <div className="text-left">
                      <div className="text-xs text-gray-400">Download on</div>
                      <div className="font-medium">App Store</div>
                    </div>
                  </button>
                  <button className="flex items-center gap-3 px-6 py-3 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-colors">
                    <span className="text-2xl">▶️</span>
                    <div className="text-left">
                      <div className="text-xs text-gray-400">Get it on</div>
                      <div className="font-medium">Google Play</div>
                    </div>
                  </button>
                </div>
              </div>

              <div className="relative">
                <div className="w-64 h-64 bg-gradient-to-br from-[#ff6b35] to-orange-400 rounded-3xl flex items-center justify-center shadow-2xl shadow-[#ff6b35]/20">
                  <span className="text-[100px]">📱</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
