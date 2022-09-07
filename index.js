console.log('new node app is running')
let colors = ['red', 'green', 'blue', 'purple']
//hent biblioteket ip
const ip = require('ip')
console.log(ip.address())
//hent biblioteket socket.io - for at lave en websocket
const socketLib = require('socket.io')
//vælg en port
const port = 666
//opret en variabel som holder express biblioteket
const express = require('express')
//initialiser app objektet 
const app = express()
//json array til brugere 
let users = []
//start serveren og lyt på din port 
const server = app.listen(port, ()=>{
    console.log('serveren kører på ' + port)
})
//opret en server websocket
const serverSocket = socketLib(server) 
app.use('/', express.static('public'))
//opret et endpoint som returnerer serverens ip
app.get('/ip', (req, res)=>{
    res.json(
        {
            'ip' : ip.address(),
            'port' : port
        }
    )
})

serverSocket.sockets.on('connection', socket => {
    console.log('new socket connection established')
    
    //socket.on er en eventliustener på nye beskeder fra klienter
    socket.on('chat', message => {
        console.log(message.name)
        //når serveren modtager beskeder sender den dem rundt til alle
        serverSocket.sockets.emit('newMessage', message)
    })

    socket.on('newUser', user => {
        users.push({'name':user, 'id':socket.id})
        console.log(users)
    })

})
