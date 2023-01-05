const express = require('express')
const cors = require('cors')
require('dotenv').config()
// const whitelist = ['http://localhost:3000', process.env.CLIENT_URL]
// const corsOptions = {
//   origin: function (origin, callback) {
//     if (whitelist.indexOf(origin) !== -1) {
//       callback(null, true)
//     } else {
//       callback(new Error('Not allowed by CORS'))
//     }
//   },
// }
// var corsOptions = {
//     origin: `${process.env.CLIENT_URL}`,
//     optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
//   }
const {
    getAllProfiles,
    getProfileByUsername,
    createProfile,
    updateProfile,
    deleteProfile
} = require('../controllers/profileController')

const router = express.Router()


//GET ALL user profiles
router.get('/all', getAllProfiles)

//GET a users profile
router.get('/:username', getProfileByUsername)

//POST a users profile
router.post('/', createProfile)

//UPDATE a users profile
router.patch('/', updateProfile)

//DELETE a users profile
router.delete('/', deleteProfile)


module.exports = router
