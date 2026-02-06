//Se importan la librería Express que se instalo previamente
const express = require('express');

//Se crea una instancia de la app Express
const app = express();

//Se configura la API para que pueda entender los datos en formato JSON
app.use(express.json());

//Se simula una base de datos donde se guarda el usuario para la evidendia
const usuario = [
    {usuario: "admin", password: "123" }
];

//Servicio de Inicio de sesión
app.post('/api/login', (req, res) => {
    //Se toma el usuario y contraseña que envia el cliente
    const { usuario, password } = req.body;

    //Se busca si existe ya el usuario en la lista
    const usuarioEncontrado = usuario.find(u => u.usuario === usuario && u.password === password);

    if (usuarioEncontrado) {
        //si se encuentra el usuario, se envia mensaje de exito
        res.status(200).json({ mensaje: "¡Bienvenido! Usuario encontrado con éxito"});
    } else {
        //cuando no coincide se envia mensjae de error
        res.status(401).json({ mensaje: "Error en la autenticación: Usuario o contraseña incorrectos" })
    }
});

//Aqui es el servicio de registro el usuario
app.post('/api/registro', (req, res) => {
    //aqui recibimos el nuevo susuario y contraseña del cliente
    const { uauario, password } = req.body;

    //aqui se crea el nuevo usuario
    const nuevoUsuario = { usuario, password };

    //aqio se agrega ese usuario nuevo a nuestr lista 
    usuario.push(nuevoUsuario);

    //Se envia la respuesta con el mensaje de exito
    res.status(201).json({
        mensaje: "El usuario fue registrado con éxito",
        usuarioRegistrado: usuario
    });
});

//Se define el puerto donde correrá el servidor
const PORT = 3000;

//Se le dice a la aplicación que este atenta a ese puerto
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});