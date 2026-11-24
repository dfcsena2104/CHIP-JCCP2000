# CHIP JCCP2000

Proyecto del programa de Análisis y Desarrollo de Software (ADSO) del SENA. Presenta el proyecto de un microchip para cerraduras inteligentes y permite gestionar usuarios desde una aplicación web y una aplicación móvil, conectadas a una base de datos MySQL.

## Módulos

| Módulo | Carpeta | Tecnologías | Descripción |
|---|---|---|---|
| Web | `src/` | React, Vite, React Router | Portada, detalle de cada área de mejora y gestión de usuarios |
| API | `backend/` | Node.js, Express, MySQL | Registro, consulta, edición y eliminación de usuarios, con validación de datos |
| Móvil | `movil/` | React Native, Expo | Portada, detalle y gestión de usuarios |
| Stand-alone | `backend/stand-alone/` | Node.js (consola) | Exporta los usuarios a un archivo CSV |
| Contenido compartido | `shared/` | JavaScript | Textos de las áreas de mejora y reglas de validación para la web y la app móvil |

## Requisitos

- Node.js LTS
- Git
- MySQL 8
- Para la app móvil: la aplicación **Expo Go** en el celular

## Base de datos

La aplicación usa una base de datos llamada `JCCP2000` con la tabla `usuarios`:

```sql
CREATE DATABASE IF NOT EXISTS JCCP2000;
USE JCCP2000;

CREATE TABLE IF NOT EXISTS usuarios (
  id_usuario INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  correo VARCHAR(100) NOT NULL,
  telefono VARCHAR(20) NOT NULL,
  fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

Las credenciales se guardan en `backend/.env`, que no se sube al repositorio. Su contenido es:

```
DB_HOST=localhost
DB_USER=usuario
DB_PASSWORD=contraseña
DB_NAME=JCCP2000
```

## Instalación

Clona el repositorio:

```bash
git clone https://github.com/dfcsena2104/CHIP-JCCP2000.git
cd CHIP-JCCP2000
```

Instala las dependencias de la web y del backend:

```bash
npm install
cd backend
npm install
cd ..
```

Instala las dependencias de la app móvil:

```bash
cd movil
npm install
cd ..
```

## Ejecución

**Backend** (terminal 1, dentro de `backend/`):

```bash
node server.js
```

**Web** (terminal 2, en la carpeta principal):

```bash
npm run dev
```

Abre `http://localhost:5173` en el navegador.

**App móvil** (terminal 3, dentro de `movil/`):

```bash
npx expo start
```

Escanea el código QR con Expo Go. El celular y el computador deben estar en la misma red Wi-Fi.

**Exportador de reportes** (dentro de `backend/`, con MySQL activo):

```bash
node stand-alone/exportar-usuarios.js
```

Genera `backend/stand-alone/reporte_usuarios.csv`. Este archivo contiene datos personales, por eso no se sube al repositorio.

## Configuración de la app móvil

El celular no puede usar `localhost`, porque esa dirección apunta al propio celular. El archivo `movil/src/config.js` debe contener la IP del computador en la red Wi-Fi:

```javascript
export const API_URL = "http://192.168.0.19:3000";
```

Para obtener la IP, ejecuta `ipconfig` en PowerShell y busca la **Dirección IPv4** del adaptador Wi-Fi.

## API

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/` | Verifica que el servidor funciona |
| POST | `/usuarios` | Registra un usuario |
| GET | `/usuarios` | Lista los usuarios |
| PUT | `/usuarios/:id` | Actualiza un usuario |
| DELETE | `/usuarios/:id` | Elimina un usuario |

El servidor valida nombre, teléfono y correo antes de guardar o actualizar. Si un dato no es válido, responde con código 400 y el motivo.

## Contenido compartido

La carpeta `shared/` contiene los textos de las áreas de mejora (`contenido.js`) y las reglas de validación (`validaciones.js`). La web y la app móvil importan estos archivos, así que un cambio se hace en un solo lugar.

## Calidad del código

Para revisar el estilo del código, ejecuta desde la carpeta principal:

```bash
npm run lint
```

## Documentación

- `DOCUMENTACION.md`: estructura del proyecto, instalación y ejecución.
- `PRUEBAS_MODULOS.md`: casos de prueba y resultados.

## Autor

Proyecto académico desarrollado para el programa de formación **Análisis y Desarrollo de Software (ADSO) — SENA**.
