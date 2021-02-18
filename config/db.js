const mongoose = require('mongoose')
require('dotenv').config({path: 'variables.env'})

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_MONGO, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        })
        console.log("Conectado a DB")
    } catch (error){
        console.log(error)
        process.exit(1) // Detener la app
    }
}

module.exports = connectDB