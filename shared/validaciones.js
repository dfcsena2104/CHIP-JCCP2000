// Reglas de validación compartidas por la web y la aplicación móvil

// Solo letras (incluye tildes y ñ) y espacios
export const esNombreValido = (texto) => /^[A-Za-zÁÉÍÓÚáéíóúÑñÜü\s]+$/.test(texto);

// Solo números
export const esTelefonoValido = (texto) => /^[0-9]+$/.test(texto);

// Formato texto@texto.texto
export const esCorreoValido = (texto) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(texto);