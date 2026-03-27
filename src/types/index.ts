export interface FoodItem {
  id: number;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviews: number;
  deliveryTime: number;
  restaurantId: number;
  restaurantName: string;
  category: string;
  isPopular?: boolean;
  isVeg?: boolean;
  discount?: number;
  addOns?: AddOn[];
}

export interface AddOn {
  id: number;
  name: string;
  price: number;
}

export interface Restaurant {
  id: number;
  name: string;
  image: string;
  coverImage: string;
  cuisine: string[];
  rating: number;
  reviews: number;
  deliveryTime: number;
  deliveryFee: number;
  minOrder: number;
  address: string;
  isOpen: boolean;
  isFeatured?: boolean;
}

export interface Category {
  id: number;
  name: string;
  image: string;
  count: number;
}

export interface CartItem extends FoodItem {
  quantity: number;
  selectedAddOns?: AddOn[];
}

export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  addresses: Address[];
}

export interface Address {
  id: number;
  label: string;
  address: string;
  isDefault: boolean;
}
