// Contenido compartido con la web, con las imágenes de la app móvil
import { mejorasContenido, etapasDesarrollo } from "../../shared/contenido.js";

// En móvil las imágenes se cargan con require, no con rutas web
const imagenes = {
  tecnicas: require("../assets/img/tecnicas.jpg"),
  funcionales: require("../assets/img/funcionales.jpg"),
  comerciales: require("../assets/img/comerciales.jpg"),
  estrategicas: require("../assets/img/estrategicas.jpg"),
  prototipo: require("../assets/img/prototipo.jpg"),
};

export const mejoras = mejorasContenido.map((mejora) => ({
  ...mejora,
  imagen: imagenes[mejora.slug],
}));

export { etapasDesarrollo };