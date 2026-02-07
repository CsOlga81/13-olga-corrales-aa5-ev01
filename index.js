//Se importan la librería Express que se instalo previamente
const express = require('express');

//Se crea una instancia de la app Express
const app = express();

//El metodo get le dice al servidor 
app.get('/', (req, res) => {
    res.send('¡Servidor funcionando correctamente!');
});

//Se configura la API para que pueda entender los datos en formato JSON
app.use(express.json());

//Se simula una base de datos donde se guarda el usuario para la evidendia
const listaUsuario = [
    {usuario: "admin", password: "123", correo: "admin@sistem.com" }
];

//Servicio de Inicio de sesión
app.post('/login', (req, res) => {
    //Se toma el usuario y contraseña que envia el cliente
    const { usuario, password } = req.body;

    if (usuario === 'olga' && password === '12345') {
        //si se encuentra el usuario, se envia mensaje de exito
        res.status(200).json({ mensaje: "¡Bienvenido! Usuario encontrado con éxito", estado: 'success'});
    } else {
        //cuando no coincide se envia mensjae de error
        res.status(401).json({ mensaje: "Error en la autenticación: Usuario o contraseña incorrectos", estado: 'error' });
    }
});

//Aqui es el servicio de registro el usuario. Use POST para porteger el envío de contraseñas
app.post('/registro', (req, res) => {
    //aqui recibimos el nuevo susuario con contraseña y correo del cliente
    const { usuario, password, correo } = req.body;

    //Se valida que haya enviado los datos básicos
    if (usuario && password && correo) {
        const nuevoUsuario = { usuario, password, correo };

        listaUsuario.push(nuevoUsuario);

         //Se envia la respuesta con el mensaje de exito
        res.status(201).json({
            mensaje: "El usuario fue registrado con éxito",
            usuarioRegistrado: nuevoUsuario,
            nota: 'Datos recibidos correctamente'
        });
    }else {
        //si faltan datos, se envia error
        res.status(400).json({
            mensaje: "Error al intetar registrarte",
            error: 'Faltan campos obligatorios'
        });
    }
});

//Se define el puerto donde correrá el servidor
const PORT = 3000;


//Se le dice a la aplicación que este atenta a ese puerto
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});