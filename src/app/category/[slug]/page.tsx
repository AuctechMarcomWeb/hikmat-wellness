import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';
import { ChevronRight } from 'lucide-react';
import { getProductsByCategory } from '@/data/products';
import { categories } from '@/data/index';
import ProductCard from '@/components/shared/ProductCard';
import SectionHeader from '@/components/shared/SectionHeader';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const cat = categories.find(c => c.slug === slug);
  return {
    title: `${cat?.name || 'Category'} — Ayurvedic Products | Hikmat Wellness`,
    description: cat?.description || 'Browse authentic Ayurvedic products',
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const category = categories.find(c => c.slug === slug) || categories[0];
  const products = getProductsByCategory(slug);

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="bg-accent border-b border-gray-100">
        <div className="container-custom py-3">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-primary">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/shop" className="hover:text-primary">Shop</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-gray-900 font-medium">{category.name}</span>
          </div>
        </div>
      </div>

      {/* Banner */}
      <div className="relative bg-gradient-to-br from-primary-700 to-primary-500 text-white py-16 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <Image src={category.image} alt={category.name} fill className="object-cover" />
        </div>
        <div className="container-custom relative text-center">
          <div className="text-4xl mb-4">{category.icon}</div>
          <h1 className="font-display text-4xl lg:text-5xl mb-4">{category.name}</h1>
          <p className="text-white/80 text-lg max-w-xl mx-auto">{category.description}</p>
          <div className="mt-4 text-secondary font-semibold">{products.length} Products</div>
        </div>
      </div>

      <div className="container-custom py-12">
        {products.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">{category.icon}</div>
            <h2 className="font-display text-2xl text-gray-900 mb-3">Coming Soon</h2>
            <p className="text-gray-500 mb-6">Products in this category are being added.</p>
            <Link href="/shop" className="btn-primary px-8 py-3">Browse All Products</Link>
          </div>
        )}

        {/* Related Categories */}
        <div className="mt-16">
          <SectionHeader eyebrow="Explore More" title="Related Categories" />
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
            {categories.filter(c => c.slug !== slug).slice(0, 4).map(cat => (
              <Link key={cat.id} href={`/category/${cat.slug}`} className="card-luxury p-5 text-center hover:shadow-luxury-lg transition-all group">
                <div className="text-3xl mb-3">{cat.icon}</div>
                <div className="font-medium text-gray-900 group-hover:text-primary transition-colors">{cat.name}</div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
