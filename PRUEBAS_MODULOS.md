# Pruebas de validaciones y funcionalidades de los módulos del software – CHIP JCCP2000

**Programa de formación:** Análisis y desarrollo de software (ADSO) – SENA
**Proyecto formativo:** Construcción de software integrador de tecnologías orientadas a servicios
**Resultado de aprendizaje:** 220501096-04 – Codificar el software de acuerdo con el diseño establecido
**Actividad de aprendizaje:** GA7-220501096-AA3 – Codificar los módulos del software stand-alone, web y móvil, de acuerdo con el diseño
**Evidencia de producto:** GA7-220501096-AA3-EV02 – Módulos de software stand-alone, web y móvil codificados y probados
**Autor:** [Nombre del aprendiz]
**Fecha de ejecución de las pruebas:** [dd/mm/aaaa]
**Repositorio:** https://github.com/dfcsena2104/CHIP-JCCP2000

---

## 1. Objetivo

Verificar que las funcionalidades de los módulos del software cumplen con los requerimientos del proyecto, comprobar que las validaciones rechazan los datos incorrectos y aceptan los correctos, y documentar los resultados obtenidos.

## 2. Alcance de las pruebas

| Módulo | Tipo | Incluido | Observación |
|---|---|---|---|
| Presentación del proyecto (portada, detalle, navegación) | Web | Sí | Componentes React y rutas |
| Gestión de usuarios (registro, consulta, edición, eliminación) | Web | Sí | Frontend y API |
| API REST de usuarios | Backend | Sí | Pruebas con PowerShell |
| Exportador de reportes de usuarios (`backend/stand-alone/exportar-usuarios.js`) | Stand-alone | Sí | Genera un CSV desde la base de datos |
| Aplicación móvil | Móvil | No | Ver sección 7 |

## 3. Ambiente de prueba

- **Equipo:** Windows con PowerShell.
- **Navegador:** Chrome o Edge, última versión.
- **Software:** Node.js LTS, MySQL 8.x con la base de datos `JCCP2000`.
- **Servicios activos:** backend en `http://localhost:3000` y frontend en `http://localhost:5173`.
- **Datos:** la tabla `usuarios` puede estar vacía al iniciar. Los casos de prueba usan los datos indicados en cada tabla.

## 4. Pruebas de validaciones del frontend (gestión de usuarios)

Estas pruebas se ejecutan en la sección **Registrar usuario** del menú. Las mismas reglas se aplican al editar.

| N.º | Campo | Dato de entrada | Resultado esperado | Resultado obtenido | Estado |
|---|---|---|---|---|---|
| V-01 | Nombre | `Ana María Gómez` | Registro aceptado | | |
| V-02 | Nombre | `Ana123` | Alerta: "El nombre solo puede contener letras y espacios." | | |
| V-03 | Nombre | `Ana_Gómez` | Alerta de nombre no válido | | |
| V-04 | Nombre | (vacío) | Alerta de nombre no válido | | |
| V-05 | Teléfono | `3001234567` | Registro aceptado | | |
| V-06 | Teléfono | `300-123-4567` | Alerta: "El teléfono solo puede contener números." | | |
| V-07 | Teléfono | `abc` | Alerta de teléfono no válido | | |
| V-08 | Teléfono | (vacío) | Alerta de teléfono no válido | | |
| V-09 | Correo | `ana@correo.com` | Registro aceptado | | |
| V-10 | Correo | `ana@correo` | Alerta: "Ingrese un correo electrónico válido." | Primera ejecución: se guardó el registro (fallido). Se corrigió la validación y se repitió la prueba: aparece la alerta y el registro no se guarda. | Aprobado |
| V-11 | Correo | `ana correo@x.com` | Alerta de correo no válido | | |
| V-12 | Correo | `ana.correo.com` | Alerta de correo no válido | | |
| V-13 | Todos | Datos válidos | Alerta "Usuario registrado correctamente" y campos vacíos | | |
| V-14 | Edición | Nombre con números (`Pedro2`) | Alerta de nombre no válido y el cambio no se guarda | | |
| V-15 | Edición | Campo correo borrado | Alerta de correo no válido | | |

**Nota sobre el correo:** el campo es de tipo `email`, por lo que el navegador puede mostrar su propio aviso antes de que se ejecute la validación de la aplicación. En ese caso, el resultado obtenido debe describir el aviso del navegador.

## 5. Pruebas de funcionalidades del frontend

