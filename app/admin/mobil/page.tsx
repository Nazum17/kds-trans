"use client";
import { useState, useEffect, useRef } from "react";

type Armada = {
  id: string; kategori: string; nama: string;
  harga: number; hargaLabel: string; tipe: string;
  gambar: string; deskripsi: string; aktif: boolean;
};

const KATEGORI = ["City Car", "MPV", "Premium"];
const TIPE     = ["Self Drive", "Self Drive/Driver", "Dengan Driver"];
const emptyForm = { kategori: "City Car", nama: "", harga: 0, tipe: "Self Drive", gambar: "", deskripsi: "", aktif: true };

export default function AdminMobilPage() {
  const [list, setList]       = useState<Armada[]>([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal]     = useState(false);
  const [editing, setEditing] = useState<Armada | null>(null);
  const [form, setForm]       = useState<typeof emptyForm>(emptyForm);
  const [filter, setFilter]   = useState("Semua");
  const [search, setSearch]   = useState("");
  const [toast, setToast]     = useState("");
  const [saving, setSaving]   = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => { fetchData(); }, []);

  async function fetchData() {
    setLoading(true);
    const res = await fetch("/api/armada");
    setList(await res.json());
    setLoading(false);
  }

  function showToast(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(""), 2800);
  }

  function openTambah() {
    setEditing(null);
    setForm(emptyForm);
    setModal(true);
  }

  function openEdit(a: Armada) {
    setEditing(a);
    setForm({ kategori: a.kategori, nama: a.nama, harga: a.harga, tipe: a.tipe, gambar: a.gambar, deskripsi: a.deskripsi, aktif: a.aktif });
    setModal(true);
  }

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const fd = new FormData();
    fd.append("file", file);
    const res = await fetch("/api/upload", { method: "POST", body: fd });
    const data = await res.json();
    if (data.url) {
      setForm(f => ({ ...f, gambar: data.url }));
      showToast("✅ Foto berhasil diupload!");
    } else {
      showToast("❌ " + (data.error || "Upload gagal"));
    }
    setUploading(false);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    const payload = { ...form, harga: Number(form.harga), ...(editing ? { id: editing.id } : {}) };
    const method = editing ? "PUT" : "POST";
    const res = await fetch("/api/armada", { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
    if (res.ok) {
      await fetchData();
      setModal(false);
      showToast(editing ? "✅ Armada berhasil diupdate!" : "✅ Armada baru ditambahkan!");
    } else {
      showToast("❌ Gagal menyimpan data");
    }
    setSaving(false);
  }

  async function handleHapus(id: string) {
    if (!confirm("Hapus armada ini? Tidak bisa dibatalkan.")) return;
    const res = await fetch("/api/armada", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) });
    if (res.ok) { await fetchData(); showToast("🗑️ Armada dihapus."); }
  }

  async function toggleAktif(a: Armada) {
    await fetch("/api/armada", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...a, aktif: !a.aktif }) });
    await fetchData();
  }

  const filtered = list
    .filter(a => filter === "Semua" || a.kategori === filter)
    .filter(a => a.nama.toLowerCase().includes(search.toLowerCase()));

  const katColor: Record<string, { bg: string; color: string }> = {
    "City Car": { bg: "#eff6ff", color: "#1d4ed8" },
    "MPV":      { bg: "#f5f3ff", color: "#6d28d9" },
    "Premium":  { bg: "#fffbeb", color: "#b45309" },
  };

  return (
    <div style={{ padding: "32px", animation: "fadeUp 0.4s ease both" }}>
      {toast && (
        <div style={{ position: "fixed", top: "24px", right: "24px", background: "#111", color: "#fff", padding: "12px 20px", borderRadius: "10px", zIndex: 9999, fontSize: "0.875rem", fontWeight: "600", boxShadow: "0 8px 24px rgba(0,0,0,0.2)", animation: "fadeUp 0.3s ease" }}>
          {toast}
        </div>
      )}

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px", flexWrap: "wrap", gap: "12px" }}>
        <div>
          <h1 style={{ fontSize: "1.5rem", fontWeight: "800", color: "#111", marginBottom: "4px" }}>Kelola Armada Mobil</h1>
          <p style={{ color: "#6b7280", fontSize: "0.875rem" }}>{list.length} armada terdaftar</p>
        </div>
        <button onClick={openTambah} style={{ ...btnPrimary }}>➕ Tambah Armada</button>
      </div>

      {/* Filter & Search */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px", flexWrap: "wrap" }}>
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="🔍  Cari nama armada..." style={{ ...inputStyle, maxWidth: "260px" }} />
        {["Semua", ...KATEGORI].map(k => (
          <button key={k} onClick={() => setFilter(k)} style={{
            padding: "8px 16px", borderRadius: "8px", fontSize: "0.85rem", fontWeight: "600", cursor: "pointer", border: "1.5px solid",
            background: filter === k ? "#111" : "#fff", color: filter === k ? "#fff" : "#374151",
            borderColor: filter === k ? "#111" : "#e5e7eb", transition: "all 0.2s",
          }}>{k}</button>
        ))}
      </div>

      {/* Table */}
      <div style={{ background: "#fff", borderRadius: "14px", border: "1px solid #f0f0f0", overflow: "hidden" }}>
        {loading ? (
          <div style={{ padding: "60px", textAlign: "center", color: "#9ca3af" }}>Memuat data...</div>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#f9fafb" }}>
                {["Foto", "Nama", "Kategori", "Harga/Hari", "Tipe", "Status", "Aksi"].map(h => (
                  <th key={h} style={{ padding: "12px 16px", textAlign: "left", fontSize: "0.72rem", fontWeight: "700", color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.05em" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr><td colSpan={7} style={{ padding: "40px", textAlign: "center", color: "#9ca3af" }}>Tidak ada armada ditemukan.</td></tr>
              ) : filtered.map(a => (
                <tr key={a.id} style={{ borderTop: "1px solid #f5f5f5", transition: "background 0.15s" }}
                  onMouseEnter={e => (e.currentTarget.style.background = "#fafafa")}
                  onMouseLeave={e => (e.currentTarget.style.background = "")}>
                  <td style={{ padding: "10px 16px" }}>
                    <div style={{ width: "60px", height: "42px", borderRadius: "6px", overflow: "hidden", background: "#f5f5f5" }}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={a.gambar} alt={a.nama} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
                    </div>
                  </td>
                  <td style={{ padding: "10px 16px", fontWeight: "600", fontSize: "0.875rem", color: "#111" }}>{a.nama}</td>
                  <td style={{ padding: "10px 16px" }}>
                    <span style={{ fontSize: "0.72rem", fontWeight: "700", padding: "3px 10px", borderRadius: "20px", ...katColor[a.kategori] }}>{a.kategori}</span>
                  </td>
                  <td style={{ padding: "10px 16px", fontSize: "0.875rem", color: "#E8341A", fontWeight: "700" }}>{a.hargaLabel}</td>
                  <td style={{ padding: "10px 16px", fontSize: "0.8rem", color: "#6b7280" }}>{a.tipe}</td>
                  <td style={{ padding: "10px 16px" }}>
                    <button onClick={() => toggleAktif(a)} style={{
                      fontSize: "0.72rem", padding: "4px 10px", borderRadius: "20px", cursor: "pointer", border: "none", fontWeight: "700",
                      background: a.aktif ? "#f0fdf4" : "#f9fafb", color: a.aktif ? "#16a34a" : "#9ca3af", transition: "all 0.2s",
                    }}>{a.aktif ? "✓ Aktif" : "✗ Nonaktif"}</button>
                  </td>
                  <td style={{ padding: "10px 16px" }}>
                    <div style={{ display: "flex", gap: "6px" }}>
                      <button onClick={() => openEdit(a)} style={actionBtn}>✏️ Edit</button>
                      <button onClick={() => handleHapus(a.id)} style={{ ...actionBtn, borderColor: "#fecaca", color: "#dc2626" }}>🗑️</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* MODAL */}
      {modal && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, padding: "24px" }}
          onClick={e => { if (e.target === e.currentTarget) setModal(false); }}>
          <div style={{ background: "#fff", borderRadius: "20px", padding: "32px", width: "100%", maxWidth: "540px", maxHeight: "90vh", overflowY: "auto", boxShadow: "0 24px 64px rgba(0,0,0,0.25)", animation: "fadeUp 0.3s cubic-bezier(0.34,1.56,0.64,1)" }}>
            <h2 style={{ fontSize: "1.2rem", fontWeight: "800", color: "#111", marginBottom: "24px" }}>
              {editing ? "✏️ Edit Armada" : "➕ Tambah Armada Baru"}
            </h2>
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
                <div style={{ gridColumn: "1/-1" }}>
                  <label style={labelStyle}>Nama Armada *</label>
                  <input required value={form.nama} onChange={e => setForm(f => ({ ...f, nama: e.target.value }))} placeholder="contoh: Honda Brio New" style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Kategori *</label>
                  <select value={form.kategori} onChange={e => setForm(f => ({ ...f, kategori: e.target.value }))} style={inputStyle}>
                    {KATEGORI.map(k => <option key={k}>{k}</option>)}
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>Tipe Layanan *</label>
                  <select value={form.tipe} onChange={e => setForm(f => ({ ...f, tipe: e.target.value }))} style={inputStyle}>
                    {TIPE.map(t => <option key={t}>{t}</option>)}
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>Harga/Hari (Rp) <span style={{ fontWeight: 400, color: "#9ca3af" }}>0 = Hubungi Kami</span></label>
                  <input type="number" min="0" value={form.harga} onChange={e => setForm(f => ({ ...f, harga: parseInt(e.target.value) || 0 }))} style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Status</label>
                  <select value={form.aktif ? "aktif" : "nonaktif"} onChange={e => setForm(f => ({ ...f, aktif: e.target.value === "aktif" }))} style={inputStyle}>
                    <option value="aktif">Aktif</option>
                    <option value="nonaktif">Nonaktif</option>
                  </select>
                </div>

                {/* Upload foto */}
                <div style={{ gridColumn: "1/-1" }}>
                  <label style={labelStyle}>Foto Armada</label>
                  <div style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
                    <div style={{ flex: 1 }}>
                      <input
                        type="file" accept="image/*" ref={fileRef}
                        onChange={handleUpload}
                        style={{ display: "none" }}
                      />
                      <button type="button" onClick={() => fileRef.current?.click()}
                        style={{ ...btnSecondary, width: "100%", marginBottom: "8px", opacity: uploading ? 0.7 : 1 }}
                        disabled={uploading}
                      >
                        {uploading ? "⏳ Mengupload..." : "📁 Upload Foto"}
                      </button>
                      <input
                        value={form.gambar} onChange={e => setForm(f => ({ ...f, gambar: e.target.value }))}
                        placeholder="atau ketik path: /images/nama-file.jpg"
                        style={{ ...inputStyle, fontSize: "0.8rem" }}
                      />
                    </div>
                    {form.gambar && (
                      <div style={{ width: "80px", height: "60px", borderRadius: "8px", overflow: "hidden", background: "#f5f5f5", flexShrink: 0 }}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={form.gambar} alt="preview" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
                      </div>
                    )}
                  </div>
                </div>

                <div style={{ gridColumn: "1/-1" }}>
                  <label style={labelStyle}>Deskripsi *</label>
                  <textarea required value={form.deskripsi} onChange={e => setForm(f => ({ ...f, deskripsi: e.target.value }))}
                    placeholder="Deskripsi singkat armada..." rows={3}
                    style={{ ...inputStyle, resize: "vertical" }} />
                </div>
              </div>

              <div style={{ display: "flex", gap: "10px", marginTop: "8px" }}>
                <button type="submit" disabled={saving} style={{ ...btnPrimary, flex: 1, opacity: saving ? 0.7 : 1 }}>
                  {saving ? "Menyimpan..." : editing ? "✅ Simpan Perubahan" : "✅ Tambah Armada"}
                </button>
                <button type="button" onClick={() => setModal(false)} style={btnSecondary}>Batal</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

const btnPrimary:   React.CSSProperties = { padding: "10px 20px", borderRadius: "8px", fontWeight: "700", fontSize: "0.875rem", cursor: "pointer", border: "none", background: "#111", color: "#fff", fontFamily: "inherit", transition: "opacity 0.2s" };
const btnSecondary: React.CSSProperties = { padding: "10px 16px", borderRadius: "8px", fontWeight: "600", fontSize: "0.875rem", cursor: "pointer", border: "1.5px solid #e5e7eb", background: "#f9fafb", color: "#374151", fontFamily: "inherit" };
const inputStyle:   React.CSSProperties = { width: "100%", padding: "10px 12px", borderRadius: "8px", border: "1.5px solid #e5e7eb", fontSize: "0.9rem", outline: "none", boxSizing: "border-box", fontFamily: "inherit" };
const labelStyle:   React.CSSProperties = { display: "block", fontSize: "0.8rem", fontWeight: "600", color: "#374151", marginBottom: "6px" };
const actionBtn:    React.CSSProperties = { fontSize: "0.75rem", padding: "5px 10px", borderRadius: "6px", border: "1.5px solid #e5e7eb", color: "#374151", background: "none", cursor: "pointer", fontFamily: "inherit" };
