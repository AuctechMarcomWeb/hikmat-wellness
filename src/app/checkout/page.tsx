'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ChevronRight, Lock, CreditCard, Smartphone, Banknote, Building, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';
import { allProducts } from '@/data/products';

const cartItems = allProducts.slice(0, 2).map(p => ({ ...p, qty: 1 }));
const subtotal = cartItems.reduce((s, i) => s + i.price, 0);

const paymentMethods = [
  { id: 'card', icon: CreditCard, label: 'Credit / Debit Card', desc: 'Visa, Mastercard, Rupay' },
  { id: 'upi', icon: Smartphone, label: 'UPI', desc: 'GPay, PhonePe, Paytm' },
  { id: 'netbanking', icon: Building, label: 'Net Banking', desc: 'All major banks' },
  { id: 'cod', icon: Banknote, label: 'Cash on Delivery', desc: '₹30 extra charge' },
];

export default function CheckoutPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [payMethod, setPayMethod] = useState('upi');
  const [placing, setPlacing] = useState(false);

  const [address, setAddress] = useState({
    name: '', phone: '', email: '', pincode: '', city: '', state: 'Delhi', address: '', landmark: ''
  });

  const handlePlaceOrder = () => {
    setPlacing(true);
    setTimeout(() => {
      router.push('/checkout/success');
    }, 1500);
  };

  if (step === 1) {
    return (
      <div className="min-h-screen bg-accent">
        <div className="bg-white border-b border-gray-100">
          <div className="container-custom py-4">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Link href="/cart" className="hover:text-primary">Cart</Link>
              <ChevronRight className="w-3 h-3" />
              <span className="text-gray-900 font-medium">Delivery Address</span>
            </div>
          </div>
        </div>

        <div className="container-custom py-8">
          <div className="grid lg:grid-cols-[1fr_360px] gap-8">
            {/* Address Form */}
            <div className="bg-white rounded-2xl p-6 shadow-card">
              <h2 className="font-display text-2xl text-gray-900 mb-6">Delivery Details</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { key: 'name', label: 'Full Name', placeholder: 'Your full name', type: 'text' },
                  { key: 'phone', label: 'Mobile Number', placeholder: '10-digit number', type: 'tel' },
                  { key: 'email', label: 'Email Address', placeholder: 'your@email.com', type: 'email', span: true },
                  { key: 'address', label: 'Address', placeholder: 'House no, Street, Area', type: 'text', span: true },
                  { key: 'landmark', label: 'Landmark (Optional)', placeholder: 'Near...', type: 'text', span: true },
                  { key: 'pincode', label: 'Pincode', placeholder: '110001', type: 'text' },
                  { key: 'city', label: 'City', placeholder: 'New Delhi', type: 'text' },
                ].map(field => (
                  <div key={field.key} className={field.span ? 'sm:col-span-2' : ''}>
                    <label className="block text-sm font-medium text-gray-700 mb-2">{field.label}</label>
                    <input
                      type={field.type}
                      value={address[field.key as keyof typeof address]}
                      onChange={e => setAddress({ ...address, [field.key]: e.target.value })}
                      placeholder={field.placeholder}
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary text-gray-900 transition-colors"
                    />
                  </div>
                ))}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
                  <select
                    value={address.state}
                    onChange={e => setAddress({ ...address, state: e.target.value })}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-primary text-gray-900"
                  >
                    {['Delhi', 'Maharashtra', 'Karnataka', 'Tamil Nadu', 'Gujarat', 'Rajasthan', 'Uttar Pradesh', 'West Bengal'].map(s => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>
                </div>
              </div>
              <button onClick={() => setStep(2)} className="btn-primary w-full mt-6 py-4">
                Continue to Payment →
              </button>
            </div>

            {/* Order Summary */}
            <div className="space-y-4">
              <div className="bg-white rounded-2xl p-5 shadow-card">
                <h3 className="font-semibold text-gray-900 mb-4">Order Summary</h3>
                {cartItems.map(item => (
                  <div key={item.id} className="flex gap-3 mb-3 pb-3 border-b border-gray-100 last:border-0 last:mb-0 last:pb-0">
                    <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-accent flex-shrink-0">
                      <Image src={item.thumbnail} alt={item.name} fill className="object-cover" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-gray-900 line-clamp-1">{item.name}</div>
                      <div className="text-xs text-gray-500">Qty: {item.qty}</div>
                    </div>
                    <div className="font-semibold text-primary text-sm">₹{item.price}</div>
                  </div>
                ))}
                <div className="pt-3 border-t border-gray-100 space-y-2 text-sm">
                  <div className="flex justify-between text-gray-600"><span>Subtotal</span><span>₹{subtotal}</span></div>
                  <div className="flex justify-between text-green-600"><span>Delivery</span><span>FREE</span></div>
                  <div className="flex justify-between font-bold text-gray-900 text-base pt-2 border-t border-gray-100">
                    <span>Total</span><span className="text-primary">₹{subtotal}</span>
                  </div>
                </div>
              </div>
              <div className="bg-primary/5 rounded-2xl p-4 flex items-center gap-3 text-sm text-primary">
                <Lock className="w-4 h-4 flex-shrink-0" />
                <span>256-bit SSL encrypted & secure checkout</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-accent">
      <div className="bg-white border-b border-gray-100">
        <div className="container-custom py-4">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Link href="/cart" className="hover:text-primary">Cart</Link>
            <ChevronRight className="w-3 h-3" />
            <button onClick={() => setStep(1)} className="hover:text-primary">Address</button>
            <ChevronRight className="w-3 h-3" />
            <span className="text-gray-900 font-medium">Payment</span>
          </div>
        </div>
      </div>

      <div className="container-custom py-8">
        <div className="grid lg:grid-cols-[1fr_360px] gap-8">
          <div className="space-y-4">
            <div className="bg-white rounded-2xl p-6 shadow-card">
              <h2 className="font-display text-2xl text-gray-900 mb-6">Choose Payment Method</h2>
              <div className="space-y-3">
                {paymentMethods.map(({ id, icon: Icon, label, desc }) => (
                  <label
                    key={id}
                    className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                      payMethod === id ? 'border-primary bg-primary/5' : 'border-gray-200 hover:border-primary/30'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value={id}
                      checked={payMethod === id}
                      onChange={() => setPayMethod(id)}
                      className="accent-primary w-4 h-4"
                    />
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${payMethod === id ? 'bg-primary text-white' : 'bg-gray-100 text-gray-500'}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">{label}</div>
                      <div className="text-xs text-gray-500">{desc}</div>
                    </div>
                  </label>
                ))}
              </div>

              {payMethod === 'card' && (
                <div className="mt-6 space-y-4 p-4 bg-gray-50 rounded-2xl">
                  <input type="text" placeholder="Card Number" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-primary" />
                  <div className="grid grid-cols-2 gap-4">
                    <input type="text" placeholder="MM / YY" className="border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-primary" />
                    <input type="text" placeholder="CVV" className="border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-primary" />
                  </div>
                  <input type="text" placeholder="Card Holder Name" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-primary" />
                </div>
              )}

              {payMethod === 'upi' && (
                <div className="mt-6 p-4 bg-gray-50 rounded-2xl">
                  <input type="text" placeholder="Enter UPI ID (e.g. name@upi)" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-primary" />
                  <p className="text-xs text-gray-400 mt-2">Enter your UPI ID to pay directly from your bank</p>
                </div>
              )}

              <button
                onClick={handlePlaceOrder}
                disabled={placing}
                className="btn-primary w-full mt-6 py-4 flex items-center justify-center gap-2 disabled:opacity-70"
              >
                {placing ? (
                  <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />Processing...</>
                ) : (
                  <><Lock className="w-4 h-4" />Place Order — ₹{subtotal.toLocaleString()}</>
                )}
              </button>
            </div>
          </div>

          {/* Summary */}
          <div className="space-y-4">
            <div className="bg-white rounded-2xl p-5 shadow-card">
              <h3 className="font-semibold text-gray-900 mb-4">Order Summary</h3>
              {cartItems.map(item => (
                <div key={item.id} className="flex gap-3 mb-3 pb-3 border-b border-gray-100 last:border-0 last:mb-0 last:pb-0">
                  <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-accent flex-shrink-0">
                    <Image src={item.thumbnail} alt={item.name} fill className="object-cover" />
                  </div>
                  <div className="flex-1">
                    <div className="text-xs font-medium text-gray-900 line-clamp-2">{item.name}</div>
                  </div>
                  <span className="font-semibold text-primary text-sm">₹{item.price}</span>
                </div>
              ))}
              <div className="flex justify-between font-bold text-gray-900 mt-3 pt-3 border-t border-gray-100">
                <span>Total</span>
                <span className="text-primary">₹{subtotal.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
