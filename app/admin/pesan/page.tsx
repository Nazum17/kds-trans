"use client";
import { useState } from "react";

const WA_NUMBER = "6285143010008";

type Template = { label: string; icon: string; pesan: string };

const templates: Template[] = [
  { icon: "🚗", label: "Konfirmasi Booking Mobil",    pesan: "Halo [NAMA], terima kasih sudah menghubungi KDS Trans! 😊\n\nKami konfirmasi booking Anda:\n🚗 Armada: [MOBIL]\n📅 Tanggal: [TANGGAL]\n⏱️ Durasi: [DURASI]\n💰 Total: Rp [HARGA]\n\nMohon transfer DP minimal 50% ke rekening kami. Konfirmasi setelah transfer ya! 🙏" },
  { icon: "🏔️", label: "Konfirmasi Paket Wisata",     pesan: "Halo [NAMA], terima kasih sudah mempercayakan perjalanan ke KDS Trans! 🙏\n\n✅ Paket Anda: [PAKET]\n📅 Tanggal keberangkatan: [TANGGAL]\n👥 Jumlah peserta: [JUMLAH]\n💰 Total: Rp [HARGA]\n\nSilakan transfer DP untuk mengunci jadwal. Kami siap menemani perjalanan Anda! 🚌" },
  { icon: "💳", label: "Permintaan DP / Pembayaran",  pesan: "Halo [NAMA]! 😊\n\nUntuk konfirmasi booking Anda, mohon transfer DP sebesar Rp [JUMLAH_DP] ke:\n\n🏦 BCA: [NOMOR_REKENING]\n👤 a.n. [NAMA_REKENING]\n\nSetelah transfer, mohon kirim bukti bayar ke WhatsApp ini ya. Terima kasih! 🙏" },
  { icon: "✅", label: "Konfirmasi Pembayaran Lunas",  pesan: "Halo [NAMA]! ✅\n\nPembayaran Anda sudah kami terima. Terima kasih!\n\nDetail booking:\n📅 Tanggal: [TANGGAL]\n🚗 Armada: [ARMADA]\n📍 Pickup: [LOKASI]\n⏰ Jam jemput: [JAM]\n\nDriver kami siap menjemput Anda tepat waktu. Hubungi kami jika ada pertanyaan! 😊" },
  { icon: "❌", label: "Info Pembatalan",              pesan: "Halo [NAMA], kami turut menyesal menerima pembatalan dari Anda.\n\nSesuai kebijakan kami, refund akan diproses dalam 3-5 hari kerja.\n\nJika ada rencana perjalanan berikutnya, kami siap membantu! 🙏\n\nTerima kasih sudah mempercayai KDS Trans." },
  { icon: "📋", label: "Penawaran Harga Custom",       pesan: "Halo [NAMA]! 😊\n\nBerdasarkan kebutuhan Anda, berikut penawaran kami:\n\n🚗 Armada: [ARMADA]\n📅 Tanggal: [TANGGAL]\n⏱️ Durasi: [DURASI]\n💰 Harga: Rp [HARGA]\n(sudah termasuk: driver, BBM, tol)\n\nSilakan konfirmasi jika setuju. Kami siap melayani! 🙏" },
];

