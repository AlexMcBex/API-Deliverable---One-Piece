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
    const{ username, loggedIn, userId} = req.session
Character.find({})
    // .populate('owner', '-password')
    .populate('owner', 'username')
    .populate('comments.author', '-password')
    // .then(pirates =>{res.json({pirates:pirates})})
    .then(characters =>{
        // res.json({ pirates: pirates})
        res.render('characters/index', {characters , username, loggedIn, userId })
    })
    .catch(err => {
        console.log(err)
        res.status(404).json(err)
    })
})

//INDEX -- MINE
router.get("/mine", (req, res)=>{
    Character.find({owner: req.session.userId})
        // .populate('owner', '-password')
    .populate('owner', 'username')
    .populate('comments.author', '-password')
        .then(characters =>{
            // res.status(200).json({character: characters})
            res.render('characters/index', {characters, ...req.session})
        })
        .catch(err => {
            console.log(err)
            res.status(400).json(err)
        })
})


//GET - Form to create a new char
router.get('/new', (req, res)=>{
    res.render('characters/new' , { ...req.session })
})

//POST - CREATE
router.post('/', (req, res)=>{
    req.body.owner = req.session.userId
    //checkboxes
    req.body.pirate = req.body.pirate === 'on' ? true : false
    req.body.devilFruit = req.body.devilFruit === 'on' ? true : false
    req.body.alive = req.body.alive === 'on' ? true : false
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

//GET -> INDEX Mine JSON
router.get('/json', (req, res)=>{
    Character.find({ owner: req.session.userId})
        .populate('owner', 'username')
        .populate('comments.author', '-password')
        .then(characters =>{
            res.status(200),json({characters: characters})
        })
        .catch(err =>{
            console.log(err)
            res.status(400).json(err)
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
.then(character =>{
    // res.json({pirate:character})
    res.render('characters/show.liquid', {character, ...req.session})

})
.catch(err=> {
    console.log(err)
    res.status(404).json(err)
})
})
//4. Export Router
module.exports = router

