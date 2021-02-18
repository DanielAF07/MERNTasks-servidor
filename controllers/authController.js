const Usuario = require('../models/Usuario')
const bcryptjs = require('bcryptjs')
const { validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')

exports.autenticarUsuario = async (req, res) => {
    
    const errores = validationResult(req)
    console.log(errores);
    if( !errores.isEmpty() ){
        return res.status(400).json({errors: errores.array()})
    }

    // Extraer Email y password
    const { email, password } = req.body
    try {
        // Revisar si está registrado
        let usuario = await Usuario.findOne({ email })
        if(!usuario){
            return res.status(400).json({msg: 'El usuario no existe'})
        }

        // Revisar password
        const passCorrecto = await bcryptjs.compare(password, usuario.password)
        if(!passCorrecto){
            return res.status(400).json({msg: 'Password Incorrecto'})
        }
        // Todo correcto
        //Crear y firmar el jwt
        const payload = {
            usuario: {
                id: usuario.id,
            }
        }

        //Firmar JWT
        jwt.sign(payload, process.env.SECRET, {
            expiresIn: 3600000,
        }, (error, token) => {
            if(error) throw error
            res.json({ token })
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({msg: 'Hubo un error'})
    }
}

exports.obtenerUsuario = async (req, res) => {
    try {
        const usuario = await Usuario.findById(req.usuario.id).select('-password')
        if(!usuario){
            res.status(404).json({msg: "Usuario no encontrado"})
        }
        res.json({usuario})
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: 'Hubo un error'})
    }
}