const { server, io } = require('./app')
const port = process.env.PORT

let count = 0
let message = 'Welcome!!'


io.on('connection', (socket) => {
    console.log('New websocket connection');

    socket.emit('message', message)
    socket.broadcast.emit('message', 'A new user has joined!')
    socket.on('sendMessage', (msg) => {
        //emit the event to specific connection 
        // socket.emit('countUpdated',count)

        //emit the event to all connection
        io.emit('message', msg)
    })
    socket.on('disconnect', () => {
        io.emit('message','user has left!')
    })

})
server.listen(port, () => {
    console.log(`server is up on port: ${port}`);
})