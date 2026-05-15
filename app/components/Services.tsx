export default function Services() {
  return (
    <section className="section" id="layanan">
      <div className="container">
        <div className="section-header">
          <h2>Layanan Utama Kami</h2>

          <p>
            Pilih layanan yang sesuai dengan rencana perjalanan Anda.
            Kami siap memberikan pengalaman terbaik.
          </p>
        </div>

        <div className="layanan-grid">
          <a href="/rental-mobil" className="layanan-card">
            <div className="layanan-img">
              <img
                src="/images/Mobil_banyak.jpg"
                alt="Rental Mobil"
              />

              <span className="layanan-badge">
                Unit Terawat
              </span>
            </div>

            <div className="layanan-body">
              <h3>Rental Mobil</h3>

              <p>
                Berbagai pilihan mobil untuk kebutuhan perjalanan Anda.
              </p>

              <span className="layanan-link">
                Lihat Pilihan Mobil →
              </span>
            </div>
          </a>

          <a href="/paket-wisata" className="layanan-card">
            <div className="layanan-img">
              <img
                src="/images/foto_wisata.jpeg"
                alt="Wisata"
              />

              <span className="layanan-badge best-seller">
                Best Seller
              </span>
            </div>

            <div className="layanan-body">
              <h3>Paket Wisata</h3>

              <p>
                Paket wisata menarik dengan pengalaman terbaik.
              </p>

              <span className="layanan-link">
                Jelajahi Paket →
              </span>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}