import { NextRequest, NextResponse } from "next/server";

let wisataDB = [
  { id: "1", nama: "Trip Bromo Midnight",           gambar: "/images/bromo_midnight.jpeg",           tags: ["OPEN TRIP", "PRIVATE TRIP"],      deskripsi: "Rasakan magisnya matahari terbit di Gunung Bromo. Tersedia Open Trip untuk pengalaman berbagi yang seru, atau Private Trip untuk kenyamanan eksklusif. Sudah termasuk transportasi Jeep 4WD dan driver berpengalaman.", bestSeller: true,  aktif: true },
  { id: "2", nama: "City Tour Malang – Batu",       gambar: "/images/Malang-Batu-trip-2.png",        tags: [],                                 deskripsi: "Eksplorasi pesona kota wisata Batu dan Malang dalam satu hari penuh. Nikmati udara sejuk, destinasi kekinian, dan kuliner khas dengan armada nyaman yang siap menjemput Anda.", bestSeller: false, aktif: true },
  { id: "3", nama: "Air Terjun Tumpak Sewu",        gambar: "/images/air-terjun-tumpak-sewu_.jpeg",  tags: ["TUMPAK SEWU"],                    deskripsi: "Menyaksikan keajaiban air terjun bertingkat, Niagara-nya Indonesia. Perjalanan menuju surga tersembunyi di kaki Gunung Semeru.", bestSeller: false, aktif: true },
  { id: "4", nama: "Explore Kawah Ijen",            gambar: "/images/kawah-ijen_.jpeg",              tags: ["JAWATAN + IJEN", "IJEN + BALURAN"],deskripsi: "Saksikan fenomena langka blue fire dan danau kawah asam terbesar. Pilih kombinasi Hutan Djawatan yang magis atau savana Baluran.", bestSeller: false, aktif: true },
  { id: "5", nama: "Explore Pantai Malang Selatan", gambar: "/images/pantai-malang-selatan_.jpeg",   tags: [],                                 deskripsi: "Menyusuri garis pantai eksotis dengan pasir putih dan ombak lautan Hindia. Jelajahi deretan pantai tersembunyi bersama driver berpengalaman.", bestSeller: false, aktif: true },
];

export async function GET() {
  return NextResponse.json(wisataDB);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const newItem = { ...body, id: Date.now().toString() };
  wisataDB.push(newItem);
  return NextResponse.json(newItem, { status: 201 });
}

export async function PUT(req: NextRequest) {
  const body = await req.json();
  const idx = wisataDB.findIndex(w => w.id === body.id);
  if (idx === -1) return NextResponse.json({ error: "Not found" }, { status: 404 });
  wisataDB[idx] = body;
  return NextResponse.json(wisataDB[idx]);
}

export async function DELETE(req: NextRequest) {
  const { id } = await req.json();
  wisataDB = wisataDB.filter(w => w.id !== id);
  return NextResponse.json({ success: true });
}

