const express = require('express')
const router = express.Router()
const { check } = require('express-validator')
const tareaController = require('../controllers/tareaController')
const auth = require('../middleware/auth')

// Crea tarea
// api/tareas
router.post('/',
    auth,
    [
        check('nombre', 'El nombre de la tarea es obligatorio').not().isEmpty(),
        check('proyectoId', 'El ID del proyecto es obligatorio').not().isEmpty()
    ],
    tareaController.crearTarea
)

// Obtener Tareas
router.get('/:id',
    auth,
    tareaController.obtenerTareas
)

// Eliminar una tarea con ID
router.delete('/:id',
    auth,
    tareaController.eliminarTarea
)

// Editar Tarea con ID
router.put('/:id', 
    auth,
    tareaController.editarTarea
)

module.exports = router