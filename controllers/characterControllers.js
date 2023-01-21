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
    // .then(characters =>{res.json({characters:characters})})
    .then(characters =>{
        // res.json({ characters: characters})
        res.render('characters/index', {characters , username, loggedIn, userId })
    })
    .catch(err => {
        console.log(err)
        // res.status(404).json(err)
        res.redirect(`/error?error=${err}`)
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
    const newCharacter = req.body
    Character.create(newCharacter)
    .then(character=>{
            // res.status(201).json({character: character.toObject()})
            
        res.redirect(`/characters/${character.id}`)
        })
        .catch(err => {
            console.log(err)
            // res.status(404).json(err)
            res.redirect(`/error?error=${err}`)
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
                // res.status(400).json(err)
                res.redirect(`/error?error=${err}`)
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
    
// GET--> edit route
router.get('/edit/:id', (req, res) =>{
    const CharId = req.params.id
    Character.findById(CharId)
        .then(character=>{
            res.render('characters/edit', {character, ...req.session})
        })
        .catch(err =>{
            res.redirect(`/error?error=${err}`)
        })
})

//UPDATE
router.put("/:id", (req, res)=>{
    const id = req.params.id
    req.body.pirate = req.body.pirate === 'on' ? true : false
    req.body.devilFruit = req.body.devilFruit === 'on' ? true : false
    req.body.alive = req.body.alive === 'on' ? true : false
    // const updCharacter = req.body
    // Character.findByIdAndUpdate(id, updCharacter, {new:true})
    Character.findById(id)
    .then(character=>{
        if(character.owner == req.session.userId){
        // res.sendStatus(204)
        return character.updateOne(req.body)
        }else{
        // res.sendStatus(401)
        res.redirect(`/error?error=You%20Are%20not%20allowed%20to%20edit%20this%20character`)
    }
})
.then(() =>{
    res.redirect('/characters')
})
    .catch(err=> {
        console.log(err)
        // res.sendStatus(400).json(err)
        res.redirect(`/error?error=${err}`)
    })
})

//DELETE
router.delete("/:id", (req, res)=>{
    const id = req.params.id
    Character.findById(id)
    .then(character=>{
        if(character.owner == req.session.userId){
        // res.sendStatus(204)
        return character.deleteOne()
        }else{
        // res.sendStatus(401)
        res.redirect(`/error?error=You%20Are%20not%20allowed%20to%20delete%20this%20character`)
    }
})
    .catch(err=> {
        console.log(err)
        // res.sendStatus(400).json(err)
        res.redirect(`/error?error=${err}`)
    })
})

//SHOW
router.get("/:id", (req, res)=>{
const id = req.params.id
Character.findById(id)
.populate('comments.author', 'username')
.then(character =>{
    // res.json({character:character})
    res.render('characters/show.liquid', {character, ...req.session})

})
.catch(err=> {
    console.log(err)
    // res.status(404).json(err)
    res.redirect(`/error?error=${err}`)
})
})
//4. Export Router
module.exports = router

