const Profile = require('../models/ProfileModel')
const mongoose = require('mongoose')
const uuid = require('uuid')

// import {v4 as uuidv4} from 'uuid';

function validateUsername(username){
    var t = ""
    let usernameRegex = /^[a-z0-9]{4,}([\s\._-]?[a-z0-9]+)?$/gmi;
    if (username === null || username === "" || username.length > 20 || !username.match(usernameRegex)){
        t += "Username is not valid. "
    }

    return t
}

function validateProfile({name, username}) {  
    var t = ""
    console.log(name, username)
    let nameRegex = /^[a-z]*([\s]?[a-z]+)+$/gmi;
    if (name === null || name === "" || name.length > 20 || !name.match(nameRegex)){
        t += ("Name is not valid. ")
    }
    t += validateUsername(username)

    return t
}  

//get all by most recently created
const getAllProfiles = async (req, res, next) => {
    try{
        const profiles = await Profile.find({}).sort({createdAt: -1})
        res.status(200).json(profiles)
    } catch (exception) {
        console.log('[ERROR] ', new Date().toLocaleString(), ' => ', error)
        res.status(417).json({error: error.message})
    }
}

//get all by most recently created
const getProfileByUsername = async (req, res, next) => {
    try{
        const username = req.params.username
        var t = validateUsername(username)
        if (t !== ""){
            console.log('[ERROR] ', new Date().toLocaleString(), ' => ', "Invalid syntax...")
            return res.status(400).json({error: t})
        }
        const profile = await Profile.find({"username": username})
        if (!profile[0]){
            console.log('[ERROR] ', new Date().toLocaleString(), ' => ', "User not found...")
            return res.status(404).json({error: "User does not exist."})
        } else {
            console.log('[Success] ', new Date().toLocaleString(), ' => ', "User Exists")
            res.status(200).json(profile)
        }
    } catch (exception) {
        console.log('[ERROR] ', new Date().toLocaleString(), ' => ', exception)
        res.status(500).json({error: exception.message})
    }
}

//create
const createProfile = async (req, res, next) => {
    let referencecode = uuid.v4();
    console.log(req.body)
    const {name, username, pronouns, bio, links, occupation} = req.body
    // const PROFILE = {name:name, username:username, pronouns:pronouns, bio:bio, links:links, occupation:occupation }
    try{
        var t = validateProfile({name, username})
        console.log(t)
        if (t !== ""){
            console.log('[ERROR] ', new Date().toLocaleString(), ' => ', "Invalid syntax...")
            return res.status(400).json({error: t})
        }
        existingProfile = await Profile.find({"username": username})
        if (existingProfile[0]){
            console.log('[ERROR] ', new Date().toLocaleString(), ' => ', "Cannot create user as already exists...")
            return res.status(409).json({error: "Username already taken!"})
        }
        const profile = await Profile.create({name, username, referencecode})
        res.status(200).json(profile)
    } catch (exception) {
        console.log('[ERROR] ', new Date().toLocaleString(), ' => ', exception)
        res.status(500).json({error: exception.message})
    }
}


// update a Profile
const updateProfile = async (req, res, next) => {
    
}
// delete a Profile
const deleteProfile = async (req, res, next) => {

}


module.exports = {
    getAllProfiles,
    getProfileByUsername,
    createProfile,
    updateProfile,
    deleteProfile
}