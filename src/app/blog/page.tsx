import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import { Clock, Eye, Tag, ArrowRight, TrendingUp } from 'lucide-react';
import { blogPosts } from '@/data/index';
import SectionHeader from '@/components/shared/SectionHeader';

export const metadata: Metadata = {
  title: 'Health Blog & Wellness Articles | Hikmat Wellness',
  description: 'Explore expert health articles, Ayurvedic guides, and wellness tips from certified doctors and practitioners.',
};

const categories = ['All', 'Ayurveda', 'Unani', 'Nutrition', 'Yoga & Lifestyle', 'Women\'s Health', 'Digestive Health'];

export default function BlogPage() {
  const featured = blogPosts.slice(0, 3);
  const recent = blogPosts.slice(3);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-500 via-primary-600 to-primary-800 text-white py-20">
        <div className="container-custom text-center">
          <span className="text-secondary font-semibold text-sm tracking-widest uppercase">Health Knowledge Hub</span>
          <h1 className="font-display text-5xl lg:text-6xl mt-4 mb-6">Wellness Blog</h1>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">
            Expert-written articles on Ayurveda, Unani medicine, and holistic wellness.
            Trusted by 2M+ readers across India.
          </p>
          <div className="mt-8 max-w-xl mx-auto">
            <div className="flex bg-white/10 backdrop-blur rounded-2xl overflow-hidden border border-white/20">
              <input
                type="text"
                placeholder="Search articles, topics, remedies..."
                className="flex-1 bg-transparent px-5 py-4 text-white placeholder-white/50 outline-none"
              />
              <button className="px-6 bg-secondary hover:bg-secondary-600 transition-colors text-white font-semibold">
                Search
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <div className="sticky top-16 z-30 bg-white/95 backdrop-blur border-b border-gray-100">
        <div className="container-custom py-4">
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
            {categories.map(cat => (
              <button
                key={cat}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                  cat === 'All'
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-primary/10 hover:text-primary'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="container-custom py-12">
        {/* Featured Articles */}
        <div className="mb-16">
          <SectionHeader
            eyebrow="Editor's Pick"
            title="Featured Articles"
            description="In-depth guides written by our panel of certified Ayurvedic doctors and wellness experts"
          />
          <div className="grid lg:grid-cols-3 gap-6 mt-8">
            {/* Main Feature */}
            <Link href={`/blog/${featured[0].slug}`} className="lg:col-span-2 group">
              <div className="relative aspect-[16/9] rounded-2xl overflow-hidden mb-4">
                <Image
                  src={featured[0].image}
                  alt={featured[0].title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <span className="text-xs bg-secondary text-white px-3 py-1 rounded-full font-semibold mb-3 inline-block">
                    {featured[0].category}
                  </span>
                  <h2 className="font-display text-2xl lg:text-3xl text-white leading-tight group-hover:text-secondary transition-colors">
                    {featured[0].title}
                  </h2>
                  <div className="flex items-center gap-4 mt-3 text-white/70 text-sm">
                    <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" />{featured[0].readTime} min read</span>
                    <span className="flex items-center gap-1.5"><Eye className="w-3.5 h-3.5" />{featured[0].views?.toLocaleString()} views</span>
                  </div>
                </div>
              </div>
            </Link>

            {/* Side Features */}
            <div className="space-y-4">
              {featured.slice(1).map(post => (
                <Link key={post.id} href={`/blog/${post.slug}`} className="group flex gap-4 p-4 rounded-2xl border border-gray-100 hover:border-primary/20 hover:shadow-luxury transition-all">
                  <div className="relative w-24 h-24 rounded-xl overflow-hidden flex-shrink-0">
                    <Image src={post.image} alt={post.title} fill className="object-cover transition-transform duration-300 group-hover:scale-110" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-xs text-primary font-semibold">{post.category}</span>
                    <h3 className="font-semibold text-gray-900 text-sm leading-tight mt-1 group-hover:text-primary transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <div className="flex items-center gap-3 mt-2 text-xs text-gray-400">
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{post.readTime}m</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Trending */}
        <div className="flex items-center gap-3 mb-6 p-4 bg-accent rounded-2xl">
          <TrendingUp className="w-5 h-5 text-primary" />
          <span className="font-semibold text-gray-900">Trending Now:</span>
          <div className="flex gap-2 overflow-x-auto">
            {['Ashwagandha Benefits', 'Diabetes Remedies', 'Hair Loss Cure', 'Immunity Boost'].map(t => (
              <Link key={t} href="#" className="text-sm text-primary hover:underline whitespace-nowrap px-3 py-1 bg-white rounded-full border border-primary/20">
                {t}
              </Link>
            ))}
          </div>
        </div>

        {/* All Articles Grid */}
        <div>
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-display text-2xl text-gray-900">Latest Articles</h2>
            <span className="text-sm text-gray-500">{blogPosts.length} articles</span>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.map(post => (
              <Link key={post.id} href={`/blog/${post.slug}`} className="group card-luxury overflow-hidden">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="text-xs bg-white/95 text-primary font-semibold px-3 py-1 rounded-full">
                      {post.category}
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-semibold text-gray-900 leading-snug mb-2 group-hover:text-primary transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed line-clamp-2 mb-4">{post.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 bg-primary/10 rounded-full flex items-center justify-center text-primary text-xs font-bold">
                        {post.author.name.charAt(0)}
                      </div>
                      <div>
                        <div className="text-xs font-medium text-gray-800">{post.author.name}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-gray-400">
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{post.readTime}m</span>
                      <span className="flex items-center gap-1"><Eye className="w-3 h-3" />{post.views?.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <button className="btn-secondary px-8 py-3">
              Load More Articles
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
