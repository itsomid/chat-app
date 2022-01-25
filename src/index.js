const { server, io } = require('./app')
const port = process.env.PORT

let message = 'Welcome!!'


io.on('connection', (socket) => {
    console.log('New websocket connection');

    socket.emit('message', message)
    socket.broadcast.emit('message', 'A new user has joined!')
    socket.on('sendMessage', (msg, callback) => {
        //emit the event to specific connection 
        // socket.emit('message',count)

        //emit the event to all connection
        io.emit('message', msg) 
        callback('Delivered.')
    })
    socket.on('disconnect', () => {
        io.emit('message','user has left!')
    })

    //setup a listener
    socket.on('sendLocation',(coords)=>{
        io.emit('message',`https://google.com/maps?q=${coords.latitude},${coords.longitude}`)
    })

})
server.listen(port, () => {
    console.log(`server is up on port: ${port}`);
})