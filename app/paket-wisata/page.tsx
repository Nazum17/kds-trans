export default function PaketWisataPage() {
  const wisataHero = [
    {
      img: "/images/bromo_midnight.jpeg",
      name: "Trip Bromo Midnight",
      desc: "Rasakan magisnya matahari terbit di Gunung Bromo. Tersedia Open Trip untuk pengalaman berbagi yang seru, atau Private Trip untuk kenyamanan eksklusif. Sudah termasuk transportasi Jeep 4WD dan driver berpengalaman.",
      tags: ["OPEN TRIP", "PRIVATE TRIP"],
      bestSeller: true,
    },
    {
      img: "/images/Malang-Batu-trip-2.png",
      name: "City Tour Malang – Batu",
      desc: "Eksplorasi pesona kota wisata Batu dan Malang dalam satu hari penuh. Nikmati udara sejuk, destinasi kekinian, dan kuliner khas dengan armada nyaman yang siap menjemput Anda.",
      tags: [],
      bestSeller: false,
    },
  ];

  const wisataSmall = [
    {
      img: "/images/air-terjun-tumpak-sewu_.jpeg",
      name: "Air Terjun Tumpak Sewu",
      desc: "Menyaksikan keajaiban air terjun bertingkat, Niagara-nya Indonesia. Perjalanan menuju surga tersembunyi di kaki Gunung Semeru.",
      tags: ["TUMPAK SEWU"],
    },
    {
      img: "/images/kawah-ijen_.jpeg",
      name: "Explore Kawah Ijen",
      desc: "Saksikan fenomena langka blue fire dan danau kawah asam terbesar. Pilih kombinasi Hutan Djawatan yang magis atau savana Baluran.",
      tags: ["JAWATAN + IJEN", "IJEN + BALURAN"],
    },
    {
      img: "/images/pantai-malang-selatan_.jpeg",
      name: "Explore Pantai Malang Selatan",
      desc: "Menyusuri garis pantai eksotis dengan pasir putih dan ombak lautan Hindia. Jelajahi deretan pantai tersembunyi bersama driver berpengalaman.",
      tags: [],
    },
  ];

  const WA_SVG = (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.136.561 4.14 1.535 5.874L0 24l6.335-1.512A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.006-1.368l-.36-.214-3.726.889.928-3.63-.234-.373A9.818 9.818 0 012.182 12c0-5.421 4.397-9.818 9.818-9.818 5.421 0 9.818 4.397 9.818 9.818 0 5.421-4.397 9.818-9.818 9.818z"/>
    </svg>
  );

  return (
    <main style={{ backgroundColor: "#fff", minHeight: "100vh" }}>
      <div className="page-hero">
        <div className="page-hero-inner">
          <h1>Paket Wisata Jawa Timur</h1>
          <p>Jelajahi keindahan alam Jawa Timur bersama kami. Driver lokal berpengalaman, armada nyaman, harga terbaik.</p>
        </div>
      </div>

      <section style={{ padding: "60px 24px 80px", maxWidth: "1200px", margin: "0 auto" }}>

        {/* BIG CARDS — 2 kolom */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px", marginBottom: "24px" }}>
          {wisataHero.map((w) => (
            <div key={w.name} className="wisata-card">
              <div className="wisata-img" style={{ height: "260px" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={w.img}
                  alt={w.name}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
                {w.bestSeller && <span className="wisata-badge">⭐ Best Seller</span>}
              </div>
              <div className="wisata-body">
                <h3>{w.name}</h3>
                {w.tags.length > 0 && (
                  <div className="wisata-tags">
                    {w.tags.map((t) => <span key={t} className="wisata-tag">{t}</span>)}
                  </div>
                )}
                <p>{w.desc}</p>
                <a
                  href={`https://wa.me/6285143010008?text=${encodeURIComponent(`Halo KDS Trans, saya tertarik dengan paket ${w.name}. Mohon info lebih lanjut.`)}`}
                  target="_blank" rel="noopener noreferrer"
                  className="btn-tanya"
                >
                  💬 Tanya &amp; Pesan
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* SMALL CARDS — 3 kolom */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
          {wisataSmall.map((w) => (
            <div key={w.name} className="wisata-card">
              <div className="wisata-img" style={{ height: "200px", background: "#f3f4f6" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={w.img}
                  alt={w.name}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
              <div className="wisata-body">
                <h3 style={{ fontSize: "1.05rem" }}>{w.name}</h3>
                {w.tags.length > 0 && (
                  <div className="wisata-tags">
                    {w.tags.map((t) => <span key={t} className="wisata-tag">{t}</span>)}
                  </div>
                )}
                <p>{w.desc}</p>
                <a
                  href={`https://wa.me/6285143010008?text=${encodeURIComponent(`Halo KDS Trans, saya ingin info paket ${w.name}.`)}`}
                  target="_blank" rel="noopener noreferrer"
                  className="btn-tanya"
                >
                  💬 Tanya via WA
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="cta-box">
          <h2>Siap Memesan Perjalanan Anda?</h2>
          <p>Tim kami selalu siap membantu Anda merencanakan perjalanan yang nyaman dan aman di Bromo dan Malang.</p>
          <a
            href="https://wa.me/6285143010008?text=Halo%20KDS%20Trans%2C%20saya%20ingin%20memesan%20paket%20wisata"
            target="_blank" rel="noopener noreferrer"
            className="btn-wa-large"
          >
            {WA_SVG} Chat WhatsApp Sekarang
          </a>
        </div>
      </section>
    </main>
  );
}
