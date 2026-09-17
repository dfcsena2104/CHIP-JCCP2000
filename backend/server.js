// Importamos Express
const express = require("express");

// Importamos CORS
const cors = require("cors");

// Importamos la conexión con MySQL
const conexion = require("./db");

// Creamos la aplicación
const app = express();

// Puerto del servidor
const PORT = 3000;

// Permitimos la comunicación con React
app.use(cors());

// Permitimos recibir datos JSON
app.use(express.json());

// Mensaje de prueba
console.log("Archivo db.js cargado correctamente");

// Ruta de prueba
app.get("/", (req, res) => {
  res.send("Servidor CHIP JCCP2000 funcionando correctamente");
});

// Registrar usuario
app.post("/usuarios", (req, res) => {

  const { nombre, correo, telefono } = req.body;

  const sql = `
    INSERT INTO usuarios (nombre, correo, telefono)
    VALUES (?, ?, ?)
  `;

  conexion.query(
    sql,
    [nombre, correo, telefono],
    (error, resultado) => {

      if (error) {
        console.error("Error al registrar usuario:", error.message);

        return res.status(500).json({
          mensaje: "Error al registrar el usuario"
        });
      }

      res.status(201).json({
        mensaje: "Usuario registrado correctamente",
        id: resultado.insertId
      });

    }
  );

});

// Consultar todos los usuarios
app.get("/usuarios", (req, res) => {

  const sql = "SELECT * FROM usuarios ORDER BY id_usuario DESC";

  conexion.query(sql, (error, resultados) => {

    if (error) {
      console.error("Error al consultar usuarios:", error.message);

      return res.status(500).json({
        mensaje: "Error al consultar usuarios"
      });
    }

    res.json(resultados);
  });
});

// Iniciamos el servidor
app.listen(PORT, () => {
  console.log(
    `Servidor ejecutándose en http://localhost:${PORT}`
  );
});