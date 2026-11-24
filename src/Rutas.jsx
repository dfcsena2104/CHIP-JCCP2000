import { Route, Routes } from "react-router-dom";
import Navegacion from "./components/Navegacion.jsx";
import Inicio from "./pages/Inicio.jsx";
import Detalle from "./pages/Detalle.jsx";
import Usuarios from "./App.jsx"; // El CRUD actual se usa sin cambios

export default function Rutas() {
  return (
    <>
      <Navegacion />
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/mejoras/:slug" element={<Detalle />} />
        <Route path="/usuarios" element={<Usuarios />} />
      </Routes>
    </>
  );
}