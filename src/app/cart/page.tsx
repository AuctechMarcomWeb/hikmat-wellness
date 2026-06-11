'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Trash2, Plus, Minus, ShoppingBag, ChevronRight, Tag, Truck, Shield, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';
import { allProducts } from '@/data/products';

const initialItems = allProducts.slice(0, 3).map(p => ({
  ...p,
  qty: 1,
  originalPrice: p.originalPrice || Math.round(p.price * 1.25),
}));

export default function CartPage() {
  const [items, setItems] = useState(initialItems);
  const [coupon, setCoupon] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);

  const updateQty = (id: string, delta: number) => {
    setItems(prev => prev.map(item =>
      item.id === id ? { ...item, qty: Math.max(1, item.qty + delta) } : item
    ).filter(item => item.qty > 0));
  };

  const removeItem = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
    toast.success('Item removed from cart');
  };

  const subtotal = items.reduce((sum, item) => sum + item.price * item.qty, 0);
  const savings = items.reduce((sum, item) => sum + (item.originalPrice - item.price) * item.qty, 0);
  const shipping = subtotal > 599 ? 0 : 49;
  const discount = appliedCoupon ? Math.round(subtotal * 0.1) : 0;
  const total = subtotal + shipping - discount;

  const applyCoupon = () => {
    if (coupon.toUpperCase() === 'HIKMAT10') {
      setAppliedCoupon(coupon);
      toast.success('Coupon applied! 10% off');
    } else {
      toast.error('Invalid coupon code');
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-accent flex items-center justify-center">
        <div className="text-center py-20">
          <ShoppingBag className="w-20 h-20 text-gray-300 mx-auto mb-6" />
          <h2 className="font-display text-3xl text-gray-900 mb-3">Your cart is empty</h2>
          <p className="text-gray-500 mb-8">Add products to your cart and they&apos;ll appear here.</p>
          <Link href="/shop" className="btn-primary px-8 py-4">Continue Shopping</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-accent">
      {/* Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="container-custom py-4">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-primary">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-gray-900 font-medium">Shopping Cart ({items.length} items)</span>
          </div>
        </div>
      </div>

      <div className="container-custom py-8">
        <div className="grid lg:grid-cols-[1fr_380px] gap-8">
          {/* Cart Items */}
          <div className="space-y-4">
            {/* Free shipping banner */}
            {shipping > 0 && (
              <div className="bg-primary/5 border border-primary/20 rounded-2xl p-4 flex items-center gap-3">
                <Truck className="w-5 h-5 text-primary flex-shrink-0" />
                <p className="text-sm text-primary">
                  Add <strong>₹{599 - subtotal}</strong> more to get <strong>FREE delivery</strong>
                </p>
              </div>
            )}
            {shipping === 0 && (
              <div className="bg-green-50 border border-green-200 rounded-2xl p-4 flex items-center gap-3">
                <Truck className="w-5 h-5 text-green-600 flex-shrink-0" />
                <p className="text-sm text-green-700 font-medium">🎉 You&apos;ve unlocked FREE delivery!</p>
              </div>
            )}

            {items.map(item => (
              <div key={item.id} className="bg-white rounded-2xl p-5 flex gap-4 shadow-card">
                <div className="relative w-24 h-24 flex-shrink-0 rounded-xl overflow-hidden bg-accent">
                  <Image src={item.thumbnail} alt={item.name} fill className="object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="text-xs text-primary font-medium capitalize">{item.category.replace('-', ' ')}</div>
                      <Link href={`/product/${item.slug}`} className="font-semibold text-gray-900 hover:text-primary transition-colors text-sm leading-snug line-clamp-2">
                        {item.name}
                      </Link>
                    </div>
                    <button onClick={() => removeItem(item.id)} className="text-gray-300 hover:text-red-400 transition-colors flex-shrink-0">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden">
                      <button onClick={() => updateQty(item.id, -1)} className="px-3 py-2 hover:bg-gray-50 transition-colors">
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="px-3 py-2 text-sm font-semibold border-x border-gray-200 min-w-[36px] text-center">
                        {item.qty}
                      </span>
                      <button onClick={() => updateQty(item.id, 1)} className="px-3 py-2 hover:bg-gray-50 transition-colors">
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-primary">₹{(item.price * item.qty).toLocaleString()}</div>
                      {item.originalPrice > item.price && (
                        <div className="text-xs text-gray-400 line-through">₹{(item.originalPrice * item.qty).toLocaleString()}</div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <div className="bg-white rounded-2xl p-5 shadow-card">
              <div className="flex items-center gap-2 text-sm font-medium text-green-700">
                <Shield className="w-4 h-4" />
                Secure checkout with 256-bit SSL encryption. Your data is always safe.
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="space-y-4">
            {/* Coupon */}
            <div className="bg-white rounded-2xl p-5 shadow-card">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Tag className="w-4 h-4 text-primary" />
                Apply Coupon
              </h3>
              {appliedCoupon ? (
                <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-xl">
                  <div>
                    <div className="font-semibold text-green-800 text-sm">{appliedCoupon.toUpperCase()}</div>
                    <div className="text-xs text-green-600">10% discount applied</div>
                  </div>
                  <button onClick={() => { setAppliedCoupon(null); setCoupon(''); }} className="text-red-400 text-xs hover:text-red-600">Remove</button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={coupon}
                    onChange={e => setCoupon(e.target.value)}
                    placeholder="Enter coupon code"
                    className="flex-1 border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-primary"
                  />
                  <button onClick={applyCoupon} className="btn-primary px-5 py-3 text-sm">Apply</button>
                </div>
              )}
              <p className="text-xs text-gray-400 mt-2">Try: HIKMAT10 for 10% off</p>
            </div>

            {/* Price Breakdown */}
            <div className="bg-white rounded-2xl p-5 shadow-card">
              <h3 className="font-semibold text-gray-900 mb-5">Order Summary</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal ({items.length} items)</span>
                  <span>₹{subtotal.toLocaleString()}</span>
                </div>
                {savings > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Product Savings</span>
                    <span>-₹{savings.toLocaleString()}</span>
                  </div>
                )}
                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Coupon Discount</span>
                    <span>-₹{discount.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between text-gray-600">
                  <span>Delivery</span>
                  <span className={shipping === 0 ? 'text-green-600 font-medium' : ''}>
                    {shipping === 0 ? 'FREE' : `₹${shipping}`}
                  </span>
                </div>
                <div className="pt-3 border-t border-gray-100 flex justify-between font-bold text-gray-900 text-base">
                  <span>Total</span>
                  <span className="text-primary">₹{total.toLocaleString()}</span>
                </div>
                {savings + discount > 0 && (
                  <div className="bg-green-50 rounded-xl p-3 text-xs text-green-700 font-medium text-center">
                    🎉 You&apos;re saving ₹{(savings + discount).toLocaleString()} on this order!
                  </div>
                )}
              </div>
              <Link href="/checkout">
                <button className="w-full btn-primary mt-5 py-4 flex items-center justify-center gap-2 text-base">
                  Proceed to Checkout
                  <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
              <Link href="/shop">
                <button className="w-full mt-3 text-primary text-sm hover:underline">
                  ← Continue Shopping
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
