'use client';

import { use, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Star, Heart, ShoppingCart, Share2, Shield, Truck, RefreshCw,
  ChevronRight, ChevronDown, Plus, Minus, ZoomIn, Check,
  Award, Leaf, FlaskConical, Package
} from 'lucide-react';
import { toast } from 'sonner';
import { allProducts, getRelatedProducts } from '@/data/products';
import { reviews } from '@/data/index';
import ProductCard from '@/components/shared/ProductCard';
import SectionHeader from '@/components/shared/SectionHeader';

const images = [
  'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=800&q=80',
  'https://images.unsplash.com/photo-1547592180-85f173990554?w=800&q=80',
  'https://images.unsplash.com/photo-1599940824399-b87987ceb72a?w=800&q=80',
  'https://images.unsplash.com/photo-1512069772995-ec65ed45afd6?w=800&q=80',
];

const tabs = ['Description', 'Ingredients', 'Usage', 'Reviews', 'FAQ'];

const faqs = [
  { q: 'Is this product safe for daily use?', a: 'Yes, this product is formulated for daily use. However, we recommend consulting your healthcare provider for personalized advice.' },
  { q: 'How long before I see results?', a: 'Most users experience noticeable benefits within 2–4 weeks of consistent use. Individual results may vary.' },
  { q: 'Are there any side effects?', a: 'This product is made from natural ingredients and is generally well-tolerated. Discontinue use if you experience any adverse reactions.' },
  { q: 'Can I take it with other medications?', a: 'Please consult your doctor before combining with other medications, especially if you have existing health conditions.' },
];

