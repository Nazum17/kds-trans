"use client";
import Link from "next/link";
import { mobilData, wisataData } from "../data";

export default function AdminDashboard() {
  const totalMobil   = mobilData.length;
  const totalWisata  = wisataData.length;
  const citycar      = mobilData.filter(m => m.kategori === "City Car").length;
  const mpv          = mobilData.filter(m => m.kategori === "MPV").length;
  const premium      = mobilData.filter(m => m.kategori === "Premium").length;

  const stats = [
    { icon: "🚗", label: "Total Armada",   value: totalMobil,  color: "#111",    href: "/admin/mobil" },
    { icon: "🏔️", label: "Paket Wisata",   value: totalWisata, color: "#0d6e3f", href: "/admin/wisata" },
    { icon: "🚙", label: "City Car",        value: citycar,     color: "#1d4ed8", href: "/admin/mobil" },
    { icon: "🚐", label: "MPV",             value: mpv,         color: "#6d28d9", href: "/admin/mobil" },
    { icon: "🚌", label: "Premium/Hiace",   value: premium,     color: "#b45309", href: "/admin/mobil" },
  ];

  const quickActions = [
    { icon: "➕", label: "Tambah Mobil Baru",     href: "/admin/mobil?aksi=tambah",  bg: "#111" },
    { icon: "🏔️", label: "Tambah Paket Wisata",  href: "/admin/wisata?aksi=tambah", bg: "#0d6e3f" },
    { icon: "💬", label: "Template Pesan WA",     href: "/admin/pesan",              bg: "#25D366" },
    { icon: "🌐", label: "Lihat Website",         href: "/",                         bg: "#374151" },
  ];

  return (
    <div style={{ padding: "32px" }}>
      {/* Header */}
      <div style={{ marginBottom: "28px" }}>
        <h1 style={{ fontSize: "1.5rem", fontWeight: "800", color: "#111", marginBottom: "4px" }}>Dashboard</h1>
        <p style={{ color: "#6b7280", fontSize: "0.875rem" }}>Selamat datang kembali, Admin KDS Trans 👋</p>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "16px", marginBottom: "28px" }}>
        {stats.map(s => (
          <Link key={s.label} href={s.href} style={{ textDecoration: "none" }}>
            <div style={{
              background: "#fff", borderRadius: "14px", padding: "20px",
              border: "1px solid #f0f0f0", boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
              transition: "0.2s", cursor: "pointer",
            }}
              onMouseEnter={e => (e.currentTarget.style.transform = "translateY(-2px)")}
              onMouseLeave={e => (e.currentTarget.style.transform = "translateY(0)")}
            >
              <div style={{ fontSize: "1.6rem", marginBottom: "10px" }}>{s.icon}</div>
              <div style={{ fontSize: "2rem", fontWeight: "800", color: s.color, lineHeight: 1 }}>{s.value}</div>
              <div style={{ fontSize: "0.78rem", color: "#9ca3af", marginTop: "4px" }}>{s.label}</div>
            </div>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div style={{ marginBottom: "28px" }}>
        <h2 style={{ fontSize: "1rem", fontWeight: "700", color: "#111", marginBottom: "14px" }}>Aksi Cepat</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "12px" }}>
          {quickActions.map(a => (
            <Link key={a.label} href={a.href} style={{
              display: "flex", alignItems: "center", gap: "10px",
              background: a.bg, color: "#fff", borderRadius: "12px",
              padding: "14px 18px", textDecoration: "none",
              fontWeight: "600", fontSize: "0.875rem", transition: "0.2s",
            }}
              onMouseEnter={e => (e.currentTarget.style.opacity = "0.88")}
              onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
            >
              <span style={{ fontSize: "1.1rem" }}>{a.icon}</span> {a.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Preview daftar mobil terbaru */}
      <div style={{ background: "#fff", borderRadius: "14px", border: "1px solid #f0f0f0", overflow: "hidden", marginBottom: "24px" }}>
        <div style={{ padding: "16px 20px", borderBottom: "1px solid #f5f5f5", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h2 style={{ fontSize: "1rem", fontWeight: "700", color: "#111" }}>Armada (5 Terbaru)</h2>
          <Link href="/admin/mobil" style={{ fontSize: "0.8rem", color: "#E8341A", textDecoration: "none", fontWeight: "600" }}>Lihat semua →</Link>
        </div>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#f9fafb" }}>
              {["Nama", "Kategori", "Harga/Hari", "Tipe"].map(h => (
                <th key={h} style={{ padding: "10px 20px", textAlign: "left", fontSize: "0.72rem", fontWeight: "700", color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.05em" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {mobilData.slice(0, 5).map(m => (
              <tr key={m.id} style={{ borderTop: "1px solid #f5f5f5" }}>
                <td style={{ padding: "12px 20px", fontSize: "0.875rem", fontWeight: "600", color: "#111" }}>{m.nama}</td>
                <td style={{ padding: "12px 20px" }}>
                  <span style={{
                    fontSize: "0.72rem", fontWeight: "700", padding: "3px 10px", borderRadius: "20px",
                    background: m.kategori === "City Car" ? "#eff6ff" : m.kategori === "MPV" ? "#f5f3ff" : "#fffbeb",
                    color: m.kategori === "City Car" ? "#1d4ed8" : m.kategori === "MPV" ? "#6d28d9" : "#b45309",
                  }}>{m.kategori}</span>
                </td>
                <td style={{ padding: "12px 20px", fontSize: "0.875rem", color: "#E8341A", fontWeight: "700" }}>
                  {m.harga === 0 ? "Hubungi Kami" : `Rp ${m.harga.toLocaleString("id-ID")}`}
                </td>
                <td style={{ padding: "12px 20px", fontSize: "0.8rem", color: "#6b7280" }}>{m.tipe}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Preview wisata */}
      <div style={{ background: "#fff", borderRadius: "14px", border: "1px solid #f0f0f0", overflow: "hidden" }}>
        <div style={{ padding: "16px 20px", borderBottom: "1px solid #f5f5f5", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h2 style={{ fontSize: "1rem", fontWeight: "700", color: "#111" }}>Paket Wisata</h2>
          <Link href="/admin/wisata" style={{ fontSize: "0.8rem", color: "#E8341A", textDecoration: "none", fontWeight: "600" }}>Lihat semua →</Link>
        </div>
        <div style={{ padding: "16px 20px", display: "flex", flexWrap: "wrap", gap: "8px" }}>
          {wisataData.map(w => (
            <span key={w.id} style={{ background: "#f9fafb", border: "1px solid #e5e7eb", borderRadius: "8px", padding: "6px 14px", fontSize: "0.85rem", color: "#374151", fontWeight: "500" }}>
              🏔️ {w.nama}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
