import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

export default function LihatAlat() {
  const [dataAlat, setDataAlat] = useState([]);
  const [editData, setEditData] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchAlat();
  }, []);

  async function fetchAlat() {
    const { data, error } = await supabase
      .from("alat")
      .select("*")
      .order("id", { ascending: true });

    if (!error) setDataAlat(data);
  }

  const operational = dataAlat.filter((a) => {
    const k = (a.kondisi || "").toLowerCase();
    return k.includes("baik") || k.includes("operasional") || k.includes("normal");
  });

  const notOperational = dataAlat.filter((a) => {
    const k = (a.kondisi || "").toLowerCase();
    return (
      k.includes("rusak") ||
      k.includes("off") ||
      k.includes("bocor") ||
      k.includes("tidak") ||
      k === ""
    );
  });

  async function handleDelete(id) {
    const yakin = window.confirm("Yakin ingin menghapus data ini?");
    if (!yakin) return;

    const { error } = await supabase.from("alat").delete().eq("id", id);
    if (!error) {
      alert("Data berhasil dihapus!");
      fetchAlat();
    }
  }

  function openEditModal(row) {
    setEditData({ ...row });
    setShowModal(true);
  }

  async function handleEditSubmit(e) {
    e.preventDefault();

    const { id, nama_alat, operator, spotter, kondisi, alasan, lokasi } = editData;

    const { error } = await supabase
      .from("alat")
      .update({ nama_alat, operator, spotter, kondisi, alasan, lokasi })
      .eq("id", id);

    if (!error) {
      alert("Data berhasil diperbarui!");
      setShowModal(false);
      fetchAlat();
    }
  }

  return (
    <div style={styles.page}>
      <h2 style={styles.title}>Data Alat Berat</h2>
      <div style={styles.line}></div>

      {/* ===================== OPERASIONAL ===================== */}
      <div style={styles.card}>
        <h3 style={styles.operationalTitle}>ALAT OPERASIONAL</h3>

        <div style={styles.tableWrapper}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>NO</th>
                <th style={styles.th}>TANGGAL</th>
                <th style={styles.th}>NAMA ALAT</th>
                <th style={styles.th}>OPERATOR</th>
                <th style={styles.th}>SPOTTER</th>
                <th style={styles.th}>KONDISI</th>
                <th style={styles.th}>ALASAN</th>
                <th style={styles.th}>LOKASI</th>
                <th style={styles.th}>AKSI</th>
              </tr>
            </thead>

            <tbody>
              {operational.map((alat, index) => (
                <tr key={alat.id}>
                  <td style={{ ...styles.td, color: "black" }}>{index + 1}</td>
                  <td style={{ ...styles.td, color: "black" }}>{alat.hari_tanggal}</td>
                  <td style={{ ...styles.td, color: "black" }}>{alat.nama_alat}</td>
                  <td style={{ ...styles.td, color: "black" }}>{alat.operator}</td>
                  <td style={{ ...styles.td, color: "black" }}>{alat.spotter}</td>
                  <td style={{ ...styles.td, color: "black" }}>{alat.kondisi}</td>
                  <td style={{ ...styles.td, color: "black" }}>{alat.alasan || "-"}</td>
                  <td style={{ ...styles.td, color: "black" }}>{alat.lokasi}</td>

                  <td style={styles.td}>
                    <button
                      style={styles.editBtn}
                      onClick={() => openEditModal(alat)}
                    >
                      Edit
                    </button>
                    <button
                      style={styles.deleteBtn}
                      onClick={() => handleDelete(alat.id)}
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      </div>

      {/* ===================== NOT OPERASIONAL ===================== */}
      <div style={{ ...styles.card, marginTop: "30px" }}>
        <h3 style={styles.notOperationalTitle}>ALAT TIDAK OPERASIONAL</h3>

        <div style={styles.tableWrapper}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>NO</th>
                <th style={styles.th}>TANGGAL</th>
                <th style={styles.th}>NAMA ALAT</th>
                <th style={styles.th}>OPERATOR</th>
                <th style={styles.th}>SPOTTER</th>
                <th style={styles.th}>KONDISI</th>
                <th style={styles.th}>ALASAN</th>
                <th style={styles.th}>LOKASI</th>
                <th style={styles.th}>AKSI</th>
              </tr>
            </thead>

            <tbody>
              {notOperational.map((alat, index) => (
                <tr key={alat.id}>
                  <td style={{ ...styles.td, color: "black" }}>{index + 1}</td>
                  <td style={{ ...styles.td, color: "black" }}>{alat.hari_tanggal}</td>
                  <td style={{ ...styles.td, color: "black" }}>{alat.nama_alat}</td>
                  <td style={{ ...styles.td, color: "black" }}>{alat.operator}</td>
                  <td style={{ ...styles.td, color: "black" }}>{alat.spotter}</td>
                  <td style={{ ...styles.td, color: "black" }}>{alat.kondisi}</td>
                  <td style={{ ...styles.td, color: "black" }}>{alat.alasan || "-"}</td>
                  <td style={{ ...styles.td, color: "black" }}>{alat.lokasi}</td>

                  <td style={styles.td}>
                    <button
                      style={styles.editBtn}
                      onClick={() => openEditModal(alat)}
                    >
                      Edit
                    </button>
                    <button
                      style={styles.deleteBtn}
                      onClick={() => handleDelete(alat.id)}
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      </div>

      {/* ===================== MODAL EDIT ===================== */}
      {showModal && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <h3>Edit Data Alat</h3>

            <form onSubmit={handleEditSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <input
                type="text"
                value={editData.nama_alat}
                onChange={(e) => setEditData({ ...editData, nama_alat: e.target.value })}
                style={styles.input}
              />

              <input
                type="text"
                value={editData.operator}
                onChange={(e) => setEditData({ ...editData, operator: e.target.value })}
                style={styles.input}
              />

              <input
                type="text"
                value={editData.spotter}
                onChange={(e) => setEditData({ ...editData, spotter: e.target.value })}
                style={styles.input}
              />

              <input
                type="text"
                value={editData.kondisi}
                onChange={(e) => setEditData({ ...editData, kondisi: e.target.value })}
                style={styles.input}
              />

              <input
                type="text"
                value={editData.alasan}
                onChange={(e) => setEditData({ ...editData, alasan: e.target.value })}
                style={styles.input}
              />

              <input
                type="text"
                value={editData.lokasi}
                onChange={(e) => setEditData({ ...editData, lokasi: e.target.value })}
                style={styles.input}
              />

              <div style={{ display: "flex", justifyContent: "right", marginTop: "10px", gap: "10px" }}>
                <button
                  type="button"
                  style={styles.cancelBtn}
                  onClick={() => setShowModal(false)}
                >
                  Batal
                </button>

                <button type="submit" style={styles.saveBtn}>
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

/* ========================= STYLE ========================= */

const styles = {
  page: {
    padding: "40px",
    backgroundColor: "#f3f4f6",
    minHeight: "100vh",
  },
  title: {
    fontSize: "28px",
    fontWeight: "600",
    marginBottom: "5px",
  },
  line: {
    width: "100%",
    height: "3px",
    backgroundColor: "#1e40af",
    marginBottom: "25px",
  },
  card: {
    backgroundColor: "white",
    padding: "25px",
    borderRadius: "12px",
    boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
  },
  operationalTitle: {
    textAlign: "center",
    color: "#065f46",
    fontWeight: "700",
    fontSize: "20px",
    marginBottom: "20px",
  },
  notOperationalTitle: {
    textAlign: "center",
    color: "#991b1b",
    fontWeight: "700",
    fontSize: "20px",
    marginBottom: "20px",
  },
  tableWrapper: {
    maxHeight: "500px",
    overflowY: "auto",
    borderRadius: "8px",
    border: "1px solid #ddd",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  th: {
    backgroundColor: "#eef2ff",
    padding: "12px",
    borderBottom: "2px solid #c7d2fe",
    fontWeight: "700",
    color: "#1e3a8a",
    textAlign: "left",
  },
  td: {
    padding: "10px",
    borderBottom: "1px solid #e5e7eb",
  },
  editBtn: {
    backgroundColor: "#2563eb",
    color: "white",
    padding: "5px 10px",
    border: "none",
    borderRadius: "6px",
    marginRight: "5px",
    cursor: "pointer",
  },
  deleteBtn: {
    backgroundColor: "#dc2626",
    color: "white",
    padding: "5px 10px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },

  modalOverlay: {
    position: "fixed",
    top: 0, left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.6)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    backgroundColor: "white",
    padding: "25px",
    borderRadius: "12px",
    width: "350px",
    boxShadow: "0px 4px 10px rgba(0,0,0,0.3)",
  },
  input: {
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #ccc",
  },
  cancelBtn: {
    backgroundColor: "#6b7280",
    color: "white",
    padding: "8px 12px",
    borderRadius: "6px",
    border: "none",
    cursor: "pointer",
  },
  saveBtn: {
    backgroundColor: "#16a34a",
    color: "white",
    padding: "8px 12px",
    borderRadius: "6px",
    border: "none",
    cursor: "pointer",
  },
};
