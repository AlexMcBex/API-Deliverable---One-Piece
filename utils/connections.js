//1. Import Dependencies
    //dotenv, mongoose
const mongoose = require('mongoose')
require('dotenv').config()

//2. DB  CONNECTION
    //connect .env DATABASE_URL and config
const DATABASE_URL = process.env.DATABASE_URL
const CONFIG = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}
    //connect it to mongoose
    //mongoose.connect(Url, config)
mongoose.connect(DATABASE_URL, CONFIG)
    //mongoose events
    //.on open, close, error ()=> console.log
mongoose.connection
    .on('open', () => console.log('Connected to Mongoose'))
    .on('close', () => console.log('Disconnected to Mongoose'))
    .on('error', (err) => console.log('An error occurred: \n', err))

//3. Export Connections
module.exports = mongoose
