// Permite que la app móvil lea la carpeta shared/ de la raíz del proyecto
const { getDefaultConfig } = require("expo/metro-config");
const path = require("path");

const carpetaMovil = __dirname;
const carpetaProyecto = path.resolve(carpetaMovil, "..");

const config = getDefaultConfig(carpetaMovil);
config.watchFolders = [carpetaProyecto];

module.exports = config;