"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { testimonials } from "@/data/index";
import SectionHeader from "@/components/shared/SectionHeader";

export default function TestimonialsSection() {
  return (
    <section className="section bg-primary-500 overflow-hidden relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.8) 1px, transparent 0)`,
          backgroundSize: "32px 32px"
        }} />
      </div>

      <div className="container-custom relative">
        <div className="text-center mb-14">
          <p className="text-xs font-bold tracking-widest text-secondary uppercase mb-3">
            Real Stories
          </p>
          <h2 className="font-display text-3xl lg:text-5xl font-bold text-white">
            Transformations That{" "}
            <span className="text-secondary">Inspire</span>
          </h2>
          <p className="mt-4 text-white/70 text-lg max-w-2xl mx-auto">
            Over 2 million customers have experienced the Hikmat difference. Here are some of their stories.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-5 hover:bg-white/15 transition-colors"
            >
              {/* Quote Icon */}
              <Quote size={24} className="text-secondary mb-3 opacity-80" />

              {/* Rating */}
              <div className="flex items-center gap-0.5 mb-3">
                {[...Array(5)].map((_, j) => (
                  <Star
                    key={j}
                    size={13}
                    className={j < t.rating ? "fill-secondary text-secondary" : "text-white/20 fill-current"}
                  />
                ))}
              </div>

              {/* Text */}
              <p className="text-white/90 text-sm leading-relaxed mb-4 line-clamp-4">
                "{t.text}"
              </p>

              {/* Product */}
              {t.product && (
                <p className="text-secondary text-xs font-medium mb-4 bg-secondary/10 px-2 py-1 rounded-full inline-block">
                  {t.product}
                </p>
              )}

              {/* User */}
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-white font-bold text-sm">
                  {t.name[0]}
                </div>
                <div>
                  <div className="text-white font-semibold text-sm">{t.name}</div>
                  <div className="text-white/50 text-xs flex items-center gap-1">
                    {t.location}
                    {t.verified && (
                      <span className="bg-green-400/20 text-green-300 text-[9px] font-bold px-1.5 py-0.5 rounded-full">
                        ✓ Verified
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Summary Stats */}
        <div className="mt-14 grid grid-cols-3 gap-6 text-center">
          {[
            { value: "2M+", label: "Happy Customers" },
            { value: "4.8/5", label: "Average Rating" },
            { value: "98%", label: "Would Recommend" },
          ].map(({ value, label }) => (
            <div key={label} className="border border-white/20 rounded-2xl p-6">
              <div className="font-display text-4xl font-bold text-white mb-1">{value}</div>
              <div className="text-white/60 text-sm">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
