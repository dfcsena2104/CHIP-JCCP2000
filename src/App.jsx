// Importamos useState para manejar los datos y estados de la aplicación
import { useState } from "react";

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

  // Función encargada de registrar un nuevo usuario
  const guardarUsuario = async (evento) => {

    // Evitamos que el formulario recargue la página
    evento.preventDefault();

    try {

      // Enviamos los datos al backend mediante una petición POST
      const respuesta = await fetch("http://localhost:3000/usuarios", {
        method: "POST",

        // Indicamos que los datos enviados están en formato JSON
        headers: {
          "Content-Type": "application/json",
        },

        // Convertimos los datos del formulario a formato JSON
        body: JSON.stringify({
          nombre,
          correo,
          telefono,
        }),
      });

      // Convertimos la respuesta del servidor a un objeto JavaScript
      const datos = await respuesta.json();

      // Verificamos si el servidor respondió con un error
      if (!respuesta.ok) {
        alert(datos.mensaje);
        return;
      }

      // Mostramos el mensaje enviado por el backend
      alert(datos.mensaje);

      // Limpiamos los campos después de registrar el usuario
      setNombre("");
      setCorreo("");
      setTelefono("");

    } catch (error) {

      // Mostramos el error en la consola del navegador
      console.error("Error al conectar con el servidor:", error);

      // Informamos al usuario que no fue posible realizar la conexión
      alert("No fue posible conectar con el servidor");
    }
  };

  // Función encargada de consultar los usuarios registrados
  const consultarUsuarios = async () => {

    try {

      // Solicitamos al backend la lista de usuarios mediante GET
      const respuesta = await fetch("http://localhost:3000/usuarios");

      // Convertimos la respuesta a formato JSON
      const datos = await respuesta.json();

      // Verificamos si ocurrió algún error en el servidor
      if (!respuesta.ok) {
        alert(datos.mensaje);
        return;
      }

      // Guardamos los usuarios recibidos en el estado
      setUsuarios(datos);

    } catch (error) {

      // Mostramos el error en la consola
      console.error("Error al consultar usuarios:", error);

      // Informamos al usuario sobre el problema
      alert("No fue posible consultar los usuarios");
    }
  };

  // Interfaz visual de la aplicación
  return (
    <div>

      {/* Encabezado principal del sistema */}
      <header>
        <h1>CHIP JCCP2000</h1>
        <p>Sistema de gestión</p>
      </header>

      {/* Contenido principal */}
      <main>

        {/* Título del menú principal */}
        <h2>Menú principal</h2>

        {/* Botón para mostrar el formulario de registro */}
        <button onClick={() => setMostrarFormulario(true)}>
          Registrar usuario
        </button>

        {/* Botón para consultar los usuarios registrados */}
        <button onClick={consultarUsuarios}>
          Consultar usuarios
        </button>

        {/* Botón reservado para el módulo de gestión de información */}
        <button>
          Gestionar información
        </button>

        {/* Mostramos el formulario solamente cuando el estado es verdadero */}
        {mostrarFormulario && (
          <section>

            {/* Título del formulario */}
            <h2>Registrar usuario</h2>

            {/* Formulario para registrar usuarios */}
            <form onSubmit={guardarUsuario}>

              {/* Campo para ingresar el nombre */}
              <label>Nombre:</label>

              <input
                type="text"
                value={nombre}
                onChange={(evento) => setNombre(evento.target.value)}
              />

              {/* Campo para ingresar el correo */}
              <label>Correo:</label>

              <input
                type="email"
                value={correo}
                onChange={(evento) => setCorreo(evento.target.value)}
              />

              {/* Campo para ingresar el teléfono */}
              <label>Teléfono:</label>

              <input
                type="tel"
                value={telefono}
                onChange={(evento) => setTelefono(evento.target.value)}
              />

              {/* Botón que envía el formulario */}
              <button type="submit">
                Guardar usuario
              </button>

            </form>

          </section>
        )}

        {/* Mostramos la tabla si existen usuarios registrados */}
        {usuarios.length > 0 && (
          <section>

            {/* Título de la consulta */}
            <h2>Usuarios registrados</h2>

            {/* Tabla para mostrar los usuarios */}
            <table border="1">

              {/* Encabezados de la tabla */}
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Correo</th>
                  <th>Teléfono</th>
                  <th>Fecha de registro</th>
                </tr>
              </thead>

              {/* Cuerpo de la tabla */}
              <tbody>

                {/* Recorremos la lista de usuarios */}
                {usuarios.map((usuario) => (
                  <tr key={usuario.id_usuario}>

                    {/* Mostramos los datos de cada usuario */}
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

// Exportamos el componente para utilizarlo en la aplicación
export default App;