import React, { useState } from "react";
import { supabase } from "../supabaseClient";

export default function InputAlat() {
  const [namaAlat, setNamaAlat] = useState("");
  const [customAlat, setCustomAlat] = useState("");
  const [operator, setOperator] = useState("");
  const [spotter, setSpotter] = useState("");
  const [kondisi, setKondisi] = useState("");
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
      { nama_alat: nama, operator, spotter, kondisi, lokasi, hari_tanggal: hariTanggal },
    ]);
    if (error) console.error(error);
    else alert("Data berhasil ditambahkan!");

    setNamaAlat("");
    setCustomAlat("");
    setOperator("");
    setSpotter("");
    setKondisi("");
    setLokasi("");
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        minHeight: "100vh",
        backgroundColor: "#121212",
        color: "white",
        padding: "20px",
      }}
    >
      <div
        style={{
          backgroundColor: "#1e1e1e",
          borderRadius: "12px",
          padding: "25px",
          width: "100%",
          maxWidth: "400px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.5)",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            marginBottom: "20px",
            fontSize: "1.8rem",
            lineHeight: "1.3",
          }}
        >
          Input Data <br /> Alat Berat
        </h1>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <select
            value={namaAlat}
            onChange={(e) => setNamaAlat(e.target.value)}
            style={{
              padding: "10px",
              borderRadius: "8px",
              border: "1px solid #444",
              backgroundColor: "#2a2a2a",
              color: "white",
            }}
          >
            <option value="">-- Pilih Nama Alat --</option>
            <option value="Excavator SK200">Excavator SK200</option>
            <option value="Excavator SK60">Excavator SK60</option>
            <option value="Crane">Crane</option>
            <option value="Dump Truck">Dump Truck</option>
            <option value="Lainnya">Lainnya...</option>
          </select>

          {namaAlat === "Lainnya" && (
            <input
              type="text"
              placeholder="Masukkan nama alat"
              value={customAlat}
              onChange={(e) => setCustomAlat(e.target.value)}
              style={{
                padding: "10px",
                borderRadius: "8px",
                border: "1px solid #444",
                backgroundColor: "#2a2a2a",
                color: "white",
              }}
            />
          )}

          <input
            type="text"
            placeholder="Operator"
            value={operator}
            onChange={(e) => setOperator(e.target.value)}
            style={{
              padding: "10px",
              borderRadius: "8px",
              border: "1px solid #444",
              backgroundColor: "#2a2a2a",
              color: "white",
            }}
          />

          <input
            type="text"
            placeholder="Spotter"
            value={spotter}
            onChange={(e) => setSpotter(e.target.value)}
            style={{
              padding: "10px",
              borderRadius: "8px",
              border: "1px solid #444",
              backgroundColor: "#2a2a2a",
              color: "white",
            }}
          />

          <input
            type="text"
            placeholder="Kondisi"
            value={kondisi}
            onChange={(e) => setKondisi(e.target.value)}
            style={{
              padding: "10px",
              borderRadius: "8px",
              border: "1px solid #444",
              backgroundColor: "#2a2a2a",
              color: "white",
            }}
          />

          <input
            type="text"
            placeholder="Lokasi"
            value={lokasi}
            onChange={(e) => setLokasi(e.target.value)}
            style={{
              padding: "10px",
              borderRadius: "8px",
              border: "1px solid #444",
              backgroundColor: "#2a2a2a",
              color: "white",
            }}
          />

          <button
            type="submit"
            style={{
              backgroundColor: "#007bff",
              color: "white",
              padding: "12px",
              borderRadius: "8px",
              border: "none",
              fontWeight: "bold",
              marginTop: "8px",
              cursor: "pointer",
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#0056b3")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#007bff")}
          >
            Tambah
          </button>
        </form>
      </div>
    </div>
  );
}
