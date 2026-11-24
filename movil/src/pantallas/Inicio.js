import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { mejoras, etapasDesarrollo } from "../datos";

// Portada del proyecto: logo, resumen, tarjetas y etapas, igual que la web
export default function Inicio({ onVerDetalle }) {
  return (
    <FlatList
      data={mejoras}
      keyExtractor={(mejora) => mejora.slug}
      contentContainerStyle={estilos.contenido}
      ListHeaderComponent={
        <View style={estilos.encabezado}>
          <Image
            source={require("../../assets/img/logo.png")}
            style={estilos.logo}
            resizeMode="contain"
          />
          <Text style={estilos.titulo}>CHIP JCCP2000</Text>
          <Text style={estilos.texto}>
            Control de acceso inteligente para hogares y empresas
          </Text>
          <Text style={estilos.subtitulo}>Resumen del proyecto</Text>
          <Text style={estilos.texto}>
            El CHIP JCCP2000 se integra a cerraduras inteligentes para ofrecer un acceso
            más seguro, ágil y controlado. Sus mejoras se organizan en las siguientes áreas:
          </Text>
          <Text style={estilos.subtitulo}>Áreas de mejora</Text>
        </View>
      }
      renderItem={({ item }) => (
        <View style={estilos.tarjeta}>
          <Image source={item.imagen} style={estilos.imagen} />
          <View style={estilos.cuerpo}>
            <Text style={estilos.tituloTarjeta}>{item.titulo}</Text>
            <Text style={estilos.texto}>{item.descripcion}</Text>
            <TouchableOpacity style={estilos.boton} onPress={() => onVerDetalle(item)}>
              <Text style={estilos.textoBoton}>Ver detalle</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
      ListFooterComponent={
        <View>
          <Text style={estilos.subtitulo}>Etapas de desarrollo</Text>
          {etapasDesarrollo.map((etapa, indice) => (
            <Text key={etapa} style={estilos.texto}>
              {indice + 1}. {etapa}
            </Text>
          ))}
        </View>
      }
    />
  );
}

const estilos = StyleSheet.create({
  contenido: { padding: 16, backgroundColor: "#f2f4f7" },
  encabezado: { backgroundColor: "#1f2937", padding: 20, borderRadius: 10, alignItems: "center" },
  logo: { width: 160, height: 120 },
  titulo: { fontSize: 24, fontWeight: "bold", color: "#fff", marginTop: 8 },
  subtitulo: { fontSize: 18, fontWeight: "bold", color: "#1f2937", marginTop: 16, marginBottom: 8, alignSelf: "stretch" },
  texto: { fontSize: 15, color: "#222", lineHeight: 22, marginBottom: 8, alignSelf: "stretch" },
  tarjeta: { backgroundColor: "#fff", borderRadius: 10, marginTop: 16, overflow: "hidden", elevation: 3 },
  imagen: { width: "100%", height: 160 },
  cuerpo: { padding: 16 },
  tituloTarjeta: { fontSize: 18, fontWeight: "bold", color: "#1f2937", marginBottom: 6 },
  boton: { backgroundColor: "#2563eb", padding: 10, borderRadius: 6, alignItems: "center", marginTop: 8 },
  textoBoton: { color: "#fff", fontWeight: "bold" },
});