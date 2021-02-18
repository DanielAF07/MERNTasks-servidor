const Proyecto = require('../models/Proyecto')
const Tarea = require('../models/Tarea')

const { validationResult } = require('express-validator')

exports.crearProyecto = async (req, res) => {

    // Revisar errores
    const errores = validationResult(req)
    if(!errores.isEmpty()) {
        return res.status(400).json({errores: errores.array()})
    }

    try {
        // Crear nuevo proyecto
        const proyecto = new Proyecto(req.body)
        // Guardar creador via JWT
        proyecto.creador = req.usuario.id
        //Se guarda el proyecto
        proyecto.save()
        res.status(201).json(proyecto)
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error')
    }
}

//Retornar todos los proyectos del usuario
exports.obtenerProyectos = async (req, res) => {
    try {
        const proyectos = await Proyecto.find({ creador: req.usuario.id }).sort({ creado: -1 })
        res.json({ proyectos })
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error')
    }
}

exports.actualizarProyecto = async (req, res) => {
    // Revisar errores
    const errores = validationResult(req)
    if(!errores.isEmpty()) {
        return res.status(400).json({errores: errores.array()})
    }

    // Extraer info
    const { nombre } = req.body
    const nuevoProyecto = {}

    if(nombre) {
        nuevoProyecto.nombre = nombre
    }

    try {

        // El proyectoe existe?
        let proyecto = await Proyecto.findOne({
            creador: req.usuario.id,
            _id: req.params.id
        })

        // Verificar el creador
        if(!proyecto){
            return res.status(404).json({ msg: 'Proyecto no encontrado'})
        }
        // actualizar
        proyecto = await Proyecto.findOneAndUpdate({
            creador: req.usuario.id,
            _id: req.params.id
        }, {$set: nuevoProyecto}, {new: true})
        return res.status(200).json({proyecto})
    } catch (error) {
        console.log(error);
        res.status(500).send('Error en el servidor')
    }
}

// Eliminar un proyecto
exports.eliminarProyecto = async (req, res) => {
    try {
        // El proyectoe existe?
        let proyecto = await Proyecto.findOne({
            creador: req.usuario.id,
            _id: req.params.id
        })

        if(!proyecto){
            return res.status(404).json({ msg: 'Proyecto no encontrado'})
        }

        // Eliminar el proyecto
        await Proyecto.findOneAndRemove({
            creador: req.usuario.id,
            _id: req.params.id
        })

        await Tarea.deleteMany({proyectoId: req.params.id})

        res.status(200).json({msg: "Proyecto y tareas eliminado"})


    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error')
    }
}