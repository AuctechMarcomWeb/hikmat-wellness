'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, X, Clock, TrendingUp, Mic, Star, ArrowRight } from 'lucide-react';
import { allProducts } from '@/data/products';
import { blogPosts } from '@/data/index';

const trending = ['Ashwagandha', 'Shilajit', 'Triphala Churna', 'Liver Detox', 'Immunity Booster', 'Joint Pain Relief'];
const recentSearches = ['Diabetes tablets', 'Hair oil herbal', 'Digestive care'];

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [focused, setFocused] = useState(true);
  const [results, setResults] = useState<typeof allProducts>([]);
  const [blogResults, setBlogResults] = useState<typeof blogPosts>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (query.length > 1) {
      const q = query.toLowerCase();
      setResults(allProducts.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.description?.toLowerCase().includes(q)
      ).slice(0, 8));
      setBlogResults(blogPosts.filter(b =>
        b.title.toLowerCase().includes(q) ||
        b.category.toLowerCase().includes(q)
      ).slice(0, 3));
    } else {
      setResults([]);
      setBlogResults([]);
    }
  }, [query]);

  const hasResults = results.length > 0 || blogResults.length > 0;

  return (
    <div className="min-h-screen bg-white">
      {/* Search Header */}
      <div className="bg-primary/5 border-b border-gray-100 py-10">
        <div className="container-custom max-w-3xl">
          <h1 className="font-display text-3xl text-gray-900 text-center mb-6">What are you looking for?</h1>
          <div className="relative">
            <div className={`flex items-center gap-3 bg-white rounded-2xl border-2 transition-all ${focused ? 'border-primary shadow-luxury' : 'border-gray-200'} px-5 py-4`}>
              <Search className="w-5 h-5 text-gray-400 flex-shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                placeholder="Search products, categories, health concerns..."
                className="flex-1 outline-none text-gray-900 placeholder-gray-400 text-lg bg-transparent"
              />
              {query && (
                <button onClick={() => setQuery('')} className="text-gray-400 hover:text-gray-600 transition-colors">
                  <X className="w-4 h-4" />
                </button>
              )}
              <button className="text-gray-400 hover:text-primary transition-colors p-1 rounded-lg hover:bg-primary/10">
                <Mic className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container-custom max-w-5xl py-10">
        {!query && (
          <div className="grid md:grid-cols-2 gap-12">
            {/* Recent Searches */}
            <div>
              <div className="flex items-center gap-2 text-gray-700 font-semibold mb-4">
                <Clock className="w-4 h-4" />
                Recent Searches
              </div>
              <div className="space-y-2">
                {recentSearches.map(s => (
                  <button
                    key={s}
                    onClick={() => setQuery(s)}
                    className="flex items-center gap-3 w-full p-3 rounded-xl hover:bg-gray-50 text-left text-gray-700 group"
                  >
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span className="flex-1">{s}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-gray-300 group-hover:text-primary transition-colors" />
                  </button>
                ))}
              </div>
            </div>

            {/* Trending */}
            <div>
              <div className="flex items-center gap-2 text-gray-700 font-semibold mb-4">
                <TrendingUp className="w-4 h-4 text-primary" />
                Trending Searches
              </div>
              <div className="flex flex-wrap gap-2">
                {trending.map(t => (
                  <button
                    key={t}
                    onClick={() => setQuery(t)}
                    className="px-4 py-2 bg-primary/5 text-primary rounded-full text-sm font-medium hover:bg-primary hover:text-white transition-all"
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Search Results */}
        {query && !hasResults && query.length > 1 && (
          <div className="text-center py-20">
            <div className="text-6xl mb-6">🔍</div>
            <h2 className="font-display text-2xl text-gray-900 mb-3">No results for &ldquo;{query}&rdquo;</h2>
            <p className="text-gray-500 mb-8">Try different keywords or browse our categories</p>
            <div className="flex flex-wrap gap-2 justify-center">
              {trending.slice(0, 4).map(t => (
                <button key={t} onClick={() => setQuery(t)} className="px-4 py-2 bg-primary/5 text-primary rounded-full text-sm font-medium hover:bg-primary hover:text-white transition-all">
                  {t}
                </button>
              ))}
            </div>
          </div>
        )}

        {hasResults && (
          <div>
            <div className="text-sm text-gray-500 mb-8">
              Showing results for <span className="font-semibold text-gray-900">&ldquo;{query}&rdquo;</span>
            </div>

            {results.length > 0 && (
              <div className="mb-12">
                <div className="flex items-center justify-between mb-5">
                  <h2 className="font-semibold text-gray-900">Products ({results.length})</h2>
                  <Link href={`/shop?q=${query}`} className="text-primary text-sm hover:underline">View all →</Link>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {results.map(product => (
                    <Link key={product.id} href={`/product/${product.slug}`} className="group card-luxury overflow-hidden">
                      <div className="relative aspect-square bg-accent">
                        <Image src={product.thumbnail} alt={product.name} fill className="object-cover transition-transform duration-300 group-hover:scale-105" />
                        {product.discount && (
                          <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                            -{product.discount}%
                          </span>
                        )}
                      </div>
                      <div className="p-4">
                        <div className="text-xs text-primary font-medium capitalize mb-1">{product.category.replace('-', ' ')}</div>
                        <div className="font-medium text-gray-900 text-sm leading-snug line-clamp-2 group-hover:text-primary transition-colors">
                          {product.name}
                        </div>
                        <div className="flex items-center gap-1 mt-2">
                          <Star className="w-3 h-3 fill-secondary text-secondary" />
                          <span className="text-xs text-gray-600">{product.rating}</span>
                        </div>
                        <div className="flex items-center gap-2 mt-2">
                          <span className="font-bold text-primary">₹{product.price}</span>
                          {product.originalPrice && (
                            <span className="text-xs text-gray-400 line-through">₹{product.originalPrice}</span>
                          )}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {blogResults.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-5">
                  <h2 className="font-semibold text-gray-900">Articles ({blogResults.length})</h2>
                  <Link href="/blog" className="text-primary text-sm hover:underline">View all →</Link>
                </div>
                <div className="space-y-4">
                  {blogResults.map(post => (
                    <Link key={post.id} href={`/blog/${post.slug}`} className="flex gap-4 group p-4 rounded-2xl border border-gray-100 hover:border-primary/20 hover:shadow-luxury transition-all">
                      <div className="relative w-24 h-24 rounded-xl overflow-hidden flex-shrink-0">
                        <Image src={post.image} alt={post.title} fill className="object-cover" />
                      </div>
                      <div>
                        <span className="text-xs text-primary font-semibold">{post.category}</span>
                        <h3 className="font-semibold text-gray-900 mt-1 group-hover:text-primary transition-colors">{post.title}</h3>
                        <p className="text-gray-500 text-sm line-clamp-2 mt-1">{post.excerpt}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
