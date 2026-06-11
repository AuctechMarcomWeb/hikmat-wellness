'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Heart, ShoppingCart } from 'lucide-react';
import { toast } from 'sonner';
import { allProducts } from '@/data/products';
import ProductCard from '@/components/shared/ProductCard';

export default function WishlistPage() {
  const [items, setItems] = useState(allProducts.slice(2, 10));

  const removeItem = (id: string) => {
    setItems(prev => prev.filter(p => p.id !== id));
    toast.success('Removed from wishlist');
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-accent flex items-center justify-center">
        <div className="text-center">
          <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h2 className="font-display text-3xl text-gray-900 mb-3">Your wishlist is empty</h2>
          <p className="text-gray-500 mb-8">Save products you love for later</p>
          <Link href="/shop" className="btn-primary px-8 py-3">Explore Products</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-accent">
      <div className="bg-white border-b border-gray-100">
        <div className="container-custom py-6">
          <h1 className="font-display text-3xl text-gray-900">My Wishlist <span className="text-gray-400 text-xl font-sans">({items.length})</span></h1>
        </div>
      </div>

      <div className="container-custom py-8">
        <div className="flex justify-end mb-6">
          <button
            onClick={() => { toast.success('All items added to cart'); }}
            className="btn-primary flex items-center gap-2 px-6 py-3"
          >
            <ShoppingCart className="w-4 h-4" />
            Add All to Cart
          </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {items.map(product => (
            <div key={product.id} className="relative">
              <ProductCard product={product} />
              <button
                onClick={() => removeItem(product.id)}
                className="absolute top-2 right-2 w-7 h-7 bg-red-50 hover:bg-red-100 text-red-400 rounded-full flex items-center justify-center transition-colors z-10"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
