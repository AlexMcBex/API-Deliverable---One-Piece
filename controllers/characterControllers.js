//1. import dependencies
    //Express and the model
const express = require('express')
const Character = require('../models/character')

//2. Create Router
const router = express.Router()

//3. Routes

    //SEED
    router.get('/seed', (req, res) => {
        const startCrew = [
            { name: "Monkey D Rufy", affiliation: "Straw Hat Pirates", rank: "Captain", devilFruit: true, reward: 3000000000,},
            { name: "Roronoa Zoro", affiliation: "Straw Hat Pirates", rank: "Vice-Captain", devilFruit: false, reward: 1111000000,},
            { name: "Nami", affiliation: "Straw Hat Pirates", rank: "Navigator", devilFruit: false, reward: 366000000,},
            { name: "Usopp", affiliation: "Straw Hat Pirates", rank: "Sniper", devilFruit: false, reward: 500000000,},
            { name: "Sanji", affiliation: "Straw Hat Pirates", rank: "Cook", devilFruit: false, reward: 1032000000,},
            { name: "Chopper", affiliation: "Straw Hat Pirates", rank: "Doctor", devilFruit: true, reward: 1000,},
            { name: "Nico Robin", affiliation: "Straw Hat Pirates", rank: "Scholar", devilFruit: true, reward: 930000000,},
            { name: "Franky", affiliation: "Straw Hat Pirates", rank: "Shipwright", devilFruit: false, reward: 394000000,},
            { name: "Brook", affiliation: "Straw Hat Pirates", rank: "Musician", devilFruit: true, reward: 383000000,},
        ]
        Character.deleteMany({})
        .then(() => {
            Character.create(startCrew)
                .then(data => {
                    res.json(data)
                })
                .catch(err => console.log('The following error occurred: \n', err))
        })
})

    //CRUD Routes
        //INDEX
router.get("/", (req, res)=>{
    Character.find({})
        .then(pirate =>{res.json({pirate:pirate})})
        .catch(err => console.log('The following error occurred: \n', err))
})

        //SHOW
router.get("/:id", (req, res)=>{
    const id = req.params.id
    Character.findById(id)
        .then(pirate =>{
            res.json({pirate:pirate})
        })
        .catch(err=> console.log(err))
})

        //POST
router.post('', (req, res)=>{
    const newPirate = req.body
    Character.create(newPirate)
        .then(pirate=>{
            res.status(201).json({pirate:pirate.toObject()})
        })
        .catch(err => console.log(err))
})

        //PATCH
router.put("/:id", (req, res)=>{
    const id = req.params.id
    const updPirate = req.body
    Character.findByIdAndUpdate(id, updPirate, {new:true})
    .then(pirate=>{
        console.log("Updated a pirate: ", pirate)
        res.sendStatus(204)
    })
    .catch(err=> console.log(err))
})
        //DELETE
router.delete('/:id', (req, res)=>{
    const id = req.params.id
    Character.findByIdAndRemove(id)
    .then(()=>{
        res.sendStatus(204)
    })
    .catch(err=>console.log(err))
})

//4. Export Router
module.exports = router

