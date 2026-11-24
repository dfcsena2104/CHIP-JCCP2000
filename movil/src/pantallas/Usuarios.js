import { useEffect, useState } from "react";
import { Alert, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { API_URL } from "../config";
import { esNombreValido, esTelefonoValido, esCorreoValido } from "../validaciones";

// Gestión de usuarios con las mismas validaciones y llamadas a la API que la web
export default function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [telefono, setTelefono] = useState("");

  // Usuario que se está editando (null si no hay ninguno)
  const [editando, setEditando] = useState(null);

  // Consulta la lista de usuarios desde el backend
  const consultarUsuarios = async () => {
    try {
      const respuesta = await fetch(`${API_URL}/usuarios`);
      const datos = await respuesta.json();

      if (!respuesta.ok) {
        Alert.alert("Aviso", datos.mensaje);
        return;
      }

      setUsuarios(datos);
    } catch {
      Alert.alert("Aviso", "No fue posible consultar los usuarios");
    }
  };

  // Carga la lista al abrir la pantalla
    useEffect(() => {
    const cargarAlAbrir = async () => {
      try {
        const respuesta = await fetch(`${API_URL}/usuarios`);
        const datos = await respuesta.json();

        if (!respuesta.ok) {
          Alert.alert("Aviso", datos.mensaje);
          return;
        }

        setUsuarios(datos);
      } catch {
        Alert.alert("Aviso", "No fue posible consultar los usuarios");
      }
    };

    cargarAlAbrir();
  }, []);

  // Valida los datos y los envía al backend para registrar un usuario nuevo
  const guardarUsuario = async () => {
    if (!esNombreValido(nombre)) {
      Alert.alert("Aviso", "El nombre solo puede contener letras y espacios.");
      return;
    }
    if (!esTelefonoValido(telefono)) {
      Alert.alert("Aviso", "El teléfono solo puede contener números.");
      return;
    }
    if (!esCorreoValido(correo)) {
      Alert.alert("Aviso", "Ingrese un correo electrónico válido.");
      return;
    }

    try {
      const respuesta = await fetch(`${API_URL}/usuarios`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, correo, telefono }),
      });
      const datos = await respuesta.json();

      if (!respuesta.ok) {
        Alert.alert("Aviso", datos.mensaje);
        return;
      }

      Alert.alert("Aviso", datos.mensaje);
      setNombre("");
      setCorreo("");
      setTelefono("");
      consultarUsuarios();
    } catch  {
      Alert.alert("Aviso", "No fue posible conectar con el servidor");
    }
  };

  // Abre el formulario de edición con los datos actuales del usuario
  const abrirEdicion = (usuario) => {
    setEditando({
      id_usuario: usuario.id_usuario,
      nombre: usuario.nombre,
      correo: usuario.correo,
      telefono: usuario.telefono,
    });
  };

  // Valida los datos editados y los envía con PUT, igual que la web
  const guardarEdicion = async () => {
    if (!editando) {
      return;
    }
    if (!esNombreValido(editando.nombre)) {
      Alert.alert("Aviso", "El nombre solo puede contener letras y espacios.");
      return;
    }
    if (!esTelefonoValido(editando.telefono)) {
      Alert.alert("Aviso", "El teléfono solo puede contener números.");
      return;
    }
    if (!esCorreoValido(editando.correo)) {
      Alert.alert("Aviso", "Ingrese un correo electrónico válido.");
      return;
    }

    try {
      const respuesta = await fetch(`${API_URL}/usuarios/${editando.id_usuario}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre: editando.nombre,
          correo: editando.correo,
          telefono: editando.telefono,
        }),
      });
      const datos = await respuesta.json();

      if (!respuesta.ok) {
        Alert.alert("Aviso", datos.mensaje);
        return;
      }

      Alert.alert("Aviso", datos.mensaje);
      setEditando(null);
      consultarUsuarios();
    } catch {
      Alert.alert("Aviso", "No fue posible actualizar el usuario");
    }
  };

  // Pide confirmación antes de eliminar, igual que la web
  const eliminarUsuario = (id, nombreUsuario) => {
    Alert.alert("Eliminar", `¿Está seguro de eliminar a ${nombreUsuario}?`, [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Eliminar",
        style: "destructive",
        onPress: async () => {
          try {
            const respuesta = await fetch(`${API_URL}/usuarios/${id}`, { method: "DELETE" });
            const datos = await respuesta.json();

            if (!respuesta.ok) {
              Alert.alert("Aviso", datos.mensaje);
              return;
            }

            Alert.alert("Aviso", datos.mensaje);
            consultarUsuarios();
          } catch  {
            Alert.alert("Aviso", "No fue posible eliminar el usuario");
          }
        },
      },
    ]);
  };

  return (
    <FlatList
      data={usuarios}
      keyExtractor={(usuario) => String(usuario.id_usuario)}
      contentContainerStyle={estilos.contenido}
      ListHeaderComponent={
        <View>
          <Text style={estilos.titulo}>Registrar usuario</Text>

          <Text style={estilos.etiqueta}>Nombre:</Text>
          <TextInput style={estilos.campo} value={nombre} onChangeText={setNombre} />

          <Text style={estilos.etiqueta}>Correo:</Text>
          <TextInput
            style={estilos.campo}
            value={correo}
            onChangeText={setCorreo}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <Text style={estilos.etiqueta}>Teléfono:</Text>
          <TextInput
            style={estilos.campo}
            value={telefono}
            onChangeText={setTelefono}
            keyboardType="phone-pad"
          />

          <TouchableOpacity style={estilos.boton} onPress={guardarUsuario}>
            <Text style={estilos.textoBoton}>Guardar usuario</Text>
          </TouchableOpacity>

          <TouchableOpacity style={estilos.botonSecundario} onPress={consultarUsuarios}>
            <Text style={estilos.textoBoton}>Consultar usuarios</Text>
          </TouchableOpacity>

          {editando && (
            <View style={estilos.edicion}>
              <Text style={estilos.titulo}>Editar usuario</Text>

              <Text style={estilos.etiqueta}>Nombre:</Text>
              <TextInput
                style={estilos.campo}
                value={editando.nombre}
                onChangeText={(texto) => setEditando({ ...editando, nombre: texto })}
              />

              <Text style={estilos.etiqueta}>Correo:</Text>
              <TextInput
                style={estilos.campo}
                value={editando.correo}
                onChangeText={(texto) => setEditando({ ...editando, correo: texto })}
                keyboardType="email-address"
                autoCapitalize="none"
              />

              <Text style={estilos.etiqueta}>Teléfono:</Text>
              <TextInput
                style={estilos.campo}
                value={editando.telefono}
                onChangeText={(texto) => setEditando({ ...editando, telefono: texto })}
                keyboardType="phone-pad"
              />

              <TouchableOpacity style={estilos.boton} onPress={guardarEdicion}>
                <Text style={estilos.textoBoton}>Guardar cambios</Text>
              </TouchableOpacity>

              <TouchableOpacity style={estilos.botonSecundario} onPress={() => setEditando(null)}>
                <Text style={estilos.textoBoton}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          )}

          <Text style={estilos.titulo}>Usuarios registrados</Text>
        </View>
      }
      ListEmptyComponent={<Text style={estilos.texto}>No hay usuarios registrados.</Text>}
      renderItem={({ item }) => (
        <View style={estilos.tarjeta}>
          <Text style={estilos.negrita}>ID: {item.id_usuario}</Text>
          <Text>Nombre: {item.nombre}</Text>
          <Text>Correo: {item.correo}</Text>
          <Text>Teléfono: {item.telefono}</Text>
          <Text>Fecha de registro: {item.fecha_registro}</Text>
          <TouchableOpacity style={estilos.botonEditar} onPress={() => abrirEdicion(item)}>
            <Text style={estilos.textoBoton}>Editar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={estilos.botonEliminar}
            onPress={() => eliminarUsuario(item.id_usuario, item.nombre)}
          >
            <Text style={estilos.textoBoton}>Eliminar</Text>
          </TouchableOpacity>
        </View>
      )}
    />
  );
}

const estilos = StyleSheet.create({
  contenido: { padding: 16, backgroundColor: "#f2f4f7" },
  titulo: { fontSize: 20, fontWeight: "bold", color: "#1f2937", marginTop: 16, marginBottom: 8 },
  etiqueta: { fontWeight: "bold", marginTop: 8, marginBottom: 4 },
  campo: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 10,
    fontSize: 16,
    backgroundColor: "#fff",
  },
  edicion: { backgroundColor: "#fff", borderRadius: 8, padding: 12, marginTop: 12 },
  boton: { backgroundColor: "#2563eb", padding: 12, borderRadius: 6, alignItems: "center", marginTop: 16 },
  botonSecundario: { backgroundColor: "#1f2937", padding: 12, borderRadius: 6, alignItems: "center", marginTop: 8 },
  botonEditar: { backgroundColor: "#2563eb", padding: 10, borderRadius: 6, alignItems: "center", marginTop: 8 },
  botonEliminar: { backgroundColor: "#dc2626", padding: 10, borderRadius: 6, alignItems: "center", marginTop: 8 },
  textoBoton: { color: "#fff", fontWeight: "bold" },
  tarjeta: { backgroundColor: "#fff", borderRadius: 8, padding: 12, marginBottom: 10, gap: 4 },
  negrita: { fontWeight: "bold" },
  texto: { textAlign: "center", marginTop: 20, color: "#666" },
});