# CHIP JCCP2000

## Sistema de gestión web

Proyecto desarrollado como evidencia de codificación de módulos de software para el programa de formación ADSO del SENA.

## Descripción

CHIP JCCP2000 es una aplicación web desarrollada para gestionar información de usuarios mediante una interfaz sencilla y organizada.

El proyecto implementa un módulo web que permite registrar usuarios, consultar la información almacenada y establecer comunicación entre la interfaz, un servidor backend y una base de datos MySQL.

## Tecnologías utilizadas

* **React** — desarrollo de la interfaz de usuario.
* **JavaScript** — lenguaje principal de programación.
* **Vite** — herramienta de desarrollo y construcción del proyecto.
* **Node.js** — entorno de ejecución para el backend.
* **Express** — framework utilizado para crear el servidor y las API.
* **MySQL** — sistema de gestión de base de datos.
* **Git y GitHub** — control de versiones y almacenamiento del repositorio.

## Funcionalidades

### Registro de usuarios

Permite ingresar:

* Nombre.
* Correo electrónico.
* Teléfono.

Los datos son enviados desde React al backend mediante una petición HTTP `POST` y posteriormente almacenados en MySQL.

### Consulta de usuarios

Permite consultar los usuarios registrados mediante una petición `GET`.

La información se presenta en una tabla con:

* ID.
* Nombre.
* Correo.
* Teléfono.
* Fecha de registro.

## Arquitectura del proyecto

El sistema utiliza una arquitectura dividida en tres componentes principales:

```text
CHIP JCCP2000
│
├── Frontend
│   └── React + Vite
│
├── Backend
│   └── Node.js + Express
│
└── Base de datos
    └── MySQL
```

La comunicación se realiza mediante solicitudes HTTP entre el frontend y el backend.

## Estructura principal

```text
chip-jccp2000/
│
├── backend/
│   ├── db.js
│   ├── server.js
│   ├── package.json
│   └── package-lock.json
│
├── public/
│
├── src/
│   ├── assets/
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
│
├── .gitignore
├── index.html
├── package.json
├── package-lock.json
└── vite.config.js
```

## Base de datos

La aplicación utiliza una base de datos independiente denominada:

```text
JCCP2000
```

Tabla principal:

```text
usuarios
```

Campos:

```text
id_usuario
nombre
correo
telefono
fecha_registro
```

Las credenciales de conexión se almacenan mediante variables de entorno en un archivo `.env`, el cual se encuentra excluido del repositorio mediante `.gitignore`.

## API

### Registrar usuario

```text
POST /usuarios
```

Recibe los datos del usuario y los almacena en la base de datos.

### Consultar usuarios

```text
GET /usuarios
```

Devuelve los usuarios registrados en la base de datos.

## Ejecución del proyecto

### Frontend

Desde la carpeta principal:

```bash
npm install
npm run dev
```

La aplicación estará disponible mediante el servidor de desarrollo de Vite.

### Backend

Desde la carpeta `backend`:

```bash
npm install
node server.js
```

El backend utiliza el puerto:

```text
3000
```

## Control de versiones

El proyecto utiliza Git para realizar el control de versiones y GitHub como repositorio remoto.

Repositorio:

https://github.com/dfcsena2104/CHIP-JCCP2000

## Autor

Proyecto académico desarrollado para el programa de formación **Análisis y Desarrollo de Software (ADSO) — SENA**.
