import { useEffect, useState } from "react";

function LihatAlat() {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const items = Object.keys(localStorage).map((key) => ({
      id: key,
      ...JSON.parse(localStorage.getItem(key)),
    }));
    setData(items.reverse());
  }, []);

  const filteredData = data.filter((item) => {
    if (filter === "today") {
      const today = new Date().toLocaleDateString("id-ID");
      return item.tanggal === today;
    }
    return true;
  });

  const totalBaik = filteredData.filter(
    (item) => item.kondisi === "Operasional baik"
  ).length;
  const totalRusak = filteredData.filter(
    (item) => item.kondisi === "Rusak"
  ).length;

  return (
    <div className="p-5 bg-gray-900 min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Lihat Data Alat Berat
      </h1>

      {/* Filter */}
      <div className="flex justify-center gap-3 mb-6">
        <button
          onClick={() => setFilter("all")}
          className={`py-2 px-4 rounded ${
            filter === "all" ? "bg-blue-600" : "bg-gray-700"
          }`}
        >
          Semua Data
        </button>
        <button
          onClick={() => setFilter("today")}
          className={`py-2 px-4 rounded ${
            filter === "today" ? "bg-blue-600" : "bg-gray-700"
          }`}
        >
          Hari Ini
        </button>
      </div>

      {/* Statistik */}
      <div className="flex justify-center gap-6 mb-6">
        <div className="bg-green-800/40 border border-green-500 rounded-xl px-4 py-2">
          Operasional baik: <b>{totalBaik}</b>
        </div>
        <div className="bg-red-800/40 border border-red-500 rounded-xl px-4 py-2">
          Rusak: <b>{totalRusak}</b>
        </div>
      </div>

      {/* Data */}
      <div className="grid gap-4">
        {filteredData.map((item) => (
          <div
            key={item.id}
            className={`p-4 rounded-xl border shadow-md ${
              item.kondisi === "Operasional baik"
                ? "border-green-500 bg-green-900/30"
                : "border-red-500 bg-red-900/30"
            }`}
          >
            <h2 className="text-xl font-semibold mb-2">{item.alat}</h2>
            <p>Operator: {item.operator || "-"}</p>
            <p>Spotter: {item.spotter || "-"}</p>
            <p>Kondisi: {item.kondisi}</p>
            {item.kondisi === "Rusak" && (
              <p>Alasan: {item.alasan || "-"}</p>
            )}
            <p>Lokasi: {item.lokasi || "-"}</p>
            <p className="text-gray-400 text-sm mt-1">
              Tanggal input: {item.tanggal}
            </p>
          </div>
        ))}
      </div>

      {filteredData.length === 0 && (
        <p className="text-center text-gray-400 mt-6">
          Tidak ada data yang ditemukan.
        </p>
      )}
    </div>
  );
}

export default LihatAlat;
