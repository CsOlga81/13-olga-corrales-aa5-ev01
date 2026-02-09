# MI PRIMER SERVICIO WEB CON API

## Descripción del proyecto
este proyecto cumple con la evidencia de crear un sistema de **Registro** y **Login** usando Node.js.

## ¿Comó probarlo?
Para probar este servicio, usamos una herramienta llamada **Thunder Cliente**.

### 1. Registro de Usuario
- Use el método **POST** para el registro de usuario por lo que son datos que deben viajar seguros al servidor
- La dirección: `http://Localhost:3000/registro`
- Se envia un JSON con usuario, password y correo.

### 2. Inicio de Sesión (Login)
- Usé el método **POST**
- Dirección: `http://localhost:3000/Login`
- Se envia con el usuario y la contraña para validar.

### 3. Actualización y eliminación de usuario
- Use el método **PUT** para la actualizacion de datos y
- Use el médoto **DELETE** para eliminar usuario
- La dirección del PUT: `http://localhost:3000/actualizar-perfil`
- La dirección del DELETE: `http://localhost:3000/eliminar-usuario`
- Se ingresa le usuario para actualizar y para eliminar
