'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { User, Package, Heart, MapPin, Settings, LogOut, ChevronRight, Star, Clock, CheckCircle, Bell } from 'lucide-react';
import { allProducts } from '@/data/products';
import { toast } from 'sonner';

const mockOrders = [
  { id: 'HW123456', date: '5 Jun 2026', status: 'Delivered', total: 1299, items: 2 },
  { id: 'HW123455', date: '28 May 2026', status: 'In Transit', total: 899, items: 1 },
  { id: 'HW123440', date: '15 May 2026', status: 'Delivered', total: 2450, items: 3 },
];

const navItems = [
  { id: 'overview', icon: User, label: 'Overview' },
  { id: 'orders', icon: Package, label: 'My Orders' },
  { id: 'wishlist', icon: Heart, label: 'Wishlist' },
  { id: 'addresses', icon: MapPin, label: 'Addresses' },
  { id: 'settings', icon: Settings, label: 'Settings' },
];

const wishlistProducts = allProducts.slice(5, 9);

const statusColor: Record<string, string> = {
  Delivered: 'bg-green-100 text-green-700',
  'In Transit': 'bg-blue-100 text-blue-700',
  Processing: 'bg-yellow-100 text-yellow-700',
  Cancelled: 'bg-red-100 text-red-700',
};

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-accent">
      <div className="container-custom py-8">
        <div className="grid lg:grid-cols-[260px_1fr] gap-8">
          {/* Sidebar */}
          <div className="space-y-4">
            <div className="bg-white rounded-2xl p-5 shadow-card">
              <div className="flex items-center gap-4 mb-5">
                <div className="w-14 h-14 bg-primary rounded-full flex items-center justify-center text-white text-xl font-bold">
                  A
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Arjun Sharma</div>
                  <div className="text-sm text-gray-500">arjun@email.com</div>
                  <div className="text-xs text-primary font-medium mt-0.5">Premium Member</div>
                </div>
              </div>
              <nav className="space-y-1">
                {navItems.map(({ id, icon: Icon, label }) => (
                  <button
                    key={id}
                    onClick={() => setActiveTab(id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                      activeTab === id ? 'bg-primary text-white' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {label}
                    {activeTab !== id && <ChevronRight className="w-3 h-3 ml-auto text-gray-300" />}
                  </button>
                ))}
                <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 transition-all">
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="space-y-6">
            {activeTab === 'overview' && (
              <>
                {/* Stats */}
                <div className="grid sm:grid-cols-3 gap-4">
                  {[
                    { label: 'Total Orders', value: '12', icon: Package, color: 'text-primary', bg: 'bg-primary/10' },
                    { label: 'Wishlist Items', value: '8', icon: Heart, color: 'text-red-500', bg: 'bg-red-50' },
                    { label: 'Reviews Given', value: '5', icon: Star, color: 'text-secondary-600', bg: 'bg-secondary/10' },
                  ].map(({ label, value, icon: Icon, color, bg }) => (
                    <div key={label} className="bg-white rounded-2xl p-5 shadow-card text-center">
                      <div className={`w-12 h-12 ${bg} rounded-2xl flex items-center justify-center mx-auto mb-3`}>
                        <Icon className={`w-6 h-6 ${color}`} />
                      </div>
                      <div className="font-display text-3xl font-bold text-gray-900">{value}</div>
                      <div className="text-sm text-gray-500 mt-1">{label}</div>
                    </div>
                  ))}
                </div>

                {/* Recent Orders */}
                <div className="bg-white rounded-2xl p-6 shadow-card">
                  <div className="flex items-center justify-between mb-5">
                    <h3 className="font-semibold text-gray-900">Recent Orders</h3>
                    <button onClick={() => setActiveTab('orders')} className="text-primary text-sm hover:underline">View all</button>
                  </div>
                  <div className="space-y-3">
                    {mockOrders.map(order => (
                      <div key={order.id} className="flex items-center justify-between p-4 bg-accent rounded-xl">
                        <div>
                          <div className="font-medium text-gray-900 text-sm">#{order.id}</div>
                          <div className="text-xs text-gray-500">{order.date} · {order.items} items</div>
                        </div>
                        <div className="text-right">
                          <span className={`text-xs px-2 py-1 rounded-full font-medium ${statusColor[order.status]}`}>
                            {order.status}
                          </span>
                          <div className="text-sm font-semibold text-primary mt-1">₹{order.total.toLocaleString()}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            {activeTab === 'orders' && (
              <div className="bg-white rounded-2xl p-6 shadow-card">
                <h2 className="font-semibold text-gray-900 mb-6 text-lg">My Orders</h2>
                <div className="space-y-4">
                  {mockOrders.map(order => (
                    <div key={order.id} className="border border-gray-100 rounded-2xl p-5">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <span className="font-semibold text-gray-900">#{order.id}</span>
                          <span className="text-gray-400 text-sm ml-3 flex items-center gap-1 inline-flex">
                            <Clock className="w-3 h-3" />{order.date}
                          </span>
                        </div>
                        <span className={`text-xs px-3 py-1 rounded-full font-semibold ${statusColor[order.status]}`}>
                          {order.status}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-gray-500">{order.items} item{order.items > 1 ? 's' : ''}</div>
                        <div className="flex items-center gap-3">
                          <span className="font-bold text-primary">₹{order.total.toLocaleString()}</span>
                          <button className="text-sm text-primary border border-primary/30 hover:bg-primary hover:text-white transition-all px-3 py-1.5 rounded-lg font-medium">
                            {order.status === 'Delivered' ? 'Reorder' : 'Track'}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'wishlist' && (
              <div className="bg-white rounded-2xl p-6 shadow-card">
                <h2 className="font-semibold text-gray-900 mb-6 text-lg">Wishlist ({wishlistProducts.length})</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {wishlistProducts.map(product => (
                    <div key={product.id} className="flex gap-3 p-4 border border-gray-100 rounded-xl">
                      <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-accent flex-shrink-0">
                        <Image src={product.thumbnail} alt={product.name} fill className="object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <Link href={`/product/${product.slug}`} className="font-medium text-gray-900 text-sm hover:text-primary transition-colors line-clamp-2">
                          {product.name}
                        </Link>
                        <div className="font-bold text-primary text-sm mt-1">₹{product.price}</div>
                        <button
                          onClick={() => toast.success('Added to cart')}
                          className="mt-2 text-xs bg-primary text-white px-3 py-1.5 rounded-lg hover:bg-primary-600 transition-colors"
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'addresses' && (
              <div className="bg-white rounded-2xl p-6 shadow-card">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-semibold text-gray-900 text-lg">Saved Addresses</h2>
                  <button className="btn-primary text-sm px-4 py-2">+ Add New</button>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    { type: 'Home', address: '12, Lajpat Nagar, New Delhi – 110024', default: true },
                    { type: 'Office', address: 'Block B, Connaught Place, New Delhi – 110001', default: false },
                  ].map(addr => (
                    <div key={addr.type} className={`p-5 rounded-2xl border-2 ${addr.default ? 'border-primary bg-primary/5' : 'border-gray-200'}`}>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-primary" />
                          <span className="font-semibold text-gray-900">{addr.type}</span>
                          {addr.default && <span className="text-xs bg-primary text-white px-2 py-0.5 rounded-full">Default</span>}
                        </div>
                        <button className="text-xs text-primary hover:underline">Edit</button>
                      </div>
                      <p className="text-sm text-gray-600">{addr.address}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="bg-white rounded-2xl p-6 shadow-card">
                <h2 className="font-semibold text-gray-900 mb-6 text-lg">Account Settings</h2>
                <div className="space-y-5">
                  {[
                    { label: 'Full Name', value: 'Arjun Sharma', type: 'text' },
                    { label: 'Email', value: 'arjun@email.com', type: 'email' },
                    { label: 'Phone', value: '+91 98765 43210', type: 'tel' },
                  ].map(field => (
                    <div key={field.label}>
                      <label className="block text-sm font-medium text-gray-700 mb-2">{field.label}</label>
                      <input
                        type={field.type}
                        defaultValue={field.value}
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-primary"
                      />
                    </div>
                  ))}
                  <div className="flex items-center justify-between py-3 border-y border-gray-100">
                    <div>
                      <div className="font-medium text-gray-900 text-sm">Email Notifications</div>
                      <div className="text-xs text-gray-500">Order updates and offers</div>
                    </div>
                    <div className="w-12 h-6 bg-primary rounded-full cursor-pointer relative">
                      <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 right-0.5 shadow" />
                    </div>
                  </div>
                  <button onClick={() => toast.success('Settings saved!')} className="btn-primary px-8 py-3">
                    Save Changes
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
