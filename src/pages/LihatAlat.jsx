import React, { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";

export default function LihatAlat() {
  const [alatList, setAlatList] = useState([]);
  const [filterHariIni, setFilterHariIni] = useState(false);

  useEffect(() => {
    fetchAlat();
  }, [filterHariIni]);

  async function fetchAlat() {
    const { data, error } = await supabase.from("alat").select("*").order("id", { ascending: false });
    if (error) console.error(error);
    else {
      if (filterHariIni) {
        const today = new Date().toLocaleDateString("id-ID", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        });
        setAlatList(data.filter((item) => item.hari_tanggal === today));
      } else {
        setAlatList(data);
      }
    }
  }

  async function handleDelete(id) {
    if (window.confirm("Yakin ingin hapus data ini?")) {
      const { error } = await supabase.from("alat").delete().eq("id", id);
      if (error) console.error(error);
      else fetchAlat();
    }
  }

  return (
    <div>
      <h1>Data Presensi Alat Berat</h1>

      <label style={{ display: "block", marginBottom: "10px" }}>
        <input
          type="checkbox"
          checked={filterHariIni}
          onChange={() => setFilterHariIni(!filterHariIni)}
        />{" "}
        Tampilkan hanya presensi hari ini
      </label>

      {alatList.map((item, index) => (
        <div
          key={item.id}
          style={{
            backgroundColor: "#f4f4f4",
            color: "#000",
            marginBottom: "10px",
            padding: "10px",
            borderRadius: "10px",
            width: "400px",
          }}
        >
          <p>
            <strong>{index + 1}. {item.nama_alat}</strong>
          </p>
          <p>Operator: {item.operator}</p>
          <p>Spotter: {item.spotter}</p>
          <p>Kondisi: {item.kondisi}</p>
          <p>Lokasi: {item.lokasi}</p>
          <p>Hari & Tanggal: {item.hari_tanggal}</p>
          <button
            onClick={() => handleDelete(item.id)}
            style={{ backgroundColor: "red", color: "white", padding: "5px 10px" }}
          >
            Hapus
          </button>
        </div>
      ))}
    </div>
  );
}
