export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-bg">
        <img
          src="/images/night-bromo_.jpeg"
          alt="Bromo"
          className="hero-img"
        />
        <div className="hero-overlay"></div>
      </div>

      <div className="hero-content">
        <h1>Rental Mobil & Paket Wisata Malang</h1>

        <p>
          Melayani kebutuhan transportasi dan perjalanan wisata Anda
          dengan nyaman, aman, dan terpercaya di seluruh Jawa Timur.
        </p>

        <a href="#layanan" className="btn-hero">
          Jelajahi Layanan ↓
        </a>
      </div>
    </section>
  );
}