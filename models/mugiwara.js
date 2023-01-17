// 1.  IMPORT MONGOOSE
const mongoose = require('mongoose')

//2. DEFINE SCHEMA AND MODELS FROM MONGOOSE
const {Schema, model} = mongoose

//3. BUILD THE SCHEMA
    //const nameSchema = new Schema ({field:types})
const mugiwaraSchema =  new Schema({
    name: String,
    rank: String,
    devilFruit: Boolean,
    reward: Number,
})

//4. DEFINE MODEL
    // const Name = model('Name', nameSchema)
const Mugiwara = model('Mugiwara', mugiwaraSchema)

//5. EXPORT MODEL
module.exports = Mugiwara