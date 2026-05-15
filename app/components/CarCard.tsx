import Image from 'next/image';

interface CarProps {
  car: {
    id: number;
    name: string;
    price: number;
    image: string;
    type: string;
    desc: string;
  }
}

export default function CarCard({ car }: CarProps) {
  // Ganti nomor ini dengan nomor WhatsApp kamu
  const whatsappUrl = `https://wa.me/628123456789?text=Halo, saya ingin sewa mobil ${car.name}`;

  return (
    <div className="layanan-card">
      <div className="layanan-img">
        {/* Menggunakan img biasa dulu agar mudah menyesuaikan dengan HTML asli kamu */}
        <img 
          src={car.image} 
          alt={car.name} 
          style={{ width: '100%', height: '220px', objectFit: 'cover' }}
        />
        <span className="layanan-badge">{car.type}</span>
      </div>
      <div className="layanan-body">
        <h3>{car.name}</h3>
        <p className="price" style={{ color: '#E8341A', fontWeight: 'bold', fontSize: '1.2rem', marginBottom: '8px' }}>
          Rp {car.price.toLocaleString('id-ID')}/hari
        </p>
        <p className="desc" style={{ fontSize: '0.95rem', color: '#666', marginBottom: '20px', lineHeight: '1.5' }}>
          {car.desc}
        </p>
        <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="layanan-link" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
           Sewa Sekarang
        </a>
      </div>
    </div>
  );
}