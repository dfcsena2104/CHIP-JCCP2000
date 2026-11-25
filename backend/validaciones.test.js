const test = require("node:test");
const assert = require("node:assert/strict");

const {
  esNombreValido,
  esTelefonoValido,
  esCorreoValido,
  validarUsuario,
} = require("./validaciones");

const usuarioValido = {
  nombre: "Ana Gómez",
  correo: "ana@correo.com",
  telefono: "3001234567",
};

test("esNombreValido acepta letras, tildes, ñ y espacios", () => {
  assert.equal(esNombreValido("Ana Gómez"), true);
  assert.equal(esNombreValido("José Muñoz"), true);
});

test("esNombreValido rechaza números, símbolos, vacío y no textos", () => {
  assert.equal(esNombreValido("Ana123"), false);
  assert.equal(esNombreValido("Ana@Gómez"), false);
  assert.equal(esNombreValido(""), false);
  assert.equal(esNombreValido(123), false);
  assert.equal(esNombreValido(undefined), false);
});

test("esTelefonoValido acepta solo dígitos", () => {
  assert.equal(esTelefonoValido("3001234567"), true);
  assert.equal(esTelefonoValido("300-123"), false);
  assert.equal(esTelefonoValido("300 123"), false);
  assert.equal(esTelefonoValido("300ABC"), false);
  assert.equal(esTelefonoValido(""), false);
  assert.equal(esTelefonoValido(3001234567), false);
});

test("esCorreoValido acepta formato usuario@dominio.ext", () => {
  assert.equal(esCorreoValido("ana@correo.com"), true);
  assert.equal(esCorreoValido("ana.gomez@empresa.co"), true);
});

test("esCorreoValido rechaza correos sin @, sin dominio o con espacios", () => {
  assert.equal(esCorreoValido("correo-malo"), false);
  assert.equal(esCorreoValido("ana@correo"), false);
  assert.equal(esCorreoValido("ana @correo.com"), false);
  assert.equal(esCorreoValido(""), false);
  assert.equal(esCorreoValido(null), false);
});

test("validarUsuario devuelve null cuando todos los datos son válidos", () => {
  assert.equal(validarUsuario(usuarioValido), null);
});

test("validarUsuario devuelve el error del nombre cuando es inválido", () => {
  const resultado = validarUsuario({ ...usuarioValido, nombre: "Ana1" });
  assert.equal(resultado, "El nombre solo puede contener letras y espacios.");
});

test("validarUsuario devuelve el error del teléfono cuando es inválido", () => {
  const resultado = validarUsuario({ ...usuarioValido, telefono: "300-ABC" });
  assert.equal(resultado, "El teléfono solo puede contener números.");
});

test("validarUsuario devuelve el error del correo cuando es inválido", () => {
  const resultado = validarUsuario({ ...usuarioValido, correo: "correo-malo" });
  assert.equal(resultado, "Ingrese un correo electrónico válido.");
});

test("validarUsuario informa primero el error del nombre si hay varios", () => {
  const resultado = validarUsuario({ nombre: "", correo: "malo", telefono: "abc" });
  assert.equal(resultado, "El nombre solo puede contener letras y espacios.");
});