export default function AdminPesanPage() {
  const [selected, setSelected]   = useState<Template>(templates[0]);
  const [editedPesan, setEdited]  = useState(templates[0].pesan);
  const [copied, setCopied]       = useState(false);

  function selectTemplate(t: Template) {
    setSelected(t);
    setEdited(t.pesan);
    setCopied(false);
  }

  function copyText() {
    navigator.clipboard.writeText(editedPesan);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function openWA() {
    const url = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(editedPesan)}`;
    window.open(url, "_blank");
  }

  return (
    <div style={{ padding: "32px" }}>
      <div style={{ marginBottom: "28px" }}>
        <h1 style={{ fontSize: "1.5rem", fontWeight: "800", color: "#111", marginBottom: "4px" }}>Template Pesan WhatsApp</h1>
        <p style={{ color: "#6b7280", fontSize: "0.875rem" }}>Pilih template, edit sesuai kebutuhan, lalu kirim langsung ke WhatsApp.</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "280px 1fr", gap: "24px" }}>

        {/* Template list */}
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <div style={{ fontSize: "0.75rem", fontWeight: "700", color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "4px" }}>Pilih Template</div>
          {templates.map(t => (
            <button
              key={t.label}
              onClick={() => selectTemplate(t)}
              style={{
                display: "flex", alignItems: "center", gap: "10px", padding: "12px 14px",
                borderRadius: "10px", border: "1.5px solid",
                borderColor: selected.label === t.label ? "#111" : "#e5e7eb",
                background: selected.label === t.label ? "#111" : "#fff",
                color: selected.label === t.label ? "#fff" : "#374151",
                cursor: "pointer", textAlign: "left", fontFamily: "inherit",
                fontSize: "0.85rem", fontWeight: "600", transition: "0.15s",
              }}
            >
              <span>{t.icon}</span> {t.label}
            </button>
          ))}
        </div>

        {/* Editor */}
        <div>
          <div style={{ background: "#fff", borderRadius: "14px", border: "1px solid #e5e7eb", overflow: "hidden" }}>
            {/* Header */}
            <div style={{ padding: "16px 20px", borderBottom: "1px solid #f0f0f0", display: "flex", alignItems: "center", gap: "10px" }}>
              <span style={{ fontSize: "1.2rem" }}>{selected.icon}</span>
              <span style={{ fontWeight: "700", color: "#111", fontSize: "0.95rem" }}>{selected.label}</span>
            </div>

            {/* Text area */}
            <div style={{ padding: "20px" }}>
              <label style={{ display: "block", fontSize: "0.78rem", fontWeight: "700", color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "10px" }}>
                Edit Pesan — ganti [PLACEHOLDER] dengan data sebenarnya
              </label>
              <textarea
                value={editedPesan}
                onChange={e => setEdited(e.target.value)}
                rows={12}
                style={{
                  width: "100%", padding: "14px", borderRadius: "10px",
                  border: "1.5px solid #e5e7eb", fontSize: "0.9rem",
                  lineHeight: "1.65", outline: "none", resize: "vertical",
                  fontFamily: "inherit", boxSizing: "border-box", color: "#374151",
                }}
              />

              {/* Highlight placeholders */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginTop: "10px" }}>
                <span style={{ fontSize: "0.75rem", color: "#9ca3af" }}>Placeholder: </span>
                {(editedPesan.match(/\[[^\]]+\]/g) ?? []).filter((v, i, a) => a.indexOf(v) === i).map(p => (
                  <span key={p} style={{ background: "#fff7ed", color: "#c2410c", fontSize: "0.72rem", fontWeight: "700", padding: "2px 8px", borderRadius: "6px" }}>
                    {p}
                  </span>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div style={{ padding: "16px 20px", borderTop: "1px solid #f0f0f0", display: "flex", gap: "10px" }}>
              <button onClick={openWA} style={{
                display: "flex", alignItems: "center", gap: "8px",
                background: "#25D366", color: "#fff", padding: "11px 20px",
                borderRadius: "10px", border: "none", fontWeight: "700",
                fontSize: "0.9rem", cursor: "pointer", fontFamily: "inherit",
              }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.136.561 4.14 1.535 5.874L0 24l6.335-1.512A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.006-1.368l-.36-.214-3.726.889.928-3.63-.234-.373A9.818 9.818 0 012.182 12c0-5.421 4.397-9.818 9.818-9.818 5.421 0 9.818 4.397 9.818 9.818 0 5.421-4.397 9.818-9.818 9.818z"/>
                </svg>
                Buka di WhatsApp
              </button>
              <button onClick={copyText} style={{
                display: "flex", alignItems: "center", gap: "8px",
                background: copied ? "#f0fdf4" : "#f3f4f6",
                color: copied ? "#16a34a" : "#374151",
                padding: "11px 20px", borderRadius: "10px",
                border: "1.5px solid", borderColor: copied ? "#86efac" : "#e5e7eb",
                fontWeight: "700", fontSize: "0.9rem", cursor: "pointer", fontFamily: "inherit",
              }}>
                {copied ? "✅ Tersalin!" : "📋 Copy Teks"}
              </button>
              <button onClick={() => setEdited(selected.pesan)} style={{
                marginLeft: "auto", background: "none", border: "1.5px solid #e5e7eb",
                color: "#9ca3af", padding: "11px 16px", borderRadius: "10px",
                fontWeight: "600", fontSize: "0.85rem", cursor: "pointer", fontFamily: "inherit",
              }}>
                🔄 Reset
              </button>
            </div>
          </div>

          {/* Tips */}
          <div style={{ marginTop: "16px", background: "#fffbeb", border: "1px solid #fde68a", borderRadius: "10px", padding: "14px 16px" }}>
            <p style={{ fontSize: "0.82rem", color: "#92400e", fontWeight: "600", marginBottom: "4px" }}>💡 Tips Penggunaan</p>
            <p style={{ fontSize: "0.8rem", color: "#92400e", lineHeight: "1.6" }}>
              Ganti semua <strong>[PLACEHOLDER]</strong> dengan data sebenarnya sebelum mengirim. Klik "Buka di WhatsApp" untuk langsung membuka chat, atau "Copy Teks" untuk menyalin manual.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
