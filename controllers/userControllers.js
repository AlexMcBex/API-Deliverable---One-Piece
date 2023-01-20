//1. Import Dependencies
    // express, model, bcrypt(for the password)
const express = require('express')
const User = require('../models/user')
const bcrypt = require('bcryptjs')

//2.. Create Router
const router = express.Router()

//3. Routes
    //GET -> users/signup
    router.get('/signup', (req, res)=>{
        res.render('users/signup')
    })

    //POST -> /users/signup => new user
router.post('/signup', async (req,res)=>{
    const newUser = req.body
    console.log('req.body in SIGNUP : ', req.body)
    newUser.password = await bcrypt.hash(
        newUser.password,
        await bcrypt.genSalt(10)
    )
    User.create(newUser)
        .then(user =>{
            // res.status(201).json({username: user.username})
            res.redirect('/users/login')
        })
        .catch(err => {
            console.log(err)
            // res.json(err)
            res.redirect(`/error?error=username%20taken`)
        })
})

//GET -> user login
router.get('/login', (req, res)=>{
    res.render('users/login')
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

                    // res.status(201).json({username: user.username})
                    
                    res.redirect('/')
                }else{
                    // res.json({error: 'username or password incorrect'})   
                    res.redirect(`/error?error=username%20or%20password%20is%20incorrect`)
                }
            }else {
                // res.json({error: 'user does not exist'})   
                res.redirect(`/error?error=user%20does%20not%20exist`)
            }
    })
    .catch(err =>{
        console.log(err)
        // res.json(err)
        
        res.redirect(`/error?error=${err}`)
    }) 
})

//GET -> /users/logout
router.get('/logout', (req, res) => {
    res.render('users/logout')
})
    //DELETE -> /users/logour => destroys current session
router.delete('/logout', (req, res)=>{
    req.session.destroy(()=>{
        console.log('logging out this req.session: \n', req.session)
        // res.sendStatus(204)
        res.redirect('/')
    })
})

//4. Export router
module.exports = router