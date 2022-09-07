let clientSocket
let state = 'enterName'
let myName = ''

function setup(){
     createCanvas(windowWidth, windowHeight)
     background('green')
     //fetch server ip from node endpoint
     fetch('http://localhost:666/ip')
        .then(res => res.json())
        .then(data => {
            console.log('http://' + data.ip + ':' + data.port)
            select('#info').html(data.ip)
        })
        //io kommer fra socket.io biblioteket 
        clientSocket = io.connect()

        clientSocket.on('newMessage', message => {
            console.log(message)
            let p = createElement('P', message.name + ': ' + message.message)
            select('#chat').child(p)
            select('#chat').elt.scrollTop = select('#chat').elt.scrollHeight
        })
        select('#nameButton').mousePressed(()=>{
            console.log('ny bruger')
            select('#nameBox').addClass('hide')
            select('#chatBox').removeClass('hide')
            myName = select('#name').value()
        })
    }

function draw(){
}

function keyPressed(){
    if(key == 'Enter'){
        let content = select('#message').value()
        //emit tager et "emne" og noget data
        let message = {'name': myName, 'message': content}
        clientSocket.emit('chat', message)
        select('#message').value('')
    }
}

function mousePressed(){
}
