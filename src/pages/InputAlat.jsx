import React, { useState } from "react";
import { supabase } from "../supabaseClient";

export default function InputAlat() {
  const [namaAlat, setNamaAlat] = useState("");
  const [customAlat, setCustomAlat] = useState("");
  const [operator, setOperator] = useState("");
  const [spotter, setSpotter] = useState("");
  const [kondisi, setKondisi] = useState("");
  const [alasan, setAlasan] = useState("");
  const [lokasi, setLokasi] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    const hariTanggal = new Date().toLocaleString("id-ID", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    const nama = namaAlat === "Lainnya" ? customAlat : namaAlat;

    if (!nama || !operator || !spotter || !kondisi || !lokasi) {
      alert("Harap isi semua field!");
      return;
    }

    const { error } = await supabase.from("alat").insert([
      {
        nama_alat: nama,
        operator,
        spotter,
        kondisi,
        alasan,
        lokasi,
        hari_tanggal: hariTanggal,
      },
    ]);

    if (error) console.error(error);
    else alert("Data berhasil ditambahkan!");

    setNamaAlat("");
    setCustomAlat("");
    setOperator("");
    setSpotter("");
    setKondisi("");
    setAlasan("");
    setLokasi("");
  }

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>Input Data Alat Berat</h2>

        <form onSubmit={handleSubmit} style={styles.form}>

          {/* GRID FORM */}
          <div style={styles.grid}>

            {/* Nama Alat */}
            <div style={styles.formGroup}>
              <label style={styles.label}>Nama Alat</label>
              <select
                value={namaAlat}
                onChange={(e) => setNamaAlat(e.target.value)}
                style={styles.input}
              >
                <option value="">-- Pilih Nama Alat --</option>
                <option value="Excavator SK200">Excavator SK200</option>
                <option value="Excavator SK60">Excavator SK60</option>
                <option value="Crane">Crane</option>
                <option value="Dump Truck">Dump Truck</option>
                <option value="Lainnya">Lainnya...</option>
              </select>
            </div>

            {namaAlat === "Lainnya" && (
              <div style={styles.formGroupFull}>
                <label style={styles.label}>Nama Alat (Custom)</label>
                <input
                  type="text"
                  value={customAlat}
                  onChange={(e) => setCustomAlat(e.target.value)}
                  placeholder="Masukkan nama alat"
                  style={styles.input}
                />
              </div>
            )}

            {/* Operator */}
            <div style={styles.formGroup}>
              <label style={styles.label}>Operator</label>
              <input
                type="text"
                value={operator}
                onChange={(e) => setOperator(e.target.value)}
                placeholder="Nama operator"
                style={styles.input}
              />
            </div>

            {/* Spotter */}
            <div style={styles.formGroup}>
              <label style={styles.label}>Spotter</label>
              <input
                type="text"
                value={spotter}
                onChange={(e) => setSpotter(e.target.value)}
                placeholder="Nama spotter"
                style={styles.input}
              />
            </div>

            {/* Kondisi */}
            <div style={styles.formGroup}>
              <label style={styles.label}>Kondisi</label>
              <select
                value={kondisi}
                onChange={(e) => setKondisi(e.target.value)}
                style={styles.input}
              >
                <option value="">-- Pilih Kondisi --</option>
                <option value="Operasional Baik">Operasional Baik</option>
                <option value="Rusak">Rusak</option>
              </select>
            </div>

            {/* Alasan */}
            <div style={styles.formGroup}>
              <label style={styles.label}>Alasan / Catatan</label>
              <input
                type="text"
                value={alasan}
                onChange={(e) => setAlasan(e.target.value)}
                placeholder="Contoh: selang bocor, trek longgar..."
                style={styles.input}
              />
            </div>

            {/* Lokasi */}
            <div style={styles.formGroupFull}>
              <label style={styles.label}>Lokasi</label>
              <input
                type="text"
                value={lokasi}
                onChange={(e) => setLokasi(e.target.value)}
                placeholder="Lokasi alat"
                style={styles.input}
              />
            </div>
          </div>

          {/* BUTTONS */}
          <div style={styles.buttonGroup}>
            <button type="submit" style={styles.submitBtn}>Submit</button>
            <button
              type="button"
              style={styles.resetBtn}
              onClick={() => window.location.reload()}
            >
              Reset
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

/* 🎨 STYLE */
const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    paddingTop: "50px",
    backgroundColor: "#f3f4f6",
  },
  card: {
    backgroundColor: "white",
    padding: "30px",
    borderRadius: "12px",
    width: "90%",
    maxWidth: "650px",
    boxShadow: "0px 8px 20px rgba(0,0,0,0.15)",
  },
  title: {
    textAlign: "center",
    marginBottom: "25px",
    color: "#333",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "15px",
  },
  formGroup: {
    display: "flex",
    flexDirection: "column",
  },
  formGroupFull: {
    gridColumn: "span 2",
    display: "flex",
    flexDirection: "column",
  },
  label: {
    marginBottom: "6px",
    fontWeight: "600",
    fontSize: "14px",
  },
  input: {
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "6px",
    fontSize: "14px",
  },
  buttonGroup: {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
    marginTop: "20px",
  },
  submitBtn: {
    backgroundColor: "#2563eb",
    color: "white",
    padding: "10px 20px",
    fontWeight: "bold",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },
  resetBtn: {
    backgroundColor: "#6b7280",
    color: "white",
    padding: "10px 20px",
    borderRadius: "8px",
    cursor: "pointer",
    border: "none",
  },
};
