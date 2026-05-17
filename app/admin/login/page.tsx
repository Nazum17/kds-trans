"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

// Kredensial hardcoded — ganti sesuai kebutuhan
const ADMIN_EMAIL    = "admin@kdstrans.com";
const ADMIN_PASSWORD = "kdstrans2024";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [error, setError]       = useState("");
  const [loading, setLoading]   = useState(false);
  const [showPass, setShowPass] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setTimeout(() => {
      if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
        // Simpan flag login di sessionStorage
        sessionStorage.setItem("kds_admin", "true");
        router.push("/admin/dashboard");
      } else {
        setError("Email atau password salah.");
        setLoading(false);
      }
    }, 600);
  }

  return (
    <div style={{
      minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
      background: "linear-gradient(135deg, #111 0%, #1a1a2e 100%)",
      fontFamily: "inherit", padding: "24px",
    }}>
      <div style={{
        background: "#fff", borderRadius: "20px", padding: "40px 36px",
        width: "100%", maxWidth: "400px",
        boxShadow: "0 24px 64px rgba(0,0,0,0.35)",
      }}>
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: "28px" }}>
          <div style={{ fontSize: "2.2rem", marginBottom: "8px" }}>🔐</div>
          <h1 style={{ fontSize: "1.4rem", fontWeight: "800", color: "#111", marginBottom: "4px" }}>
            KDS Trans Admin
          </h1>
          <p style={{ color: "#9ca3af", fontSize: "0.85rem" }}>Masuk ke panel administrasi</p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div>
            <label style={labelStyle}>Email</label>
            <input
              type="email" required value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="admin@kdstrans.com"
              style={inputStyle}
            />
          </div>

          <div>
            <label style={labelStyle}>Password</label>
            <div style={{ position: "relative" }}>
              <input
                type={showPass ? "text" : "password"} required value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                style={{ ...inputStyle, paddingRight: "44px" }}
              />
              <button
                type="button"
                onClick={() => setShowPass(s => !s)}
                style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", fontSize: "1rem", color: "#9ca3af" }}
              >
                {showPass ? "🙈" : "👁️"}
              </button>
            </div>
          </div>

          {error && (
            <div style={{ background: "#fef2f2", border: "1px solid #fecaca", color: "#dc2626", borderRadius: "8px", padding: "10px 14px", fontSize: "0.85rem" }}>
              ⚠️ {error}
            </div>
          )}

          <button
            type="submit" disabled={loading}
            style={{
              background: "#111", color: "#fff", fontWeight: "700", fontSize: "0.95rem",
              padding: "13px", borderRadius: "10px", border: "none",
              cursor: loading ? "not-allowed" : "pointer",
              opacity: loading ? 0.7 : 1, transition: "0.2s",
              marginTop: "4px",
            }}
          >
            {loading ? "Memproses..." : "Masuk ke Dashboard"}
          </button>
        </form>

        <p style={{ textAlign: "center", marginTop: "20px", fontSize: "0.75rem", color: "#d1d5db" }}>
          admin@kdstrans.com · kdstrans2024
        </p>
      </div>
    </div>
  );
}

const labelStyle: React.CSSProperties = { display: "block", fontSize: "0.8rem", fontWeight: "600", color: "#374151", marginBottom: "6px" };
const inputStyle: React.CSSProperties = { width: "100%", padding: "11px 14px", borderRadius: "8px", border: "1.5px solid #e5e7eb", fontSize: "0.9rem", outline: "none", boxSizing: "border-box", fontFamily: "inherit", transition: "border-color 0.2s" };