export default function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const product = allProducts.find(p => p.slug === slug) || allProducts[0];
  const related = getRelatedProducts(product);

  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQty] = useState(1);
  const [wishlist, setWishlist] = useState(false);
  const [activeTab, setActiveTab] = useState('Description');
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [zoomed, setZoomed] = useState(false);

  const price = product.price;
  const original = product.originalPrice || Math.round(price * 1.3);
  const discount = Math.round(((original - price) / original) * 100);

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="bg-accent border-b border-gray-100">
        <div className="container-custom py-3">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/shop" className="hover:text-primary transition-colors">Shop</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href={`/category/${product.category}`} className="hover:text-primary transition-colors capitalize">{product.category.replace('-', ' ')}</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-gray-800 font-medium truncate max-w-[200px]">{product.name}</span>
          </div>
        </div>
      </div>

      <div className="container-custom py-8 lg:py-12">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Gallery */}
          <div className="space-y-4">
            <div
              className="relative aspect-square rounded-2xl overflow-hidden bg-accent cursor-zoom-in group"
              onClick={() => setZoomed(true)}
            >
              <Image
                src={images[selectedImage]}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/10">
                <div className="bg-white/90 rounded-full p-3">
                  <ZoomIn className="w-5 h-5 text-gray-700" />
                </div>
              </div>
              {discount > 0 && (
                <div className="absolute top-4 left-4 bg-red-500 text-white text-sm font-bold px-3 py-1 rounded-full">
                  -{discount}%
                </div>
              )}
            </div>
            <div className="grid grid-cols-4 gap-3">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all ${
                    selectedImage === i ? 'border-primary shadow-luxury' : 'border-transparent hover:border-primary/30'
                  }`}
                >
                  <Image src={img} alt="" fill className="object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-semibold bg-primary/10 text-primary px-3 py-1 rounded-full capitalize">
                  {product.type}
                </span>
                {product.isBestSeller && (
                  <span className="text-xs font-semibold bg-secondary/10 text-secondary-600 px-3 py-1 rounded-full">
                    Best Seller
                  </span>
                )}
              </div>
              <h1 className="font-display text-3xl lg:text-4xl text-gray-900 leading-tight mb-3">
                {product.name}
              </h1>
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center gap-1">
                  {[1,2,3,4,5].map(s => (
                    <Star key={s} className={`w-4 h-4 ${s <= Math.round(product.rating) ? 'fill-secondary text-secondary' : 'text-gray-200'}`} />
                  ))}
                </div>
                <span className="text-sm font-medium text-gray-700">{product.rating}</span>
                <span className="text-sm text-gray-400">({product.reviewCount} reviews)</span>
                <span className="text-sm text-green-600 font-medium">✓ Verified Authentic</span>
              </div>
              <p className="text-gray-600 leading-relaxed">{product.description}</p>
            </div>

            {/* Price */}
            <div className="flex items-end gap-4 py-4 border-y border-gray-100">
              <div>
                <div className="text-4xl font-bold text-primary">₹{price.toLocaleString()}</div>
                {original > price && (
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-gray-400 line-through text-lg">₹{original.toLocaleString()}</span>
                    <span className="text-green-600 font-semibold text-sm">Save ₹{(original - price).toLocaleString()}</span>
                  </div>
                )}
              </div>
              <div className="text-sm text-gray-500">Incl. all taxes</div>
            </div>

            {/* Quantity & CTA */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-gray-700">Quantity:</span>
                <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden">
                  <button
                    onClick={() => setQty(q => Math.max(1, q - 1))}
                    className="px-4 py-3 hover:bg-gray-50 transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-5 py-3 font-semibold text-gray-900 border-x border-gray-200 min-w-[50px] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQty(q => q + 1)}
                    className="px-4 py-3 hover:bg-gray-50 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <span className="text-sm text-green-600 font-medium">● In Stock</span>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => {
                    toast.success(`${product.name} added to cart`);
                  }}
                  className="flex-1 btn-primary flex items-center justify-center gap-2 py-4"
                >
                  <ShoppingCart className="w-5 h-5" />
                  Add to Cart
                </button>
                <button
                  onClick={() => {
                    setWishlist(!wishlist);
                    toast.success(wishlist ? 'Removed from wishlist' : 'Added to wishlist');
                  }}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    wishlist ? 'border-red-400 bg-red-50 text-red-500' : 'border-gray-200 hover:border-red-300 text-gray-500 hover:text-red-400'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${wishlist ? 'fill-red-400' : ''}`} />
                </button>
                <button
                  onClick={() => toast.success('Link copied!')}
                  className="p-4 rounded-xl border-2 border-gray-200 hover:border-primary/30 text-gray-500 hover:text-primary transition-all"
                >
                  <Share2 className="w-5 h-5" />
                </button>
              </div>

              <Link href="/checkout" className="block">
                <button className="w-full btn-gold py-4 font-semibold">
                  Buy Now — ₹{(price * quantity).toLocaleString()}
                </button>
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: Shield, text: '100% Authentic', sub: 'Certified products' },
                { icon: Truck, text: 'Free Delivery', sub: 'On orders ₹599+' },
                { icon: RefreshCw, text: 'Easy Returns', sub: '7-day return policy' },
                { icon: Award, text: 'AYUSH Licensed', sub: 'Govt. certified' },
              ].map(({ icon: Icon, text, sub }) => (
                <div key={text} className="flex items-center gap-3 p-3 bg-accent rounded-xl">
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-gray-900">{text}</div>
                    <div className="text-xs text-gray-500">{sub}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Key Highlights */}
            <div className="bg-primary/5 rounded-2xl p-5">
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <Leaf className="w-4 h-4 text-primary" />
                Key Highlights
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {(product.benefits || ['Natural Ingredients', 'No Side Effects', 'GMP Certified', 'Lab Tested']).slice(0, 6).map((b: string) => (
                  <div key={b} className="flex items-center gap-2 text-sm text-gray-700">
                    <Check className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                    {b}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-16">
          <div className="border-b border-gray-200 mb-8">
            <div className="flex gap-0 overflow-x-auto">
              {tabs.map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-4 text-sm font-semibold whitespace-nowrap transition-all border-b-2 -mb-px ${
                    activeTab === tab
                      ? 'border-primary text-primary'
                      : 'border-transparent text-gray-500 hover:text-gray-800'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {activeTab === 'Description' && (
                <div className="max-w-3xl prose prose-green">
                  <p className="text-gray-700 leading-relaxed text-base mb-4">{product.description}</p>
                  <p className="text-gray-700 leading-relaxed text-base">
                    Formulated using ancient Ayurvedic wisdom combined with modern pharmaceutical standards,
                    this product undergoes rigorous quality testing at every stage of production.
                    Each batch is tested for purity, potency, and safety before it reaches you.
                  </p>
                  <div className="grid sm:grid-cols-3 gap-4 mt-6 not-prose">
                    {[
                      { icon: FlaskConical, label: 'Lab Tested', value: '100% Pure' },
                      { icon: Package, label: 'Net Weight', value: product.weight || '60 Tablets' },
                      { icon: Award, label: 'Certification', value: 'AYUSH / GMP' },
                    ].map(({ icon: Icon, label, value }) => (
                      <div key={label} className="bg-accent rounded-xl p-4 text-center">
                        <Icon className="w-6 h-6 text-primary mx-auto mb-2" />
                        <div className="text-xs text-gray-500 mb-1">{label}</div>
                        <div className="font-semibold text-gray-900 text-sm">{value}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'Ingredients' && (
                <div className="max-w-3xl">
                  <p className="text-gray-600 mb-6">
                    All ingredients are sourced from certified organic farms and processed under strict quality controls.
                  </p>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {(product.ingredients || ['Ashwagandha', 'Shatavari', 'Brahmi', 'Triphala', 'Giloy', 'Tulsi']).map((ing: string) => (
                      <div key={ing} className="flex items-start gap-3 p-4 bg-accent rounded-xl">
                        <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Leaf className="w-4 h-4 text-primary" />
                        </div>
                        <div>
                          <div className="font-medium text-gray-900 text-sm">{ing}</div>
                          <div className="text-xs text-gray-500 mt-0.5">Certified Organic</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'Usage' && (
                <div className="max-w-2xl space-y-6">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">Recommended Dosage</h3>
                    <div className="space-y-3">
                      {['1-2 tablets twice daily', 'Take with warm water or milk', 'Best taken after meals'].map((step, i) => (
                        <div key={i} className="flex items-center gap-4 p-4 bg-accent rounded-xl">
                          <div className="w-8 h-8 rounded-full bg-primary text-white text-sm font-bold flex items-center justify-center flex-shrink-0">
                            {i + 1}
                          </div>
                          <span className="text-gray-700">{step}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                    <h4 className="font-semibold text-yellow-800 mb-2">⚠️ Precautions</h4>
                    <ul className="text-sm text-yellow-700 space-y-1">
                      <li>• Keep out of reach of children</li>
                      <li>• Store in a cool, dry place away from direct sunlight</li>
                      <li>• Pregnant or nursing women should consult a doctor</li>
                      <li>• Discontinue use if allergic reaction occurs</li>
                    </ul>
                  </div>
                </div>
              )}

              {activeTab === 'Reviews' && (
                <div className="max-w-3xl">
                  <div className="flex items-center gap-8 mb-8 p-6 bg-accent rounded-2xl">
                    <div className="text-center">
                      <div className="text-5xl font-bold text-primary">{product.rating}</div>
                      <div className="flex items-center justify-center gap-1 mt-2">
                        {[1,2,3,4,5].map(s => (
                          <Star key={s} className={`w-4 h-4 ${s <= Math.round(product.rating) ? 'fill-secondary text-secondary' : 'text-gray-200'}`} />
                        ))}
                      </div>
                      <div className="text-sm text-gray-500 mt-1">{product.reviewCount} reviews</div>
                    </div>
                    <div className="flex-1 space-y-2">
                      {[5,4,3,2,1].map(star => (
                        <div key={star} className="flex items-center gap-3">
                          <span className="text-xs text-gray-500 w-3">{star}</span>
                          <Star className="w-3 h-3 text-secondary fill-secondary" />
                          <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-secondary rounded-full"
                              style={{ width: `${star === 5 ? 65 : star === 4 ? 20 : star === 3 ? 10 : 3}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-4">
                    {reviews.map(review => (
                      <div key={review.id} className="p-5 border border-gray-100 rounded-2xl">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <div className="font-semibold text-gray-900">{review.userName}</div>
                            <div className="flex items-center gap-1 mt-1">
                              {[1,2,3,4,5].map(s => (
                                <Star key={s} className={`w-3 h-3 ${s <= review.rating ? 'fill-secondary text-secondary' : 'text-gray-200'}`} />
                              ))}
                            </div>
                          </div>
                          <span className="text-xs text-gray-400">{review.date}</span>
                        </div>
                        <p className="text-gray-600 text-sm leading-relaxed">{review.body}</p>
                        {review.verified && (
                          <div className="mt-2 text-xs text-green-600 font-medium flex items-center gap-1">
                            <Check className="w-3 h-3" />
                            Verified Purchase
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'FAQ' && (
                <div className="max-w-2xl space-y-3">
                  {faqs.map((faq, i) => (
                    <div key={i} className="border border-gray-200 rounded-xl overflow-hidden">
                      <button
                        className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50 transition-colors"
                        onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      >
                        <span className="font-medium text-gray-900">{faq.q}</span>
                        <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
                      </button>
                      <AnimatePresence>
                        {openFaq === i && (
                          <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: 'auto' }}
                            exit={{ height: 0 }}
                            className="overflow-hidden"
                          >
                            <p className="px-5 pb-5 text-gray-600 text-sm leading-relaxed">{faq.a}</p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <div className="mt-20">
            <SectionHeader
              eyebrow="You May Also Like"
              title="Related Products"
              description="Handpicked products that complement your wellness journey"
            />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8">
              {related.slice(0, 4).map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Zoom Modal */}
      <AnimatePresence>
        {zoomed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={() => setZoomed(false)}
          >
            <div className="relative w-full max-w-2xl aspect-square">
              <Image src={images[selectedImage]} alt={product.name} fill className="object-contain" />
            </div>
            <button className="absolute top-6 right-6 text-white text-2xl font-light hover:text-gray-300">✕</button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
