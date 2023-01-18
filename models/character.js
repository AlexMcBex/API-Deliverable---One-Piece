// 1.  IMPORT MONGOOSE
const mongoose = require('mongoose')

//2. DEFINE SCHEMA AND MODELS FROM MONGOOSE
const {Schema, model} = mongoose

//3. BUILD THE SCHEMA
    //const nameSchema = new Schema ({field:types})
const characterSchema =  new Schema({
    name: String,
    affiliation: String,
    rank: String,
    devilFruit: Boolean,
    reward: Number,
})

//4. DEFINE MODEL
    // const Name = model('Name', nameSchema)
const Character = model('Character', characterSchema)

//5. EXPORT MODEL
module.exports = Character