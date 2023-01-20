//import dependencies
    //mongoose connection
const mongoose = require('../utils/connections')

//define the Schema
    //comment is a subDocument so there is not model
const { Schema } = mongoose

//build the Schema
const commSchema = new Schema ({
    note: {
        type: String,
        required: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {timestamps: true})

//Export Schema
module.exports = commSchema