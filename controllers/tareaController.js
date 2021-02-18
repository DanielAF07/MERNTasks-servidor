const Tarea = require('../models/Tarea')
const { validationResult } = require('express-validator')
const Proyecto = require('../models/Proyecto')

// CREAR TAREA
exports.crearTarea = async (req, res) => {

    // Revisar errores
    const errores = validationResult(req)
    if(!errores.isEmpty()) {
        return res.status(400).json({errores: errores.array()})
    }

    try {
        // Crear nuevo proyecto
        const tarea = new Tarea(req.body)
        // Guardar creador via JWT
        tarea.creador = req.usuario.id
        //Se guarda el proyecto
        tarea.save()
        res.status(201).json(tarea)
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error')
    }
}

// Obtener tareas
exports.obtenerTareas = async (req, res) => {
    // Comprobar que se cumple con el body
    const errores = validationResult(req)
    if(!errores.isEmpty()) {
        return res.status(400).json({errores: errores.array()})
    }
    
    try {
        // Comprobar si el proyecto es valido
        const proyecto = await Proyecto.find({
            creador: req.usuario.id,
            _id: req.params.id
        })
        if(!proyecto){
            return res.status(404).json({msg: `No se ha encontrado un proyecto con el ID ${req.body.proyectoId}`})
        }
        const tareas = await Tarea.find({
            creador: req.usuario.id, 
            proyectoId: req.params.id
        })
        return res.status(200).json({tareas})
    } catch (error) {
        console.log(error);
        res.status(500).send("Hubo un error")
    }
}

// Eliminar tarea
exports.eliminarTarea = async (req, res) => {
    try {
        const tarea = await Tarea.findOneAndRemove({
            creador: req.usuario.id,
            _id: req.params.id
        })

        if(!tarea){
            return res.status(404).json({msg: 'Tarea no encontrada'})
        }

        return res.status(200).json({msg: 'Tarea Eliminada correctamente'})

    } catch (error) {
        console.log(error);
        res.status(500).send("Hubo un error")
    }
    

}

// Editar tarea
exports.editarTarea = async (req, res) => {
    try {
        const keys = Object.keys(req.body)
        if(keys.includes('estado') || keys.includes('nombre')){
            const tarea = await Tarea.findOneAndUpdate({
                creador: req.usuario.id,
                _id: req.params.id
            }, { $set: req.body } )
            if(!tarea){
                return res.status(404).json({msg: 'Tarea no encontrada'})
            }
            return res.status(200).json({msg: 'Tarea editada con exito'})
        }
        
    } catch (error) {
        console.log(error);
        res.status(500).send("Hubo un error")
    }
}