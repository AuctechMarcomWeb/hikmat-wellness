"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { categories } from "@/data/index";
import SectionHeader from "@/components/shared/SectionHeader";

export default function CategoriesSection() {
  return (
    <section className="section bg-accent">
      <div className="container-custom">
        <SectionHeader
          eyebrow="Health Categories"
          title="Shop by"
          titleHighlight="Health Concern"
          description="From Ayurvedic tonics to Unani formulations — find targeted solutions for every health need."
        />

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              whileHover={{ y: -6 }}
            >
              <Link href={`/category/${cat.slug}`} className="group block">
                <div className="card-luxury overflow-hidden">
                  {/* Image */}
                  <div className="relative h-40 sm:h-48 overflow-hidden bg-white">
                    <Image
                      src={cat.image}
                      alt={cat.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Icon */}
                    <div className="absolute top-3 left-3 w-9 h-9 bg-white/90 backdrop-blur-sm rounded-xl flex items-center justify-center text-lg shadow-sm">
                      {cat.icon}
                    </div>

                    {/* Product count */}
                    <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm text-xs font-semibold text-gray-700 px-2 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                      {cat.productCount} Products
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 text-sm group-hover:text-primary-500 transition-colors">
                      {cat.name}
                    </h3>
                    <p className="text-xs text-gray-500 mt-1 line-clamp-2 leading-relaxed">
                      {cat.description}
                    </p>
                    <div className="flex items-center gap-1 mt-2.5 text-xs font-semibold text-primary-500 opacity-0 group-hover:opacity-100 transition-opacity">
                      Explore
                      <ArrowRight size={12} />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
