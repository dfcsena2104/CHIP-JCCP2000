# Documentación técnica – CHIP JCCP2000

**Programa de formación:** Análisis y desarrollo de software (ADSO) – SENA
**Proyecto formativo:** Construcción de software integrador de tecnologías orientadas a servicios
**Resultado de aprendizaje:** 220501096-03 – Crear componentes front-end del software de acuerdo con el diseño
**Actividad:** GA6-220501096-AA4 – Generar plantillas y estilos, de acuerdo con el diseño
**Evidencia:** GA6-220501096-AA4-EV01 – Fundamentos en la implementación de componentes front-end (HTML, CSS, JS)
**Autor:** [Nombre del aprendiz]
**Repositorio:** https://github.com/dfcsena2104/CHIP-JCCP2000

---

## 1. Descripción general

CHIP JCCP2000 es una aplicación web que presenta el proyecto de un microchip para cerraduras inteligentes y permite gestionar usuarios almacenados en MySQL.

La aplicación tiene dos partes:

- **Presentación del proyecto:** portada con tarjetas de las áreas de mejora, páginas de detalle y etapas de desarrollo. Es el componente front-end que se evalúa en esta actividad.
- **Gestión de usuarios:** registro, consulta, edición y eliminación de usuarios conectados a una base de datos mediante un backend.

## 2. Objetivo

Construir una interfaz front-end con componentes reutilizables, plantillas y estilos CSS, que presente el contenido del proyecto con imagen, título y descripción, enlazado a su página correspondiente, e incluya listas ordenadas.

## 3. Tecnologías utilizadas

| Capa | Tecnología | Uso |
|---|---|---|
| Interfaz | React 19 | Construcción de componentes |
| Herramienta de desarrollo | Vite 8 | Servidor de desarrollo y compilación |
| Navegación | React Router DOM | Rutas entre páginas sin recargar |
| Estilos | CSS | Diseño visual, cuadrícula y efectos |
| Backend | Node.js y Express 5 | API REST |
| Base de datos | MySQL (mysql2) | Almacenamiento de usuarios |
| Configuración | dotenv | Lectura de credenciales desde `.env` |
| Comunicación | CORS | Permite las peticiones desde el navegador |
| Control de versiones | Git y GitHub | Historial y repositorio |

## 4. Arquitectura

```
Navegador (React + Vite, puerto 5173)
        │  HTTP (fetch / JSON)
        ▼
Servidor (Node.js + Express, puerto 3000)
        │  mysql2
        ▼
Base de datos MySQL (JCCP2000)
```

## 5. Estructura del proyecto

```
chip-jccp2000/
├── shared/                    Contenido y validaciones compartidos por la web y la app móvil
│   ├── contenido.js           Textos de las áreas de mejora y etapas de desarrollo
│   └── validaciones.js        Reglas de nombre, teléfono y correo
├── src/                       Aplicación web (React + Vite)
│   ├── components/
│   │   ├── Navegacion.jsx     Barra de navegación superior
│   │   └── TarjetaMejora.jsx  Tarjeta con imagen, título, descripción y enlace
│   ├── data/
│   │   └── mejoras.js         Une el contenido compartido con las rutas de imagen web
│   ├── pages/
│   │   ├── Inicio.jsx         Portada del proyecto
│   │   └── Detalle.jsx        Página de cada área de mejora
│   ├── App.jsx                Gestión de usuarios (CRUD)
│   ├── Rutas.jsx              Definición de rutas
│   ├── main.jsx               Punto de entrada
│   ├── index.css              Estilos generales
│   └── proyecto.css           Estilos de la presentación del proyecto
├── public/img/                Imágenes de la web
├── movil/                     Aplicación móvil (React Native + Expo)
│   ├── App.js                 Navegación entre pantallas
│   ├── metro.config.js        Permite leer la carpeta shared/
│   ├── assets/img/            Imágenes de la app móvil
│   └── src/
│       ├── config.js          Dirección del backend (IP del computador)
│       ├── datos.js           Une el contenido compartido con las imágenes móviles
│       ├── validaciones.js    Reexporta las reglas de shared/
│       └── pantallas/
│           ├── Inicio.js      Portada
│           ├── Detalle.js     Página de cada área de mejora
│           └── Usuarios.js    Registro, consulta y eliminación de usuarios
├── backend/
│   ├── db.js                  Conexión con MySQL
│   ├── server.js              Rutas de la API
│   ├── stand-alone/
│   │   └── exportar-usuarios.js   Exporta los usuarios a CSV (programa de consola)
│   ├── package.json
│   └── package-lock.json
├── index.html
├── package.json
└── vite.config.js
```

