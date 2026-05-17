import Link from "next/link";

const WA_SVG = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.136.561 4.14 1.535 5.874L0 24l6.335-1.512A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.006-1.368l-.36-.214-3.726.889.928-3.63-.234-.373A9.818 9.818 0 012.182 12c0-5.421 4.397-9.818 9.818-9.818 5.421 0 9.818 4.397 9.818 9.818 0 5.421-4.397 9.818-9.818 9.818z"/>
  </svg>
);

export default function HomePage() {
  return (
    <main>
      {/* ── HERO ── */}
      <section className="hero">
        <div className="hero-bg">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/night-bromo_.jpeg" alt="Bromo" className="hero-img" />
          <div className="hero-overlay" />
        </div>
        <div className="hero-content">
          <h1>Rental Mobil &amp; Paket Wisata Malang</h1>
          <p>Melayani kebutuhan transportasi dan perjalanan wisata Anda dengan nyaman, aman, dan terpercaya di seluruh Jawa Timur.</p>
          <a href="#layanan" className="btn-hero">Jelajahi Layanan ↓</a>
        </div>
      </section>

      {/* ── LAYANAN UTAMA ── */}
      <section className="section" id="layanan">
        <div className="container">
          <div className="section-header">
            <h2>Layanan Utama Kami</h2>
            <p>Pilih layanan yang sesuai dengan rencana perjalanan Anda. Kami siap memberikan pengalaman terbaik.</p>
          </div>

          {/* 2 kolom fix, tidak pakai auto-fill */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
            <Link href="/rental-mobil" className="layanan-card">
              <div className="layanan-img">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/Mobil_banyak.jpg" alt="Rental Mobil KDS Trans" />
                <span className="layanan-badge">Unit Terawat</span>
              </div>
              <div className="layanan-body">
                <h3>Rental Mobil</h3>
                <p>Berbagai pilihan mobil untuk kebutuhan perjalanan Anda, mulai dari city car hingga hiace untuk rombongan.</p>
                <span className="layanan-link">Lihat Pilihan Mobil →</span>
              </div>
            </Link>

            <Link href="/paket-wisata" className="layanan-card">
              <div className="layanan-img">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/foto_wisata.jpeg" alt="Paket Wisata Bromo" />
                <span className="layanan-badge best-seller">Best Seller</span>
              </div>
              <div className="layanan-body">
                <h3>Paket Wisata</h3>
                <p>Paket wisata menarik dengan pengalaman terbaik ke Bromo, Kawah Ijen, Malang Batu, dan destinasi lainnya.</p>
                <span className="layanan-link">Jelajahi Paket →</span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="cta-box">
            <h2>Siap Merencanakan Perjalanan?</h2>
            <p>Hubungi kami sekarang untuk konsultasi gratis dan penawaran terbaik.</p>
            <a
              href="https://wa.me/6285143010008?text=Halo%20KDS%20Trans%2C%20saya%20ingin%20memesan%20layanan"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-wa-large"
            >
              {WA_SVG} Chat WhatsApp Sekarang
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
