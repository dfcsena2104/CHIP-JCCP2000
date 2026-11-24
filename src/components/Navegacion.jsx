import { NavLink } from "react-router-dom";

// Barra de navegación que aparece en todas las páginas
export default function Navegacion() {
  return (
    <nav className="navegacion">
      <NavLink to="/">Inicio</NavLink>
      <NavLink to="/usuarios">Gestión de usuarios</NavLink>
    </nav>
  );
}