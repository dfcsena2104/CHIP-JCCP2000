import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Inicio from "./src/pantallas/Inicio";
import Detalle from "./src/pantallas/Detalle";
import Usuarios from "./src/pantallas/Usuarios";

// Navegación simple: barra superior con Inicio y Usuarios, y detalle al tocar una tarjeta
export default function App() {
  const [pantalla, setPantalla] = useState({ nombre: "inicio" });

  let contenido;
  if (pantalla.nombre === "detalle") {
    contenido = (
      <Detalle mejora={pantalla.mejora} onVolver={() => setPantalla({ nombre: "inicio" })} />
    );
  } else if (pantalla.nombre === "usuarios") {
    contenido = <Usuarios />;
  } else {
    contenido = <Inicio onVerDetalle={(mejora) => setPantalla({ nombre: "detalle", mejora })} />;
  }

  return (
    <View style={estilos.contenedor}>
      <StatusBar style="light" />
      <View style={estilos.barra}>
        <TouchableOpacity onPress={() => setPantalla({ nombre: "inicio" })}>
          <Text style={estilos.enlace}>Inicio</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setPantalla({ nombre: "usuarios" })}>
          <Text style={estilos.enlace}>Gestión de usuarios</Text>
        </TouchableOpacity>
      </View>
      {contenido}
    </View>
  );
}

const estilos = StyleSheet.create({
  contenedor: { flex: 1, backgroundColor: "#f2f4f7" },
  barra: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#1f2937",
    paddingTop: 50,
    paddingBottom: 14,
  },
  enlace: { color: "#fff", fontWeight: "bold", fontSize: 14 },
});