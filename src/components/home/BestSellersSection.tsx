"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { getBestSellers } from "@/data/products";
import ProductCard from "@/components/shared/ProductCard";
import SectionHeader from "@/components/shared/SectionHeader";
import Link from "next/link";

export default function BestSellersSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const products = getBestSellers();

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: dir === "left" ? -320 : 320, behavior: "smooth" });
  };

  return (
    <section className="section bg-accent">
      <div className="container-custom">
        <div className="flex items-end justify-between mb-10 lg:mb-14">
          <SectionHeader
            eyebrow="Top Picks"
            title="Best"
            titleHighlight="Sellers"
            description="Our most loved products — trusted by millions for real results."
            align="left"
            className="mb-0"
          />
          <div className="flex items-center gap-3">
            <button
              onClick={() => scroll("left")}
              className="w-10 h-10 rounded-xl border-2 border-primary-200 text-primary-500 hover:bg-primary-500 hover:text-white hover:border-primary-500 transition-all flex items-center justify-center"
              aria-label="Scroll left"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => scroll("right")}
              className="w-10 h-10 rounded-xl border-2 border-primary-200 text-primary-500 hover:bg-primary-500 hover:text-white hover:border-primary-500 transition-all flex items-center justify-center"
              aria-label="Scroll right"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="flex gap-5 overflow-x-auto no-scrollbar pb-4"
        >
          {products.map((product, i) => (
            <div key={product.id} className="flex-shrink-0 w-[260px] sm:w-[280px]">
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/shop?filter=bestsellers"
            className="inline-flex items-center gap-2 btn-secondary"
          >
            View All Best Sellers
            <ChevronRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
