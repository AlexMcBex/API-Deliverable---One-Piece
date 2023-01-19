//1. import dependencies
    //Express and the model
const express = require('express')
const Character = require('../models/character')

//2. Create Router
const router = express.Router()

//3. Routes


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

