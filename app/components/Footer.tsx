import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          {/* Brand Section */}
          <div className="footer-brand">
            <div className="footer-logo">KDS Trans</div>
            <p>Melayani kebutuhan transportasi dan perjalanan wisata Anda dengan nyaman, aman, dan terpercaya di seluruh Jawa Timur.</p>
            <a href="https://wa.me/6285143010008" target="_blank" className="btn-wa footer-wa">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.136.561 4.14 1.535 5.874L0 24l6.335-1.512A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.006-1.368l-.36-.214-3.726.889.928-3.63-.234-.373A9.818 9.818 0 012.182 12c0-5.421 4.397-9.818 9.818-9.818 5.421 0 9.818 4.397 9.818 9.818 0 5.421-4.397 9.818-9.818 9.818z"/>
              </svg>
              Chat WhatsApp Sekarang
            </a>
          </div>

          {/* Kolom Layanan */}
          <div className="footer-col">
            <h5>Layanan</h5>
            <ul>
              <li><Link href="/rental-mobil">Rental Mobil Malang</Link></li>
              <li><Link href="/paket-wisata">Paket Wisata Bromo</Link></li>
              <li><Link href="/tentang-kami">Tentang Kami</Link></li>
            </ul>
          </div>

          {/* Kolom Informasi */}
          <div className="footer-col">
            <h5>Informasi</h5>
            <ul>
              <li><Link href="/syarat-ketentuan">Syarat & Ketentuan</Link></li>
              <li><Link href="/cara-pemesanan">Cara Pemesanan</Link></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2024 KDS Trans Travel. Solusi Perjalanan Terpercaya Jawa Timur.</p>
        </div>
      </div>
    </footer>
  );
}