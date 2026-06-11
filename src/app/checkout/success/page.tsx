import Link from 'next/link';
import { CheckCircle, Package, Truck, MapPin, ArrowRight } from 'lucide-react';

export default function OrderSuccessPage() {
  const orderId = `HW${Math.floor(100000 + Math.random() * 900000)}`;

  return (
    <div className="min-h-screen bg-accent flex items-center justify-center py-16">
      <div className="container-custom max-w-2xl">
        <div className="bg-white rounded-3xl shadow-luxury-lg p-8 lg:p-12 text-center">
          {/* Success Icon */}
          <div className="relative w-24 h-24 mx-auto mb-6">
            <div className="absolute inset-0 bg-green-100 rounded-full animate-ping opacity-30" />
            <div className="relative w-24 h-24 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
          </div>

          <h1 className="font-display text-4xl text-gray-900 mb-3">Order Placed!</h1>
          <p className="text-gray-500 text-lg mb-2">Thank you for choosing Hikmat Wellness</p>
          <p className="text-gray-400 text-sm mb-8">
            A confirmation email has been sent to your registered email address.
          </p>

          {/* Order ID */}
          <div className="bg-primary/5 border border-primary/10 rounded-2xl p-5 mb-8">
            <div className="text-sm text-gray-500 mb-1">Order ID</div>
            <div className="font-bold text-2xl text-primary tracking-wider">#HW{Math.floor(100000 + Math.random() * 900000)}</div>
            <div className="text-xs text-gray-400 mt-2">Estimated delivery: 3-5 business days</div>
          </div>

          {/* Tracking Steps */}
          <div className="flex items-center justify-between mb-10">
            {[
              { icon: CheckCircle, label: 'Confirmed', done: true },
              { icon: Package, label: 'Processing', done: true },
              { icon: Truck, label: 'Shipped', done: false },
              { icon: MapPin, label: 'Delivered', done: false },
            ].map(({ icon: Icon, label, done }, i) => (
              <div key={label} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${done ? 'bg-primary text-white' : 'bg-gray-100 text-gray-400'}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className={`text-xs mt-2 font-medium ${done ? 'text-primary' : 'text-gray-400'}`}>{label}</span>
                </div>
                {i < 3 && (
                  <div className={`h-0.5 w-12 sm:w-20 mx-1 ${done && i < 1 ? 'bg-primary' : 'bg-gray-200'}`} />
                )}
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/account" className="btn-primary px-8 py-3 flex items-center gap-2">
              <Package className="w-4 h-4" />
              Track Order
            </Link>
            <Link href="/shop" className="btn-secondary px-8 py-3 flex items-center gap-2">
              Continue Shopping
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <p className="text-xs text-gray-400 mt-6">
            Need help? <Link href="/contact" className="text-primary hover:underline">Contact Support</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
