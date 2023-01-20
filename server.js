//1. IMPORT DEPENDENCIES
//express, mongoose, morgan, dotenv, path
const express = require('express')
// const mongoose = require('mongoose')
const morgan = require('morgan')
require('dotenv').config()
const path = require('path')

//Routes (Controllers)
const CharacterRouter = require('./controllers/characterControllers')
const UserRouter = require('./controllers/userControllers')
const commentRouter = require('./controllers/commentControllers')
const middleware = require('./utils/middleware')

//2. IMPORT MODELS
// const Character = require('./models/character')

// //3. DATABASE CONNECTION
//     //connect .env DATABASE_URL and config
// const DATABASE_URL = process.env.DATABASE_URL
// const CONFIG = {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// }
//     //connect it to mongoose
//     //mongoose.connect(Url, config)
// mongoose.connect(DATABASE_URL, CONFIG)
//     //mongoose events
//     //.on open, close, error ()=> console.log
// mongoose.connection
//     .on('open', () => console.log('Connected to Mongoose'))
//     .on('close', () => console.log('Disconnected to Mongoose'))
//     .on('error', (err) => console.log('An error occurred: \n', err))

//4. EXPRESS  APP OBJECT
    //store express() in app variable
// const app = express()
const app = require('liquid-express-views')(express())

//5. MIDDLEWARE
//app.use morgan
// app.use(morgan('tiny'))
// app.use(express.urlencoded({extended:true}))
// app.use(express.static('public'))
// app.use(express.json())
    //invoke middleware function
middleware(app)

//6. DEFINE ROUTES
    //Home Route
app.get("/", (req, res)=>{
    // res.send('<h1>HOME PAGE</h1>')
    res.render('home.liquid')
})


//connect External Routers
app.use('/onepiece', CharacterRouter) 
app.use('/users', UserRouter)
app.use('/comments', commentRouter)

//7. SERVER LISTENER
    //const PORT, app.listen
const PORT = process.env.PORT
app.listen(PORT, ()=> console.log(`SERVER RUNNING, PORT ${PORT}\nCTRL + C  -> CLOSE SERVER`)
)