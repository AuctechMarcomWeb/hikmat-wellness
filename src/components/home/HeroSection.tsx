"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Star, ArrowRight, Shield, Leaf, Award, ChevronDown } from "lucide-react";

const stats = [
  { value: "500+", label: "Authentic Products" },
  { value: "2M+", label: "Happy Customers" },
  { value: "50+", label: "Expert Doctors" },
  { value: "25+", label: "Years of Trust" },
];

const trustPills = [
  { icon: Shield, label: "AYUSH Approved" },
  { icon: Leaf, label: "100% Natural" },
  { icon: Award, label: "GMP Certified" },
  { icon: Star, label: "4.8★ Rated" },
];

export default function HeroSection() {
  return (
    <section className="relative min-h-[90vh] lg:min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.6) 1px, transparent 0)`,
          backgroundSize: "40px 40px"
        }} />
      </div>

      {/* Decorative Circles */}
      <div className="absolute top-20 right-20 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-10 w-72 h-72 bg-secondary/10 rounded-full blur-3xl" />

      <div className="container-custom relative z-10 pt-16 pb-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div>
            {/* Trust Pills */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-wrap gap-2 mb-8"
            >
              {trustPills.map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-1.5 bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 text-xs font-medium px-3 py-1.5 rounded-full">
                  <Icon size={12} />
                  {label}
                </div>
              ))}
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-[1.1] tracking-tight mb-6"
            >
              Ancient Wisdom.
              <br />
              <span className="text-secondary">Modern Wellness.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-white/80 text-lg lg:text-xl leading-relaxed mb-10 max-w-lg"
            >
              India's most trusted Ayurvedic & Unani wellness destination. 500+ authentic products, expert doctor consultations, and science-backed herbal health solutions.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap gap-4 mb-12"
            >
              <Link
                href="/shop"
                className="flex items-center gap-2 bg-white text-primary-600 px-7 py-3.5 rounded-xl font-semibold text-sm hover:bg-accent transition-all duration-300 hover:shadow-luxury-lg hover:-translate-y-0.5 active:translate-y-0"
              >
                Shop All Products
                <ArrowRight size={16} />
              </Link>
              <Link
                href="/consultation"
                className="flex items-center gap-2 bg-secondary text-white px-7 py-3.5 rounded-xl font-semibold text-sm hover:bg-secondary-600 transition-all duration-300 hover:shadow-gold hover:-translate-y-0.5"
              >
                <Star size={16} />
                Free Consultation
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="grid grid-cols-4 gap-4 sm:gap-6"
            >
              {stats.map(({ value, label }) => (
                <div key={label}>
                  <div className="text-2xl sm:text-3xl font-display font-bold text-white">{value}</div>
                  <div className="text-white/60 text-xs leading-tight">{label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right — Hero Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            {/* Main Image Card */}
            <div className="relative rounded-3xl overflow-hidden aspect-[4/5] max-w-md mx-auto lg:mx-0 shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=800&q=80"
                alt="Premium Ayurvedic Products"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-900/60 via-transparent to-transparent" />

              {/* Floating Card 1 */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-6 right-6 bg-white/95 backdrop-blur-sm rounded-2xl p-3.5 shadow-luxury"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                    <Leaf className="text-primary-500" size={20} />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-gray-900">100% Organic</div>
                    <div className="text-[10px] text-gray-500">No Chemicals</div>
                  </div>
                </div>
              </motion.div>

              {/* Floating Card 2 */}
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-sm rounded-2xl p-3.5 shadow-luxury"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 bg-yellow-100 rounded-xl flex items-center justify-center">
                    <Star className="text-secondary fill-secondary" size={20} />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-gray-900">4.8/5 Rating</div>
                    <div className="text-[10px] text-gray-500">2M+ Reviews</div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-secondary/20 rounded-full blur-2xl" />
            <div className="absolute -bottom-6 -right-6 w-40 h-40 bg-white/10 rounded-full blur-2xl" />
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/40 flex flex-col items-center gap-1"
      >
        <span className="text-[10px] uppercase tracking-widest">Scroll</span>
        <ChevronDown size={16} />
      </motion.div>
    </section>
  );
}
