"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search, ShoppingCart, Heart, User, Menu, X, ChevronDown,
  Phone, MapPin, Clock, Leaf, Shield, Truck, Star
} from "lucide-react";
import { categories } from "@/data/index";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Shop", href: "/shop", hasMegaMenu: true },
  { label: "Consultation", href: "/consultation" },
  { label: "Blogs", href: "/blogs" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (searchOpen && searchRef.current) {
      setTimeout(() => searchRef.current?.focus(), 100);
    }
  }, [searchOpen]);

  useEffect(() => {
    if (mobileOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      {/* Top Bar */}
      <div className="bg-primary-500 text-white text-xs py-2 hidden sm:block">
        <div className="container-custom flex items-center justify-between">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5">
              <Phone size={11} />
              +91-9876543210
            </span>
            <span className="flex items-center gap-1.5">
              <Clock size={11} />
              Mon-Sat: 9AM–7PM
            </span>
          </div>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5">
              <Truck size={11} />
              Free Delivery on orders ₹599+
            </span>
            <span className="flex items-center gap-1.5">
              <Shield size={11} />
              100% Authentic Products
            </span>
            <span className="flex items-center gap-1.5">
              <Leaf size={11} />
              AYUSH Approved
            </span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header
        className={cn(
          "sticky top-0 z-50 transition-all duration-300",
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-luxury border-b border-gray-100"
            : "bg-white border-b border-gray-100"
        )}
      >
        <div className="container-custom">
          <div className="flex items-center h-16 lg:h-20 gap-4 lg:gap-8">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0 flex items-center gap-2.5">
              <div className="w-9 h-9 bg-primary-500 rounded-xl flex items-center justify-center">
                <Leaf className="text-white" size={20} />
              </div>
              <div className="hidden sm:block">
                <div className="font-display font-bold text-xl text-primary-500 leading-none">
                  Hikmat
                </div>
                <div className="text-[10px] tracking-widest text-secondary uppercase font-semibold">
                  Wellness
                </div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1 flex-1">
              {navLinks.map((link) => (
                <div
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => link.hasMegaMenu && setMegaMenuOpen(true)}
                  onMouseLeave={() => link.hasMegaMenu && setMegaMenuOpen(false)}
                >
                  <Link
                    href={link.href}
                    className={cn(
                      "flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-lg transition-colors",
                      "text-gray-700 hover:text-primary-500 hover:bg-primary-50"
                    )}
                  >
                    {link.label}
                    {link.hasMegaMenu && <ChevronDown size={14} className={cn("transition-transform", megaMenuOpen && "rotate-180")} />}
                  </Link>

                  {/* Mega Menu */}
                  {link.hasMegaMenu && (
                    <AnimatePresence>
                      {megaMenuOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute left-0 top-full mt-2 w-[640px] bg-white rounded-2xl shadow-luxury-lg border border-gray-100 p-6 z-50"
                        >
                          <div className="grid grid-cols-4 gap-3">
                            {categories.map((cat) => (
                              <Link
                                key={cat.id}
                                href={`/category/${cat.slug}`}
                                className="flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-accent transition-colors group text-center"
                                onClick={() => setMegaMenuOpen(false)}
                              >
                                <span className="text-2xl">{cat.icon}</span>
                                <span className="text-xs font-medium text-gray-700 group-hover:text-primary-500 transition-colors leading-tight">
                                  {cat.name}
                                </span>
                              </Link>
                            ))}
                          </div>
                          <div className="mt-4 pt-4 border-t border-gray-100">
                            <Link
                              href="/shop"
                              className="flex items-center justify-center gap-2 text-sm font-semibold text-primary-500 hover:text-primary-600 transition-colors"
                              onClick={() => setMegaMenuOpen(false)}
                            >
                              View All Products →
                            </Link>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                </div>
              ))}
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-1 lg:gap-2 ml-auto">
              {/* Search Button */}
              <button
                onClick={() => setSearchOpen(true)}
                className="p-2.5 rounded-xl text-gray-600 hover:text-primary-500 hover:bg-primary-50 transition-colors"
                aria-label="Search"
              >
                <Search size={20} />
              </button>

              {/* Wishlist */}
              <Link
                href="/wishlist"
                className="hidden sm:flex p-2.5 rounded-xl text-gray-600 hover:text-primary-500 hover:bg-primary-50 transition-colors relative"
                aria-label="Wishlist"
              >
                <Heart size={20} />
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-primary-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                  3
                </span>
              </Link>

              {/* Cart */}
              <Link
                href="/cart"
                className="p-2.5 rounded-xl text-gray-600 hover:text-primary-500 hover:bg-primary-50 transition-colors relative"
                aria-label="Cart"
              >
                <ShoppingCart size={20} />
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-secondary text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                  2
                </span>
              </Link>

              {/* Account */}
              <Link
                href="/account"
                className="hidden sm:flex p-2.5 rounded-xl text-gray-600 hover:text-primary-500 hover:bg-primary-50 transition-colors"
                aria-label="Account"
              >
                <User size={20} />
              </Link>

              {/* Consult CTA */}
              <Link
                href="/consultation"
                className="hidden lg:flex items-center gap-1.5 bg-primary-500 text-white text-sm font-semibold px-4 py-2 rounded-xl hover:bg-primary-600 transition-all hover:shadow-luxury ml-2"
              >
                <Star size={14} />
                Consult Doctor
              </Link>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setMobileOpen(true)}
                className="lg:hidden p-2.5 rounded-xl text-gray-600 hover:text-primary-500 hover:bg-primary-50 transition-colors"
                aria-label="Open menu"
              >
                <Menu size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Search Overlay */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute inset-x-0 top-full bg-white border-b border-gray-100 shadow-luxury-lg z-50"
            >
              <div className="container-custom py-4">
                <div className="flex items-center gap-3">
                  <div className="flex-1 flex items-center gap-3 bg-accent rounded-xl px-4 py-3">
                    <Search size={18} className="text-gray-400" />
                    <input
                      ref={searchRef}
                      type="text"
                      placeholder="Search for products, health concerns, brands..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="flex-1 bg-transparent text-sm text-gray-800 placeholder-gray-400 outline-none"
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && searchQuery) {
                          window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
                          setSearchOpen(false);
                        }
                      }}
                    />
                  </div>
                  <button
                    onClick={() => setSearchOpen(false)}
                    className="p-2 rounded-xl hover:bg-gray-100 transition-colors"
                  >
                    <X size={20} className="text-gray-600" />
                  </button>
                </div>
                {/* Quick suggestions */}
                <div className="mt-3 flex flex-wrap gap-2">
                  {["Shilajit", "Ashwagandha", "Triphala", "Chyawanprash", "Liver Care", "Diabetes"].map((term) => (
                    <button
                      key={term}
                      onClick={() => {
                        setSearchQuery(term);
                        window.location.href = `/search?q=${encodeURIComponent(term)}`;
                        setSearchOpen(false);
                      }}
                      className="px-3 py-1.5 text-xs font-medium bg-primary-50 text-primary-600 rounded-full hover:bg-primary-100 transition-colors"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50 lg:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed left-0 top-0 bottom-0 w-[85vw] max-w-sm bg-white z-50 lg:hidden flex flex-col shadow-2xl"
            >
              {/* Mobile Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
                    <Leaf className="text-white" size={16} />
                  </div>
                  <span className="font-display font-bold text-lg text-primary-500">Hikmat Wellness</span>
                </div>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Mobile Nav Links */}
              <div className="flex-1 overflow-y-auto p-4">
                <div className="space-y-1">
                  {navLinks.map((link) => (
                    <Link
                      key={link.label}
                      href={link.href}
                      className="flex items-center gap-3 px-4 py-3 text-gray-700 rounded-xl hover:bg-primary-50 hover:text-primary-500 transition-colors font-medium"
                      onClick={() => setMobileOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>

                <div className="mt-6">
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-4 mb-3">
                    Categories
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {categories.map((cat) => (
                      <Link
                        key={cat.id}
                        href={`/category/${cat.slug}`}
                        className="flex items-center gap-2 p-3 rounded-xl bg-accent hover:bg-primary-50 transition-colors"
                        onClick={() => setMobileOpen(false)}
                      >
                        <span className="text-lg">{cat.icon}</span>
                        <span className="text-xs font-medium text-gray-700">{cat.name}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              {/* Mobile Footer */}
              <div className="p-4 border-t border-gray-100 space-y-3">
                <Link
                  href="/consultation"
                  className="flex items-center justify-center gap-2 w-full bg-primary-500 text-white py-3 rounded-xl font-semibold hover:bg-primary-600 transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  <Star size={16} />
                  Consult a Doctor
                </Link>
                <div className="flex items-center justify-center gap-1 text-xs text-gray-500">
                  <Phone size={12} />
                  <span>+91-9876543210</span>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