| N.º | Caso | Pasos | Resultado esperado | Resultado obtenido | Estado |
|---|---|---|---|---|---|
| F-01 | Portada | Abrir `/` | Logo, resumen, cinco tarjetas y etapas | | |
| F-02 | Tarjetas | Revisar cada tarjeta | Imagen, título y descripción visibles | | |
| F-03 | Detalle | Clic en "Ver detalle" de cada tarjeta | Se abre la página correspondiente | | |
| F-04 | Ruta inexistente | Abrir `/mejoras/inexistente` | Título "Página no encontrada" | | |
| F-05 | Navegación | Clic en "Gestión de usuarios" y "Inicio" | Cambia la página sin recargar y marca la opción activa | | |
| F-06 | Consulta | Clic en "Cargar usuarios" | Tabla con los registros de la base de datos | | |
| F-07 | Eliminación | Clic en "Eliminar", confirmar | Alerta "Usuario eliminado correctamente" y el registro desaparece | | |
| F-08 | Cancelar eliminación | Clic en "Eliminar", responder "Cancelar" | No se elimina el registro | | |
| F-09 | Edición | Clic en "Editar", cambiar teléfono, guardar | Alerta "Usuario actualizado correctamente" y cambio visible en la tabla | | |
| F-10 | Cancelar edición | Clic en "Editar", luego "Cancelar" | El formulario de edición se cierra sin cambios | | |

## 6. Pruebas de la API REST

Estas pruebas se ejecutan en una terminal de PowerShell con el backend activo. Cada comando envía una petición y muestra la respuesta.

**Consulta de estado:**

```powershell
Invoke-RestMethod -Uri http://localhost:3000/
```

**Registro válido:**

```powershell
Invoke-RestMethod -Uri http://localhost:3000/usuarios -Method Post -ContentType "application/json" -Body '{"nombre":"Prueba API","correo":"api@correo.com","telefono":"3001234567"}'
```

**Consulta de usuarios:**

```powershell
Invoke-RestMethod -Uri http://localhost:3000/usuarios
```

**Actualización (reemplaza `1` por un ID existente):**

```powershell
Invoke-RestMethod -Uri http://localhost:3000/usuarios/1 -Method Put -ContentType "application/json" -Body '{"nombre":"Prueba Editada","correo":"editada@correo.com","telefono":"3009876543"}'
```

**Eliminación (reemplaza `1` por un ID existente):**

```powershell
Invoke-RestMethod -Uri http://localhost:3000/usuarios/1 -Method Delete
```

| N.º | Petición | Resultado esperado | Resultado obtenido | Estado |
|---|---|---|---|---|
| A-01 | GET `/` | Texto "Servidor CHIP JCCP2000 funcionando correctamente" | | |
| A-02 | POST `/usuarios` con datos válidos | Respuesta 201 con mensaje y `id` | | |
| A-03 | GET `/usuarios` | Respuesta 200 con arreglo de usuarios | | |
| A-04 | PUT `/usuarios/{id existente}` | Respuesta 200 con "Usuario actualizado correctamente" | | |
| A-05 | PUT `/usuarios/99999` | Respuesta 404 con "Usuario no encontrado" | | |
| A-06 | DELETE `/usuarios/{id existente}` | Respuesta 200 con "Usuario eliminado correctamente" | | |
| A-07 | DELETE `/usuarios/99999` | Respuesta 404 con "Usuario no encontrado" | | |
| A-08 | POST `/usuarios` sin campos (`{}`) | Respuesta 400 con "El nombre solo puede contener letras y espacios." | Código 400 con el mensaje esperado (después de agregar la validación en el servidor) | Aprobado |
| A-09 | Apagar MySQL y consultar GET `/usuarios` | Respuesta 500 con "Error al consultar usuarios" | | |

**Caso A-08:** antes de la corrección, el servidor respondía 500 y el mensaje no explicaba el problema. Después de agregar la validación en `server.js`, responde 400 con el motivo. Los resultados de ambas ejecuciones se describen en la sección 8.

## 7. Módulo móvil

La aplicación móvil está desarrollada con React Native y Expo, en la carpeta `movil/`. Usa el mismo contenido (`shared/contenido.js`) y las mismas reglas de validación (`shared/validaciones.js`) que la web, y se conecta a la misma API.

**Estado: completo.** Incluye la portada, el detalle de cada área y la gestión de usuarios (registro, consulta, edición y eliminación) con las mismas validaciones de la versión web.

