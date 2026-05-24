"use client";
import { useState, useEffect, useRef } from "react";

type Wisata = { id: string; nama: string; gambar: string; tags: string[]; deskripsi: string; bestSeller: boolean; aktif: boolean };
const emptyForm = { nama: "", gambar: "", tags: "", deskripsi: "", bestSeller: false, aktif: true };

export default function AdminWisataPage() {
  const [list, setList]       = useState<Wisata[]>([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal]     = useState(false);
  const [editing, setEditing] = useState<Wisata | null>(null);
  const [form, setForm]       = useState(emptyForm);
  const [toast, setToast]     = useState("");
  const [saving, setSaving]   = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => { fetchData(); }, []);

  async function fetchData() {
    setLoading(true);
    const res = await fetch("/api/wisata");
    setList(await res.json());
    setLoading(false);
  }

  function showToast(msg: string) { setToast(msg); setTimeout(() => setToast(""), 2800); }

  function openTambah() { setEditing(null); setForm(emptyForm); setModal(true); }
  function openEdit(w: Wisata) {
    setEditing(w);
    setForm({ nama: w.nama, gambar: w.gambar, tags: w.tags.join(", "), deskripsi: w.deskripsi, bestSeller: w.bestSeller, aktif: w.aktif });
    setModal(true);
  }

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const fd = new FormData();
    fd.append("file", file);
    const res  = await fetch("/api/upload", { method: "POST", body: fd });
    const data = await res.json();
    if (data.url) { setForm(f => ({ ...f, gambar: data.url })); showToast("✅ Foto berhasil diupload!"); }
    else showToast("❌ " + (data.error || "Upload gagal"));
    setUploading(false);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    const payload = {
      ...form,
      tags: form.tags.split(",").map(t => t.trim()).filter(Boolean),
      ...(editing ? { id: editing.id } : {}),
    };
    const method = editing ? "PUT" : "POST";
    const res = await fetch("/api/wisata", { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
    if (res.ok) {
      await fetchData(); setModal(false);
      showToast(editing ? "✅ Paket wisata diupdate!" : "✅ Paket wisata ditambahkan!");
    } else showToast("❌ Gagal menyimpan");
    setSaving(false);
  }

  async function handleHapus(id: string) {
    if (!confirm("Hapus paket wisata ini?")) return;
    const res = await fetch("/api/wisata", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) });
    if (res.ok) { await fetchData(); showToast("🗑️ Paket dihapus."); }
  }

  async function toggleAktif(w: Wisata) {
    await fetch("/api/wisata", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...w, aktif: !w.aktif }) });
    await fetchData();
  }

  return (
    <div style={{ padding: "32px", animation: "fadeUp 0.4s ease both" }}>
      {toast && (
        <div style={{ position: "fixed", top: "24px", right: "24px", background: "#111", color: "#fff", padding: "12px 20px", borderRadius: "10px", zIndex: 9999, fontSize: "0.875rem", fontWeight: "600", boxShadow: "0 8px 24px rgba(0,0,0,0.2)" }}>
          {toast}
        </div>
      )}

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
        <div>
          <h1 style={{ fontSize: "1.5rem", fontWeight: "800", color: "#111", marginBottom: "4px" }}>Kelola Paket Wisata</h1>
          <p style={{ color: "#6b7280", fontSize: "0.875rem" }}>{list.length} paket terdaftar</p>
        </div>
        <button onClick={openTambah} style={btnPrimary}>➕ Tambah Paket</button>
      </div>

      {loading ? (
        <div style={{ padding: "60px", textAlign: "center", color: "#9ca3af" }}>Memuat data...</div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "20px" }}>
          {list.map(w => (
            <div key={w.id} style={{ background: "#fff", borderRadius: "14px", border: "1px solid #f0f0f0", overflow: "hidden", boxShadow: "0 2px 8px rgba(0,0,0,0.04)", opacity: w.aktif ? 1 : 0.6, transition: "transform 0.3s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.3s ease" }}
              onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.transform = "translateY(-4px)"; (e.currentTarget as HTMLDivElement).style.boxShadow = "0 12px 32px rgba(0,0,0,0.1)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform = ""; (e.currentTarget as HTMLDivElement).style.boxShadow = "0 2px 8px rgba(0,0,0,0.04)"; }}>
              <div style={{ height: "160px", background: "#f5f5f5", overflow: "hidden" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={w.gambar} alt={w.nama} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
              <div style={{ padding: "16px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "8px" }}>
                  <h3 style={{ fontSize: "0.95rem", fontWeight: "700", color: "#111", flex: 1, marginRight: "8px" }}>{w.nama}</h3>
                  <div style={{ display: "flex", gap: "4px", flexShrink: 0 }}>
                    {w.bestSeller && <span style={{ fontSize: "0.68rem", background: "#fef9c3", color: "#b45309", padding: "2px 7px", borderRadius: "20px", fontWeight: "700" }}>⭐ BS</span>}
                    <button onClick={() => toggleAktif(w)} style={{ fontSize: "0.68rem", padding: "2px 8px", borderRadius: "20px", cursor: "pointer", border: "none", fontWeight: "700", background: w.aktif ? "#f0fdf4" : "#f9fafb", color: w.aktif ? "#16a34a" : "#9ca3af" }}>
                      {w.aktif ? "Aktif" : "Off"}
                    </button>
                  </div>
                </div>
                {w.tags.length > 0 && (
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "4px", marginBottom: "10px" }}>
                    {w.tags.map(t => <span key={t} style={{ background: "#fff7ed", color: "#c2410c", fontSize: "0.68rem", fontWeight: "700", padding: "2px 8px", borderRadius: "20px" }}>{t}</span>)}
                  </div>
                )}
                <p style={{ fontSize: "0.8rem", color: "#9ca3af", marginBottom: "12px", lineHeight: "1.5" }}>{w.deskripsi.slice(0, 80)}...</p>
                <div style={{ display: "flex", gap: "8px" }}>
                  <button onClick={() => openEdit(w)} style={{ ...actionBtn, flex: 1 }}>✏️ Edit</button>
                  <button onClick={() => handleHapus(w.id)} style={{ ...actionBtn, borderColor: "#fecaca", color: "#dc2626" }}>🗑️ Hapus</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* MODAL */}
      {modal && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, padding: "24px" }}
          onClick={e => { if (e.target === e.currentTarget) setModal(false); }}>
          <div style={{ background: "#fff", borderRadius: "20px", padding: "32px", width: "100%", maxWidth: "480px", maxHeight: "90vh", overflowY: "auto", boxShadow: "0 24px 64px rgba(0,0,0,0.25)", animation: "fadeUp 0.3s cubic-bezier(0.34,1.56,0.64,1)" }}>
            <h2 style={{ fontSize: "1.2rem", fontWeight: "800", color: "#111", marginBottom: "24px" }}>
              {editing ? "✏️ Edit Paket Wisata" : "➕ Tambah Paket Wisata"}
            </h2>
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div>
                <label style={labelStyle}>Nama Paket *</label>
                <input required value={form.nama} onChange={e => setForm(f => ({ ...f, nama: e.target.value }))} placeholder="contoh: Trip Bromo Midnight" style={inputStyle} />
              </div>

              {/* Upload foto */}
              <div>
                <label style={labelStyle}>Foto Paket</label>
                <div style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
                  <div style={{ flex: 1 }}>
                    <input type="file" accept="image/*" ref={fileRef} onChange={handleUpload} style={{ display: "none" }} />
                    <button type="button" onClick={() => fileRef.current?.click()} style={{ ...btnSecondary, width: "100%", marginBottom: "8px" }} disabled={uploading}>
                      {uploading ? "⏳ Mengupload..." : "📁 Upload Foto"}
                    </button>
                    <input value={form.gambar} onChange={e => setForm(f => ({ ...f, gambar: e.target.value }))} placeholder="atau ketik path manual" style={{ ...inputStyle, fontSize: "0.8rem" }} />
                  </div>
                  {form.gambar && (
                    <div style={{ width: "80px", height: "56px", borderRadius: "8px", overflow: "hidden", background: "#f5f5f5", flexShrink: 0 }}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={form.gambar} alt="preview" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label style={labelStyle}>Tags <span style={{ fontWeight: 400, color: "#9ca3af" }}>pisahkan dengan koma</span></label>
                <input value={form.tags} onChange={e => setForm(f => ({ ...f, tags: e.target.value }))} placeholder="OPEN TRIP, PRIVATE TRIP" style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Deskripsi *</label>
                <textarea required value={form.deskripsi} onChange={e => setForm(f => ({ ...f, deskripsi: e.target.value }))} placeholder="Deskripsi paket wisata..." rows={3} style={{ ...inputStyle, resize: "vertical" }} />
              </div>
              <div style={{ display: "flex", gap: "16px" }}>
                <label style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.875rem", cursor: "pointer" }}>
                  <input type="checkbox" checked={form.bestSeller} onChange={e => setForm(f => ({ ...f, bestSeller: e.target.checked }))} />
                  Best Seller
                </label>
                <label style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.875rem", cursor: "pointer" }}>
                  <input type="checkbox" checked={form.aktif} onChange={e => setForm(f => ({ ...f, aktif: e.target.checked }))} />
                  Aktif
                </label>
              </div>
              <div style={{ display: "flex", gap: "10px" }}>
                <button type="submit" disabled={saving} style={{ ...btnPrimary, flex: 1, background: "#0d6e3f", opacity: saving ? 0.7 : 1 }}>
                  {saving ? "Menyimpan..." : editing ? "✅ Simpan" : "✅ Tambah"}
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

const btnPrimary:   React.CSSProperties = { padding: "10px 20px", borderRadius: "8px", fontWeight: "700", fontSize: "0.875rem", cursor: "pointer", border: "none", background: "#0d6e3f", color: "#fff", fontFamily: "inherit" };
const btnSecondary: React.CSSProperties = { padding: "10px 16px", borderRadius: "8px", fontWeight: "600", fontSize: "0.875rem", cursor: "pointer", border: "1.5px solid #e5e7eb", background: "#f9fafb", color: "#374151", fontFamily: "inherit" };
const inputStyle:   React.CSSProperties = { width: "100%", padding: "10px 12px", borderRadius: "8px", border: "1.5px solid #e5e7eb", fontSize: "0.9rem", outline: "none", boxSizing: "border-box", fontFamily: "inherit" };
const labelStyle:   React.CSSProperties = { display: "block", fontSize: "0.8rem", fontWeight: "600", color: "#374151", marginBottom: "6px" };
const actionBtn:    React.CSSProperties = { fontSize: "0.8rem", padding: "7px 12px", borderRadius: "8px", border: "1.5px solid #e5e7eb", color: "#374151", background: "none", cursor: "pointer", fontFamily: "inherit", fontWeight: "600" };
