// Routes para autenticar usuario
const express = require('express')
const router = express.Router()
const { check } = require('express-validator')
const authController = require('../controllers/authController')
const auth = require('../middleware/auth')

router.post('/', authController.autenticarUsuario)

//Obtener datos de la cuenta
router.get('/',
    auth,
    authController.obtenerUsuario
)

module.exports = router