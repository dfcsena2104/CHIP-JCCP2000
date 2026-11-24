// Importamos useState para manejar los datos y estados de la aplicación
import { useState } from "react";
import { esNombreValido, esTelefonoValido, esCorreoValido } from "../shared/validaciones.js";

// Componente principal de la aplicación
function App() {

  // Estado que controla si se muestra el formulario de registro
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  // Estados que almacenan los datos escritos en el formulario
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [telefono, setTelefono] = useState("");

  // Estado que almacena la lista de usuarios consultados desde MySQL
  const [usuarios, setUsuarios] = useState([]);

  // Estado que controla si se muestra el módulo de gestión
  const [mostrarGestion, setMostrarGestion] = useState(false);

  // Estado que almacena el usuario que se está editando
  const [usuarioEditando, setUsuarioEditando] = useState(null);

  // Función encargada de registrar un nuevo usuario
  const guardarUsuario = async (evento) => {

    // Evitamos que el formulario recargue la página
    evento.preventDefault();

    // Validamos que el nombre solo contenga letras y espacios
    

    if (!esNombreValido(nombre)) {
      alert("El nombre solo puede contener letras y espacios.");
      return;
    }

    // Validamos que el teléfono solo contenga números
    

    if (!esTelefonoValido(telefono)) {
      alert("El teléfono solo puede contener números.");
      return;
    }

    // Validamos que el correo tenga un formato válido
    

    if (!esCorreoValido(correo)) {
      alert("Ingrese un correo electrónico válido.");
      return;
    }

    try {

      // Enviamos los datos al backend mediante una petición POST
      const respuesta = await fetch("http://localhost:3000/usuarios", {
        method: "POST",

        // Indicamos que los datos están en formato JSON
        headers: {
          "Content-Type": "application/json",
        },

        // Convertimos los datos del formulario a JSON
        body: JSON.stringify({
          nombre,
          correo,
          telefono,
        }),
      });

      // Convertimos la respuesta del servidor a JSON
      const datos = await respuesta.json();

      // Verificamos si el servidor respondió con un error
      if (!respuesta.ok) {
        alert(datos.mensaje);
        return;
      }

      // Mostramos el mensaje enviado por el backend
      alert(datos.mensaje);

      // Limpiamos los campos después de registrar
      setNombre("");
      setCorreo("");
      setTelefono("");

    } catch (error) {

      // Mostramos el error en la consola
      console.error("Error al conectar con el servidor:", error);

      // Informamos al usuario
      alert("No fue posible conectar con el servidor");
    }
  };

  // Función encargada de consultar los usuarios registrados
  const consultarUsuarios = async () => {

    try {

      // Solicitamos al backend la lista de usuarios
      const respuesta = await fetch("http://localhost:3000/usuarios");

      // Convertimos la respuesta a JSON
      const datos = await respuesta.json();

      // Verificamos si ocurrió algún error
      if (!respuesta.ok) {
        alert(datos.mensaje);
        return;
      }

      // Guardamos los usuarios recibidos
      setUsuarios(datos);

    } catch (error) {

      // Mostramos el error en la consola
      console.error("Error al consultar usuarios:", error);

      // Informamos al usuario
      alert("No fue posible consultar los usuarios");
    }
  };

  // Función encargada de eliminar un usuario
  const eliminarUsuario = async (id) => {

    // Confirmamos antes de eliminar
    const confirmar = window.confirm(
      "¿Está seguro de eliminar este usuario?"
    );

    // Si cancela, no hacemos nada
    if (!confirmar) {
      return;
    }

    try {

      // Enviamos una petición DELETE al backend
      const respuesta = await fetch(
        `http://localhost:3000/usuarios/${id}`,
        {
          method: "DELETE",
        }
      );

      // Convertimos la respuesta a JSON
      const datos = await respuesta.json();

      // Verificamos si ocurrió un error
      if (!respuesta.ok) {
        alert(datos.mensaje);
        return;
      }

      // Mostramos confirmación
      alert(datos.mensaje);

      // Actualizamos la lista
      consultarUsuarios();

    } catch (error) {

      // Mostramos el error en la consola
      console.error("Error al eliminar usuario:", error);

      // Informamos al usuario
      alert("No fue posible eliminar el usuario");
    }
  };

  // Función encargada de actualizar un usuario
  const actualizarUsuario = async () => {

    // Verificamos que exista un usuario seleccionado
    if (!usuarioEditando) {
      return;
    }

    // Validamos que el nombre solo contenga letras y espacios
    

    if (!esNombreValido(usuarioEditando.nombre)) {
      alert("El nombre solo puede contener letras y espacios.");
      return;
    }

    // Validamos que el teléfono solo contenga números
    

    if (!esTelefonoValido(usuarioEditando.telefono)) {
      alert("El teléfono solo puede contener números.");
      return;
    }

    // Validamos que el correo tenga un formato válido
    

    if (!esCorreoValido(usuarioEditando.correo)) {
      alert("Ingrese un correo electrónico válido.");
      return;
    }

    try {

      // Enviamos los datos modificados al backend
      const respuesta = await fetch(
        `http://localhost:3000/usuarios/${usuarioEditando.id_usuario}`,
        {
          method: "PUT",

          // Indicamos que enviamos información JSON
          headers: {
            "Content-Type": "application/json",
          },

          // Enviamos los nuevos datos
          body: JSON.stringify({
            nombre: usuarioEditando.nombre,
            correo: usuarioEditando.correo,
            telefono: usuarioEditando.telefono,
          }),
        }
      );

      // Convertimos la respuesta a JSON
      const datos = await respuesta.json();

      // Verificamos si ocurrió un error
      if (!respuesta.ok) {
        alert(datos.mensaje);
        return;
      }

      // Mostramos confirmación
      alert(datos.mensaje);

      // Cerramos el formulario de edición
      setUsuarioEditando(null);

      // Actualizamos la tabla
      consultarUsuarios();

    } catch (error) {

      // Mostramos el error en la consola
      console.error("Error al actualizar usuario:", error);

      // Informamos al usuario
      alert("No fue posible actualizar el usuario");
    }
  };

  // Interfaz visual de la aplicación
  return (
    <div>

      {/* Encabezado principal */}
      <header>
        <h1>CHIP JCCP2000</h1>
        <p>Sistema de gestión</p>
      </header>

      {/* Contenido principal */}
      <main>

        {/* Menú principal */}
        <h2>Menú principal</h2>

        {/* Botón para registrar */}
        <button onClick={() => setMostrarFormulario(true)}>
          Registrar usuario
        </button>

        {/* Botón para consultar */}
        <button onClick={consultarUsuarios}>
          Consultar usuarios
        </button>

        {/* Botón para gestionar */}
        <button onClick={() => setMostrarGestion(true)}>
          Gestionar información
        </button>

        {/* Formulario de registro */}
        {mostrarFormulario && (
          <section>

            <h2>Registrar usuario</h2>

            <form onSubmit={guardarUsuario}>

              <label>Nombre:</label>

              <input
                type="text"
                value={nombre}
                onChange={(evento) => setNombre(evento.target.value)}
              />

              <label>Correo:</label>

              <input
                type="email"
                value={correo}
                onChange={(evento) => setCorreo(evento.target.value)}
              />

              <label>Teléfono:</label>

              <input
                type="tel"
                value={telefono}
                onChange={(evento) => setTelefono(evento.target.value)}
              />

              <button type="submit">
                Guardar usuario
              </button>

            </form>

          </section>
        )}

        {/* Módulo de gestión */}
        {mostrarGestion && (
          <section>

            <h2>Gestionar información</h2>

            {/* Formulario de edición */}
            {usuarioEditando && (
              <section>

                <h3>Editar usuario</h3>

                <label>Nombre:</label>

                <input
                  type="text"
                  value={usuarioEditando.nombre}
                  onChange={(evento) =>
                    setUsuarioEditando({
                      ...usuarioEditando,
                      nombre: evento.target.value,
                    })
                  }
                />

                <label>Correo:</label>

                <input
                  type="email"
                  value={usuarioEditando.correo}
                  onChange={(evento) =>
                    setUsuarioEditando({
                      ...usuarioEditando,
                      correo: evento.target.value,
                    })
                  }
                />

                <label>Teléfono:</label>

                <input
                  type="tel"
                  value={usuarioEditando.telefono}
                  onChange={(evento) =>
                    setUsuarioEditando({
                      ...usuarioEditando,
                      telefono: evento.target.value,
                    })
                  }
                />

                <button onClick={actualizarUsuario}>
                  Guardar cambios
                </button>

                <button onClick={() => setUsuarioEditando(null)}>
                  Cancelar
                </button>

              </section>
            )}

            {/* Botón para cargar usuarios */}
            <button onClick={consultarUsuarios}>
              Cargar usuarios
            </button>

            {/* Tabla de gestión */}
            {usuarios.length > 0 && (
              <table border="1">

                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Correo</th>
                    <th>Teléfono</th>
                    <th>Acciones</th>
                  </tr>
                </thead>

                <tbody>

                  {usuarios.map((usuario) => (
                    <tr key={usuario.id_usuario}>

                      <td>{usuario.id_usuario}</td>
                      <td>{usuario.nombre}</td>
                      <td>{usuario.correo}</td>
                      <td>{usuario.telefono}</td>

                      <td>

                        <button
                          onClick={() => setUsuarioEditando(usuario)}
                        >
                          Editar
                        </button>

                        <button
                          onClick={() =>
                            eliminarUsuario(usuario.id_usuario)
                          }
                        >
                          Eliminar
                        </button>

                      </td>

                    </tr>
                  ))}

                </tbody>

              </table>
            )}

          </section>
        )}

        {/* Tabla de usuarios registrados */}
        {usuarios.length > 0 && (
          <section>

            <h2>Usuarios registrados</h2>

            <table border="1">

              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Correo</th>
                  <th>Teléfono</th>
                  <th>Fecha de registro</th>
                </tr>
              </thead>

              <tbody>

                {usuarios.map((usuario) => (
                  <tr key={usuario.id_usuario}>

                    <td>{usuario.id_usuario}</td>
                    <td>{usuario.nombre}</td>
                    <td>{usuario.correo}</td>
                    <td>{usuario.telefono}</td>
                    <td>{usuario.fecha_registro}</td>

                  </tr>
                ))}

              </tbody>

            </table>

          </section>
        )}

      </main>

    </div>
  );
}

// Exportamos el componente
export default App;