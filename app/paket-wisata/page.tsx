"use client";
import { useState, useRef } from "react";

const semuaWisata = [
  {
    img: "/images/bromo_midnight.jpeg",
    name: "Trip Bromo Midnight",
    desc: "Rasakan magisnya matahari terbit di Gunung Bromo. Tersedia Open Trip untuk pengalaman berbagi yang seru, atau Private Trip untuk kenyamanan eksklusif. Sudah termasuk transportasi Jeep 4WD dan driver berpengalaman.",
    tags: ["OPEN TRIP", "PRIVATE TRIP"],
    bestSeller: true,
    big: true,
  },
  {
    img: "/images/Malang-Batu-trip-2.png",
    name: "City Tour Malang – Batu",
    desc: "Eksplorasi pesona kota wisata Batu dan Malang dalam satu hari penuh. Nikmati udara sejuk, destinasi kekinian, dan kuliner khas dengan armada nyaman yang siap menjemput Anda.",
    tags: [],
    bestSeller: false,
    big: true,
  },
  {
    img: "/images/air-terjun-tumpak-sewu_.jpeg",
    name: "Air Terjun Tumpak Sewu",
    desc: "Menyaksikan keajaiban air terjun bertingkat, Niagara-nya Indonesia. Perjalanan menuju surga tersembunyi di kaki Gunung Semeru.",
    tags: ["TUMPAK SEWU"],
    bestSeller: false,
    big: false,
  },
  {
    img: "/images/kawah-ijen_.jpeg",
    name: "Explore Kawah Ijen",
    desc: "Saksikan fenomena langka blue fire dan danau kawah asam terbesar. Pilih kombinasi Hutan Djawatan yang magis atau savana Baluran.",
    tags: ["JAWATAN + IJEN", "IJEN + BALURAN"],
    bestSeller: false,
    big: false,
  },
  {
    img: "/images/pantai-malang-selatan_.jpeg",
    name: "Explore Pantai Malang Selatan",
    desc: "Menyusuri garis pantai eksotis dengan pasir putih dan ombak lautan Hindia. Jelajahi deretan pantai tersembunyi bersama driver berpengalaman.",
    tags: [],
    bestSeller: false,
    big: false,
  },
];

const wisataHero  = semuaWisata.filter(w => w.big);
const wisataSmall = semuaWisata.filter(w => !w.big);

const WA_SVG = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.136.561 4.14 1.535 5.874L0 24l6.335-1.512A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.006-1.368l-.36-.214-3.726.889.928-3.63-.234-.373A9.818 9.818 0 012.182 12c0-5.421 4.397-9.818 9.818-9.818 5.421 0 9.818 4.397 9.818 9.818 0 5.421-4.397 9.818-9.818 9.818z"/>
  </svg>
);

