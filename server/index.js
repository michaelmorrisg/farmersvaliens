const express = require('express')
const bodyParser = require('body-parser')
const massive = require('massive')
require('dotenv').config()

const controller = require('./controller')

const app = express()

//Middleware
app.use(bodyParser.json())

//


//Endpoints
app.post('/api/hostgame', controller.hostGame)


//

massive(process.env.CONNECTION_STRING).then(db=>{
    app.set('db', db)
    app.listen(3020, ()=>{
        console.log('listening on 3020')
    })
})