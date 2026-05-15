import React, { CSSProperties } from "react";

export default function RentalMobilPage() {
  return (
    <main style={{ backgroundColor: '#fff', minHeight: '100vh' }}>
      
      {/* 1. HERO HEADER */}
      <section className="rental-hero" style={{ padding: '120px 24px 60px', backgroundColor: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: '800', color: '#111', marginBottom: '16px', letterSpacing: '-0.02em' }}>
            Armada Rental KDS Trans
          </h1>
          <p style={{ fontSize: '1rem', color: '#6b7280', maxWidth: '600px', lineHeight: '1.6' }}>
            Pilihan armada lengkap, terawat, dan siap menemani perjalanan Anda di Jawa Timur. Tersedia opsi lepas kunci atau dengan driver.
          </p>
        </div>
      </section>

      {/* 2. CITY CAR SECTION */}
      <section style={{ padding: '60px 24px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
          <span>🚗</span>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '800' }}>City Car & LCGC</h2>
        </div>
        
        <div className="cars-grid" style={gridStyle}>
          {[
            { img: "/images/Brio_old.jpeg", name: "Honda Brio Old", price: "250.000", desc: "Nyaman, irit, dan lincah. Sangat cocok untuk perjalanan santai." },
            { img: "/images/Brio_new_.jpg", name: "Honda Brio New", price: "300.000", desc: "Generasi terbaru dengan desain lebih sporty dan kabin lebih lega." },
            { img: "/images/Ayla_foto.jpg", name: "Daihatsu Ayla", price: "250.000", desc: "Ekonomis dan praktis. Pilihan tepat untuk perjalanan hemat harian." },
            { img: "/images/Ayla_.jpeg", name: "Daihatsu Ayla New", price: "300.000", desc: "Versi terbaru dengan fitur modern dan efisiensi optimal." },
            { img: "/images/Toyota_raize_Foto.jpg", name: "Toyota Raize", price: "350.000", desc: "Compact SUV stylish dengan performa turbo, cocok untuk gaya hidup dinamis." },
            { img: "/images/Rocky_Foto.jpg", name: "Daihatsu Rocky", price: "350.000", desc: "SUV dengan ground clearance tinggi, siap menemani petualangan Anda." },
          ].map((car, i) => (
            <div key={i} style={carCardStyle}>
              <div style={carImgContainer}><img src={car.img} alt={car.name} style={carImgStyle} /><span style={typeBadge}>Self Drive</span></div>
              <div style={carBody}>
                <h4 style={carTitle}>{car.name}</h4>
                <div style={carPrice}>Rp {car.price}/hari</div>
                <p style={carDesc}>{car.desc}</p>
                <a href={`https://wa.me/6285143010008`} style={btnSewa}>Sewa Sekarang</a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. MPV SECTION */}
      <section style={{ padding: '80px 24px', backgroundColor: '#f9fafb', borderTop: '1px solid #e5e7eb', borderBottom: '1px solid #e5e7eb' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '800', marginBottom: '30px' }}>🚐 MPV / Family</h2>
          <div className="cars-grid" style={gridStyle}>
            {[
              { img: "/images/Avanza_Ground_Foto.jpg", name: "Toyota Avanza (Grand Facelift)", price: "250.000", desc: "Mobil keluarga andalan, tangguh di segala medan Jawa Timur." },
              { img: "/images/Avanza_New_Foto.jpg", name: "Toyota All New Avanza", price: "350.000", desc: "Tampilan lebih modern, fitur keselamatan lengkap, kenyamanan ekstra." },
              { img: "/images/Innova_Foto.jpg", name: "Toyota Innova Reborn", price: "450.000", desc: "Premium MPV dengan kenyamanan kelas atas untuk jarak jauh." },
              { img: "/images/Stargazer.jpeg", name: "Hyundai Stargazer", price: "350.000", desc: "Interior sangat lapang dan desain futuristik untuk keluarga." },
            ].map((car, i) => (
              <div key={i} style={carCardStyle}>
                <div style={carImgContainer}><img src={car.img} alt={car.name} style={carImgStyle} /><span style={typeBadge}>Self Drive / Driver</span></div>
                <div style={carBody}>
                  <h4 style={carTitle}>{car.name}</h4>
                  <div style={carPrice}>Rp {car.price}/hari</div>
                  <p style={carDesc}>{car.desc}</p>
                  <a href={`https://wa.me/6285143010008`} style={btnSewa}>Sewa Sekarang</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. PREMIUM SECTION */}
      <section style={{ padding: '80px 24px', maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '40px', fontWeight: '800' }}>Premium & Microbus VIP</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '24px' }}>
          {[
            { img: "/images/Fortuner_Foto.jpg", name: "Toyota Fortuner", price: "1.000.000" },
            { img: "/images/Pajero_Foto.jpg", name: "Mitsubishi Pajero", price: "1.500.000" },
            { img: "/images/Alphard_Foto.jpg", name: "Toyota Alphard", price: "3.500.000" },
            { img: "/images/Hiace_Commuter_Foto.jpg", name: "Hiace Commuter", price: "Hubungi Kami" },
            { img: "/images/Hiace_Premio_Foto.jpg", name: "Hiace Luxury", price: "1.000.000" },
            { img: "/images/Hiace_Luxury.jpeg", name: "Hiace Premio Luxury", price: "1.800.000" },
          ].map((car, i) => (
            <div key={i} className="flex-mobile-column" style={premiumCard}>
              <img src={car.img} alt={car.name} style={premiumImg} />
              <div style={{ flex: 1 }}>
                <h4 style={premiumTitle}>{car.name}</h4>
                <div style={carPrice}>{car.price}</div>
                <a href="https://wa.me/6285143010008" style={{ color: '#25D366', fontWeight: '700', textDecoration: 'none', fontSize: '0.85rem' }}>💬 Pesan via WA</a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. CTA SECTION */}
      <section style={{ padding: '60px 24px' }}>
        <div className="cta-container" style={{ maxWidth: '1000px', margin: '0 auto', backgroundColor: '#111', borderRadius: '24px', padding: '60px 40px', textAlign: 'center', color: '#fff' }}>
          <h2 style={{ marginBottom: '16px', fontWeight: '800' }}>Butuh Rekomendasi Armada?</h2>
          <a href="https://wa.me/6285143010008" style={{ backgroundColor: '#25D366', color: '#fff', padding: '14px 30px', borderRadius: '50px', fontWeight: '800', textDecoration: 'none', display: 'inline-block' }}>
            Konsultasi via WhatsApp
          </a>
        </div>
      </section>
    </main>
  );
}

// --- STYLES ---
const gridStyle: CSSProperties = { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' };
const carCardStyle: CSSProperties = { backgroundColor: '#fff', borderRadius: '16px', border: '1px solid #e5e7eb', overflow: 'hidden', display: 'flex', flexDirection: 'column' };
const carImgContainer: CSSProperties = { position: 'relative', height: '180px', backgroundColor: '#fff', padding: '10px' };
const carImgStyle: CSSProperties = { width: '100%', height: '100%', objectFit: 'contain' };
const typeBadge: CSSProperties = { position: 'absolute', top: '12px', left: '12px', backgroundColor: 'rgba(255,255,255,0.9)', padding: '4px 10px', borderRadius: '50px', fontSize: '0.7rem', fontWeight: '800', border: '1px solid #eee' };
const carBody: CSSProperties = { padding: '20px', flex: 1, display: 'flex', flexDirection: 'column' };
const carTitle: CSSProperties = { fontSize: '1.1rem', fontWeight: '800', margin: '0 0 5px 0' };
const carPrice: CSSProperties = { color: '#E8341A', fontWeight: '800', fontSize: '1rem', marginBottom: '10px' };
const carDesc: CSSProperties = { color: '#6b7280', fontSize: '0.85rem', lineHeight: '1.5', marginBottom: '20px' };
const btnSewa: CSSProperties = { marginTop: 'auto', backgroundColor: '#25D366', color: '#fff', textAlign: 'center', padding: '12px', borderRadius: '10px', fontWeight: '800', textDecoration: 'none', fontSize: '0.9rem' };
const premiumCard: CSSProperties = { display: 'flex', alignItems: 'center', padding: '20px', backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '16px', gap: '20px' };
const premiumImg: CSSProperties = { width: '100px', height: '70px', objectFit: 'contain' };
const premiumTitle: CSSProperties = { fontWeight: '800', fontSize: '1rem', margin: 0 };