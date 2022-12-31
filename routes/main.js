const express = require('express')
const router = express.Router()

// Check is server is up and running
router.get('/healthcheck/', (req, res) => {
    res.json({status: 'Server is up and running'})
})

module.exports = router
