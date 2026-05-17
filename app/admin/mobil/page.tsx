"use client";
import { useState, useEffect } from "react";
import { mobilData as defaultData } from "../data";

type Mobil = {
  id: string; kategori: string; nama: string;
  harga: number; tipe: string; gambar: string; aktif: boolean;
};

const STORAGE_KEY = "kds_mobil";
const KATEGORI    = ["City Car", "MPV", "Premium"];
const TIPE        = ["Self Drive", "Self Drive/Driver", "Dengan Driver"];

const emptyForm: Omit<Mobil, "id"> = { kategori: "City Car", nama: "", harga: 0, tipe: "Self Drive", gambar: "", aktif: true };

export default function AdminMobilPage() {
  const [list, setList]         = useState<Mobil[]>([]);
  const [modal, setModal]       = useState(false);
  const [editing, setEditing]   = useState<Mobil | null>(null);
  const [form, setForm]         = useState<Omit<Mobil, "id">>(emptyForm);
  const [filterKat, setFilterKat] = useState("Semua");
  const [search, setSearch]     = useState("");
  const [toast, setToast]       = useState("");

  // Load data
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    setList(saved ? JSON.parse(saved) : defaultData);
  }, []);

  function save(data: Mobil[]) {
    setList(data);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }

  function showToast(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(""), 2500);
  }

  function openTambah() {
    setEditing(null);
    setForm(emptyForm);
    setModal(true);
  }

  function openEdit(m: Mobil) {
    setEditing(m);
    setForm({ kategori: m.kategori, nama: m.nama, harga: m.harga, tipe: m.tipe, gambar: m.gambar, aktif: m.aktif });
    setModal(true);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (editing) {
      const updated = list.map(m => m.id === editing.id ? { ...editing, ...form } : m);
      save(updated);
      showToast("✅ Armada berhasil diupdate!");
    } else {
      const newItem: Mobil = { id: Date.now().toString(), ...form };
      save([...list, newItem]);
      showToast("✅ Armada baru berhasil ditambahkan!");
    }
    setModal(false);
  }

  function handleHapus(id: string) {
    if (!confirm("Hapus armada ini?")) return;
    save(list.filter(m => m.id !== id));
    showToast("🗑️ Armada dihapus.");
  }

  function toggleAktif(id: string) {
    save(list.map(m => m.id === id ? { ...m, aktif: !m.aktif } : m));
  }

  function resetData() {
    if (!confirm("Reset ke data default? Semua perubahan akan hilang.")) return;
    save(defaultData);
    showToast("🔄 Data direset ke default.");
  }

  const filtered = list
    .filter(m => filterKat === "Semua" || m.kategori === filterKat)
    .filter(m => m.nama.toLowerCase().includes(search.toLowerCase()));

  const katColor: Record<string, { bg: string; color: string }> = {
    "City Car": { bg: "#eff6ff", color: "#1d4ed8" },
    "MPV":      { bg: "#f5f3ff", color: "#6d28d9" },
    "Premium":  { bg: "#fffbeb", color: "#b45309" },
  };

  return (
    <div style={{ padding: "32px" }}>
      {/* Toast */}
      {toast && (
        <div style={{ position: "fixed", top: "24px", right: "24px", background: "#111", color: "#fff", padding: "12px 20px", borderRadius: "10px", zIndex: 9999, fontSize: "0.875rem", fontWeight: "600", boxShadow: "0 8px 24px rgba(0,0,0,0.2)" }}>
          {toast}
        </div>
      )}

      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px", flexWrap: "wrap", gap: "12px" }}>
        <div>
          <h1 style={{ fontSize: "1.5rem", fontWeight: "800", color: "#111", marginBottom: "4px" }}>Kelola Armada Mobil</h1>
          <p style={{ color: "#6b7280", fontSize: "0.875rem" }}>{list.length} armada terdaftar</p>
        </div>
        <div style={{ display: "flex", gap: "10px" }}>
          <button onClick={resetData} style={{ ...btnStyle, background: "#f3f4f6", color: "#374151", border: "1.5px solid #e5e7eb" }}>
            🔄 Reset Default
          </button>
          <button onClick={openTambah} style={{ ...btnStyle, background: "#111", color: "#fff" }}>
            ➕ Tambah Armada
          </button>
        </div>
      </div>

      {/* Filter & Search */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px", flexWrap: "wrap" }}>
        <input
          value={search} onChange={e => setSearch(e.target.value)}
          placeholder="🔍  Cari nama armada..."
          style={{ ...inputStyle, maxWidth: "260px" }}
        />
        {["Semua", ...KATEGORI].map(k => (
          <button key={k} onClick={() => setFilterKat(k)} style={{
            padding: "8px 16px", borderRadius: "8px", fontSize: "0.85rem", fontWeight: "600",
            cursor: "pointer", border: "1.5px solid",
            background: filterKat === k ? "#111" : "#fff",
            color: filterKat === k ? "#fff" : "#374151",
            borderColor: filterKat === k ? "#111" : "#e5e7eb",
          }}>{k}</button>
        ))}
      </div>

      {/* Table */}
      <div style={{ background: "#fff", borderRadius: "14px", border: "1px solid #f0f0f0", overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#f9fafb" }}>
              {["Foto", "Nama Armada", "Kategori", "Harga/Hari", "Tipe", "Status", "Aksi"].map(h => (
                <th key={h} style={{ padding: "12px 16px", textAlign: "left", fontSize: "0.72rem", fontWeight: "700", color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.05em", whiteSpace: "nowrap" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr><td colSpan={7} style={{ padding: "40px", textAlign: "center", color: "#9ca3af" }}>Tidak ada armada ditemukan.</td></tr>
            ) : filtered.map(m => (
              <tr key={m.id} style={{ borderTop: "1px solid #f5f5f5" }}>
                <td style={{ padding: "10px 16px" }}>
                  <div style={{ width: "60px", height: "42px", borderRadius: "6px", overflow: "hidden", background: "#f5f5f5" }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={m.gambar} alt={m.nama} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
                  </div>
                </td>
                <td style={{ padding: "10px 16px", fontWeight: "600", fontSize: "0.875rem", color: "#111" }}>{m.nama}</td>
                <td style={{ padding: "10px 16px" }}>
                  <span style={{ fontSize: "0.72rem", fontWeight: "700", padding: "3px 10px", borderRadius: "20px", ...katColor[m.kategori] }}>
                    {m.kategori}
                  </span>
                </td>
                <td style={{ padding: "10px 16px", fontSize: "0.875rem", color: "#E8341A", fontWeight: "700" }}>
                  {m.harga === 0 ? "Hubungi Kami" : `Rp ${m.harga.toLocaleString("id-ID")}`}
                </td>
                <td style={{ padding: "10px 16px", fontSize: "0.8rem", color: "#6b7280" }}>{m.tipe}</td>
                <td style={{ padding: "10px 16px" }}>
                  <button onClick={() => toggleAktif(m.id)} style={{
                    fontSize: "0.72rem", padding: "4px 10px", borderRadius: "20px", cursor: "pointer", border: "none", fontWeight: "700",
                    background: m.aktif ? "#f0fdf4" : "#f9fafb",
                    color: m.aktif ? "#16a34a" : "#9ca3af",
                  }}>
                    {m.aktif ? "✓ Aktif" : "✗ Nonaktif"}
                  </button>
                </td>
                <td style={{ padding: "10px 16px" }}>
                  <div style={{ display: "flex", gap: "6px" }}>
                    <button onClick={() => openEdit(m)} style={{ ...actionBtn }}>✏️ Edit</button>
                    <button onClick={() => handleHapus(m.id)} style={{ ...actionBtn, borderColor: "#fecaca", color: "#dc2626" }}>🗑️ Hapus</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODAL */}
      {modal && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, padding: "24px" }}>
          <div style={{ background: "#fff", borderRadius: "20px", padding: "32px", width: "100%", maxWidth: "520px", maxHeight: "90vh", overflowY: "auto", boxShadow: "0 24px 64px rgba(0,0,0,0.2)" }}>
            <h2 style={{ fontSize: "1.2rem", fontWeight: "800", color: "#111", marginBottom: "24px" }}>
              {editing ? "✏️ Edit Armada" : "➕ Tambah Armada Baru"}
            </h2>

            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
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
                <div style={{ gridColumn: "1/-1" }}>
                  <label style={labelStyle}>Path Gambar <span style={{ fontWeight: 400, color: "#9ca3af" }}>contoh: /images/Brio_new_.jpg</span></label>
                  <input value={form.gambar} onChange={e => setForm(f => ({ ...f, gambar: e.target.value }))} placeholder="/images/nama-file.jpg" style={inputStyle} />
                  {form.gambar && (
                    <div style={{ marginTop: "8px", width: "100px", height: "70px", borderRadius: "8px", overflow: "hidden", background: "#f5f5f5" }}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={form.gambar} alt="preview" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
                    </div>
                  )}
                </div>
              </div>

              <div style={{ display: "flex", gap: "10px", marginTop: "8px" }}>
                <button type="submit" style={{ ...btnStyle, background: "#111", color: "#fff", flex: 1 }}>
                  {editing ? "✅ Simpan Perubahan" : "✅ Tambah Armada"}
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

const btnStyle: React.CSSProperties    = { padding: "10px 18px", borderRadius: "8px", fontWeight: "700", fontSize: "0.875rem", cursor: "pointer", border: "none", fontFamily: "inherit" };
const inputStyle: React.CSSProperties  = { width: "100%", padding: "10px 12px", borderRadius: "8px", border: "1.5px solid #e5e7eb", fontSize: "0.9rem", outline: "none", boxSizing: "border-box", fontFamily: "inherit" };
const labelStyle: React.CSSProperties  = { display: "block", fontSize: "0.8rem", fontWeight: "600", color: "#374151", marginBottom: "6px" };
const actionBtn: React.CSSProperties   = { fontSize: "0.75rem", padding: "5px 10px", borderRadius: "6px", border: "1.5px solid #e5e7eb", color: "#374151", background: "none", cursor: "pointer", fontFamily: "inherit" };
