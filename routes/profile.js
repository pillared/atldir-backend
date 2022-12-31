const express = require('express')
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
