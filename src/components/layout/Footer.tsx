import Link from "next/link";
import { Leaf, Phone, Mail, MapPin, Instagram, Twitter, Facebook, Youtube, Shield, Truck, Award, HeartHandshake } from "lucide-react";
import { categories } from "@/data/index";

const footerLinks = {
  company: [
    { label: "About Us", href: "/about" },
    { label: "Our Story", href: "/about#story" },
    { label: "Manufacturing", href: "/about#manufacturing" },
    { label: "Certifications", href: "/about#certifications" },
    { label: "Careers", href: "/careers" },
    { label: "Blog", href: "/blogs" },
  ],
  support: [
    { label: "Help Center", href: "/help" },
    { label: "Contact Us", href: "/contact" },
    { label: "Order Tracking", href: "/account/orders" },
    { label: "Returns & Refunds", href: "/returns" },
    { label: "Doctor Consultation", href: "/consultation" },
    { label: "Wholesale Enquiry", href: "/wholesale" },
  ],
  policies: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Return Policy", href: "/returns" },
    { label: "Shipping Policy", href: "/shipping" },
    { label: "Disclaimer", href: "/disclaimer" },
    { label: "Cookie Policy", href: "/cookies" },
  ],
};

const trustBadges = [
  { icon: Shield, label: "100% Authentic", desc: "Verified Products" },
  { icon: Award, label: "GMP Certified", desc: "Quality Assured" },
  { icon: Truck, label: "Fast Delivery", desc: "Pan India" },
  { icon: HeartHandshake, label: "Expert Support", desc: "Doctor Backed" },
];

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-300">
      {/* Trust Badges Strip */}
      <div className="border-b border-gray-800">
        <div className="container-custom py-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {trustBadges.map(({ icon: Icon, label, desc }) => (
              <div key={label} className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Icon size={20} className="text-primary-400" />
                </div>
                <div>
                  <div className="text-white font-semibold text-sm">{label}</div>
                  <div className="text-gray-500 text-xs">{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2.5 mb-5">
              <div className="w-10 h-10 bg-primary-500 rounded-xl flex items-center justify-center">
                <Leaf className="text-white" size={22} />
              </div>
              <div>
                <div className="font-display font-bold text-xl text-white leading-none">Hikmat</div>
                <div className="text-[10px] tracking-widest text-secondary uppercase font-semibold">Wellness</div>
              </div>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6 max-w-xs">
              Bridging 5000 years of Ayurvedic and Unani wisdom with modern science. Premium, authentic herbal products for every family.
            </p>
            <div className="space-y-2.5">
              <div className="flex items-center gap-2.5 text-sm text-gray-400">
                <Phone size={14} className="text-primary-400" />
                <span>+91-9876543210</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm text-gray-400">
                <Mail size={14} className="text-primary-400" />
                <span>support@hikmatwellness.com</span>
              </div>
              <div className="flex items-start gap-2.5 text-sm text-gray-400">
                <MapPin size={14} className="text-primary-400 mt-0.5 flex-shrink-0" />
                <span>123 Wellness Avenue, New Delhi – 110001, India</span>
              </div>
            </div>
            {/* Social Links */}
            <div className="flex items-center gap-3 mt-6">
              {[
                { Icon: Instagram, href: "#", label: "Instagram" },
                { Icon: Facebook, href: "#", label: "Facebook" },
                { Icon: Twitter, href: "#", label: "Twitter" },
                { Icon: Youtube, href: "#", label: "YouTube" },
              ].map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-lg bg-gray-800 hover:bg-primary-500 flex items-center justify-center transition-colors"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-5 uppercase tracking-wider">
              Categories
            </h3>
            <ul className="space-y-3">
              {categories.map((cat) => (
                <li key={cat.id}>
                  <Link
                    href={`/category/${cat.slug}`}
                    className="text-sm text-gray-400 hover:text-primary-400 transition-colors flex items-center gap-2"
                  >
                    <span className="text-base">{cat.icon}</span>
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company & Support */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-5 uppercase tracking-wider">
              Company
            </h3>
            <ul className="space-y-3 mb-8">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-primary-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <h3 className="text-white font-semibold text-sm mb-5 uppercase tracking-wider">
              Support
            </h3>
            <ul className="space-y-3">
              {footerLinks.support.slice(0, 4).map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-primary-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter & Policies */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-5 uppercase tracking-wider">
              Newsletter
            </h3>
            <p className="text-sm text-gray-400 mb-4">
              Get Ayurvedic wellness tips, exclusive offers, and health guides weekly.
            </p>
            <div className="flex flex-col gap-2">
              <input
                type="email"
                placeholder="Your email address"
                className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none focus:border-primary-500 transition-colors"
              />
              <button className="w-full bg-primary-500 hover:bg-primary-600 text-white text-sm font-semibold py-2.5 rounded-lg transition-colors">
                Subscribe Free
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              No spam. Unsubscribe anytime.
            </p>

            {/* Policies */}
            <div className="mt-8">
              <h3 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">
                Legal
              </h3>
              <ul className="space-y-2">
                {footerLinks.policies.slice(0, 4).map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-xs text-gray-500 hover:text-gray-300 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="container-custom py-5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-gray-500 text-center sm:text-left">
              © 2024 Hikmat Wellness Pvt. Ltd. All rights reserved. | CIN: U74999DL2024PTC123456 | AYUSH License: AYU/DL/2024/001
            </p>
            <div className="flex items-center gap-4">
              <span className="text-xs text-gray-500">Secure Payments:</span>
              <div className="flex items-center gap-2">
                {["UPI", "Visa", "MC", "RuPay"].map((method) => (
                  <span
                    key={method}
                    className="text-[10px] font-bold text-gray-400 bg-gray-800 px-2 py-0.5 rounded"
                  >
                    {method}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <p className="text-xs text-gray-600 mt-3 text-center">
            Disclaimer: These products have not been evaluated by the FDA. This product is not intended to diagnose, treat, cure, or prevent any disease. Consult your physician before use.
          </p>
        </div>
      </div>
    </footer>
  );
}
