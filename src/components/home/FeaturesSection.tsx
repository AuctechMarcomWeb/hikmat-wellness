"use client";

import { motion } from "framer-motion";
import { Shield, Award, Truck, Stethoscope, Leaf, Star, FlaskConical, HeartHandshake } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "100% Authentic",
    description: "Every product is QR-code verified and sourced directly from licensed manufacturers.",
    color: "bg-green-50 text-primary-500",
  },
  {
    icon: Award,
    title: "GMP Certified",
    description: "Manufactured at WHO-GMP certified facilities following pharmaceutical-grade standards.",
    color: "bg-yellow-50 text-secondary",
  },
  {
    icon: Truck,
    title: "Express Delivery",
    description: "Same-day dispatch on orders before 3 PM. Pan India delivery in 2-5 business days.",
    color: "bg-blue-50 text-blue-500",
  },
  {
    icon: Stethoscope,
    title: "Doctor Consultation",
    description: "Consult certified Ayurvedic and Unani physicians online for personalized health guidance.",
    color: "bg-purple-50 text-purple-500",
  },
  {
    icon: Leaf,
    title: "Natural Ingredients",
    description: "Wild-crafted and organically sourced herbs with no artificial additives or chemicals.",
    color: "bg-emerald-50 text-emerald-500",
  },
  {
    icon: FlaskConical,
    title: "Lab Tested",
    description: "Every batch is tested at NABL-accredited labs for purity, potency, and safety.",
    color: "bg-indigo-50 text-indigo-500",
  },
  {
    icon: Star,
    title: "4.8★ Trusted",
    description: "Over 2 million satisfied customers with verified reviews across all products.",
    color: "bg-orange-50 text-orange-500",
  },
  {
    icon: HeartHandshake,
    title: "30-Day Guarantee",
    description: "Not satisfied? Full refund within 30 days — no questions asked.",
    color: "bg-rose-50 text-rose-500",
  },
];

export default function FeaturesSection() {
  return (
    <section className="section bg-white">
      <div className="container-custom">
        <div className="text-center mb-14">
          <p className="text-xs font-bold tracking-widest text-secondary uppercase mb-3">
            Why Hikmat Wellness
          </p>
          <h2 className="font-display text-3xl lg:text-5xl font-bold text-gray-900">
            The Hikmat <span className="gradient-text">Difference</span>
          </h2>
          <p className="mt-4 text-gray-500 text-lg max-w-2xl mx-auto">
            We combine centuries of traditional wisdom with modern quality standards to deliver wellness you can trust.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                className="group p-6 rounded-2xl border border-gray-100 hover:border-primary-200 hover:shadow-luxury transition-all duration-300"
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${feature.color} transition-transform duration-300 group-hover:scale-110`}>
                  <Icon size={24} />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2 text-sm lg:text-base">
                  {feature.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
