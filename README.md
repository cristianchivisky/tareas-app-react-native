# Tareas App

Esta aplicación móvil desarrollada en React Native permite gestionar materias y sus respectivas tareas. El usuario puede agregar, editar y eliminar tanto materias como tareas, todo con almacenamiento local usando `AsyncStorage`.

## Características

- **Gestión de Materias**: Agregar, editar y eliminar materias.
- **Gestión de Tareas**: Agregar, editar y eliminar tareas asociadas a materias específicas.
- **Interfaz Intuitiva**: Diseño fácil de usar con modales para agregar/editar contenido.
- **Persistencia de Datos**: Utiliza `AsyncStorage` para almacenar localmente las materias y tareas.

## Tecnologías Utilizadas

- React Native
- AsyncStorage para almacenamiento local

## Instalación

1. Clona este repositorio:
   ```bash
   git clone https://github.com/cristianchivisky/tareas-app-react-native.git
   ```

2. Navega al directorio del proyecto:
   ```bash
   cd tareas-app-react-native
   ```

3. Instala las dependencias:
   ```bash
   npm install
   ```

4. Ejecuta la aplicación:
   ```bash
   npm run start
   ```

## Estructura del Proyecto

- `/app`: Contiene las pantallas principales de la aplicación.
  - `HomeScreen.js`: Pantalla principal que muestra las materias y tareas.
- `/components`: Contiene componentes reutilizables.
  - `SubjectForm.js`: Formulario para agregar/editar materias.
  - `TaskForm.js`: Formulario para agregar/editar tareas.
- `/data`: Contiene servicios para la gestión de datos.
  - `AsyncStorageService.js`: Maneja las operaciones de almacenamiento local.

## Uso

1. Al abrir la aplicación, verás una lista de materias.
2. Toca en "Agregar Materia" para crear una nueva materia.
3. Toca en una materia para ver sus tareas asociadas.
4. Dentro de una materia, puedes agregar, editar o eliminar tareas.
5. Utiliza los iconos de lápiz y papelera para editar o eliminar materias y tareas.

## Contribuciones

¡Las contribuciones son bienvenidas! Si deseas colaborar, sigue estos pasos:

1. Haz un fork de este repositorio.
2. Crea una nueva rama: `git checkout -b feature/nueva-funcionalidad`
3. Haz commit de tus cambios: `git commit -m 'Agrega nueva funcionalidad'`
4. Haz push a la rama: `git push origin feature/nueva-funcionalidad`
5. Crea un nuevo Pull Request.

## Licencia

Este proyecto está bajo la Licencia MIT. Consulta el archivo LICENSE para más detalles.