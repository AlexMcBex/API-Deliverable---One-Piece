//1. Import Dependencies
    //express, morgan, express-session, connect-mongo dotenv
const express = require('express')
const morgan = require('morgan')
const session = require('express-session')
const MongoStore = require('connect-mongo')
require('dotenv').config()

//2. build a Middleware function
    //func (app)
const middleware = (app) =>{
    app.use(morgan('tiny'))
    app.use(express.urlencoded({extended:true}))
    app.use(express.static('public'))
    app.use(express.json())
    app.use(
        session({
            secret: process.env.SECRET,
            //add SECRET to .env
            store: MongoStore.create({
                mongoUrl: process.env.DATABASE_URL
            }),
            saveUninitialized: true,
            resave: false
        })
    )
}

//3.export Middleware function
module.exports = middleware