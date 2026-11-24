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
    } catch (error) {
      Alert.alert("Aviso", "No fue posible consultar los usuarios");
    }
  };

  // Carga la lista al abrir la pantalla
  useEffect(() => {
    consultarUsuarios();
  }, []);

  // Valida los datos con las mismas reglas de la web y los envía al backend
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
    } catch (error) {
      Alert.alert("Aviso", "No fue posible conectar con el servidor");
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
          } catch (error) {
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
  boton: { backgroundColor: "#2563eb", padding: 12, borderRadius: 6, alignItems: "center", marginTop: 16 },
  botonSecundario: { backgroundColor: "#1f2937", padding: 12, borderRadius: 6, alignItems: "center", marginTop: 8 },
  botonEliminar: { backgroundColor: "#dc2626", padding: 10, borderRadius: 6, alignItems: "center", marginTop: 8 },
  textoBoton: { color: "#fff", fontWeight: "bold" },
  tarjeta: { backgroundColor: "#fff", borderRadius: 8, padding: 12, marginBottom: 10, gap: 4 },
  negrita: { fontWeight: "bold" },
  texto: { textAlign: "center", marginTop: 20, color: "#666" },
});