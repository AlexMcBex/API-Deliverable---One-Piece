//1. IMPORT DEPENDENCIES
//express, mongoose, morgan, dotenv, path
const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const path = require('path')
require('dotenv').config()

//2. IMPORT MODELS
const Mugiwara = require('./models/mugiwara')

//3. DATABASE CONNECTION
    //connect .env DATABASE_URL and config
const DATABASE_URL = process.env.DATABASE_URL
const CONFIG = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}
    //connect it to mongoose
    //mongoose.connect(Url, config)
mongoose.connect(DATABASE_URL, CONFIG)
    //mongoose events
    //.on open, close, error ()=> console.log
mongoose.connection
    .on('open', () => console.log('Connected to Mongoose'))
    .on('close', () => console.log('Disconnected to Mongoose'))
    .on('error', (err) => console.log('An error occurred: \n', err))

//4. EXPRESS  APP OBJECT
    //store express() in app variable
const app = express()

//5. MIDDLEWARE
    //app.use morgan
app.use(morgan('thin'))
app.use(express.urlencoded({extended:true}))
app.use(express.static('public'))
app.use(express.json())

//6. DEFINE ROUTES
    //Home Route
app.get("/", (req, res)=>{
    res.send('<h1>HOME PAGE</h1>')
})
    //CRUD Routes

//7. SERVER LISTENER
    //const PORT, app.listen
const PORT = process.env.PORT
app.listen(PORT, ()=> console.log(`SERVER RUNNING, PORT ${PORT}\nCTRL + C  -> CLOSE SERVER`)
)