// ── Mobile Carousel Component ──
function MobileCarousel() {
  const [active, setActive]   = useState(0);
  const [dir, setDir]         = useState<"left" | "right" | null>(null);
  const [animating, setAnim]  = useState(false);
  const touchStartX           = useRef(0);
  const touchEndX             = useRef(0);
  const total                 = semuaWisata.length;

  function goTo(next: number, direction: "left" | "right") {
    if (animating) return;
    setDir(direction);
    setAnim(true);
    setTimeout(() => {
      setActive(next);
      setDir(null);
      setAnim(false);
    }, 320);
  }

  function onTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0].clientX;
  }
  function onTouchEnd(e: React.TouchEvent) {
    touchEndX.current = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX.current;
    if (diff > 40 && active < total - 1) goTo(active + 1, "left");
    if (diff < -40 && active > 0)        goTo(active - 1, "right");
  }

  const w = semuaWisata[active];

  // Animasi: slide keluar ke kiri/kanan lalu masuk dari sisi berlawanan
  const slideOut = dir === "left"
    ? "translateX(-100%) scale(0.95)"
    : dir === "right"
    ? "translateX(100%) scale(0.95)"
    : "translateX(0) scale(1)";

  const cardStyle: React.CSSProperties = {
    transform: animating ? slideOut : "translateX(0) scale(1)",
    opacity: animating ? 0 : 1,
    transition: animating
      ? "transform 0.28s cubic-bezier(0.4,0,0.2,1), opacity 0.28s ease"
      : "transform 0.32s cubic-bezier(0.34,1.56,0.64,1), opacity 0.32s ease",
  };

  return (
    <div style={{ marginBottom: "32px" }}>
      {/* Overflow hidden untuk clip animasi slide */}
      <div style={{ overflow: "hidden", borderRadius: "16px" }}>
        <div
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          style={{ touchAction: "pan-y", userSelect: "none", ...cardStyle }}
        >
          <div style={{ borderRadius: "16px", overflow: "hidden", border: "1px solid var(--border)", background: "#fff", boxShadow: "0 4px 20px rgba(0,0,0,0.09)" }}>
            {/* Foto */}
            <div style={{ position: "relative", height: "220px", overflow: "hidden" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={w.img}
                alt={w.name}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
              {/* Gradient overlay bawah */}
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.35) 100%)" }} />

              {w.bestSeller && (
                <span style={{ position: "absolute", top: "14px", left: "14px", background: "#f59e0b", color: "#fff", fontSize: "0.72rem", fontWeight: "700", padding: "4px 12px", borderRadius: "50px", boxShadow: "0 2px 8px rgba(0,0,0,0.2)" }}>
                  ⭐ Best Seller
                </span>
              )}
              {/* Counter pill */}
              <span style={{ position: "absolute", top: "14px", right: "14px", background: "rgba(0,0,0,0.55)", backdropFilter: "blur(4px)", color: "#fff", fontSize: "0.72rem", fontWeight: "700", padding: "4px 10px", borderRadius: "50px" }}>
                {active + 1} / {total}
              </span>
              {/* Nama di atas foto */}
              <h3 style={{ position: "absolute", bottom: "14px", left: "16px", right: "16px", color: "#fff", fontSize: "1.05rem", fontWeight: "800", margin: 0, textShadow: "0 1px 4px rgba(0,0,0,0.5)" }}>
                {w.name}
              </h3>
            </div>

            {/* Body */}
            <div style={{ padding: "18px 20px 20px" }}>
              {w.tags.length > 0 && (
                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "10px" }}>
                  {w.tags.map(t => (
                    <span key={t} style={{ background: "var(--red-light)", color: "var(--red)", fontSize: "0.7rem", fontWeight: "700", padding: "3px 10px", borderRadius: "50px" }}>
                      {t}
                    </span>
                  ))}
                </div>
              )}
              <p style={{ fontSize: "0.875rem", color: "var(--text-light)", lineHeight: "1.65", marginBottom: "16px" }}>{w.desc}</p>
              <a
                href={`https://wa.me/6285143010008?text=${encodeURIComponent(`Halo KDS Trans, saya tertarik dengan paket ${w.name}. Mohon info lebih lanjut.`)}`}
                target="_blank" rel="noopener noreferrer"
                className="btn-tanya"
                style={{ display: "flex", width: "100%", justifyContent: "center" }}
              >
                💬 Tanya &amp; Pesan
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Dots */}
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "8px", marginTop: "16px" }}>
        {semuaWisata.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i, i > active ? "left" : "right")}
            style={{
              width: active === i ? "28px" : "8px",
              height: "8px",
              borderRadius: "50px",
              border: "none",
              cursor: "pointer",
              padding: 0,
              background: active === i ? "var(--red)" : "#d1d5db",
              transition: "all 0.35s cubic-bezier(0.34,1.56,0.64,1)",
            }}
          />
        ))}
      </div>

      <p style={{ textAlign: "center", fontSize: "0.72rem", color: "#b0b0b0", marginTop: "10px" }}>
        ← Geser untuk melihat paket lainnya →
      </p>
    </div>
  );
}

// ── Main Page ──
export default function PaketWisataPage() {
  return (
    <main style={{ backgroundColor: "#fff", minHeight: "100vh" }}>
      <div className="page-hero">
        <div className="page-hero-inner">
          <h1>Paket Wisata Jawa Timur</h1>
          <p>Jelajahi keindahan alam Jawa Timur bersama kami. Driver lokal berpengalaman, armada nyaman, harga terbaik.</p>
        </div>
      </div>

      <section style={{ padding: "60px 24px 80px", maxWidth: "1200px", margin: "0 auto" }}>

        {/* ── MOBILE: Carousel (hanya tampil di HP) ── */}
        <div className="wisata-mobile-carousel">
          <MobileCarousel />
        </div>

        {/* ── DESKTOP: Grid biasa (hanya tampil di laptop/desktop) ── */}
        <div className="wisata-desktop-grid">
          {/* Big cards */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px", marginBottom: "24px" }}>
            {wisataHero.map(w => (
              <div key={w.name} className="wisata-card">
                <div className="wisata-img" style={{ height: "260px" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={w.img} alt={w.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  {w.bestSeller && <span className="wisata-badge">⭐ Best Seller</span>}
                </div>
                <div className="wisata-body">
                  <h3>{w.name}</h3>
                  {w.tags.length > 0 && (
                    <div className="wisata-tags">
                      {w.tags.map(t => <span key={t} className="wisata-tag">{t}</span>)}
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

          {/* Small cards */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
            {wisataSmall.map(w => (
              <div key={w.name} className="wisata-card">
                <div className="wisata-img" style={{ height: "200px", background: "#f3f4f6" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={w.img} alt={w.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
                <div className="wisata-body">
                  <h3 style={{ fontSize: "1.05rem" }}>{w.name}</h3>
                  {w.tags.length > 0 && (
                    <div className="wisata-tags">
                      {w.tags.map(t => <span key={t} className="wisata-tag">{t}</span>)}
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
