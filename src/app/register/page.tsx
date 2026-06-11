'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Eye, EyeOff, Lock, Mail, User, Phone, Leaf, CheckCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export default function RegisterPage() {
  const router = useRouter();
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', agree: false });

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.agree) { toast.error('Please accept terms'); return; }
    setLoading(true);
    setTimeout(() => {
      toast.success('Account created! Welcome to Hikmat Wellness');
      router.push('/account');
    }, 1200);
  };

  const benefits = [
    'Free consultations worth ₹500',
    'Exclusive member discounts',
    'Order tracking & history',
    'Personalized health recommendations',
  ];

  return (
    <div className="min-h-screen bg-accent flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-4xl grid md:grid-cols-2 gap-8 items-start">
        {/* Benefits */}
        <div className="hidden md:block">
          <Link href="/" className="inline-flex items-center gap-2 mb-8">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
              <Leaf className="w-5 h-5 text-white" />
            </div>
            <span className="font-display text-2xl text-primary font-bold">Hikmat Wellness</span>
          </Link>
          <h2 className="font-display text-4xl text-gray-900 mb-4">
            Join 2 Million+<br />Health-Conscious Indians
          </h2>
          <p className="text-gray-600 mb-8">Create your free account and get exclusive access to authentic Ayurvedic wellness.</p>
          <div className="space-y-4">
            {benefits.map(b => (
              <div key={b} className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="text-gray-700">{b}</span>
              </div>
            ))}
          </div>
          <div className="mt-8 p-5 bg-primary/5 border border-primary/10 rounded-2xl">
            <div className="text-sm font-medium text-primary">🎁 Welcome Gift</div>
            <div className="font-semibold text-gray-900 mt-1">Get ₹100 off your first order!</div>
            <div className="text-xs text-gray-500 mt-0.5">Code: WELCOME100 (auto-applied at checkout)</div>
          </div>
        </div>

        {/* Form */}
        <div>
          <div className="text-center mb-6 md:hidden">
            <Link href="/" className="inline-flex items-center gap-2">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                <Leaf className="w-5 h-5 text-white" />
              </div>
              <span className="font-display text-2xl text-primary font-bold">Hikmat</span>
            </Link>
          </div>
          <div className="bg-white rounded-3xl shadow-luxury p-8">
            <h1 className="font-display text-2xl text-gray-900 mb-6">Create Your Account</h1>
            <form onSubmit={handleRegister} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input type="text" required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                    className="w-full pl-11 pr-4 py-3.5 border border-gray-200 rounded-xl outline-none focus:border-primary text-gray-900 transition-colors"
                    placeholder="Your full name" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input type="email" required value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
                    className="w-full pl-11 pr-4 py-3.5 border border-gray-200 rounded-xl outline-none focus:border-primary text-gray-900 transition-colors"
                    placeholder="your@email.com" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input type="tel" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })}
                    className="w-full pl-11 pr-4 py-3.5 border border-gray-200 rounded-xl outline-none focus:border-primary text-gray-900 transition-colors"
                    placeholder="+91 98765 43210" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input type={showPass ? 'text' : 'password'} required value={form.password} onChange={e => setForm({ ...form, password: e.target.value })}
                    className="w-full pl-11 pr-11 py-3.5 border border-gray-200 rounded-xl outline-none focus:border-primary text-gray-900 transition-colors"
                    placeholder="Min 8 characters" />
                  <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                    {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              <label className="flex items-start gap-3 cursor-pointer">
                <input type="checkbox" checked={form.agree} onChange={e => setForm({ ...form, agree: e.target.checked })}
                  className="mt-0.5 accent-primary" />
                <span className="text-sm text-gray-600">
                  I agree to the{' '}
                  <Link href="#" className="text-primary hover:underline">Terms of Service</Link>
                  {' '}and{' '}
                  <Link href="#" className="text-primary hover:underline">Privacy Policy</Link>
                </span>
              </label>
              <button type="submit" disabled={loading} className="btn-primary w-full py-4 text-base flex items-center justify-center gap-2 disabled:opacity-70">
                {loading ? <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />Creating account...</> : 'Create Account'}
              </button>
            </form>
            <p className="text-center text-sm text-gray-500 mt-5">
              Already have an account?{' '}
              <Link href="/login" className="text-primary font-semibold hover:underline">Sign in</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
