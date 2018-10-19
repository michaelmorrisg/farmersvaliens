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
app.get('/api/getplayers/:roomId', controller.getPlayers)



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

    socket.on('join-room', data => {
        socket.join(data.roomId)
        console.log('i joined a room')
    })

    socket.on('player-joined', data => {
        io.in(data.roomId).emit('add-player')
    })
})

//