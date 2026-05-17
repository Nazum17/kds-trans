export default function CaraPemesananPage() {
  const steps = [
    { icon: "🚗", num: 1, title: "Pilih Layanan", desc: "Tentukan pilihan Rental Mobil atau Paket Wisata sesuai kebutuhan Anda." },
    { icon: "💬", num: 2, title: "Klik WhatsApp", desc: "Hubungi kami melalui tombol WhatsApp yang tersedia di website." },
    { icon: "👔", num: 3, title: "Konsultasi",    desc: "Diskusikan detail perjalanan, jadwal, dan preferensi Anda dengan tim kami." },
    { icon: "✅", num: 4, title: "Konfirmasi",    desc: "Lakukan konfirmasi booking dan bersiap untuk perjalanan Anda." },
  ];
  return (
    <main style={{ backgroundColor: "#fff", minHeight: "100vh" }}>

      <div className="page-hero">
        <div className="page-hero-inner">
          <h1>Cara Pemesanan</h1>
          <p>Proses pemesanan mudah dan cepat. Cukup ikuti langkah-langkah di bawah ini untuk memulai perjalanan Anda bersama kami.</p>
        </div>
      </div>

      <section className="section">
        <div className="container" style={{ maxWidth: "800px" }}>

          {/* 2x2 grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "24px", marginBottom: "60px" }}>
            {steps.map((s) => (
              <div key={s.num} className="step-card">
                <div className="step-icon">{s.icon}</div>
                <div className="step-num">{s.num}</div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>

          <div className="cta-box">
            <h2>Siap Memesan Perjalanan Anda?</h2>
            <p>Tim kami selalu siap membantu Anda merencanakan perjalanan yang nyaman dan aman di Bromo dan Malang.</p>
            <a
              href="https://wa.me/6285143010008?text=Halo%20KDS%20Trans%2C%20saya%20ingin%20memesan%20layanan"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-wa-large"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.136.561 4.14 1.535 5.874L0 24l6.335-1.512A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.006-1.368l-.36-.214-3.726.889.928-3.63-.234-.373A9.818 9.818 0 012.182 12c0-5.421 4.397-9.818 9.818-9.818 5.421 0 9.818 4.397 9.818 9.818 0 5.421-4.397 9.818-9.818 9.818z"/>
              </svg>
              Chat WhatsApp
            </a>
          </div>

        </div>
      </section>
    </main>
  );
}
