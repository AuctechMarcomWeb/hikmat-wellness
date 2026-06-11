import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: {
    default: "Hikmat Wellness — Authentic Ayurvedic & Unani Medicines",
    template: "%s | Hikmat Wellness",
  },
  description: "India's most trusted Ayurvedic & Unani wellness brand. 500+ authentic products, 50+ expert doctors, AYUSH certified. Shop herbal medicines, supplements & healthcare products.",
  keywords: ["ayurvedic medicines", "unani medicines", "herbal supplements", "natural health", "AYUSH certified", "India wellness"],
  authors: [{ name: "Hikmat Wellness" }],
  creator: "Hikmat Wellness",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://hikmatwellness.in",
    siteName: "Hikmat Wellness",
    title: "Hikmat Wellness — Authentic Ayurvedic & Unani Medicines",
    description: "India's most trusted Ayurvedic & Unani wellness brand.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="antialiased font-sans bg-white text-foreground">
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}
