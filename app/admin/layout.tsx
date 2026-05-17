"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const menu = [
  { href: "/admin/dashboard", label: "Dashboard",      icon: "📊" },
  { href: "/admin/mobil",     label: "Kelola Mobil",   icon: "🚗" },
  { href: "/admin/wisata",    label: "Kelola Wisata",  icon: "🏔️" },
  { href: "/admin/pesan",     label: "Pesan Cepat WA", icon: "💬" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router   = useRouter();
  const [ready, setReady] = useState(false);

  // Cek login (skip untuk halaman login)
  useEffect(() => {
    if (pathname === "/admin/login") { setReady(true); return; }
    const loggedIn = sessionStorage.getItem("kds_admin");
    if (!loggedIn) { router.replace("/admin/login"); return; }
    setReady(true);
  }, [pathname, router]);

  if (!ready) return null;
  if (pathname === "/admin/login") return <>{children}</>;

  function handleLogout() {
    sessionStorage.removeItem("kds_admin");
    router.push("/admin/login");
  }

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#f4f6fb", fontFamily: "inherit" }}>

      {/* SIDEBAR */}
      <aside style={{
        width: "220px", minHeight: "100vh", background: "#111",
        display: "flex", flexDirection: "column", flexShrink: 0,
        position: "sticky", top: 0, height: "100vh",
      }}>
        {/* Logo */}
        <div style={{ padding: "20px 20px 16px", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
          <div style={{ color: "#E8341A", fontWeight: "800", fontSize: "1.15rem", letterSpacing: "-0.02em" }}>KDS Trans</div>
          <div style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.72rem", marginTop: "2px" }}>Panel Admin</div>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, paddingTop: "8px" }}>
          {menu.map(item => {
            const active = pathname.startsWith(item.href);
            return (
              <Link key={item.href} href={item.href} style={{
                display: "flex", alignItems: "center", gap: "10px",
                padding: "10px 20px", fontSize: "0.875rem", fontWeight: active ? 600 : 400,
                color: active ? "#fff" : "rgba(255,255,255,0.55)",
                textDecoration: "none",
                background: active ? "rgba(255,255,255,0.08)" : "transparent",
                borderLeft: active ? "3px solid #E8341A" : "3px solid transparent",
                transition: "all 0.15s",
              }}>
                <span style={{ fontSize: "1rem" }}>{item.icon}</span>
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Bottom */}
        <div style={{ padding: "16px 20px", borderTop: "1px solid rgba(255,255,255,0.08)", display: "flex", flexDirection: "column", gap: "8px" }}>
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: "8px", color: "rgba(255,255,255,0.45)", fontSize: "0.8rem", textDecoration: "none" }}>
            🌐 Lihat Website
          </Link>
          <button onClick={handleLogout} style={{
            display: "flex", alignItems: "center", gap: "8px",
            color: "rgba(255,255,255,0.45)", fontSize: "0.8rem",
            background: "none", border: "none", cursor: "pointer", padding: 0, fontFamily: "inherit",
          }}>
            🚪 Logout
          </button>
        </div>
      </aside>

      {/* CONTENT */}
      <div style={{ flex: 1, overflow: "auto", minHeight: "100vh" }}>
        {children}
      </div>
    </div>
  );
}
