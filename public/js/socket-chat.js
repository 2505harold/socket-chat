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
    nombre,
    sala
}


socket.on('connect', function() {
    //console.log('Conectado al servidor');

    socket.emit('entrarChat', usuario, function(resp) {
        console.log('Usuarios conectados', resp);
        renderizarUsuarios(resp)
    });

});

// escuchar
socket.on('disconnect', function() {

    console.log('Perdimos conexión con el servidor');

});


// Escuchar información
socket.on('crearMensaje', function(mensaje) {
    //console.log('Servidor:', mensaje);
    renderizarMensajes(mensaje,false)
    scrollBottom()
});

// Escuchar cambios de usuarios
// cuando un usuario entra o sale del chat
socket.on('listaPersonas', function(personas) {
    //console.log(personas);
    renderizarUsuarios(personas)
});

// Mensajes privados
socket.on('mensajePrivado', function(mensaje) {

    console.log('Mensaje Privado:', mensaje);

});