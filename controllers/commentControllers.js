//Import Dependencies
    //express, char model
const express = require('express')
const Character = require('../models/character')

//create Router
const router = express.Router()

//Routes
    //POST -> '/comments/:charId
router.post('/:charId', (req,res)=>{
    const charId = req.params.charId
    console.log('Active Session --> ', req.session)
    if (req.session.loggedIn) {
        const newComment = req.body
        newComment.author = req.session.userId
        Character.findById(charId)
            .then(char =>{
                char.comments.push(newComment)
                return char.save()
            })
            .then(char=>{
                res.status(201).json({character: char})
            })
            .catch(err=>{
                console.log(err)
                res.status(401) //unauthorized
            })
    }else{
        res.sendStatus(401)//unauthorized
    }
})

//DELETE -> '/comments/:charId/commId
    //owner locked
router.delete('/delete/:charId/:commId', (req,res)=>{
    //store the params ids
    const {charId, commId} = req.params
    Character.findById(charId)
        .then(char =>{
            const theComment = char.comments.id(commId)
            console.log("comment deleted --> ", theComment)
            if(req.session.loggedIn){
                if(theComment.author == req.session.userId){
                    theComment.remove()
                    char.save()
                    res.sendStatus(204)//no context
                }else{
                        res.sendStatus(401) //unauthorized
                }
            }else{
                res.sendStatus(401) //unauthorized
            }
        })
        .catch(err=>{
            console.log(err)
            res.status(400).json(err)
        })
})

module.exports = router