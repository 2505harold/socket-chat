


//CREAMOS NUESTRA CLASE USUARIOS
//gestiona todos los usuarios conectados
class Usuarios {

    constructor() {
        this.personas = []
    }


    //metodos
    agregarPersona(id, nombre, sala) {
        let persona = { id, nombre, sala }
        this.personas.push(persona)
        return this.personas;
    }

    getPersona(id) {
        let persona = this.personas.filter(item => {
            return item.id === id
        })[0];
        // si no encuentro una persona con ese id
        //se devolvera "UNDEFINED"
        return persona
    }

    getPersonas() {
        return this.personas
    }

    getPersonasPorSala(sala) {
        let personasEnSala = this.personas.filter(item => {
            return item.sala === sala
        })
        //si no encuentra devuelve vacio
        return personasEnSala
    }

    borrarPersona(id) {

        let personaBorrada = this.getPersona(id)

        //sacar la perona del chat en caso se salga
        this.personas = this.personas.filter(item => {
            //tregrese todas las persona 
            //cuya persona.id sea diferente 
            //al id que me estan enviado
            return item.id != id
        })

        return personaBorrada
    }
}

module.exports = {
    Usuarios
}