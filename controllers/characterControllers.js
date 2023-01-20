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
    // .populate('owner', '-password')
    .populate('owner', 'username')
    .populate('comments.author', '-password')
    // .then(pirates =>{res.json({pirates:pirates})})
    .then(characters =>{
        // res.json({ pirates: pirates})
        res.render('characters/index', {characters})
    })
    .catch(err => {
        console.log(err)
        res.status(404).json(err)
    })
})

//INDEX
router.get("/mine", (req, res)=>{
    Character.find({owner: req.session.userId})
        // .populate('owner', '-password')
    .populate('owner', 'username')
    .populate('comments.author', '-password')
        .then(pirate =>{
            res.status(200).json({pirate: pirate})})
        .catch(err => {
            console.log(err)
            res.status(400).json(err)
        })
})


//POST
router.post('/', (req, res)=>{
    req.body.owner = req.session.userId
    const newPirate = req.body
    Character.create(newPirate)
        .then(pirate=>{
            res.status(201).json({pirate:pirate.toObject()})
        })
        .catch(err => {
            console.log(err)
            res.status(404).json(err)
        })
})


//UPDATE
router.put("/:id", (req, res)=>{
    const id = req.params.id
    // const updPirate = req.body
    // Character.findByIdAndUpdate(id, updPirate, {new:true})
    Character.findById(id)
    .then(pirate=>{
        if(pirate.owner == req.session.userId){
        res.sendStatus(204)
        return pirate.updateOne(req.body)
        }else{
        res.sendStatus(401)
    }
})
    .catch(err=> {
        console.log(err)
        res.sendStatus(400).json(err)
    })
})

//DELETE
router.delete("/:id", (req, res)=>{
    const id = req.params.id
    Character.findById(id)
    .then(pirate=>{
        if(pirate.owner == req.session.userId){
        res.sendStatus(204)
        return pirate.deleteOne()
        }else{
        res.sendStatus(401)
    }
})
    .catch(err=> {
        console.log(err)
        res.sendStatus(400).json(err)
    })
})

//SHOW
router.get("/:id", (req, res)=>{
const id = req.params.id
Character.findById(id)
.populate('comments.author', 'username')
.then(pirate =>{
    res.json({pirate:pirate})
})
.catch(err=> {
    console.log(err)
    res.status(404).json(err)
})
})
//4. Export Router
module.exports = router

