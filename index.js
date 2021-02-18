const express = require('express')
const connectDB = require('./config/db')
const cors = require('cors')

const app = express()

//Conectar a DB
connectDB()

// Habilitar CORS
app.use(cors())

//Habilitar express.json
app.use(express.json({ extended: true }))

// Puerto de la App
const PORT = process.env.PORT || 4000

//Importar rutas
app.use('/api/usuarios', require('./routes/usuarios'))
app.use('/api/auth', require('./routes/auth'))
app.use('/api/proyectos', require('./routes/proyectos'))
app.use('/api/tareas', require('./routes/tareas'))

//Definir pagina principal
app.get('/', (req, res) => {
    res.send('Hola mundo')
})

// Correr App
app.listen(PORT, () => {
    console.log(`El servidor está funcionando en el puerto ${PORT}`)
})