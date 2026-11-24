// La web solo añade la ruta de cada imagen al contenido compartido
import { mejorasContenido } from "../../shared/contenido.js";

const imagenes = {
  tecnicas: "/img/tecnicas.jpg",
  funcionales: "/img/funcionales.jpg",
  comerciales: "/img/comerciales.jpg",
  estrategicas: "/img/estrategicas.jpg",
  prototipo: "/img/prototipo.jpg",
};

export const mejoras = mejorasContenido.map((mejora) => ({
  ...mejora,
  imagen: imagenes[mejora.slug],
}));