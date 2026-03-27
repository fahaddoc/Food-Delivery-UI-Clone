'use client';

import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Star, Clock, Bike, MapPin, Phone, Heart, Share2, ChevronLeft, Search, Filter } from 'lucide-react';
import { restaurants, popularFoods } from '@/data/mockData';
import { FoodCard } from '@/components/food/FoodCard';
import { formatPrice } from '@/lib/utils';
import Link from 'next/link';
import { useState } from 'react';

export default function RestaurantDetailPage() {
  const params = useParams();
  const restaurantId = Number(params.id);
  const restaurant = restaurants.find(r => r.id === restaurantId);
  const [activeCategory, setActiveCategory] = useState('All');
  const [isLiked, setIsLiked] = useState(false);

  // Get foods for this restaurant
  const restaurantFoods = popularFoods.filter(
    food => food.restaurantId === restaurantId
  );

  // If no specific foods, show all as example
  const foodsToShow = restaurantFoods.length > 0 ? restaurantFoods : popularFoods;

  const menuCategories = ['All', 'Popular', 'Starters', 'Main Course', 'Desserts', 'Drinks'];

  if (!restaurant) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-6xl mb-4">🍽️</p>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Restaurant not found</h1>
          <p className="text-gray-500 mb-6">The restaurant you're looking for doesn't exist.</p>
          <Link
            href="/"
            className="px-6 py-3 bg-[#ff6b35] text-white rounded-xl font-medium hover:bg-[#e55a2b] transition-colors"
          >
            Go Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Cover Image */}
      <div className="relative h-72 md:h-96 bg-gray-200">
        <Image
          src={restaurant.coverImage || restaurant.image}
          alt={restaurant.name}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

        {/* Back Button */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
          <Link
            href="/"
            className="p-2.5 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-gray-700" />
          </Link>

          <div className="flex gap-2">
            <button
              onClick={() => setIsLiked(!isLiked)}
              className={`p-2.5 rounded-full shadow-lg transition-colors ${
                isLiked ? 'bg-red-500 text-white' : 'bg-white/90 backdrop-blur-sm text-gray-700 hover:bg-white'
              }`}
            >
              <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
            </button>
            <button className="p-2.5 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-colors">
              <Share2 className="w-5 h-5 text-gray-700" />
            </button>
          </div>
        </div>

        {/* Restaurant Info Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-2 mb-2">
              {restaurant.isFeatured && (
                <span className="px-2.5 py-1 text-xs font-semibold bg-[#ff6b35] text-white rounded-full">
                  Featured
                </span>
              )}
              <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${
                restaurant.isOpen ? 'bg-green-500 text-white' : 'bg-gray-500 text-white'
              }`}>
                {restaurant.isOpen ? 'Open Now' : 'Closed'}
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              {restaurant.name}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-white/90">
              <div className="flex items-center gap-1">
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                <span className="font-semibold">{restaurant.rating}</span>
                <span className="text-white/70">({restaurant.reviews.toLocaleString()} reviews)</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{restaurant.deliveryTime} min</span>
              </div>
              <div className="flex items-center gap-1">
                <Bike className="w-4 h-4" />
                <span>{restaurant.deliveryFee === 0 ? 'Free delivery' : formatPrice(restaurant.deliveryFee)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Restaurant Details Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 -mt-6 relative z-10 mb-8"
        >
          <div className="grid md:grid-cols-3 gap-6">
            {/* Cuisine */}
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">Cuisine</h3>
              <div className="flex flex-wrap gap-2">
                {restaurant.cuisine.map(c => (
                  <span key={c} className="px-3 py-1 bg-orange-50 text-[#ff6b35] text-sm font-medium rounded-full">
                    {c}
                  </span>
                ))}
              </div>
            </div>

            {/* Address */}
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">Location</h3>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-gray-400 mt-0.5" />
                <span className="text-gray-700">{restaurant.address}</span>
              </div>
            </div>

            {/* Min Order */}
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">Minimum Order</h3>
              <span className="text-2xl font-bold text-gray-900">{formatPrice(restaurant.minOrder)}</span>
            </div>
          </div>
        </motion.div>

        {/* Menu Section */}
        <div className="pb-12">
          {/* Section Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Menu</h2>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search menu..."
                  className="pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#ff6b35] transition-colors w-48"
                />
              </div>
              <button className="p-2.5 bg-white border border-gray-200 rounded-xl hover:border-gray-300 transition-colors">
                <Filter className="w-5 h-5 text-gray-500" />
              </button>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex gap-2 overflow-x-auto pb-4 mb-6 scrollbar-hide">
            {menuCategories.map(category => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  activeCategory === category
                    ? 'bg-[#ff6b35] text-white shadow-lg shadow-[#ff6b35]/20'
                    : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-300'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Menu Items Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {foodsToShow.map((food, index) => (
              <FoodCard key={food.id} item={food} index={index} />
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-10">
            <button className="px-8 py-3 bg-white border-2 border-gray-200 text-gray-700 font-medium rounded-xl hover:border-[#ff6b35] hover:text-[#ff6b35] transition-colors">
              Load More Items
            </button>
          </div>
        </div>

        {/* Restaurant Info Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-12">
          <h2 className="text-xl font-bold text-gray-900 mb-6">About {restaurant.name}</h2>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Opening Hours */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Opening Hours</h3>
              <div className="space-y-2">
                {[
                  { day: 'Monday - Friday', hours: '10:00 AM - 11:00 PM' },
                  { day: 'Saturday', hours: '11:00 AM - 12:00 AM' },
                  { day: 'Sunday', hours: '11:00 AM - 10:00 PM' },
                ].map(schedule => (
                  <div key={schedule.day} className="flex justify-between text-sm">
                    <span className="text-gray-600">{schedule.day}</span>
                    <span className="font-medium text-gray-900">{schedule.hours}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Contact</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-orange-50 rounded-full flex items-center justify-center">
                    <Phone className="w-5 h-5 text-[#ff6b35]" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p className="font-medium text-gray-900">+1 (555) 123-4567</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-orange-50 rounded-full flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-[#ff6b35]" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Address</p>
                    <p className="font-medium text-gray-900">{restaurant.address}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
