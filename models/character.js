// 1.  IMPORT MONGOOSE
const mongoose = require('../utils/connections')
// const User = require('./user')

//2. DEFINE SCHEMA AND MODELS FROM MONGOOSE
const {Schema, model} = mongoose

//3. BUILD THE SCHEMA
    //const nameSchema = new Schema ({field:types})
const characterSchema =  new Schema({
    name: {
       type:  String
    },
    affiliation: {
       type:  String
    },
    rank: {
        type: String
    },
    devilFruit: {
        type: Boolean
    },
    reward: {
        type: Number
    },
    alive: {
        type: Boolean
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
}, {timestamps: true})

//4. DEFINE MODEL
    // const Name = model('Name', nameSchema)
const Character = model('Character', characterSchema)

//5. EXPORT MODEL
module.exports = Character