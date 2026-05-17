// Data mobil
export const mobilData = [
  // City Car
  { id: "1",  kategori: "City Car",  nama: "Honda Brio Old",               harga: 250000, tipe: "Self Drive",        gambar: "/images/Brio_old.jpeg",          aktif: true },
  { id: "2",  kategori: "City Car",  nama: "Honda Brio New",               harga: 300000, tipe: "Self Drive",        gambar: "/images/Brio_new_.jpg",          aktif: true },
  { id: "3",  kategori: "City Car",  nama: "Daihatsu Ayla",                harga: 250000, tipe: "Self Drive",        gambar: "/images/Ayla_foto.jpg",          aktif: true },
  { id: "4",  kategori: "City Car",  nama: "Daihatsu Ayla New",            harga: 300000, tipe: "Self Drive",        gambar: "/images/Ayla_.jpeg",             aktif: true },
  { id: "5",  kategori: "City Car",  nama: "Toyota Raize",                 harga: 350000, tipe: "Self Drive",        gambar: "/images/Toyota_raize_Foto.jpg",  aktif: true },
  { id: "6",  kategori: "City Car",  nama: "Daihatsu Rocky",               harga: 350000, tipe: "Self Drive",        gambar: "/images/Rocky_Foto.jpg",         aktif: true },
  // MPV
  { id: "7",  kategori: "MPV",       nama: "Toyota Avanza Grand Facelift", harga: 250000, tipe: "Self Drive/Driver", gambar: "/images/Avanza_Ground_Foto.jpg", aktif: true },
  { id: "8",  kategori: "MPV",       nama: "Toyota All New Avanza",        harga: 350000, tipe: "Self Drive/Driver", gambar: "/images/Avanza_New_Foto.jpg",    aktif: true },
  { id: "9",  kategori: "MPV",       nama: "Toyota Innova Reborn",         harga: 450000, tipe: "Dengan Driver",     gambar: "/images/Innova_Foto.jpg",        aktif: true },
  { id: "10", kategori: "MPV",       nama: "Hyundai Stargazer",            harga: 350000, tipe: "Self Drive/Driver", gambar: "/images/Stargazer.jpeg",         aktif: true },
  // Premium
  { id: "11", kategori: "Premium",   nama: "Toyota Fortuner",              harga: 1000000, tipe: "Dengan Driver",   gambar: "/images/Fortuner_Foto.jpg",      aktif: true },
  { id: "12", kategori: "Premium",   nama: "Mitsubishi Pajero",            harga: 1500000, tipe: "Dengan Driver",   gambar: "/images/Pajero_Foto.jpg",        aktif: true },
  { id: "13", kategori: "Premium",   nama: "Toyota Alphard",               harga: 3500000, tipe: "Dengan Driver",   gambar: "/images/Alphard_Foto.jpg",       aktif: true },
  { id: "14", kategori: "Premium",   nama: "Hiace Commuter",               harga: 0,       tipe: "Dengan Driver",   gambar: "/images/Hiace_Commuter_Foto.jpg",aktif: true },
  { id: "15", kategori: "Premium",   nama: "Hiace Luxury",                 harga: 1000000, tipe: "Dengan Driver",   gambar: "/images/Hiace_Premio_Foto.jpg",  aktif: true },
  { id: "16", kategori: "Premium",   nama: "Hiace Premio Luxury",          harga: 1800000, tipe: "Dengan Driver",   gambar: "/images/Hiace_Luxury.jpeg",      aktif: true },
];

// Data paket wisata
export const wisataData = [
  { id: "1", nama: "Trip Bromo Midnight",         gambar: "/images/bromo_midnight.jpeg",              tags: "OPEN TRIP, PRIVATE TRIP", aktif: true },
  { id: "2", nama: "City Tour Malang – Batu",     gambar: "/images/Malang-Batu-trip-2.png",           tags: "",                        aktif: true },
  { id: "3", nama: "Air Terjun Tumpak Sewu",      gambar: "/images/air-terjun-tumpak-sewu_.jpg",      tags: "TUMPAK SEWU",             aktif: true },
  { id: "4", nama: "Explore Kawah Ijen",          gambar: "/images/kawah-ijen_.jpeg",                 tags: "JAWATAN + IJEN, IJEN + BALURAN", aktif: true },
  { id: "5", nama: "Explore Pantai Malang Selatan", gambar: "/images/pantai-malang-selatan_.jpeg",    tags: "",                        aktif: true },
];

export type Mobil = typeof mobilData[0];
export type Wisata = typeof wisataData[0];