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
      {
        nama_alat: nama,
        operator,
        spotter,
        kondisi,
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
    setLokasi("");
  }

  return (
    <div>
      <h1>Input Data Alat Berat</h1>

      <form onSubmit={handleSubmit}>
        <select
          value={namaAlat}
          onChange={(e) => setNamaAlat(e.target.value)}
          style={{ width: "200px", padding: "5px", marginRight: "10px" }}
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
            style={{ padding: "5px", marginRight: "10px" }}
          />
        )}

        <input
          type="text"
          placeholder="Operator"
          value={operator}
          onChange={(e) => setOperator(e.target.value)}
          style={{ padding: "5px", marginRight: "10px" }}
        />
        <input
          type="text"
          placeholder="Spotter"
          value={spotter}
          onChange={(e) => setSpotter(e.target.value)}
          style={{ padding: "5px", marginRight: "10px" }}
        />
        <input
          type="text"
          placeholder="Kondisi"
          value={kondisi}
          onChange={(e) => setKondisi(e.target.value)}
          style={{ padding: "5px", marginRight: "10px" }}
        />
        <input
          type="text"
          placeholder="Lokasi"
          value={lokasi}
          onChange={(e) => setLokasi(e.target.value)}
          style={{ padding: "5px", marginRight: "10px" }}
        />

        <button
          type="submit"
          style={{
            backgroundColor: "#007bff",
            color: "white",
            padding: "7px 15px",
            border: "none",
            cursor: "pointer",
          }}
        >
          Tambah
        </button>
      </form>
    </div>
  );
}
