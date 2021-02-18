const Usuario = require('../models/Usuario')
const bcryptjs = require('bcryptjs')
const { validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')


exports.crearUsuario = async (req, res) => {

    //Revisar si hay errores
    const errores = validationResult(req)
    if( !errores.isEmpty() ){
        return res.status(400).json({errors: errores.array()})
    }

    //Destrc email y password
    const { email, password } = req.body

    try {
        let usuario = await Usuario.findOne( { email } )
        // Comprobación de email existente
        if(usuario) {
            return res.status(400).json({msg: 'Email ya registrado'})
        }

        usuario = new Usuario(req.body)
        // Hashear el password
        const salt = await bcryptjs.genSalt(10)
        usuario.password = await bcryptjs.hash(password, salt)

        // Guardar usuario en DB
        await usuario.save()

        //Crear y firmar el jwt
        const payload = {
            usuario: {
                id: usuario.id,
            }
        }

        //Firmar JWT
        jwt.sign(payload, process.env.SECRET, {
            expiresIn: 3600,
        }, (error, token) => {
            if(error) throw error
            res.status(200).json({token})
        })
        
        
    } catch (error) {
        console.log("ERROR");
        res.status(401).json({ msg:"Hubo un error"} )
    }
}