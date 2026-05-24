import fs from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");

export type Armada = {
  id: string;
  kategori: string;
  nama: string;
  harga: number;
  hargaLabel: string;
  tipe: string;
  gambar: string;
  deskripsi: string;
  aktif: boolean;
};

export type Wisata = {
  id: string;
  nama: string;
  gambar: string;
  tags: string[];
  deskripsi: string;
  bestSeller: boolean;
  aktif: boolean;
};

export function readArmada(): Armada[] {
  const file = path.join(DATA_DIR, "armada.json");
  return JSON.parse(fs.readFileSync(file, "utf-8"));
}

export function writeArmada(data: Armada[]): void {
  const file = path.join(DATA_DIR, "armada.json");
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
}

export function readWisata(): Wisata[] {
  const file = path.join(DATA_DIR, "wisata.json");
  return JSON.parse(fs.readFileSync(file, "utf-8"));
}

export function writeWisata(data: Wisata[]): void {
  const file = path.join(DATA_DIR, "wisata.json");
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
}
