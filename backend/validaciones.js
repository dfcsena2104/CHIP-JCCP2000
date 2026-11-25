// Reglas de validación de usuarios (las mismas que usan la web y la app móvil)

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

module.exports = {
  esNombreValido,
  esTelefonoValido,
  esCorreoValido,
  validarUsuario,
};
