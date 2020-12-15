const mongoose = require('mongoose');
const { Schema } = mongoose;

//EL _id Lo pone automático aunque no se escriba dentro del 'Schema'
const Objeto = new Schema({    
    nombre: String,
    apellido: String,
    correo: String,
    unArray: []
});

module.exports = mongoose.model('Objeto', Objeto);