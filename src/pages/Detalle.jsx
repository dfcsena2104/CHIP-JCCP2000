import { Link, useParams } from "react-router-dom";
import { mejoras } from "../data/mejoras.js";

// Página de detalle de cada área, según el parámetro "slug" de la URL
export default function Detalle() {
  const { slug } = useParams();
  const mejora = mejoras.find((m) => m.slug === slug);

  if (!mejora) {
    return (
      <main>
        <h2>Página no encontrada</h2>
        <Link to="/" className="enlace-volver">Volver al inicio</Link>
      </main>
    );
  }

  return (
    <>
      <header>
        <h1>{mejora.titulo}</h1>
      </header>

      <main>
        <img src={mejora.imagen} alt={mejora.alt} className="imagen-detalle" />
        <p>{mejora.descripcion}</p>

        <ol className="lista-detalle">
          {mejora.puntos.map((punto) => (
            <li key={punto}>{punto}</li>
          ))}
        </ol>

        <Link to="/" className="enlace-volver">← Volver al inicio</Link>
      </main>
    </>
  );
}