import { useState } from "react";

function InputAlat() {
  const [alat, setAlat] = useState("");
  const [operator, setOperator] = useState("");
  const [spotter, setSpotter] = useState("");
  const [kondisi, setKondisi] = useState("");
  const [alasan, setAlasan] = useState("");
  const [lokasi, setLokasi] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      alat,
      operator,
      spotter,
      kondisi,
      alasan,
      lokasi,
      tanggal: new Date().toLocaleDateString("id-ID"),
    };

    // Simpan data ke localStorage
    localStorage.setItem(Date.now(), JSON.stringify(data));

    alert("Data berhasil ditambahkan!");

    // Reset form
    setAlat("");
    setOperator("");
    setSpotter("");
    setKondisi("");
    setAlasan("");
    setLokasi("");
  };

  return (
    <div className="p-5 text-white bg-gray-900 min-h-screen">
      <h1 className="text-4xl font-bold mb-6 text-center">
        Input Data Alat Berat
      </h1>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 max-w-md mx-auto bg-gray-800 p-5 rounded-xl shadow-lg"
      >
        {/* Pilih alat */}
        <select
          value={alat}
          onChange={(e) => setAlat(e.target.value)}
          required
          className="p-2 rounded bg-gray-700 border border-gray-600"
        >
          <option value="">-- Pilih Nama Alat --</option>
          <option>SK200 NTM</option>
          <option>Volvo NTM</option>
          <option>SK60 Sewa</option>
          <option>SK200 Sewa I</option>
          <option>SK200 Sewa II</option>
          <option>Forklift Sewa PKP</option>
          <option>Dumptruck Sewa</option>
        </select>

        {/* Operator */}
        <input
          value={operator}
          onChange={(e) => setOperator(e.target.value)}
          placeholder="Operator"
          className="p-2 rounded bg-gray-700 border border-gray-600"
        />

        {/* Spotter */}
        <input
          value={spotter}
          onChange={(e) => setSpotter(e.target.value)}
          placeholder="Spotter"
          className="p-2 rounded bg-gray-700 border border-gray-600"
        />

        {/* Kondisi */}
        <select
          value={kondisi}
          onChange={(e) => setKondisi(e.target.value)}
          required
          className="p-2 rounded bg-gray-700 border border-gray-600"
        >
          <option value="">-- Pilih Kondisi --</option>
          <option value="Operasional baik">Operasional baik</option>
          <option value="Rusak">Rusak</option>
        </select>

        {/* Alasan muncul kalau kondisi rusak */}
        {kondisi === "Rusak" && (
          <input
            value={alasan}
            onChange={(e) => setAlasan(e.target.value)}
            placeholder="Alasan kerusakan"
            className="p-2 rounded bg-gray-700 border border-gray-600"
          />
        )}

        {/* Lokasi */}
        <input
          value={lokasi}
          onChange={(e) => setLokasi(e.target.value)}
          placeholder="Lokasi"
          className="p-2 rounded bg-gray-700 border border-gray-600"
        />

        {/* Tombol */}
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 py-2 px-4 rounded font-semibold transition-all"
        >
          Tambah
        </button>
      </form>
    </div>
  );
}

export default InputAlat;
