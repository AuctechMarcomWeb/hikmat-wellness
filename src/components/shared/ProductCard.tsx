"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Heart, ShoppingCart, Star, Eye, Zap } from "lucide-react";
import { toast } from "sonner";
import { Product } from "@/types";
import { formatPrice, cn } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
  className?: string;
  variant?: "default" | "compact" | "horizontal";
}

export default function ProductCard({ product, className, variant = "default" }: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toast.success(`${product.name} added to cart!`, {
      description: `${product.packSize}`,
      action: { label: "View Cart", onClick: () => (window.location.href = "/cart") },
    });
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
    toast.success(isWishlisted ? "Removed from wishlist" : "Added to wishlist!");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
      className={cn("group", className)}
    >
      <Link href={`/product/${product.slug}`}>
        <div className="card-luxury overflow-hidden h-full flex flex-col">
          {/* Image Container */}
          <div className="relative aspect-square bg-accent overflow-hidden">
            {!imageLoaded && (
              <div className="absolute inset-0 skeleton" />
            )}
            <Image
              src={product.thumbnail}
              alt={product.name}
              fill
              className={cn(
                "object-cover transition-transform duration-500 group-hover:scale-105",
                imageLoaded ? "opacity-100" : "opacity-0"
              )}
              onLoad={() => setImageLoaded(true)}
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />

            {/* Badges */}
            <div className="absolute top-3 left-3 flex flex-col gap-1.5">
              {product.discount > 0 && (
                <span className="px-2 py-0.5 text-[10px] font-bold bg-red-500 text-white rounded-full">
                  -{product.discount}%
                </span>
              )}
              {product.isNew && (
                <span className="px-2 py-0.5 text-[10px] font-bold bg-secondary text-white rounded-full">
                  NEW
                </span>
              )}
              {product.isBestSeller && !product.isNew && (
                <span className="px-2 py-0.5 text-[10px] font-bold bg-primary-500 text-white rounded-full">
                  BESTSELLER
                </span>
              )}
              {product.badge && !product.isNew && !product.isBestSeller && (
                <span className="px-2 py-0.5 text-[10px] font-bold bg-gray-800 text-white rounded-full">
                  {product.badge}
                </span>
              )}
            </div>

            {/* Type Badge */}
            <div className="absolute top-3 right-3">
              <span className={cn(
                "px-2 py-0.5 text-[9px] font-semibold rounded-full uppercase",
                product.type === "ayurveda" && "bg-green-100 text-green-700",
                product.type === "unani" && "bg-blue-100 text-blue-700",
                product.type === "herbal" && "bg-emerald-100 text-emerald-700",
              )}>
                {product.type}
              </span>
            </div>

            {/* Actions Overlay */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />

            {/* Quick Actions */}
            <div className="absolute bottom-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
              <button
                onClick={handleWishlist}
                className={cn(
                  "w-9 h-9 rounded-xl flex items-center justify-center shadow-lg transition-all duration-200",
                  isWishlisted
                    ? "bg-red-500 text-white"
                    : "bg-white text-gray-600 hover:bg-red-50 hover:text-red-500"
                )}
                aria-label="Add to wishlist"
              >
                <Heart size={16} className={isWishlisted ? "fill-current" : ""} />
              </button>
              <Link
                href={`/product/${product.slug}`}
                className="w-9 h-9 bg-white text-gray-600 rounded-xl flex items-center justify-center shadow-lg hover:bg-primary-50 hover:text-primary-500 transition-colors"
                aria-label="Quick view"
                onClick={(e) => e.stopPropagation()}
              >
                <Eye size={16} />
              </Link>
            </div>
          </div>

          {/* Content */}
          <div className="p-4 flex flex-col flex-1">
            {/* Category */}
            <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-1">
              {product.category}
            </p>

            {/* Name */}
            <h3 className="font-semibold text-gray-900 text-sm leading-snug mb-2 line-clamp-2 group-hover:text-primary-500 transition-colors flex-1">
              {product.name}
            </h3>

            {/* Rating */}
            <div className="flex items-center gap-1.5 mb-3">
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={11}
                    className={cn(
                      i < Math.floor(product.rating)
                        ? "fill-secondary text-secondary"
                        : "text-gray-200 fill-current"
                    )}
                  />
                ))}
              </div>
              <span className="text-xs text-gray-500">
                {product.rating} ({product.reviewCount.toLocaleString()})
              </span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-2 mb-3">
              <span className="text-lg font-bold text-gray-900">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice > product.price && (
                <span className="text-sm text-gray-400 line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>

            {/* Pack size */}
            <p className="text-xs text-gray-400 mb-4">{product.packSize}</p>

            {/* Add to Cart */}
            <button
              onClick={handleAddToCart}
              disabled={!product.inStock}
              className={cn(
                "flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-sm font-semibold transition-all duration-300",
                product.inStock
                  ? "bg-primary-500 text-white hover:bg-primary-600 hover:shadow-luxury active:scale-95"
                  : "bg-gray-100 text-gray-400 cursor-not-allowed"
              )}
            >
              {product.inStock ? (
                <>
                  <ShoppingCart size={15} />
                  Add to Cart
                </>
              ) : (
                "Out of Stock"
              )}
            </button>

            {/* Buy Now */}
            {product.inStock && (
              <Link
                href={`/checkout?product=${product.slug}`}
                onClick={(e) => e.stopPropagation()}
                className="flex items-center justify-center gap-1.5 w-full py-2 rounded-xl text-xs font-semibold text-primary-500 hover:bg-primary-50 transition-colors mt-1.5"
              >
                <Zap size={12} />
                Buy Now
              </Link>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
