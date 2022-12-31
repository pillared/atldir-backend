const mongoose = require('mongoose')
const Schema = mongoose.Schema


const profileSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    pronouns: {
        type: String,
        required: false
    },
    bio: {
        type: String,
        required: false
    },
    links: {
        type: String,
        required: false
    },
    occupation: {
        type: String,
        required: false
    },
    referencecode: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: false
    },
    phone: {
        type: String,
        required: false
    },
    socialmedia: {
        type: String,
        required: false
    }
}, {timestamps: true})

module.exports = mongoose.model('Profile', profileSchema)

