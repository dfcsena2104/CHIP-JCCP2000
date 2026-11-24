import { Image, ScrollView, StyleSheet, Text, TouchableOpacity } from "react-native";

// Página de detalle de un área de mejora, igual que la página /mejoras/:slug de la web
export default function Detalle({ mejora, onVolver }) {
  return (
    <ScrollView contentContainerStyle={estilos.contenido}>
      <Image source={mejora.imagen} style={estilos.imagen} />
      <Text style={estilos.titulo}>{mejora.titulo}</Text>
      <Text style={estilos.texto}>{mejora.descripcion}</Text>

      {mejora.puntos.map((punto, indice) => (
        <Text key={punto} style={estilos.punto}>
          {indice + 1}. {punto}
        </Text>
      ))}

      <TouchableOpacity style={estilos.boton} onPress={onVolver}>
        <Text style={estilos.textoBoton}>← Volver al inicio</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const estilos = StyleSheet.create({
  contenido: { padding: 16, backgroundColor: "#fff" },
  imagen: { width: "100%", height: 200, borderRadius: 10 },
  titulo: { fontSize: 22, fontWeight: "bold", color: "#1f2937", marginTop: 16 },
  texto: { fontSize: 15, color: "#222", marginTop: 8, marginBottom: 16, lineHeight: 22 },
  punto: { fontSize: 15, color: "#222", marginBottom: 8, lineHeight: 22 },
  boton: { backgroundColor: "#2563eb", padding: 12, borderRadius: 6, alignItems: "center", marginTop: 16 },
  textoBoton: { color: "#fff", fontWeight: "bold" },
});