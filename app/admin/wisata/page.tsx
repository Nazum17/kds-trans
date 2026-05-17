"use client";
import { useState, useEffect } from "react";
import { wisataData as defaultData } from "../data";

type Wisata = { id: string; nama: string; gambar: string; tags: string; aktif: boolean };

const STORAGE_KEY = "kds_wisata";
const emptyForm: Omit<Wisata, "id"> = { nama: "", gambar: "", tags: "", aktif: true };

export default function AdminWisataPage() {
  const [list, setList]       = useState<Wisata[]>([]);
  const [modal, setModal]     = useState(false);
  const [editing, setEditing] = useState<Wisata | null>(null);
  const [form, setForm]       = useState<Omit<Wisata, "id">>(emptyForm);
  const [toast, setToast]     = useState("");

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    setList(saved ? JSON.parse(saved) : defaultData);
  }, []);

  function save(data: Wisata[]) {
    setList(data);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }

  function showToast(msg: string) { setToast(msg); setTimeout(() => setToast(""), 2500); }

  function openTambah() { setEditing(null); setForm(emptyForm); setModal(true); }
  function openEdit(w: Wisata) { setEditing(w); setForm({ nama: w.nama, gambar: w.gambar, tags: w.tags, aktif: w.aktif }); setModal(true); }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (editing) {
      save(list.map(w => w.id === editing.id ? { ...editing, ...form } : w));
      showToast("✅ Paket wisata diupdate!");
    } else {
      save([...list, { id: Date.now().toString(), ...form }]);
      showToast("✅ Paket wisata ditambahkan!");
    }
    setModal(false);
  }

  function handleHapus(id: string) {
    if (!confirm("Hapus paket wisata ini?")) return;
    save(list.filter(w => w.id !== id));
    showToast("🗑️ Paket dihapus.");
  }

  function toggleAktif(id: string) { save(list.map(w => w.id === id ? { ...w, aktif: !w.aktif } : w)); }

  function resetData() {
    if (!confirm("Reset ke data default?")) return;
    save(defaultData);
    showToast("🔄 Data direset.");
  }

  return (
    <div style={{ padding: "32px" }}>
      {toast && (
        <div style={{ position: "fixed", top: "24px", right: "24px", background: "#111", color: "#fff", padding: "12px 20px", borderRadius: "10px", zIndex: 9999, fontSize: "0.875rem", fontWeight: "600", boxShadow: "0 8px 24px rgba(0,0,0,0.2)" }}>
          {toast}
        </div>
      )}

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px", flexWrap: "wrap", gap: "12px" }}>
        <div>
          <h1 style={{ fontSize: "1.5rem", fontWeight: "800", color: "#111", marginBottom: "4px" }}>Kelola Paket Wisata</h1>
          <p style={{ color: "#6b7280", fontSize: "0.875rem" }}>{list.length} paket wisata terdaftar</p>
        </div>
        <div style={{ display: "flex", gap: "10px" }}>
          <button onClick={resetData} style={{ ...btnStyle, background: "#f3f4f6", color: "#374151", border: "1.5px solid #e5e7eb" }}>🔄 Reset</button>
          <button onClick={openTambah} style={{ ...btnStyle, background: "#0d6e3f", color: "#fff" }}>➕ Tambah Paket</button>
        </div>
      </div>

      {/* Card grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "20px" }}>
        {list.map(w => (
          <div key={w.id} style={{ background: "#fff", borderRadius: "14px", border: "1px solid #f0f0f0", overflow: "hidden", boxShadow: "0 2px 8px rgba(0,0,0,0.04)", opacity: w.aktif ? 1 : 0.6 }}>
            <div style={{ height: "160px", background: "#f5f5f5", overflow: "hidden" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={w.gambar} alt={w.nama} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
            <div style={{ padding: "16px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "8px" }}>
                <h3 style={{ fontSize: "0.95rem", fontWeight: "700", color: "#111", flex: 1, marginRight: "8px" }}>{w.nama}</h3>
                <button onClick={() => toggleAktif(w.id)} style={{
                  fontSize: "0.7rem", padding: "3px 8px", borderRadius: "20px", cursor: "pointer", border: "none", fontWeight: "700", flexShrink: 0,
                  background: w.aktif ? "#f0fdf4" : "#f9fafb",
                  color: w.aktif ? "#16a34a" : "#9ca3af",
                }}>
                  {w.aktif ? "Aktif" : "Nonaktif"}
                </button>
              </div>
              {w.tags && (
                <div style={{ display: "flex", flexWrap: "wrap", gap: "4px", marginBottom: "12px" }}>
                  {w.tags.split(",").map(t => (
                    <span key={t} style={{ background: "#fff7ed", color: "#c2410c", fontSize: "0.68rem", fontWeight: "700", padding: "2px 8px", borderRadius: "20px" }}>
                      {t.trim()}
                    </span>
                  ))}
                </div>
              )}
              <p style={{ fontSize: "0.75rem", color: "#9ca3af", marginBottom: "12px", fontFamily: "monospace" }}>{w.gambar}</p>
              <div style={{ display: "flex", gap: "8px" }}>
                <button onClick={() => openEdit(w)} style={{ ...actionBtn, flex: 1 }}>✏️ Edit</button>
                <button onClick={() => handleHapus(w.id)} style={{ ...actionBtn, borderColor: "#fecaca", color: "#dc2626" }}>🗑️ Hapus</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL */}
      {modal && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, padding: "24px" }}>
          <div style={{ background: "#fff", borderRadius: "20px", padding: "32px", width: "100%", maxWidth: "480px", boxShadow: "0 24px 64px rgba(0,0,0,0.2)" }}>
            <h2 style={{ fontSize: "1.2rem", fontWeight: "800", color: "#111", marginBottom: "24px" }}>
              {editing ? "✏️ Edit Paket Wisata" : "➕ Tambah Paket Wisata"}
            </h2>
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div>
                <label style={labelStyle}>Nama Paket *</label>
                <input required value={form.nama} onChange={e => setForm(f => ({ ...f, nama: e.target.value }))} placeholder="contoh: Trip Bromo Midnight" style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Path Gambar <span style={{ fontWeight: 400, color: "#9ca3af" }}>contoh: /images/bromo_midnight.jpeg</span></label>
                <input value={form.gambar} onChange={e => setForm(f => ({ ...f, gambar: e.target.value }))} placeholder="/images/nama-file.jpg" style={inputStyle} />
                {form.gambar && (
                  <div style={{ marginTop: "8px", height: "80px", borderRadius: "8px", overflow: "hidden", background: "#f5f5f5" }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={form.gambar} alt="preview" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </div>
                )}
              </div>
              <div>
                <label style={labelStyle}>Tags <span style={{ fontWeight: 400, color: "#9ca3af" }}>pisahkan dengan koma, contoh: OPEN TRIP, PRIVATE TRIP</span></label>
                <input value={form.tags} onChange={e => setForm(f => ({ ...f, tags: e.target.value }))} placeholder="OPEN TRIP, PRIVATE TRIP" style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Status</label>
                <select value={form.aktif ? "aktif" : "nonaktif"} onChange={e => setForm(f => ({ ...f, aktif: e.target.value === "aktif" }))} style={inputStyle}>
                  <option value="aktif">Aktif</option>
                  <option value="nonaktif">Nonaktif</option>
                </select>
              </div>
              <div style={{ display: "flex", gap: "10px", marginTop: "8px" }}>
                <button type="submit" style={{ ...btnStyle, background: "#0d6e3f", color: "#fff", flex: 1 }}>
                  {editing ? "✅ Simpan" : "✅ Tambah"}
                </button>
                <button type="button" onClick={() => setModal(false)} style={{ ...btnStyle, background: "#f3f4f6", color: "#374151", border: "1.5px solid #e5e7eb" }}>
                  Batal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

const btnStyle: React.CSSProperties   = { padding: "10px 18px", borderRadius: "8px", fontWeight: "700", fontSize: "0.875rem", cursor: "pointer", border: "none", fontFamily: "inherit" };
const inputStyle: React.CSSProperties = { width: "100%", padding: "10px 12px", borderRadius: "8px", border: "1.5px solid #e5e7eb", fontSize: "0.9rem", outline: "none", boxSizing: "border-box", fontFamily: "inherit" };
const labelStyle: React.CSSProperties = { display: "block", fontSize: "0.8rem", fontWeight: "600", color: "#374151", marginBottom: "6px" };
const actionBtn: React.CSSProperties  = { fontSize: "0.8rem", padding: "7px 12px", borderRadius: "8px", border: "1.5px solid #e5e7eb", color: "#374151", background: "none", cursor: "pointer", fontFamily: "inherit", fontWeight: "600" };
