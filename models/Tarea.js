const mongoose = require('mongoose')

const TareaSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    estado: {
        type: Boolean,
        default: false
    },
    creador: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true,
        immutable: true,
    },
    proyectoId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Proyecto',
        required: true,
        immutable: true,
    },
    creado: {
        type: Date,
        default: Date.now(),
        immutable: true,
    },

})

module.exports = mongoose.model('Tarea', TareaSchema)