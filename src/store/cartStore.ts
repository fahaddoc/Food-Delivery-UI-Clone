'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CartItem, FoodItem, AddOn } from '@/types';

interface CartState {
  items: CartItem[];
  addItem: (item: FoodItem, addOns?: AddOn[]) => void;
  removeItem: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (item, addOns = []) => {
        const items = get().items;
        const existingItem = items.find((i) => i.id === item.id);

        if (existingItem) {
          set({
            items: items.map((i) =>
              i.id === item.id
                ? { ...i, quantity: i.quantity + 1 }
                : i
            ),
          });
        } else {
          set({
            items: [...items, { ...item, quantity: 1, selectedAddOns: addOns }],
          });
        }
      },

      removeItem: (id) => {
        set({
          items: get().items.filter((i) => i.id !== id),
        });
      },

      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          get().removeItem(id);
          return;
        }

        set({
          items: get().items.map((i) =>
            i.id === id ? { ...i, quantity } : i
          ),
        });
      },

      clearCart: () => set({ items: [] }),
    }),
    {
      name: 'cart-storage',
    }
  )
);

// Selector hooks
export const useCartTotal = () => {
  const items = useCartStore((state) => state.items);
  return items.reduce((sum, item) => {
    const addOnsTotal = item.selectedAddOns?.reduce((a, b) => a + b.price, 0) || 0;
    return sum + (item.price + addOnsTotal) * item.quantity;
  }, 0);
};

export const useCartItemCount = () => {
  const items = useCartStore((state) => state.items);
  return items.reduce((sum, item) => sum + item.quantity, 0);
};
