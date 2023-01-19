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
    router.post('/login', async (req, res)=>
    {
        const {username, password} = req.body
        User.findOne({username})
        .then(async (user)=>{
            if (user){
                const result = await bcrypt.compare(password, user.password)
                if (result){
                    req.session.username =  username
                    req.session.loggedIn = true
                    req.session.userId = user.id

                    res.status(201).json({username: user.username})
                }else{
                    res.json({error: 'username or password incorrect'})   
                }
            }else {
                res.json({error: 'user does not exist'})   
            }
    })
    .catch(err =>{
        console.log(err)
        res.json(err)
    })
})
    //DELETE -> /users/logour => destroys current session
router.delete('/logout', (req, res)=>{
    req.session.destroy(()=>{
        console.log('logging out this req.session: \n', req.session)
        res.sendStatus(204)
    })
})
//4. Export router
module.exports = router