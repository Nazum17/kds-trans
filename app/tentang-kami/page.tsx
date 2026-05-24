import Reveal from "../components/Reveal";
export default function TentangKamiPage() {
  return (
    <main className="page-enter" style={{ backgroundColor: "#fff", minHeight: "100vh" }}>
      <section style={{ padding: "120px 24px 80px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div className="tentang-grid">
            <Reveal direction="left">
              <div>
                <span className="tentang-tag">TENTANG KAMI</span>
                <h1 style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)", fontWeight: "800", color: "var(--dark)", marginBottom: "16px", letterSpacing: "-0.02em", lineHeight: "1.2" }}>
                  Perjalanan Nyaman, Aman, dan Terpercaya
                </h1>
                <p style={{ color: "var(--text-light)", fontSize: "0.97rem", lineHeight: "1.75", marginBottom: "16px" }}>
                  KDS Trans adalah layanan rental mobil dan paket wisata di Malang yang berdedikasi menyediakan pengalaman perjalanan terbaik untuk Anda. Kami memprioritaskan kenyamanan dan keamanan dalam setiap rute.
                </p>
                <div className="visi-box">
                  <h4>Visi Kami</h4>
                  <p>Memberikan pelayanan terbaik dengan menjunjung tinggi nilai kenyamanan, keamanan, dan kepercayaan bagi setiap pelanggan.</p>
                </div>
                <a href="https://wa.me/6285143010008?text=Halo%20KDS%20Trans%2C%20saya%20ingin%20info%20lebih%20lanjut" target="_blank" rel="noopener noreferrer" className="btn-tanya">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.136.561 4.14 1.535 5.874L0 24l6.335-1.512A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.006-1.368l-.36-.214-3.726.889.928-3.63-.234-.373A9.818 9.818 0 012.182 12c0-5.421 4.397-9.818 9.818-9.818 5.421 0 9.818 4.397 9.818 9.818 0 5.421-4.397 9.818-9.818 9.818z"/></svg>
                  Chat WhatsApp
                </a>
              </div>
            </Reveal>
            <Reveal direction="right" delay={150}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", background: "var(--bg-soft)", borderRadius: "20px", padding: "40px" }}>
                <img src="/images/Logo.jpeg" alt="KDS Trans" style={{ width: "280px", height: "280px", objectFit: "contain" }} />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section" style={{ background: "var(--bg-soft)", borderTop: "1px solid var(--border)" }}>
        <div className="container">
          <Reveal>
            <div className="section-header">
              <h2>Mengapa Memilih Kami?</h2>
              <p>Komitmen kami adalah menghadirkan layanan yang melampaui ekspektasi perjalanan Anda.</p>
            </div>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px" }}>
            {[
              { icon: "🧑‍✈️", title: "Driver Berpengalaman",       desc: "Tim pengemudi kami adalah tenaga profesional lokal yang sangat memahami medan dan rute wisata terbaik di Jawa Timur." },
              { icon: "🚙",    title: "Armada Terawat",              desc: "Kendaraan kami selalu dalam kondisi prima dengan perawatan rutin berkala untuk memastikan keamanan dan kenyamanan maksimal." },
              { icon: "💬",    title: "Pelayanan Cepat via WhatsApp", desc: "Respons cepat dan ramah melalui WhatsApp untuk segala kebutuhan reservasi, pertanyaan, atau penyesuaian jadwal Anda." },
            ].map((item, i) => (
              <Reveal key={item.title} direction="scale" delay={i * 100}>
                <div className="keunggulan-item">
                  <div className="keunggulan-icon">{item.icon}</div>
                  <h4>{item.title}</h4>
                  <p>{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