### Módulos del proyecto

- **Web:** portada, detalle, gestión de usuarios y su API. Se ejecuta con `npm run dev`.
- **Móvil:** portada, detalle y gestión de usuarios (registro, consulta y eliminación). No incluye edición de usuarios. Se ejecuta con `npx expo start` desde la carpeta `movil`, usando la app Expo Go en el celular.
- **Stand-alone:** exportador de reportes que se ejecuta desde la consola con `node stand-alone/exportar-usuarios.js`, dentro de `backend/`. Genera `reporte_usuarios.csv`, que no se sube al repositorio porque contiene datos personales.

### Contenido compartido

La carpeta `shared/` contiene el texto de las áreas de mejora y las reglas de validación. La web y la app móvil las importan desde ahí, así que un cambio se hace en un solo lugar.

## 6. Rutas de la aplicación

| Ruta | Componente | Descripción |
|---|---|---|
| `/` | `Inicio` | Portada con las tarjetas y las etapas de desarrollo |
| `/mejoras/:slug` | `Detalle` | Página de una mejora, según su identificador |
| `/usuarios` | `App` | Gestión de usuarios (registro, consulta, edición y eliminación) |

Los identificadores (`slug`) disponibles son: `tecnicas`, `funcionales`, `comerciales`, `estrategicas` y `prototipo`. Si se escribe otro valor, la página muestra el mensaje "Página no encontrada".

## 7. Componentes principales

**`Navegacion`:** muestra el menú superior con los enlaces a Inicio y Gestión de usuarios. Usa `NavLink`, que marca la opción activa.

**`TarjetaMejora`:** recibe un objeto `mejora` y dibuja una tarjeta con imagen, título (`h3`), descripción y un enlace a `/mejoras/:slug`.

**`Inicio`:** muestra el logo, el resumen del proyecto, una cuadrícula de tarjetas generada a partir de `mejoras.js` y una lista ordenada (`<ol>`) con las etapas de desarrollo.

**`Detalle`:** busca la mejora que coincide con el parámetro de la URL, muestra su imagen, descripción y una lista ordenada con sus puntos. Si no encuentra la mejora, muestra un mensaje de error y un enlace de regreso.

**`App`:** módulo de gestión de usuarios. Contiene los formularios de registro y edición, la tabla de usuarios y las validaciones.

## 8. Datos de las mejoras

El archivo `src/data/mejoras.js` exporta un arreglo con un objeto por cada área:

```javascript
{
  slug: "tecnicas",
  titulo: "Mejoras técnicas",
  descripcion: "Conectividad Wi-Fi y BLE, cifrado AES-256 y actualizaciones OTA.",
  imagen: "/img/tecnicas.jpg",
  alt: "Circuito electrónico",
  puntos: [ "...", "..." ]
}
```

Separar el contenido de los componentes permite cambiar textos o agregar un área sin modificar la estructura de las páginas.

## 9. API del backend

Base de la URL: `http://localhost:3000`

| Método | Ruta | Descripción | Respuesta exitosa |
|---|---|---|---|
| GET | `/` | Verifica que el servidor funciona | Texto de confirmación |
| POST | `/usuarios` | Registra un usuario (`nombre`, `correo`, `telefono`) | 201 con el `id` creado |
| GET | `/usuarios` | Lista los usuarios, del más reciente al más antiguo | 200 con arreglo JSON |
| PUT | `/usuarios/:id` | Actualiza nombre, correo y teléfono | 200 con mensaje |
| DELETE | `/usuarios/:id` | Elimina un usuario | 200 con mensaje |

Si el usuario no existe, PUT y DELETE responden con 404. Si ocurre un error en la base de datos, responden con 500.

## 10. Validaciones

**En la gestión de usuarios** (`App.jsx`):

- **Nombre:** solo letras (incluye tildes y ñ) y espacios.
- **Teléfono:** solo números.
- **Correo:** formato `texto@texto.texto`.

Las mismas reglas se aplican al registrar y al editar.

## 11. Instalación y ejecución

**Requisitos:** Node.js LTS, Git, MySQL con la base de datos `JCCP2000` y el archivo `.env` dentro de `backend/`.

