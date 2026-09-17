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

// Eliminar un usuario por su ID
app.delete("/usuarios/:id", (req, res) => {

  // Obtenemos el ID enviado en la URL
  const { id } = req.params;

  // Consulta SQL para eliminar el usuario
  const sql = "DELETE FROM usuarios WHERE id_usuario = ?";

  conexion.query(sql, [id], (error, resultado) => {

    // Verificamos si ocurrió un error
    if (error) {
      console.error("Error al eliminar usuario:", error.message);

      return res.status(500).json({
        mensaje: "Error al eliminar el usuario"
      });
    }

    // Verificamos si el usuario existe
    if (resultado.affectedRows === 0) {
      return res.status(404).json({
        mensaje: "Usuario no encontrado"
      });
    }

    // Confirmamos la eliminación
    res.json({
      mensaje: "Usuario eliminado correctamente"
    });
  });
});

// Actualizar un usuario por su ID
app.put("/usuarios/:id", (req, res) => {

  // Obtenemos el ID enviado en la URL
  const { id } = req.params;

  // Obtenemos los nuevos datos enviados desde React
  const { nombre, correo, telefono } = req.body;

  // Consulta SQL para actualizar el usuario
  const sql = `
    UPDATE usuarios
    SET nombre = ?, correo = ?, telefono = ?
    WHERE id_usuario = ?
  `;

  // Ejecutamos la consulta en MySQL
  conexion.query(
    sql,
    [nombre, correo, telefono, id],
    (error, resultado) => {

      // Verificamos si ocurrió un error
      if (error) {
        console.error("Error al actualizar usuario:", error.message);

        return res.status(500).json({
          mensaje: "Error al actualizar el usuario"
        });
      }

      // Verificamos si el usuario existe
      if (resultado.affectedRows === 0) {
        return res.status(404).json({
          mensaje: "Usuario no encontrado"
        });
      }

      // Confirmamos la actualización
      res.json({
        mensaje: "Usuario actualizado correctamente"
      });
    }
  );
});

// Iniciamos el servidor
app.listen(PORT, () => {
  console.log(
    `Servidor ejecutándose en http://localhost:${PORT}`
  );
});