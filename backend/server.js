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

// Permitimos la comunicación con React y la app móvil
app.use(cors());

// Permitimos recibir datos JSON
app.use(express.json());

// Reglas de validación (las mismas que usan la web y la app móvil)
const esNombreValido = (texto) =>
  typeof texto === "string" && /^[A-Za-zÁÉÍÓÚáéíóúÑñÜü\s]+$/.test(texto);

const esTelefonoValido = (texto) =>
  typeof texto === "string" && /^[0-9]+$/.test(texto);

const esCorreoValido = (texto) =>
  typeof texto === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(texto);

// Devuelve el mensaje del primer dato no válido, o null si todos son correctos
function validarUsuario(datos) {
  if (!esNombreValido(datos.nombre)) {
    return "El nombre solo puede contener letras y espacios.";
  }
  if (!esTelefonoValido(datos.telefono)) {
    return "El teléfono solo puede contener números.";
  }
  if (!esCorreoValido(datos.correo)) {
    return "Ingrese un correo electrónico válido.";
  }
  return null;
}

// Mensaje de prueba
console.log("Archivo db.js cargado correctamente");

// Ruta de prueba
app.get("/", (req, res) => {
  res.send("Servidor CHIP JCCP2000 funcionando correctamente");
});

// Registrar usuario
app.post("/usuarios", (req, res) => {

  // Validamos los datos antes de guardarlos
  const errorValidacion = validarUsuario(req.body || {});

  if (errorValidacion) {
    return res.status(400).json({
      mensaje: errorValidacion
    });
  }

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

  const { id } = req.params;

  const sql = "DELETE FROM usuarios WHERE id_usuario = ?";

  conexion.query(sql, [id], (error, resultado) => {

    if (error) {
      console.error("Error al eliminar usuario:", error.message);

      return res.status(500).json({
        mensaje: "Error al eliminar el usuario"
      });
    }

    if (resultado.affectedRows === 0) {
      return res.status(404).json({
        mensaje: "Usuario no encontrado"
      });
    }

    res.json({
      mensaje: "Usuario eliminado correctamente"
    });
  });
});

// Actualizar un usuario por su ID
app.put("/usuarios/:id", (req, res) => {

  const { id } = req.params;

  // Validamos los datos antes de actualizarlos
  const errorValidacion = validarUsuario(req.body || {});

  if (errorValidacion) {
    return res.status(400).json({
      mensaje: errorValidacion
    });
  }

  const { nombre, correo, telefono } = req.body;

  const sql = `
    UPDATE usuarios
    SET nombre = ?, correo = ?, telefono = ?
    WHERE id_usuario = ?
  `;

  conexion.query(
    sql,
    [nombre, correo, telefono, id],
    (error, resultado) => {

      if (error) {
        console.error("Error al actualizar usuario:", error.message);

        return res.status(500).json({
          mensaje: "Error al actualizar el usuario"
        });
      }

      if (resultado.affectedRows === 0) {
        return res.status(404).json({
          mensaje: "Usuario no encontrado"
        });
      }

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