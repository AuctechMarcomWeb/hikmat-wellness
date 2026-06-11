"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Clock, Eye } from "lucide-react";
import { blogPosts } from "@/data/index";
import SectionHeader from "@/components/shared/SectionHeader";
import { formatDate } from "@/lib/utils";

export default function BlogPreviewSection() {
  const featured = blogPosts.filter(b => b.featured).slice(0, 3);

  return (
    <section className="section bg-white">
      <div className="container-custom">
        <div className="flex items-end justify-between mb-14">
          <SectionHeader
            eyebrow="Health Guides"
            title="Wellness"
            titleHighlight="Knowledge Hub"
            description="Expert Ayurvedic insights, health guides, and evidence-based wellness content."
            align="left"
            className="mb-0"
          />
          <Link
            href="/blogs"
            className="hidden sm:flex items-center gap-1.5 text-sm font-semibold text-primary-500 hover:text-primary-600 transition-colors"
          >
            All Articles
            <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {featured.map((post, i) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={i === 0 ? "lg:col-span-1 lg:row-span-2" : ""}
            >
              <Link href={`/blog/${post.slug}`} className="group block h-full">
                <div className="card-luxury h-full overflow-hidden flex flex-col">
                  {/* Image */}
                  <div className={`relative overflow-hidden bg-accent ${i === 0 ? "h-56 sm:h-64" : "h-44"}`}>
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 1024px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                    {/* Category pill */}
                    <div className="absolute bottom-3 left-3 bg-primary-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-full">
                      {post.category}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5 flex flex-col flex-1">
                    <div className="flex items-center gap-3 text-xs text-gray-400 mb-3">
                      <span className="flex items-center gap-1">
                        <Clock size={11} />
                        {post.readTime} min read
                      </span>
                      <span>·</span>
                      <span className="flex items-center gap-1">
                        <Eye size={11} />
                        {(post.views / 1000).toFixed(1)}k views
                      </span>
                    </div>

                    <h3 className={`font-display font-bold text-gray-900 group-hover:text-primary-500 transition-colors leading-snug mb-3 ${i === 0 ? "text-xl" : "text-base"}`}>
                      {post.title}
                    </h3>

                    <p className="text-gray-500 text-sm leading-relaxed line-clamp-2 flex-1 mb-4">
                      {post.excerpt}
                    </p>

                    {/* Author */}
                    <div className="flex items-center gap-2.5 pt-3 border-t border-gray-100">
                      <div className="w-7 h-7 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 font-bold text-xs">
                        {post.author.name[0]}
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-gray-800">{post.author.name}</div>
                        <div className="text-[10px] text-gray-400">{formatDate(post.publishedAt)}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>

        <div className="text-center mt-10 sm:hidden">
          <Link href="/blogs" className="btn-secondary inline-flex items-center gap-2">
            Read All Articles
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
