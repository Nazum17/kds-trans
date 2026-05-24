import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import WhatsAppFloat from "./components/WhatsAppFloat";

const BASE_URL = "https://kds-trans.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "KDS Trans – Rental Mobil & Paket Wisata Malang Terpercaya",
    template: "%s | KDS Trans Malang",
  },
  description: "KDS Trans menyediakan rental mobil dan paket wisata di Malang, Bromo, Kawah Ijen, dan seluruh Jawa Timur. Armada terawat, driver berpengalaman, harga terjangkau. Hubungi kami via WhatsApp.",
  keywords: [
    "rental mobil malang", "sewa mobil malang", "paket wisata bromo",
    "paket wisata malang", "wisata bromo midnight", "rental mobil jawa timur",
    "sewa hiace malang", "paket wisata kawah ijen", "tour malang batu",
    "KDS Trans", "rental mobil murah malang", "driver wisata malang",
  ],
  authors: [{ name: "KDS Trans", url: BASE_URL }],
  creator: "KDS Trans",
  publisher: "KDS Trans",
  formatDetection: { telephone: true, email: false, address: true },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: BASE_URL,
    siteName: "KDS Trans",
    title: "KDS Trans – Rental Mobil & Paket Wisata Malang Terpercaya",
    description: "Rental mobil dan paket wisata terpercaya di Malang. Armada lengkap, driver berpengalaman, harga terjangkau. Bromo, Kawah Ijen, Malang-Batu & more.",
    images: [{ url: "/images/Logo.jpeg", width: 800, height: 800, alt: "KDS Trans Logo" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "KDS Trans – Rental Mobil & Paket Wisata Malang",
    description: "Rental mobil dan paket wisata terpercaya di Malang, Jawa Timur.",
    images: ["/images/Logo.jpeg"],
  },
  robots: {
    index: true, follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  alternates: { canonical: BASE_URL },
};

// JSON-LD Structured Data untuk bisnis lokal
const structuredData = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": BASE_URL,
  name: "KDS Trans",
  description: "Layanan rental mobil dan paket wisata terpercaya di Malang, Jawa Timur",
  url: BASE_URL,
  telephone: "+6285143010008",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Malang",
    addressRegion: "Jawa Timur",
    addressCountry: "ID",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: -7.9666,
    longitude: 112.6326,
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
    opens: "06:00",
    closes: "22:00",
  },
  priceRange: "Rp 250.000 - Rp 3.500.000",
  servesCuisine: null,
  image: `${BASE_URL}/images/Logo.jpeg`,
  sameAs: [`https://wa.me/6285143010008`],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Layanan KDS Trans",
    itemListElement: [
      { "@type": "Offer", name: "Rental Mobil Malang", description: "Sewa mobil dengan atau tanpa driver di Malang dan Jawa Timur" },
      { "@type": "Offer", name: "Paket Wisata Bromo", description: "Paket wisata ke Bromo, Kawah Ijen, Tumpak Sewu, dan Malang Batu" },
    ],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <meta name="google-site-verification" content="GANTI_DENGAN_KODE_DARI_SEARCH_CONSOLE" />
      </head>
      <body className="antialiased">
        <Navbar />
        {children}
        <Footer />
        <WhatsAppFloat />
      </body>
    </html>
  );
}
