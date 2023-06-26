//this is the web server 
const express = require('express')
const server = express()
require('dotenv').config()

// enable cross origin resource sharing to proxy api requests
// from localhost:3000 to local host 4000 
const cors = require('cors')
server.use(cors())

// create logs for everything 
const morgan = require('morgan')
server.use(morgan('dev'))

// handle application/json requests
server.use(express.json())

// heres our static fields 
const path = require('path')
server.use(express.static(path.join(__dirname, 'build')))

// heres our api 
server.use('/api', require('./api'))

// by deafault serve up the react app if we dint recognize the route 
server.use((req, res, next) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

// connect to the server 
const PORT = process.env.PORT || 4000


// define a server handle to close open tcp connection after unit tests have run 
const handle = server.listen(PORT, async ()=>{
    console.log(`Server is running on ${PORT}`)
})

module.exports = { server, handle }