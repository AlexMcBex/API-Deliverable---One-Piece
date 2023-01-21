// 1.  IMPORT MONGOOSE
const mongoose = require('../utils/connections')
// const User = require('./user')
//import comment Schema
const commSchema = require('./comment')

//2. DEFINE SCHEMA AND MODELS FROM MONGOOSE
const {Schema, model} = mongoose

//3. BUILD THE SCHEMA
    //const nameSchema = new Schema ({field:types})
const characterSchema =  new Schema({
    name: {
       type:  String,
       required: true,
    },
    pirate: {
        type: Boolean,
        required: true
    },
    affiliation: {
       type:  String
    },
    rank: {
        type: String
    },
    devilFruit: {
        type: Boolean,
        required: true
    },
    reward: {
        type: Number
    },
    alive: {
        type: Boolean,
        required: true
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    comments: [commSchema]
}, {timestamps: true})

//4. DEFINE MODEL
    // const Name = model('Name', nameSchema)
const Character = model('Character', characterSchema)

//5. EXPORT MODEL
module.exports = Character