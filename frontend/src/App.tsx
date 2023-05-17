import React from "react";
import "./assets/scss/global.scss";
import { Route, Routes } from "react-router-dom";
import Client from "./page/client";
import Dashboard from "./page/dashboard";

function App() {
  return (
    <Routes>
      <Route path="/client" element={<Client />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}

export default App;
