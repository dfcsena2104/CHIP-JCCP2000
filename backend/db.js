// Importamos dotenv para leer las variables del archivo .env
require("dotenv").config();

// Importamos el módulo mysql2
const mysql = require("mysql2");

// Creamos la conexión con la base de datos JCCP2000
const conexion = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

// Probamos la conexión con MySQL
conexion.connect((error) => {
  if (error) {
    console.error("Error al conectar con MySQL:", error.message);
    return;
  }

  console.log("Conexión con MySQL JCCP2000 exitosa");
});

// Exportamos la conexión para utilizarla en el servidor
module.exports = conexion;
