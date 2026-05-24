import React, { CSSProperties } from "react";
import Reveal from "../components/Reveal";
export default function RentalMobilPage() {
  return (
    <main className="page-enter" style={{ backgroundColor: "#fff", minHeight: "100vh" }}>

      <div className="page-hero">
        <div className="page-hero-inner">
          <h1>Armada Rental KDS Trans</h1>
          <p>Pilihan armada lengkap, terawat, dan siap menemani perjalanan Anda di Jawa Timur. Tersedia opsi lepas kunci atau dengan driver.</p>
        </div>
      </div>

      {/* CITY CAR */}
      <section style={{ padding: "60px 24px", maxWidth: "1200px", margin: "0 auto" }}>
        <Reveal>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "10px" }}>
            <span>🚗</span>
            <h2 style={{ fontSize: "1.5rem", fontWeight: "800" }}>City Car &amp; LCGC</h2>
          </div>
          <p style={{ color: "var(--text-light)", fontSize: "0.9rem", marginBottom: "28px" }}>
            Ekonomis, irit, dan lincah. Cocok untuk perjalanan kota maupun wisata ringan.
          </p>
        </Reveal>
        <div className="cars-grid">
          {[
            { img: "/images/Brio_old.jpeg",        name: "Honda Brio Old",    price: "250.000", desc: "Nyaman, irit, dan lincah. Sangat cocok untuk perjalanan santai." },
            { img: "/images/Brio_new_.jpg",         name: "Honda Brio New",    price: "300.000", desc: "Generasi terbaru dengan desain lebih sporty dan kabin lebih lega." },
            { img: "/images/Ayla_foto.jpg",         name: "Daihatsu Ayla",     price: "250.000", desc: "Ekonomis dan praktis. Pilihan tepat untuk perjalanan hemat harian." },
            { img: "/images/Ayla_.jpeg",            name: "Daihatsu Ayla New", price: "300.000", desc: "Versi terbaru dengan fitur modern dan efisiensi optimal." },
            { img: "/images/Toyota_raize_Foto.jpg", name: "Toyota Raize",      price: "350.000", desc: "Compact SUV stylish dengan performa turbo, cocok untuk gaya hidup dinamis." },
            { img: "/images/Rocky_Foto.jpg",        name: "Daihatsu Rocky",    price: "350.000", desc: "SUV dengan ground clearance tinggi, siap menemani petualangan Anda." },
          ].map((car, i) => (
            <Reveal key={i} delay={i * 80}>
              <div style={carCardStyle}>
                <div style={carImgContainer}>
                  <img src={car.img} alt={car.name} style={carImgStyle} />
                  <span style={typeBadge}>Self Drive</span>
                </div>
                <div style={carBody}>
                  <h4 style={carTitle}>{car.name}</h4>
                  <div style={carPrice}>Rp {car.price}/hari</div>
                  <p style={carDesc}>{car.desc}</p>
                  <a href={`https://wa.me/6285143010008?text=${encodeURIComponent(`Halo KDS Trans, saya ingin menyewa ${car.name}. Mohon info ketersediaan.`)}`} target="_blank" rel="noopener noreferrer" style={btnSewa}>
                    Sewa Sekarang
                  </a>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* MPV */}
      <section style={{ padding: "60px 24px", backgroundColor: "var(--bg-soft)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <Reveal>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "10px" }}>
              <span>🚐</span>
              <h2 style={{ fontSize: "1.5rem", fontWeight: "800" }}>MPV &amp; Family</h2>
            </div>
            <p style={{ color: "var(--text-light)", fontSize: "0.9rem", marginBottom: "28px" }}>
              Luas dan nyaman untuk perjalanan keluarga atau grup kecil ke mana saja di Jawa Timur.
            </p>
          </Reveal>
          <div className="cars-grid">
            {[
              { img: "/images/Avanza_Ground_Foto.jpg", name: "Toyota Avanza (Grand Facelift)", price: "250.000", desc: "Mobil keluarga andalan, tangguh di segala medan Jawa Timur.",           tipe: "Self Drive / Driver" },
              { img: "/images/Avanza_New_Foto.jpg",    name: "Toyota All New Avanza",          price: "350.000", desc: "Tampilan lebih modern, fitur keselamatan lengkap, kenyamanan ekstra.", tipe: "Self Drive / Driver" },
              { img: "/images/Innova_Foto.jpg",        name: "Toyota Innova Reborn",           price: "450.000", desc: "Premium MPV dengan kenyamanan kelas atas untuk jarak jauh.",          tipe: "Dengan Driver" },
              { img: "/images/Stargazer.jpeg",         name: "Hyundai Stargazer",              price: "350.000", desc: "Interior sangat lapang dan desain futuristik untuk keluarga.",         tipe: "Self Drive / Driver" },
            ].map((car, i) => (
              <Reveal key={i} delay={i * 80}>
                <div style={carCardStyle}>
                  <div style={carImgContainer}>
                    <img src={car.img} alt={car.name} style={carImgStyle} />
                    <span style={typeBadge}>{car.tipe}</span>
                  </div>
                  <div style={carBody}>
                    <h4 style={carTitle}>{car.name}</h4>
                    <div style={carPrice}>Rp {car.price}/hari</div>
                    <p style={carDesc}>{car.desc}</p>
                    <a href={`https://wa.me/6285143010008?text=${encodeURIComponent(`Halo KDS Trans, saya ingin menyewa ${car.name}. Mohon info ketersediaan.`)}`} target="_blank" rel="noopener noreferrer" style={btnSewa}>
                      Sewa Sekarang
                    </a>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PREMIUM */}
      <section style={{ padding: "60px 24px", maxWidth: "1200px", margin: "0 auto" }}>
        <Reveal>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "10px" }}>
            <span>🚌</span>
            <h2 style={{ fontSize: "1.5rem", fontWeight: "800" }}>Premium &amp; Microbus VIP</h2>
          </div>
          <p style={{ color: "var(--text-light)", fontSize: "0.9rem", marginBottom: "28px" }}>
            Armada premium dan kapasitas besar untuk perjalanan mewah atau rombongan.
          </p>
        </Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: "20px" }}>
          {[
            { img: "/images/Fortuner_Foto.jpg",       name: "Toyota Fortuner",     price: "Rp 1.000.000/hari", desc: "SUV tangguh dan prestisius. Nyaman untuk medan wisata berat sekalipun." },
            { img: "/images/Pajero_Foto.jpg",         name: "Mitsubishi Pajero",   price: "Rp 1.500.000/hari", desc: "Performa off-road andal dengan kabin mewah untuk perjalanan jauh." },
            { img: "/images/Alphard_Foto.jpg",        name: "Toyota Alphard",      price: "Rp 3.500.000/hari", desc: "Simbol kemewahan. Captain seat, suspensi empuk, ketenangan kabin premium." },
            { img: "/images/Hiace_Commuter_Foto.jpg", name: "Hiace Commuter",      price: "Hubungi Kami",      desc: "Kapasitas besar 14-15 seat. Solusi tepat untuk rombongan." },
            { img: "/images/Hiace_Premio_Foto.jpg",   name: "Hiace Luxury",        price: "Rp 1.000.000/hari", desc: "Desain eropa lebih mewah, suspensi empuk, kapasitas 11-14 seat." },
            { img: "/images/Hiace_Luxury.jpeg",       name: "Hiace Premio Luxury", price: "Rp 1.800.000/hari", desc: "Varian paling mewah. Captain seat kulit, entertainment system." },
          ].map((car, i) => (
            <Reveal key={i} delay={i * 80}>
              <div className="flex-mobile-column" style={premiumCard}>
                <div style={premiumImgWrapper}>
                  <img src={car.img} alt={car.name} style={premiumImg} />
                </div>
                <div style={{ flex: 1 }}>
                  <h4 style={premiumTitle}>{car.name}</h4>
                  <div style={{ ...carPrice, marginBottom: "6px" }}>{car.price}</div>
                  <p style={{ ...carDesc, marginBottom: "10px" }}>{car.desc}</p>
                  <a href={`https://wa.me/6285143010008?text=${encodeURIComponent(`Halo KDS Trans, saya ingin info armada ${car.name}.`)}`} target="_blank" rel="noopener noreferrer" style={{ color: "var(--green-wa)", fontWeight: "700", textDecoration: "none", fontSize: "0.85rem" }}>
                    💬 Pesan via WA
                  </a>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "0 24px 80px" }}>
        <Reveal direction="scale">
          <div className="cta-box" style={{ maxWidth: "1000px", margin: "0 auto" }}>
            <h2>Butuh Rekomendasi Armada?</h2>
            <p>Tim kami siap membantu Anda memilih mobil yang paling sesuai kebutuhan dan anggaran perjalanan.</p>
            <a href="https://wa.me/6285143010008?text=Halo%20KDS%20Trans%2C%20saya%20butuh%20rekomendasi%20armada." target="_blank" rel="noopener noreferrer" className="btn-wa-large">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.136.561 4.14 1.535 5.874L0 24l6.335-1.512A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.006-1.368l-.36-.214-3.726.889.928-3.63-.234-.373A9.818 9.818 0 012.182 12c0-5.421 4.397-9.818 9.818-9.818 5.421 0 9.818 4.397 9.818 9.818 0 5.421-4.397 9.818-9.818 9.818z"/></svg>
              Konsultasi via WhatsApp
            </a>
          </div>
        </Reveal>
      </section>
    </main>
  );
}

const carCardStyle:      CSSProperties = { backgroundColor: "#fff", borderRadius: "16px", border: "1px solid var(--border)", overflow: "hidden", display: "flex", flexDirection: "column", boxShadow: "var(--shadow-sm)" };
const carImgContainer:   CSSProperties = { position: "relative", height: "180px", backgroundColor: "#fff", padding: "10px" };
const carImgStyle:       CSSProperties = { width: "100%", height: "100%", objectFit: "contain" };
const typeBadge:         CSSProperties = { position: "absolute", top: "12px", left: "12px", backgroundColor: "rgba(255,255,255,0.92)", padding: "4px 10px", borderRadius: "50px", fontSize: "0.7rem", fontWeight: "800", border: "1px solid #eee" };
const carBody:           CSSProperties = { padding: "20px", flex: 1, display: "flex", flexDirection: "column" };
const carTitle:          CSSProperties = { fontSize: "1rem", fontWeight: "800", margin: "0 0 5px 0", color: "var(--dark)" };
const carPrice:          CSSProperties = { color: "var(--red)", fontWeight: "800", fontSize: "1rem", marginBottom: "10px" };
const carDesc:           CSSProperties = { color: "var(--text-light)", fontSize: "0.85rem", lineHeight: "1.5", marginBottom: "20px", flex: 1 };
const btnSewa:           CSSProperties = { marginTop: "auto", backgroundColor: "var(--green-wa)", color: "#fff", textAlign: "center", padding: "12px", borderRadius: "10px", fontWeight: "800", textDecoration: "none", fontSize: "0.9rem", display: "block" };
const premiumCard:       CSSProperties = { display: "flex", alignItems: "center", padding: "20px", backgroundColor: "#fff", border: "1px solid var(--border)", borderRadius: "16px", gap: "20px", boxShadow: "var(--shadow-sm)" };
const premiumImgWrapper: CSSProperties = { width: "150px", height: "100px", flexShrink: 0, backgroundColor: "#ffffff", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", border: "1px solid #f0f0f0" };
const premiumImg:        CSSProperties = { width: "140px", height: "90px", objectFit: "contain" };
const premiumTitle:      CSSProperties = { fontWeight: "800", fontSize: "1rem", margin: "0 0 4px 0", color: "var(--dark)" };
