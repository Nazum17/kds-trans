"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

type Armada = { id: string; kategori: string; nama: string; hargaLabel: string; tipe: string; aktif: boolean };
type Wisata  = { id: string; nama: string; aktif: boolean };

export default function AdminDashboard() {
  const [armada, setArmada] = useState<Armada[]>([]);
  const [wisata, setWisata] = useState<Wisata[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch("/api/armada").then(r => r.json()),
      fetch("/api/wisata").then(r => r.json()),
    ]).then(([a, w]) => { setArmada(a); setWisata(w); setLoading(false); });
  }, []);

  const citycar = armada.filter(a => a.kategori === "City Car").length;
  const mpv     = armada.filter(a => a.kategori === "MPV").length;
  const premium = armada.filter(a => a.kategori === "Premium").length;

  const stats = [
    { icon: "🚗", label: "Total Armada",  value: armada.length, color: "#111",    href: "/admin/mobil" },
    { icon: "🏔️", label: "Paket Wisata",  value: wisata.length, color: "#0d6e3f", href: "/admin/wisata" },
    { icon: "🚙", label: "City Car",       value: citycar,       color: "#1d4ed8", href: "/admin/mobil" },
    { icon: "🚐", label: "MPV",            value: mpv,           color: "#6d28d9", href: "/admin/mobil" },
    { icon: "🚌", label: "Premium/Hiace",  value: premium,       color: "#b45309", href: "/admin/mobil" },
  ];

  const quickActions = [
    { icon: "➕", label: "Tambah Mobil Baru",    href: "/admin/mobil",   bg: "#111" },
    { icon: "🏔️", label: "Tambah Paket Wisata", href: "/admin/wisata",  bg: "#0d6e3f" },
    { icon: "💬", label: "Template Pesan WA",    href: "/admin/pesan",   bg: "#25D366" },
    { icon: "🌐", label: "Lihat Website",         href: "/",              bg: "#374151" },
  ];

  const katColor: Record<string, { bg: string; color: string }> = {
    "City Car": { bg: "#eff6ff", color: "#1d4ed8" },
    "MPV":      { bg: "#f5f3ff", color: "#6d28d9" },
    "Premium":  { bg: "#fffbeb", color: "#b45309" },
  };

  return (
    <div style={{ padding: "32px", animation: "fadeUp 0.4s ease both" }}>
      <div style={{ marginBottom: "28px" }}>
        <h1 style={{ fontSize: "1.5rem", fontWeight: "800", color: "#111", marginBottom: "4px" }}>Dashboard</h1>
        <p style={{ color: "#6b7280", fontSize: "0.875rem" }}>Selamat datang kembali, Admin KDS Trans 👋</p>
      </div>

      {loading ? (
        <div style={{ padding: "60px", textAlign: "center", color: "#9ca3af" }}>Memuat data...</div>
      ) : (
        <>
          {/* Stats */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "14px", marginBottom: "24px" }}>
            {stats.map((s, i) => (
              <Link key={s.label} href={s.href} style={{ textDecoration: "none" }}>
                <div style={{ background: "#fff", borderRadius: "12px", padding: "18px", border: "1px solid #f0f0f0", boxShadow: "0 2px 8px rgba(0,0,0,0.04)", transition: "transform 0.3s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.3s ease", animation: `fadeUp 0.4s ease ${i * 60}ms both`, cursor: "pointer" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.transform = "translateY(-3px)"; (e.currentTarget as HTMLDivElement).style.boxShadow = "0 8px 24px rgba(0,0,0,0.1)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform = ""; (e.currentTarget as HTMLDivElement).style.boxShadow = "0 2px 8px rgba(0,0,0,0.04)"; }}>
                  <div style={{ fontSize: "1.6rem", marginBottom: "8px" }}>{s.icon}</div>
                  <div style={{ fontSize: "2rem", fontWeight: "800", color: s.color, lineHeight: 1 }}>{s.value}</div>
                  <div style={{ fontSize: "0.78rem", color: "#9ca3af", marginTop: "4px" }}>{s.label}</div>
                </div>
              </Link>
            ))}
          </div>

          {/* Quick Actions */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "12px", marginBottom: "24px" }}>
            {quickActions.map(a => (
              <Link key={a.label} href={a.href} style={{
                display: "flex", alignItems: "center", gap: "10px",
                background: a.bg, color: "#fff", borderRadius: "12px",
                padding: "14px 18px", textDecoration: "none",
                fontWeight: "600", fontSize: "0.875rem",
                transition: "opacity 0.2s, transform 0.2s",
              }}
                onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.opacity = "0.88"; (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-2px)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.opacity = "1"; (e.currentTarget as HTMLAnchorElement).style.transform = ""; }}>
                <span>{a.icon}</span> {a.label}
              </Link>
            ))}
          </div>

          {/* Tabel armada */}
          <div style={{ background: "#fff", borderRadius: "14px", border: "1px solid #f0f0f0", overflow: "hidden", marginBottom: "20px" }}>
            <div style={{ padding: "16px 20px", borderBottom: "1px solid #f5f5f5", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h2 style={{ fontSize: "1rem", fontWeight: "700", color: "#111" }}>5 Armada Pertama</h2>
              <Link href="/admin/mobil" style={{ fontSize: "0.8rem", color: "#E8341A", textDecoration: "none", fontWeight: "600" }}>Lihat semua →</Link>
            </div>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: "#f9fafb" }}>
                  {["Nama", "Kategori", "Harga", "Tipe", "Status"].map(h => (
                    <th key={h} style={{ padding: "10px 16px", textAlign: "left", fontSize: "0.72rem", fontWeight: "700", color: "#9ca3af", textTransform: "uppercase" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {armada.slice(0, 5).map(a => (
                  <tr key={a.id} style={{ borderTop: "1px solid #f5f5f5" }}>
                    <td style={{ padding: "10px 16px", fontWeight: "600", fontSize: "0.875rem" }}>{a.nama}</td>
                    <td style={{ padding: "10px 16px" }}>
                      <span style={{ fontSize: "0.72rem", fontWeight: "700", padding: "3px 9px", borderRadius: "20px", ...katColor[a.kategori] }}>{a.kategori}</span>
                    </td>
                    <td style={{ padding: "10px 16px", color: "#E8341A", fontWeight: "700", fontSize: "0.875rem" }}>{a.hargaLabel}</td>
                    <td style={{ padding: "10px 16px", fontSize: "0.8rem", color: "#6b7280" }}>{a.tipe}</td>
                    <td style={{ padding: "10px 16px" }}>
                      <span style={{ fontSize: "0.72rem", padding: "3px 9px", borderRadius: "20px", background: a.aktif ? "#f0fdf4" : "#f9fafb", color: a.aktif ? "#16a34a" : "#9ca3af" }}>
                        {a.aktif ? "Aktif" : "Nonaktif"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Wisata chips */}
          <div style={{ background: "#fff", borderRadius: "14px", border: "1px solid #f0f0f0", padding: "16px 20px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px" }}>
              <h2 style={{ fontSize: "1rem", fontWeight: "700", color: "#111" }}>Paket Wisata</h2>
              <Link href="/admin/wisata" style={{ fontSize: "0.8rem", color: "#E8341A", textDecoration: "none", fontWeight: "600" }}>Kelola →</Link>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
              {wisata.map(w => (
                <span key={w.id} style={{ background: w.aktif ? "#f0fdf4" : "#f9fafb", border: "1px solid #e5e7eb", borderRadius: "8px", padding: "6px 14px", fontSize: "0.85rem", color: w.aktif ? "#15803d" : "#9ca3af", fontWeight: "500" }}>
                  🏔️ {w.nama}
                </span>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}