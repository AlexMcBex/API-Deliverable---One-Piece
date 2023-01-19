//1. Import Dependencies
    // express, model, bcrypt(for the password)
const express = require('express')
const User = require('../models/user')
const bcrypt = require('bcryptjs')

//2.. Create Router
const router = express.Router()

//3. Routes
    //POST -> /users/signup => new user
router.post('/signup', async (req,res)=>{
    const newUser = req.body
    newUser.password = await bcrypt.hash(
        newUser.password,
        await bcrypt.genSalt(10)
    )
    User.create(newUser)
        .then(user =>{
            res.status(201).json({username: user.username
            })
        })
        .catch(err => {
            console.log(err)
            res.json(err)
        })
})
    //POST -> /users/login => new session in db and browser
    //DELETE -> /users/logour => destroys current session

//4. Export router
module.exports = router