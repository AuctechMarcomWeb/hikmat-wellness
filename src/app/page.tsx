import type { Metadata } from "next";
import HeroSection from "@/components/home/HeroSection";
import FeaturesSection from "@/components/home/FeaturesSection";
import CategoriesSection from "@/components/home/CategoriesSection";
import BestSellersSection from "@/components/home/BestSellersSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import BlogPreviewSection from "@/components/home/BlogPreviewSection";
import NewsletterSection from "@/components/home/NewsletterSection";
import DoctorRecommendationsSection from "@/components/home/DoctorRecommendationsSection";

export const metadata: Metadata = {
  title: "Hikmat Wellness | Premium Ayurvedic & Unani Medicines Online",
  description:
    "Shop 500+ authentic Ayurvedic & Unani products. Free doctor consultation, GMP certified, fast delivery. Shilajit, Ashwagandha, Chyawanprash & more.",
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <CategoriesSection />
      <BestSellersSection />
      <DoctorRecommendationsSection />
      <TestimonialsSection />
      <BlogPreviewSection />
      <NewsletterSection />
    </>
  );
}
