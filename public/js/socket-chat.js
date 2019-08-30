var socket = io();

var params = window.location.search.split('?')[1]
if (!params) { window.location = 'index.html'; throw new Error('No se ha ingresado parametros') }
var datos = params.split('&')
let nombre = -1, sala = -1
$.each(datos, function (index, item) {
    if (item.indexOf('nombre') > -1) nombre = item.split('=')[1]
    if (item.indexOf('sala') > -1) sala =  item.split('=')[1]
})
if (nombre === -1 || sala === -1) {
    window.location = 'index.html'
    throw new Error('No ha ingresado los parametros requeridos')
}

var usuario = {
    nombre: nombre,
    sala:sala
}

// escuchar
socket.on('connect', function () {
    console.log('Conectado al servidor');

    socket.emit('entrarChat', usuario, function (resp) {
        console.log('Usuarios conectados:', resp)
    })

});

// escuchar
socket.on('disconnect', function () {
    console.log('Perdimos conexión con el servidor');
});


// Enviar información
socket.emit('enviarMensaje', {
    usuario: 'Fernando',
    mensaje: 'Hola Mundo'
}, function (resp) {
    console.log('respuesta server: ', resp);
});

// Escuchar información
socket.on('crearMensaje', function (mensaje) {

    console.log('Servidor:', mensaje);
});

//escuchar cuando un usuario entra o sale del chat
socket.on('listaPersonas', function (mensaje) {
    console.log(mensaje);
});

//Mensaje Provados
socket.on('mensajePrivado', function (mensaje) {
    console.log('Mensaje Privado: ', mensaje)
})