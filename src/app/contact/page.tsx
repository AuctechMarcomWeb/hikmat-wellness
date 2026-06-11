'use client';

import { useState } from 'react';
import { Metadata } from 'next';
import { MapPin, Phone, Mail, Clock, MessageCircle, ChevronDown, Send, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

const faqs = [
  { q: 'What is your return policy?', a: 'We offer a 7-day hassle-free return policy for all products. If you\'re not satisfied, contact us and we\'ll arrange a pickup and full refund.' },
  { q: 'How can I track my order?', a: 'Once your order is shipped, you\'ll receive an SMS and email with a tracking link. You can also track from your account dashboard.' },
  { q: 'Are your products 100% natural?', a: 'Yes, all our products are made from natural, plant-based ingredients sourced from certified organic farms across India.' },
  { q: 'Do you offer consultations?', a: 'Yes, we have a panel of 50+ certified Ayurvedic doctors available for online consultations. Book through our Consultation page.' },
  { q: 'How long does delivery take?', a: 'Standard delivery takes 3-5 business days. Express delivery (1-2 days) is available for metro cities at an additional charge.' },
];

export default function ContactPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    toast.success('Message sent! We\'ll respond within 24 hours.');
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-20">
        <div className="container-custom text-center">
          <span className="text-secondary font-semibold text-sm tracking-widest uppercase">Get In Touch</span>
          <h1 className="font-display text-5xl mt-4 mb-4">We&apos;re Here to Help</h1>
          <p className="text-white/80 text-lg max-w-xl mx-auto">
            Questions about products, orders, or health concerns? Our team is available 24/7.
          </p>
        </div>
      </section>

      {/* Quick Contact Cards */}
      <div className="bg-white shadow-sm">
        <div className="container-custom py-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: Phone, title: 'Call Us', value: '+91 1800 123 4567', sub: 'Toll-free, 24/7', color: 'text-blue-600', bg: 'bg-blue-50' },
              { icon: Mail, title: 'Email Us', value: 'support@hikmatwellness.in', sub: 'Reply within 24 hours', color: 'text-primary', bg: 'bg-primary/5' },
              { icon: MessageCircle, title: 'WhatsApp', value: '+91 98765 43210', sub: 'Quick responses', color: 'text-green-600', bg: 'bg-green-50' },
              { icon: Clock, title: 'Business Hours', value: '9 AM – 9 PM', sub: 'Mon–Sat (IST)', color: 'text-orange-600', bg: 'bg-orange-50' },
            ].map(({ icon: Icon, title, value, sub, color, bg }) => (
              <div key={title} className="flex items-center gap-4 p-4 rounded-2xl border border-gray-100 hover:shadow-luxury transition-all">
                <div className={`w-12 h-12 ${bg} rounded-xl flex items-center justify-center flex-shrink-0`}>
                  <Icon className={`w-5 h-5 ${color}`} />
                </div>
                <div>
                  <div className="text-xs text-gray-500 font-medium">{title}</div>
                  <div className="font-semibold text-gray-900 text-sm">{value}</div>
                  <div className="text-xs text-gray-400">{sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container-custom py-16">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <div>
            <h2 className="font-display text-3xl text-gray-900 mb-2">Send Us a Message</h2>
            <p className="text-gray-500 mb-8">Fill out the form and our team will respond within 24 hours.</p>

            {submitted ? (
              <div className="text-center py-16">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-10 h-10 text-green-600" />
                </div>
                <h3 className="font-display text-2xl text-gray-900 mb-3">Message Sent!</h3>
                <p className="text-gray-600 mb-6">Thank you for reaching out. We&apos;ll get back to you within 24 hours.</p>
                <button onClick={() => setSubmitted(false)} className="btn-primary px-8 py-3">
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={e => setForm({ ...form, name: e.target.value })}
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors text-gray-900"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={e => setForm({ ...form, phone: e.target.value })}
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors text-gray-900"
                      placeholder="+91 98765 43210"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors text-gray-900"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Subject *</label>
                  <select
                    required
                    value={form.subject}
                    onChange={e => setForm({ ...form, subject: e.target.value })}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors text-gray-900"
                  >
                    <option value="">Select a topic</option>
                    <option value="order">Order & Delivery</option>
                    <option value="product">Product Enquiry</option>
                    <option value="health">Health Consultation</option>
                    <option value="return">Returns & Refunds</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Message *</label>
                  <textarea
                    required
                    rows={5}
                    value={form.message}
                    onChange={e => setForm({ ...form, message: e.target.value })}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors text-gray-900 resize-none"
                    placeholder="Describe your query in detail..."
                  />
                </div>
                <button type="submit" className="btn-primary w-full py-4 flex items-center justify-center gap-2">
                  <Send className="w-4 h-4" />
                  Send Message
                </button>
              </form>
            )}
          </div>

          {/* Map & Office Info */}
          <div className="space-y-8">
            {/* Map Placeholder */}
            <div className="relative h-64 bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl overflow-hidden border border-gray-100 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-10 h-10 text-primary mx-auto mb-3" />
                <div className="font-semibold text-gray-900">Hikmat Wellness HQ</div>
                <div className="text-gray-500 text-sm mt-1">Connaught Place, New Delhi – 110001</div>
                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-4 text-primary text-sm font-medium hover:underline"
                >
                  Open in Google Maps →
                </a>
              </div>
            </div>

            {/* Office Details */}
            <div className="card-luxury p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Registered Office</h3>
              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <span>123 Ayurvedic Complex, Connaught Place,<br />New Delhi – 110001, India</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-primary flex-shrink-0" />
                  <span>+91 1800 123 4567 (Toll Free)</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-primary flex-shrink-0" />
                  <span>info@hikmatwellness.in</span>
                </div>
              </div>
            </div>

            {/* WhatsApp CTA */}
            <a
              href="https://wa.me/919876543210"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-5 bg-green-50 border border-green-200 rounded-2xl hover:shadow-md transition-all group"
            >
              <div className="w-14 h-14 bg-green-500 rounded-xl flex items-center justify-center flex-shrink-0">
                <MessageCircle className="w-7 h-7 text-white" />
              </div>
              <div className="flex-1">
                <div className="font-semibold text-gray-900">Chat on WhatsApp</div>
                <div className="text-gray-500 text-sm">Typically replies within minutes</div>
              </div>
              <span className="text-green-600 font-semibold text-sm group-hover:translate-x-1 transition-transform">Chat Now →</span>
            </a>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-20">
          <h2 className="font-display text-3xl text-gray-900 text-center mb-10">Frequently Asked Questions</h2>
          <div className="max-w-2xl mx-auto space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="border border-gray-200 rounded-2xl overflow-hidden">
                <button
                  className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50 transition-colors"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span className="font-medium text-gray-900">{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform flex-shrink-0 ml-4 ${openFaq === i ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-5">
                    <p className="text-gray-600 text-sm leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