**Archivo `backend/.env`** (no se sube al repositorio):

```
DB_HOST=localhost
DB_USER=usuario
DB_PASSWORD=contraseña
DB_NAME=JCCP2000
```

**Pasos:**

1. Clonar el repositorio:
   ```
   git clone https://github.com/dfcsena2104/CHIP-JCCP2000.git
   ```
2. Instalar las dependencias del frontend, en la carpeta principal:
   ```
   npm install
   ```
3. Instalar las dependencias del backend:
   ```
   cd backend
   npm install
   ```
4. Iniciar el backend (terminal 1, dentro de `backend/`):
   ```
   node server.js
   ```
5. Iniciar el frontend (terminal 2, en la carpeta principal):
   ```
   npm run dev
   ```
6. Abrir `http://localhost:5173` en el navegador.

## 12. Pruebas realizadas

| N.º | Caso de prueba | Resultado esperado | Resultado obtenido |
|---|---|---|---|
| 1 | Abrir la portada `/` | Logo, resumen, cinco tarjetas y etapas | |
| 2 | Verificar que cada tarjeta tenga imagen, título y descripción | Todas las tarjetas completas | |
| 3 | Hacer clic en "Ver detalle" de cada tarjeta | Se abre la página correspondiente | |
| 4 | Revisar la lista ordenada de cada detalle | Puntos numerados | |
| 5 | Usar "Volver al inicio" | Regresa a `/` | |
| 6 | Entrar a `/mejoras/inexistente` | Mensaje "Página no encontrada" | |
| 7 | Registrar un usuario válido | Mensaje de éxito y campos limpios | |
| 8 | Registrar con nombre que contenga números | Alerta de nombre no válido | |
| 9 | Registrar con teléfono que contenga letras | Alerta de teléfono no válido | |
| 10 | Consultar usuarios | Tabla con los registros | |
| 11 | Editar un usuario | Cambios guardados | |
| 12 | Eliminar un usuario y confirmar | Usuario eliminado de la tabla | |
| 13 | Apagar el backend y consultar usuarios | Mensaje de error de conexión | |

## 13. Cumplimiento de la lista de chequeo

| N.º | Indicador | Cómo se cumple |
|---|---|---|
| 1 | Soluciona el problema propuesto con componentes front-end | Portada, detalle y gestión de usuarios construidos con componentes React reutilizables |
| 2 | El contenido se enlaza con la página correspondiente con imagen, título y descripción | `TarjetaMejora` muestra imagen, `h3` y descripción, con enlace a `/mejoras/:slug` |
| 3 | Aplica estilos CSS | `index.css` y `proyecto.css`: cuadrícula responsiva, tarjetas, navegación y efectos |
| 4 | Emplea listas ordenadas | `<ol>` en las etapas de desarrollo (`Inicio`) y en los puntos de cada área (`Detalle`) |

## 14. Control de versiones

El proyecto se versiona con Git y se publica en GitHub. El cambio que incorpora las páginas de mejoras se registró con el mensaje:

> Agrega páginas de mejoras con React Router

## 15. Seguridad

- El archivo `.env` con las credenciales de MySQL está excluido del repositorio mediante `.gitignore`.
- El backend acepta datos en formato JSON. Actualmente no valida el contenido de nombre, teléfono ni correo; esa validación está pendiente de agregar en el servidor.
- Las consultas usan parámetros (`?`), lo que evita la inyección SQL.

## 16. Capturas de pantalla

| Figura | Descripción | Captura |
|---|---|---|
| 1 | Portada del proyecto | |
| 2 | Página de detalle de una mejora | |
| 3 | Gestión de usuarios | |
| 4 | Repositorio en GitHub con los archivos subidos | |

## 17. Limitaciones y mejoras futuras

- Las imágenes de las tarjetas son ilustraciones generadas para la evidencia; pueden reemplazarse por fotografías reales.
- La API no tiene autenticación; en un entorno real debería protegerse.
- Los textos de las áreas están en `shared/contenido.js`; un siguiente paso sería cargarlos desde la base de datos.
- La API no valida el contenido de los datos; la validación solo existe en la web y en la app móvil.
- La app móvil no tiene edición de usuarios.
- La dirección del backend en `movil/src/config.js` corresponde a la IP del computador de desarrollo y debe cambiarse en otro equipo.