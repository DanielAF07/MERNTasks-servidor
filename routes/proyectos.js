// Routes de proyectos
const express = require('express')
const router = express.Router()
const { check } = require('express-validator')
const proyectoController = require('../controllers/proyectoController')
const auth = require('../middleware/auth')

// Crea proyectos
// api/proyectos
router.post('/',
    auth,
    [
        check('nombre', 'El nombre del proyecto es obligatorio').not().isEmpty()
    ],
    proyectoController.crearProyecto
)

// Obtener Proyectos
router.get('/',
    auth,
    proyectoController.obtenerProyectos
)

// Actualizar proyecto con ID
router.put('/:id', 
    auth,
    [
        check('nombre', 'El nombre del proyecto es obligatorio').not().isEmpty()
    ],
    proyectoController.actualizarProyecto
)

// Eliminar un proyecto con ID
router.delete('/:id', 
    auth,
    proyectoController.eliminarProyecto
)
module.exports = router