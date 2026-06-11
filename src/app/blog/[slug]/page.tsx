import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import { Clock, Eye, Share2, Facebook, Twitter, Linkedin, ChevronRight, BookOpen } from 'lucide-react';
import { blogPosts } from '@/data/index';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find(p => p.slug === slug) || blogPosts[0];
  return {
    title: `${post.title} | Hikmat Wellness Blog`,
    description: post.excerpt,
    openGraph: { title: post.title, description: post.excerpt, images: [post.image] },
  };
}

const articleContent = `
Ayurveda, the ancient Indian system of medicine, has been practiced for over 5,000 years. 
The word "Ayurveda" is derived from the Sanskrit words "Ayur" (life) and "Veda" (knowledge), 
meaning "the science of life."

## The Three Doshas

At the heart of Ayurvedic medicine lies the concept of three doshas — Vata, Pitta, and Kapha. 
These are fundamental energies or principles that govern the physical and mental processes 
of the human body and mind.

### Vata Dosha
Vata represents movement and change. It governs all movement in the body, including 
the movement of nerve impulses and circulation. When balanced, Vata promotes creativity 
and flexibility. When out of balance, it can lead to anxiety, dry skin, and constipation.

### Pitta Dosha  
Pitta represents transformation. It governs digestion, metabolism, and intelligence. 
When balanced, Pitta promotes understanding and intelligence. When out of balance, 
it can cause inflammation and irritability.

### Kapha Dosha
Kapha represents structure and lubrication. It governs growth and protection. 
When balanced, Kapha promotes calmness and love. When out of balance, it can lead 
to weight gain and depression.

## Herbal Remedies in Ayurveda

Ayurvedic medicine uses a wide range of natural substances — primarily herbs and plants, 
but also metals, minerals, and other materials — as therapeutic agents.

Some of the most important Ayurvedic herbs include:

**Ashwagandha (Withania somnifera)**: Known as Indian ginseng, it is one of the most 
important herbs in Ayurveda. It has been used for thousands of years for various conditions, 
and its properties are now being confirmed by modern research.

**Triphala**: A combination of three fruits — Amalaki, Bibhitaki, and Haritaki — Triphala 
is one of the most important formulations in Ayurveda. It is known for its rejuvenating 
properties and ability to support digestive health.

**Brahmi (Bacopa monnieri)**: A staple plant in Ayurvedic medicine, Brahmi has been used 
since ancient times for various purposes, including improving memory and reducing anxiety.

## Modern Validation

Contemporary scientific research has begun to validate many traditional Ayurvedic 
practices. Studies have shown that several Ayurvedic herbs possess significant 
pharmacological activities, including anti-inflammatory, antioxidant, and adaptogenic properties.

This growing body of evidence suggests that the ancient wisdom of Ayurveda has much 
to offer modern medicine, particularly in the areas of preventive healthcare and 
the management of chronic conditions.
`;

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = blogPosts.find(p => p.slug === slug) || blogPosts[0];
  const related = blogPosts.filter(p => p.id !== post.id && p.category === post.category).slice(0, 3);
  const headings = ['The Three Doshas', 'Vata Dosha', 'Pitta Dosha', 'Kapha Dosha', 'Herbal Remedies in Ayurveda', 'Modern Validation'];

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="bg-accent border-b border-gray-100">
        <div className="container-custom py-3">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/blog" className="hover:text-primary transition-colors">Blog</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-gray-800 font-medium truncate max-w-[300px]">{post.title}</span>
          </div>
        </div>
      </div>

      {/* Hero */}
      <div className="relative aspect-[21/7] lg:aspect-[21/6]">
        <Image src={post.image} alt={post.title} fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0">
          <div className="container-custom pb-10 pt-20">
            <div className="max-w-3xl">
              <span className="text-xs bg-secondary text-white px-3 py-1 rounded-full font-semibold mb-4 inline-block">
                {post.category}
              </span>
              <h1 className="font-display text-3xl lg:text-5xl text-white leading-tight mb-4">{post.title}</h1>
              <div className="flex flex-wrap items-center gap-4 text-white/80 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-white text-xs font-bold">
                    {post.author.name.charAt(0)}
                  </div>
                  <span>{post.author.name}</span>
                  {post.author.title && <span className="text-white/60">· {post.author.title}</span>}
                </div>
                <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" />{post.readTime} min read</span>
                <span className="flex items-center gap-1.5"><Eye className="w-3.5 h-3.5" />{post.views?.toLocaleString()} views</span>
                <span>{post.publishedAt}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container-custom py-12">
        <div className="grid lg:grid-cols-[1fr_300px] gap-12">
          {/* Article Body */}
          <article>
            <p className="text-lg text-gray-600 leading-relaxed mb-8 font-medium border-l-4 border-primary pl-5 py-1">
              {post.excerpt}
            </p>

            <div className="prose prose-lg max-w-none prose-headings:font-display prose-headings:text-gray-900 prose-p:text-gray-700 prose-p:leading-relaxed prose-strong:text-gray-900">
              {articleContent.split('\n\n').map((para, i) => {
                if (para.startsWith('## ')) {
                  return <h2 key={i} className="font-display text-2xl text-gray-900 mt-10 mb-4">{para.replace('## ', '')}</h2>;
                }
                if (para.startsWith('### ')) {
                  return <h3 key={i} className="font-display text-xl text-gray-900 mt-7 mb-3">{para.replace('### ', '')}</h3>;
                }
                if (para.trim()) {
                  return <p key={i} className="text-gray-700 leading-relaxed mb-4">{para.replace(/\*\*(.*?)\*\*/g, '$1')}</p>;
                }
                return null;
              })}
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-10 pt-8 border-t border-gray-100">
              {(post.tags || ['Ayurveda', 'Wellness', 'Natural Medicine', 'Health Tips']).map((tag: string) => (
                <Link key={tag} href="#" className="text-sm bg-accent text-gray-600 hover:bg-primary/10 hover:text-primary px-4 py-2 rounded-full transition-colors">
                  #{tag}
                </Link>
              ))}
            </div>

            {/* Share */}
            <div className="flex items-center gap-4 mt-8 p-5 bg-accent rounded-2xl">
              <span className="font-semibold text-gray-900 flex items-center gap-2">
                <Share2 className="w-4 h-4" />Share this article
              </span>
              <div className="flex gap-2 ml-auto">
                {[
                  { Icon: Facebook, color: 'hover:bg-blue-600', label: 'Facebook' },
                  { Icon: Twitter, color: 'hover:bg-sky-500', label: 'Twitter' },
                  { Icon: Linkedin, color: 'hover:bg-blue-700', label: 'LinkedIn' },
                ].map(({ Icon, color, label }) => (
                  <button key={label} className={`w-10 h-10 bg-white rounded-xl border border-gray-200 flex items-center justify-center ${color} hover:text-white hover:border-transparent transition-all`}>
                    <Icon className="w-4 h-4" />
                  </button>
                ))}
              </div>
            </div>

            {/* Author Bio */}
            <div className="mt-8 p-6 border border-gray-200 rounded-2xl">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary text-xl font-bold flex-shrink-0">
                  {post.author.name.charAt(0)}
                </div>
                <div>
                  <div className="font-semibold text-gray-900 text-lg">{post.author.name}</div>
                  {post.author.title && <div className="text-primary text-sm font-medium">{post.author.title}</div>}
                  <p className="text-gray-600 text-sm mt-2 leading-relaxed">
                    Expert in Ayurvedic medicine with over 15 years of clinical experience. 
                    Committed to bridging traditional wisdom with modern healthcare.
                  </p>
                </div>
              </div>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="space-y-8">
            {/* Table of Contents */}
            <div className="card-luxury p-5 sticky top-24">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-primary" />
                Table of Contents
              </h3>
              <ul className="space-y-2">
                {headings.map((h, i) => (
                  <li key={i}>
                    <a href={`#${h.toLowerCase().replace(/ /g, '-')}`} className="text-sm text-gray-600 hover:text-primary transition-colors flex items-start gap-2 py-1 group">
                      <span className="text-primary/40 mt-0.5 group-hover:text-primary transition-colors">›</span>
                      {h}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Related */}
            {related.length > 0 && (
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">Related Articles</h3>
                <div className="space-y-4">
                  {related.map(r => (
                    <Link key={r.id} href={`/blog/${r.slug}`} className="flex gap-3 group">
                      <div className="relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
                        <Image src={r.image} alt={r.title} fill className="object-cover transition-transform duration-300 group-hover:scale-110" />
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-900 group-hover:text-primary transition-colors line-clamp-2">{r.title}</h4>
                        <span className="text-xs text-gray-400 flex items-center gap-1 mt-1"><Clock className="w-3 h-3" />{r.readTime} min</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Newsletter CTA */}
            <div className="bg-primary text-white rounded-2xl p-5">
              <h3 className="font-display text-lg mb-2">Get Wellness Tips</h3>
              <p className="text-white/80 text-sm mb-4">Join 50,000+ subscribers for weekly health insights</p>
              <input type="email" placeholder="Your email" className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/50 outline-none focus:border-secondary mb-3 text-sm" />
              <button className="w-full bg-secondary hover:bg-secondary-600 text-white py-3 rounded-xl font-semibold text-sm transition-colors">Subscribe Free</button>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
