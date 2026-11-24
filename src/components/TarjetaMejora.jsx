import { Link } from "react-router-dom";

// Tarjeta con imagen, título, descripción y enlace a su página
export default function TarjetaMejora({ mejora }) {
  return (
    <article className="tarjeta">
      <img src={mejora.imagen} alt={mejora.alt} />
      <div className="tarjeta-cuerpo">
        <h3>{mejora.titulo}</h3>
        <p>{mejora.descripcion}</p>
        <Link to={`/mejoras/${mejora.slug}`} className="enlace">
          Ver detalle
        </Link>
      </div>
    </article>
  );
}