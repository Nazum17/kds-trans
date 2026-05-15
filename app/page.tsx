import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="hero-bg">
          <Image 
            src="/images/night-bromo_.jpeg" 
            alt="Bromo Midnight" 
            fill 
            className="hero-img"
            priority
          />
          <div className="hero-overlay"></div>
        </div>
        <div className="hero-content">
          <h1>Rental Mobil & Paket Wisata Malang</h1>
          <p>Melayani kebutuhan transportasi dan perjalanan wisata Anda dengan nyaman, aman, dan terpercaya di seluruh Jawa Timur.</p>
          <a href="#layanan" className="btn-hero">Jelajahi Layanan ↓</a>
        </div>
      </section>

      <section className="section" id="layanan">
        <div className="container">
          <div className="section-header">
            <h2>Layanan Utama Kami</h2>
            <p>Pilih layanan yang sesuai dengan rencana perjalanan Anda. Kami siap memberikan pengalaman terbaik.</p>
          </div>
          
          <div className="layanan-grid">
            <Link href="/rental-mobil" className="layanan-card">
              <div className="layanan-img">
                <Image src="/images/Mobil_banyak.jpg" alt="Rental Mobil" width={600} height={400} />
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
                <Image src="/images/foto_wisata.jpeg" alt="Paket Wisata" width={600} height={400} />
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
    </>
  );
}