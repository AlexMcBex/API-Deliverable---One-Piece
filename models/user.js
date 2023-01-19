//1. import  mongoose from connections
const mongoose = require('../utils/connections')

//2. destructuring the schema and model functions from mongoose
const{ Schema, model} = mongoose

//3. define userSchema
const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

//4. Define user model
const User = model('User', userSchema)

//5. export Model
module.exports = User