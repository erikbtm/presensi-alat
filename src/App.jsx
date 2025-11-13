import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import InputAlat from "./pages/InputAlat";
import LihatAlat from "./pages/LihatAlat";

export default function App() {
  return (
    <Router>
      <div style={{ backgroundColor: "#1e1e1e", color: "white", minHeight: "100vh", padding: "20px" }}>
        <nav style={{ marginBottom: "20px" }}>
          <Link to="/" style={{ color: "white", marginRight: "15px" }}>Input Data</Link>
          <Link to="/lihat" style={{ color: "white" }}>Lihat Data</Link>
        </nav>

        <Routes>
          <Route path="/" element={<InputAlat />} />
          <Route path="/lihat" element={<LihatAlat />} />
        </Routes>
      </div>
    </Router>
  );
}
