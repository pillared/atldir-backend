const mongoose = require('mongoose')
const Schema = mongoose.Schema

const profileSchema = new Schema({
    username: {
        type: String,
        required: true
    }


}, {timestamps: true} )

module.export = mongoose.model('Profile', profileSchema)