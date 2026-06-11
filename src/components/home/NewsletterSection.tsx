"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, ArrowRight, CheckCircle } from "lucide-react";
import { toast } from "sonner";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    toast.success("Welcome to the Hikmat family!", {
      description: "You'll receive your first wellness guide shortly.",
    });
  };

  return (
    <section className="section-sm bg-accent">
      <div className="container-custom">
        <div className="bg-gradient-to-br from-primary-500 to-primary-700 rounded-3xl p-8 lg:p-14 relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-secondary/10 rounded-full translate-y-1/2 -translate-x-1/2" />

          <div className="relative max-w-2xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-5">
                <Mail className="text-white" size={28} />
              </div>
              <h2 className="font-display text-3xl lg:text-4xl font-bold text-white mb-3">
                Join 200,000+ Wellness Seekers
              </h2>
              <p className="text-white/70 text-base mb-8">
                Get weekly Ayurvedic health tips, product launches, exclusive discounts, and seasonal wellness guides — straight to your inbox.
              </p>

              {subscribed ? (
                <div className="flex items-center justify-center gap-3 bg-white/10 rounded-2xl py-4 px-6">
                  <CheckCircle className="text-green-300" size={24} />
                  <span className="text-white font-semibold">
                    You're subscribed! Check your inbox for a welcome gift 🎁
                  </span>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex gap-3 flex-col sm:flex-row">
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 px-5 py-3.5 bg-white/10 border border-white/20 text-white placeholder-white/40 rounded-xl focus:outline-none focus:border-white/60 transition-colors text-sm"
                    required
                  />
                  <button
                    type="submit"
                    className="flex items-center justify-center gap-2 bg-secondary hover:bg-secondary-600 text-white px-7 py-3.5 rounded-xl font-semibold text-sm transition-all duration-300 hover:shadow-gold whitespace-nowrap"
                  >
                    Subscribe Free
                    <ArrowRight size={16} />
                  </button>
                </form>
              )}

              <p className="text-white/40 text-xs mt-4">
                No spam, ever. Unsubscribe in one click. By subscribing, you agree to our Privacy Policy.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
