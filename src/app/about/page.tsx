import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Award, Shield, Leaf, Users, TrendingUp, MapPin, CheckCircle } from 'lucide-react';
import { doctors } from '@/data/index';
import SectionHeader from '@/components/shared/SectionHeader';

export const metadata: Metadata = {
  title: 'About Hikmat Wellness | 25 Years of Authentic Ayurveda',
  description: 'Discover our story, mission, and commitment to bringing authentic Ayurvedic and Unani medicines to modern India.',
};

const milestones = [
  { year: '1999', title: 'Founded', desc: 'Started as a small pharmacy in Old Delhi, committed to authentic herbal medicines.' },
  { year: '2005', title: 'GMP Certification', desc: 'Obtained Good Manufacturing Practice certification from AYUSH Ministry.' },
  { year: '2010', title: 'National Expansion', desc: 'Expanded to 15 states with a network of 500+ registered practitioners.' },
  { year: '2015', title: '1 Million Customers', desc: 'Crossed 1 million satisfied customers across India.' },
  { year: '2018', title: 'Digital Launch', desc: 'Launched online platform to reach customers nationwide.' },
  { year: '2024', title: '2M+ Customers', desc: 'Serving over 2 million customers with 500+ authentic products.' },
];

const certifications = [
  { name: 'AYUSH Ministry', desc: 'Licensed by Ministry of Ayurveda, Yoga & Naturopathy', icon: Award },
  { name: 'GMP Certified', desc: 'Good Manufacturing Practice — WHO standard', icon: Shield },
  { name: 'ISO 9001:2015', desc: 'International Quality Management Standard', icon: CheckCircle },
  { name: 'FSSAI Approved', desc: 'Food Safety and Standards Authority of India', icon: Leaf },
];

