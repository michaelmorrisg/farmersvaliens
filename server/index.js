const express = require('express')
const bodyParser = require('body-parser')
const massive = require('massive')
require('dotenv').config()

const controller = require('./controller')

const app = express()
var server = require('http').Server(app);
var io = require('socket.io')(server)

//Middleware
app.use(bodyParser.json())

//


//Endpoints
app.post('/api/hostgame', controller.hostGame)
app.post('/api/joingame', controller.joinGame)



massive(process.env.CONNECTION_STRING).then(db=>{
    app.set('db', db)
})

server.listen(3020, ()=>{
    console.log('listening on 3020')
})

//Sockets

io.on('connection', socket => {
    console.log('player joined')


    socket.on('disconnect', socket => {
        console.log('player disconnected')
    })
})

//