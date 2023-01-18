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
app.use(morgan('tiny'))
app.use(express.urlencoded({extended:true}))
app.use(express.static('public'))
app.use(express.json())

//6. DEFINE ROUTES
    //Home Route
app.get("/", (req, res)=>{
    res.send('<h1>HOME PAGE</h1>')
})
    //SEED
    app.get('/mugiwara/seed', (req, res) => {
        const startCrew = [
            { name: "Monkey D Rufy", rank: "Captain", devilFruit: true, reward: 3000000000,},
            { name: "Roronoa Zoro", rank: "Vice-Captain", devilFruit: false, reward: 1111000000,},
            { name: "Nami", rank: "Navigator", devilFruit: false, reward: 366000000,},
            { name: "Usopp", rank: "Sniper", devilFruit: false, reward: 500000000,},
            { name: "Sanji", rank: "Cook", devilFruit: false, reward: 1032000000,},
            { name: "Chopper", rank: "Doctor", devilFruit: true, reward: 1000,},
            { name: "Nico Robin", rank: "Scholar", devilFruit: true, reward: 930000000,},
            { name: "Franky", rank: "Shipwright", devilFruit: false, reward: 394000000,},
            { name: "Brook", rank: "Musician", devilFruit: true, reward: 383000000,},
        ]
        Mugiwara.deleteMany({})
        .then(() => {
            Mugiwara.create(startCrew)
                .then(data => {
                    res.json(data)
                })
                .catch(err => console.log('The following error occurred: \n', err))
        })
})

    //CRUD Routes
        //INDEX
app.get("/mugiwara", (req, res)=>{
    Mugiwara.find({})
        .then(pirate =>{res.json({pirate:pirate})})
        .catch(err => console.log('The following error occurred: \n', err))
})

        //SHOW
app.get("/mugiwara/:id", (req, res)=>{
    const id = req.params.id
    Mugiwara.findById(id)
        .then(pirate =>{
            res.json({pirate:pirate})
        })
        .catch(err=> console.log(err))
})

        //POST
app.post('/mugiwara', (req, res)=>{
    const newPirate = req.body
    Mugiwara.create(newPirate)
        .then(pirate=>{
            res.status(201).json({pirate:pirate.toObject()})
        })
        .catch(err => console.log(err))
})

        //PATCH
app.put("/mugiwara/:id", (req, res)=>{
    const id = req.params.id
    const updPirate = req.body
    Mugiwara.findByIdAndUpdate(id, updPirate, {new:true})
    .then(pirate=>{
        console.log("Updated a pirate: ", pirate)
        res.sendStatus(204)
    })
    .catch(err=> console.log(err))
})
        //DELETE
app.delete('/mugiwara/:id', (req, res)=>{
    const id = req.params.id
    Mugiwara.findByIdAndRemove(id)
    .then(()=>{
        res.sendStatus(204)
    })
    .catch(err=>console.log(err))
})

//7. SERVER LISTENER
    //const PORT, app.listen
const PORT = process.env.PORT
app.listen(PORT, ()=> console.log(`SERVER RUNNING, PORT ${PORT}\nCTRL + C  -> CLOSE SERVER`)
)