// ======= Ensure dependencies =======
require('dotenv').config()

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config({path: __dirname+'/.env'});
}

// ======= Init application =======
const express = require('express')
const mongoose = require('mongoose')

const mainRoutes = require('./routes/main')
const homeRoutes = require('./routes/home')
const profileRoutes = require('./routes/profile')
const app = express()

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

// static files (build of your frontend)
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../frontend', 'build')));
    app.get('/*', (req, res) => {
      res.sendFile(path.join(__dirname, '../frontend', 'build', 'index.html'));
    })
  }