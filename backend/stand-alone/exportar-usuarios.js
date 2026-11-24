// Exportador de reportes de usuarios (programa independiente de consola)
// Ejecutar desde la carpeta backend: node stand-alone/exportar-usuarios.js
const path = require("path");
const fs = require("fs");
const mysql = require("mysql2/promise");

// Lee el archivo .env de la carpeta backend
require("dotenv").config({ path: path.join(__dirname, "..", ".env") });

const ARCHIVO_SALIDA = path.join(__dirname, "reporte_usuarios.csv");

// Escribe un valor dentro de un CSV, con comillas si contiene comas, comillas o saltos de línea
function escaparCampo(valor) {
  if (valor === null || valor === undefined) {
    return "";
  }
  const texto = String(valor);
  if (/[",\n\r]/.test(texto)) {
    return `"${texto.replace(/"/g, '""')}"`;
  }
  return texto;
}

// Convierte la fecha de MySQL a formato AAAA-MM-DD HH:MM:SS
function formatearFecha(fecha) {
  if (!(fecha instanceof Date)) {
    return fecha ?? "";
  }
  const dos = (n) => String(n).padStart(2, "0");
  return `${fecha.getFullYear()}-${dos(fecha.getMonth() + 1)}-${dos(fecha.getDate())} ` +
    `${dos(fecha.getHours())}:${dos(fecha.getMinutes())}:${dos(fecha.getSeconds())}`;
}

async function exportarUsuarios() {
  const conexion = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

  try {
    const [usuarios] = await conexion.query(
      "SELECT id_usuario, nombre, correo, telefono, fecha_registro FROM usuarios ORDER BY id_usuario"
    );

    const encabezado = ["ID", "Nombre", "Correo", "Teléfono", "Fecha de registro"];

    const filas = usuarios.map((usuario) =>
      [
        usuario.id_usuario,
        usuario.nombre,
        usuario.correo,
        usuario.telefono,
        formatearFecha(usuario.fecha_registro),
      ]
        .map(escaparCampo)
        .join(",")
    );

    // El BOM al inicio hace que Excel reconozca las tildes y la ñ
    const contenido = "\uFEFF" + [encabezado.join(","), ...filas].join("\r\n") + "\r\n";
    fs.writeFileSync(ARCHIVO_SALIDA, contenido, "utf8");

    console.log(`Fecha de generación: ${new Date().toLocaleString("es-CO")}`);
    console.log(`Registros exportados: ${usuarios.length}`);
    console.log(`Archivo generado: ${ARCHIVO_SALIDA}`);
  } finally {
    await conexion.end();
  }
}

exportarUsuarios().catch((error) => {
  // Algunos errores de conexión no traen mensaje, así que buscamos el código
  const motivo =
    error.code ||
    (error.errors && error.errors[0] && error.errors[0].code) ||
    error.message ||
    error.name;
  console.error("No fue posible generar el reporte:", motivo);
  process.exit(1);
});