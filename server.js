require('dotenv').config()
// init 
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

// magic deps 
const { Magic } = require('@magic-sdk/admin');
const path = require('path');

// routes
const mainRoutes = require('./routes/main')
const homeRoutes = require('./routes/home')
const profileRoutes = require('./routes/profile')

// app
const app = express()
app.options('*', cors())


const whitelist = ['http://localhost:3000', process.env.CLIENT_URL]
const corsOptions = {
        origin: function (origin, callback) {
            if (whitelist.indexOf(origin) !== -1) {
                callback(null, true)
            } else {
                callback(new Error('Not allowed by CORS'))
            }
        },
        optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(cors(corsOptions));

// var corsOptions = {
//     origin: `${process.env.CLIENT_URL}`,
//     optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
//   }


// ======= MIDDLEWARE =======
app.use(express.json()) //allows us to use .body within the request, and whatnot
// app.set('trust proxy', true)
app.use((req, res, next) => {
    console.log('[Running] ', new Date().toLocaleString(), ' => ', req.method, req.path, ' from ', req.ip)
    next()
})

// ======= ROUTES =======
app.use('/api/v1', mainRoutes)
app.use('/api/v1/home', homeRoutes)
app.use('/api/v1/profile', profileRoutes)


// connect to db below routes
mongoose.connect(process.env.MONGO_CONNECTION_STRING)
    .then(() => {
        // ======= Listen for requests =======
        app.listen(process.env.PORT, () => {
            console.log('[Startup] ', new Date().toLocaleString(), ' => Connected to DB...! ')
            console.log('[Startup] ', new Date().toLocaleString(), ' => Listening on : http://localhost:' + process.env.PORT)
        })
    })
    .catch((error) => {
        console.log('[ERROR] ', new Date().toLocaleString(), ' => ', error)
    })
