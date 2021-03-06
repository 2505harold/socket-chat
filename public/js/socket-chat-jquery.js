//refrencias de jquery
var divUsuarios = $('#divUsuarios')
var formEnviar = $('#formEnviar')
var textMensaje = $('#textMensaje')
var divChatbox = $('#divChatbox')

function renderizarUsuarios(personas) {
    console.log(personas)
    var html = '';
    html += '<li>'
    html += '<a href="javascript:void(0)" class="active"> Chat de <span> ' + sala + '</span></a>'
    html += '</li>'

    for (var i = 0; i < personas.length; i++) {
        html += '<li>'
        html += '<a data-id="' + personas[i].id + '" href="javascript:void(0)"><img src="assets/images/users/1.jpg" alt="user-img" class="img-circle"> <span>' + personas[i].nombre + '<small class="text-success">online</small></span></a>'
        html += '</li>'
    }

    divUsuarios.html(html)
}

function renderizarMensajes(mensaje, yo) {
    var html = ''
    var fecha = new Date(mensaje.fecha)
    var hora = fecha.getHours() + ':' + fecha.getMinutes();
    var adminClass = 'info'
    var divImagen = '<div class="chat-img"><img src="assets/images/users/1.jpg" alt="user" /></div>'
    if(mensaje.nombre ==='Administrador'){
        adminClass = 'danger'
        divImagen = ''
    }

    if (yo) {
        html += '<li class="reverse animated fadeIn">'
        html += '<div class="chat-content">'
        html += '<h5>' + mensaje.nombre + '</h5>'
        html += '<div class="box bg-light-inverse">' + mensaje.mensaje + '</div>'
        html += '</div>'
        html += '<div class="chat-img"><img src="assets/images/users/5.jpg" alt="user" />'
        html += '</div>'
        html += '<div class="chat-time">' + hora + '</div>'
        html += '</li>'
    }
    else {
        html += '<li class="animated fadeIn">'
        html += divImagen
        html += '<div class="chat-content">'
        html += '<h5>' + mensaje.nombre + '</h5>'
        html += '<div class="box bg-light-'+ adminClass +'">' + mensaje.mensaje + '</div>'
        html += '</div>'
        html += '<div class="chat-time">' + hora + '</div>'
        html += '</li>'
    }
    divChatbox.append(html)
}


function scrollBottom() {

    // selectors
    var newMessage = divChatbox.children('li:last-child');

    // heights
    var clientHeight = divChatbox.prop('clientHeight');
    var scrollTop = divChatbox.prop('scrollTop');
    var scrollHeight = divChatbox.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight() || 0;

    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        divChatbox.scrollTop(scrollHeight);
    }
}

//listener
divUsuarios.on('click', 'a', function () {
    var id = $(this).data('id')
    if (id) {
        console.log(id)
    }

})

formEnviar.on('submit', function (e) {
    e.preventDefault()
    if (textMensaje.val().trim() != 0) {
        socket.emit('crearMensaje', {
            nombre: nombre,
            mensaje: textMensaje.val()
        }, function (resp) {
            renderizarMensajes(resp,true)
            textMensaje.val('').focus()
            scrollBottom()
        });
    }
})