import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://kds-trans.vercel.app";
  const now  = new Date();

  return [
    { url: base,                         lastModified: now, changeFrequency: "weekly",  priority: 1.0 },
    { url: `${base}/rental-mobil`,       lastModified: now, changeFrequency: "weekly",  priority: 0.9 },
    { url: `${base}/paket-wisata`,       lastModified: now, changeFrequency: "weekly",  priority: 0.9 },
    { url: `${base}/tentang-kami`,       lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/cara-pemesanan`,     lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/syarat-ketentuan`,   lastModified: now, changeFrequency: "monthly", priority: 0.5 },
  ];
}
