const express = require('express')
const router = express.Router()

router.get('/:id', (req, res) => {
    res.json({msg: 'Get User'})
})

router.post('/:id', (req, res) => {
    res.json({msg: 'Create User'})
})


module.exports = router