const values = [
  { title: 'Authenticity', desc: 'Every product is sourced from certified farms and manufactured under strict quality controls.' },
  { title: 'Transparency', desc: 'Full ingredient disclosure and transparent manufacturing practices.' },
  { title: 'Efficacy', desc: 'Backed by thousands of years of traditional knowledge and modern research.' },
  { title: 'Accessibility', desc: 'Making quality Ayurvedic wellness accessible to every Indian household.' },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-primary-800 via-primary-600 to-primary-500 text-white overflow-hidden py-24">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%23fff%22 fill-opacity=%220.4%22%3E%3Cpath d=%22M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]" />
        </div>
        <div className="container-custom relative text-center">
          <span className="text-secondary font-semibold text-sm tracking-widest uppercase">Our Story</span>
          <h1 className="font-display text-5xl lg:text-7xl mt-4 mb-6">25 Years of<br />Pure Healing</h1>
          <p className="text-white/80 text-xl max-w-2xl mx-auto leading-relaxed">
            From a single pharmacy in Old Delhi to India&apos;s most trusted Ayurvedic wellness brand —
            our journey has always been about authentic healing.
          </p>
        </div>
      </section>

      {/* Stats Bar */}
      <div className="bg-white border-b border-gray-100">
        <div className="container-custom py-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { value: '25+', label: 'Years of Excellence', icon: TrendingUp },
              { value: '2M+', label: 'Happy Customers', icon: Users },
              { value: '500+', label: 'Authentic Products', icon: Leaf },
              { value: '50+', label: 'Expert Doctors', icon: Award },
            ].map(({ value, label, icon: Icon }) => (
              <div key={label} className="text-center">
                <Icon className="w-6 h-6 text-primary mx-auto mb-2" />
                <div className="font-display text-4xl font-bold text-primary">{value}</div>
                <div className="text-sm text-gray-600 mt-1">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mission & Vision */}
      <section className="section bg-accent">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <SectionHeader
                eyebrow="What Drives Us"
                title="Mission & Vision"
                titleHighlight="Vision"
                align="left"
              />
              <div className="mt-8 space-y-6">
                <div className="p-6 bg-white rounded-2xl shadow-card border-l-4 border-primary">
                  <h3 className="font-display text-xl text-primary mb-3">Our Mission</h3>
                  <p className="text-gray-600 leading-relaxed">
                    To make authentic, high-quality Ayurvedic and Unani medicines accessible to every Indian,
                    bridging ancient wisdom with modern healthcare standards through transparent, science-backed practices.
                  </p>
                </div>
                <div className="p-6 bg-white rounded-2xl shadow-card border-l-4 border-secondary">
                  <h3 className="font-display text-xl text-secondary-600 mb-3">Our Vision</h3>
                  <p className="text-gray-600 leading-relaxed">
                    To be India&apos;s most trusted wellness brand, recognized globally for championing traditional
                    Indian medicine systems while meeting the highest international quality standards.
                  </p>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=600&q=80"
                  alt="Manufacturing facility"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-primary text-white p-6 rounded-2xl shadow-luxury-lg max-w-[200px]">
                <MapPin className="w-5 h-5 mb-2" />
                <div className="font-bold text-2xl">Delhi NCR</div>
                <div className="text-white/80 text-sm">State-of-the-art manufacturing facility</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="section">
        <div className="container-custom">
          <SectionHeader
            eyebrow="What We Stand For"
            title="Our Core Values"
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {values.map((v, i) => (
              <div key={v.title} className="card-luxury p-6 text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span className="font-display text-2xl font-bold text-primary">{String(i + 1).padStart(2, '0')}</span>
                </div>
                <h3 className="font-display text-lg text-gray-900 mb-3">{v.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section bg-primary text-white">
        <div className="container-custom">
          <SectionHeader
            eyebrow="Our Journey"
            title="25 Years of Growth"
            description="From a single pharmacy to India's leading Ayurvedic wellness platform"
            className="[&_h2]:text-white [&_p]:text-white/70 [&_span]:text-secondary"
          />
          <div className="mt-12 relative">
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/20 hidden lg:block" />
            <div className="space-y-8">
              {milestones.map((m, i) => (
                <div key={m.year} className={`grid lg:grid-cols-2 gap-8 items-center ${i % 2 === 0 ? '' : 'lg:direction-rtl'}`}>
                  <div className={`${i % 2 === 0 ? 'lg:text-right' : 'lg:col-start-2'}`}>
                    <div className="inline-block bg-secondary text-white font-bold text-lg px-4 py-2 rounded-xl mb-3">
                      {m.year}
                    </div>
                    <h3 className="font-display text-2xl mb-2">{m.title}</h3>
                    <p className="text-white/70 leading-relaxed">{m.desc}</p>
                  </div>
                  <div className={`hidden lg:block ${i % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}`} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="section bg-accent">
        <div className="container-custom">
          <SectionHeader
            eyebrow="Quality Assurance"
            title="Our Certifications"
            description="Every product meets the highest standards of quality, safety and efficacy"
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {certifications.map(({ name, desc, icon: Icon }) => (
              <div key={name} className="card-luxury p-6 text-center">
                <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{name}</h3>
                <p className="text-gray-500 text-sm">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Expert Team */}
      <section className="section">
        <div className="container-custom">
          <SectionHeader
            eyebrow="Our Experts"
            title="The Team Behind Your Health"
            description="Certified Ayurvedic doctors, pharmacists, and wellness specialists"
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {doctors.map(doc => (
              <div key={doc.id} className="card-luxury p-6 text-center">
                <div className="relative w-20 h-20 mx-auto mb-4">
                  <Image src={doc.avatar} alt={doc.name} fill className="rounded-full object-cover" />
                </div>
                <h3 className="font-semibold text-gray-900">{doc.name}</h3>
                <p className="text-primary text-sm font-medium mt-1">{doc.specialization}</p>
                <p className="text-gray-500 text-xs mt-1">{doc.experience} yrs exp.</p>
                <div className="flex justify-center gap-1 mt-2">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-secondary text-xs">★</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section bg-gradient-to-r from-primary to-primary-600 text-white">
        <div className="container-custom text-center">
          <h2 className="font-display text-4xl mb-4">Start Your Wellness Journey</h2>
          <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">
            Join 2 million+ Indians who trust Hikmat Wellness for authentic Ayurvedic healthcare.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/shop" className="btn-gold px-8 py-4 font-semibold">
              Shop Products
            </Link>
            <Link href="/consultation" className="bg-white/10 border border-white/30 hover:bg-white/20 text-white px-8 py-4 rounded-xl font-semibold transition-all">
              Book Consultation
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
