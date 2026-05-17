import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import WhatsAppFloat from "./components/WhatsAppFloat";

export const metadata: Metadata = {
  title: "KDS Trans – Rental Mobil & Paket Wisata Malang Terpercaya",
  description: "KDS Trans menyediakan rental mobil dan paket wisata di Malang, Bromo, Kawah Ijen, dan seluruh Jawa Timur. Armada terawat, driver berpengalaman, harga terjangkau.",
  keywords: "rental mobil malang, paket wisata bromo, sewa mobil malang, wisata jawa timur, KDS Trans",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body className="antialiased">
        <Navbar />
        {children}
        <Footer />
        <WhatsAppFloat />
      </body>
    </html>
  );
}
