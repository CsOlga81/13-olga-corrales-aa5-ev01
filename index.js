//Se importan la librería Express que se instalo previamente
const express = require('express');

//Se crea una instancia de la app Express
const app = express();

//El metodo get le dice al servidor. app es la representacion que gesntiona las rutas y la connfiguración de mi servicio web
app.get('/', (req, res) => {
    res.send('¡Servidor funcionando correctamente!');
});

//Se configura la API para que pueda entender los datos en formato JSON
app.use(express.json());

//Se simula una base de datos donde se guarda el usuario para la evidendia
const listaUsuario = [
    {usuario: "admin", password: "123", correo: "admin@sistem.com" }
];

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

//Servicio de Inicio de sesión
app.post('/login', (req, res) => {
    //Se toma el usuario y contraseña que envia el cliente
    const { usuario, password } = req.body;

    const usuarioEncontrado = listaUsuario.find(u => u.usuario === usuario && u.password === password);

    if (usuarioEncontrado) {
        //si se encuentra el usuario, se envia mensaje de exito
        res.status(200).json({ 
            mensaje: "¡Bienvenido! Usuario encontrado con éxito", 
            estado: 'success'
        });
    } else {
        //cuando no coincide se envia mensjae de error
        res.status(401).json({ 
            mensaje: "Error en la autenticación: Usuario o contraseña incorrectos", 
            estado: 'error'
        });
    }
});

//Con el método put se actualiza la contraseña o correo de usuario existente
app.put('/actualizar-perfil', (req, res) => {

    //Se recibe el usuario para saber a quien buscar
    const { usuario, nuevoPassword, nuevoCorreo } = req.body;

    const indice = listaUsuario.findIndex(u => u.usuario === usuario);

    if (indice !== -1) {
        //Actualizamos los datos en la lista
        if (nuevoPassword) listaUsuario[indice].password = nuevoPassword;
        if (nuevoCorreo) listaUsuario[indice].correo = nuevoCorreo;

        console.log("Datos actualizados en el servidor: ", listaUsuario[indice]);

        res.status(200).json({
            mensaje: " ¡Actualizado con éxito!",
            usuarioActualizado: listaUsuario[indice] //Este debe mostrar los datos actualizados
        });
    } else {
        
        res.status(404).json({
            mensaje: "Error al tratar de actualizar.",
            buscando: "usuario"
        });
    }
});

//El método delete es para eliminar un usuario del sistema
app.delete('/eliminar-usuario', (req, res) => {
    const { usuario } = req.body;

    //Se busca la opcion del usuario en la lista
    const indice = listaUsuario.findIndex(u => u.usuario === usuario);

    if (indice !== -1) {
        //si existe , lo borramos de la lista
        listaUsuario.splice(indice, 1);
        res.status(200).json({
            mensaje: `El usuario ${usuario} se ha eliminado`
        });
    } else{
        //si no se encuentra el usuario se envia error
        res.status(404).json({
            mensaje: "Error, no se pudo eliminar",
            error: "No se encontró el usuario ingresado"
        });
    }
});

//Se define el puerto donde correrá el servidor
const PORT = 3000;


//Se le dice a la aplicación que este atenta a ese puerto
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});