| N.º | Caso | Resultado esperado | Resultado obtenido | Estado |
|---|---|---|---|---|
| MV-01 | Abrir la portada | Logo, resumen, cinco tarjetas y etapas | Se muestra correctamente en el celular | Aprobado |
| MV-02 | Abrir gestión de usuarios | Carga la lista desde MySQL | Muestra los registros de la base de datos | Aprobado |
| MV-03 | Registrar con correo `ana@correo` | Alerta "Ingrese un correo electrónico válido." | Aparece la alerta esperada y no se guarda | Aprobado |
| MV-04 | Registrar con nombre `Ana2` | Alerta "El nombre solo puede contener letras y espacios." | Aparece la alerta esperada | Aprobado |
| MV-05 | Registrar con datos válidos | Mensaje de éxito y el usuario aparece en la lista | Se guarda y aparece en la lista | Aprobado |
| MV-06 | Eliminar un usuario y confirmar | El usuario desaparece de la lista | Desaparece de la lista | Aprobado |
| MV-07 | Ver detalle de una mejora | Se abre la página con su lista numerada | Se abre con imagen, título, descripción y lista numerada | Aprobado |
| MV-08 | Volver al inicio desde el detalle | Regresa a la portada | Regresa a la portada con las cinco tarjetas | Aprobado |
| MV-09 | Editar un usuario | Cambios guardados y validaciones de edición aplicadas | Cambio guardado y validaciones aplicadas | Aprobado |

**Requisitos para ejecutar la aplicación:** el celular y el computador deben estar en la misma red Wi-Fi, el backend debe estar activo y el puerto 3000 debe estar permitido en el firewall de Windows (ver la sección 8). La dirección del backend está en `movil/src/config.js`.

## 8. Hallazgos durante las pruebas

Estos puntos deben registrarse como resultados de la revisión, no ocultarse:

- **Validación en el servidor (resuelto):** el backend ahora valida nombre, teléfono y correo antes de registrar o actualizar un usuario. Se probó con el caso A-08 y con un correo inválido enviado directamente a la API; ambos responden 400 con el mensaje correspondiente.
- **Mensaje de error de consulta:** al apagar la base de datos, la consulta devuelve un mensaje genérico. Esto es aceptable para el usuario, pero el detalle queda en la consola del servidor.
- **Aviso del navegador:** en los campos de correo, el navegador valida antes que la aplicación.

## 9. Pruebas del módulo stand-alone

Programa: `backend/stand-alone/exportar-usuarios.js`. Se ejecuta desde la carpeta `backend` con `node stand-alone/exportar-usuarios.js`.

| N.º | Caso | Resultado esperado | Resultado obtenido | Estado |
|---|---|---|---|---|
| SA-01 | Exportar con 4 usuarios registrados | Muestra 4 registros y un CSV con encabezado y 4 filas | Mostró "Registros exportados: 4". El CSV tiene el encabezado, 4 filas y las tildes se ven bien | Aprobado |
| SA-02 | Exportar con la tabla vacía | Muestra 0 registros y un CSV solo con el encabezado | Mostró "Registros exportados: 0". El CSV tiene solo el encabezado | Aprobado |
| SA-03 | Exportar con MySQL apagado | Mensaje de error y no se genera un reporte nuevo | "No fue posible generar el reporte: ECONNREFUSED" | Aprobado |

**Observación:** en la primera versión, el mensaje de error de SA-03 salía vacío. Se corrigió el programa para mostrar el código del error (`ECONNREFUSED`), y el caso se repitió con ese resultado.

## 10. Resumen de resultados

| Grupo | Casos | Aprobados | Fallidos | Observaciones |
|---|---|---|---|---|
| Validaciones frontend (sección 4) | 15 | 15 | 0 | V-10 fallido en la primera ejecución; corregido y aprobado en la repetición |
| Funcionalidades frontend (sección 5) | 10 | 10 | 0 | Portada, detalle, navegación y gestión de usuarios |
| API REST (sección 6) | 9 | 9 | 0 | Incluye la validación agregada al servidor (caso A-08) |
| Stand-alone del proyecto (sección 9) | 3 | 3 | 0 | Exportador de reportes de usuarios |
| Módulo móvil (sección 7) | 9 | 9 | 0 | Completo |

## 11. Cumplimiento de la lista de chequeo

| N.º | Indicador | Cómo se cumple | Estado |
|---|---|---|---|
| 1 | Las funcionalidades cumplen con los requerimientos del proyecto | Verificadas en las secciones 5 y 6 contra los requisitos del resumen ejecutivo | Cumplido |
| 2 | Realiza pruebas de validaciones y las documenta | Secciones 4 y 6, con casos, pasos y resultados | Cumplido |
| 3 | La aplicación funciona correctamente | 34 de 34 casos aprobados en la aplicación web y la API (secciones 4, 5 y 6) | Cumplido |
| 4 | Cumple con todos los requerimientos de la evidencia | Están probados la web, la API, el módulo stand-alone y el módulo móvil, incluida la edición de usuarios | Cumplido |

Las columnas de resultado y estado deben completarse después de ejecutar cada caso. Si un caso falla, regístralo como fallido con su observación, corrige el código y repite la prueba.