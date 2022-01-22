const { server, io } = require('./app')
const port = process.env.PORT

let count = 0
let message = 'Welcome!!'


io.on('connection', (socket) => {
    console.log('New websocket connection');

    socket.emit('message', message)

    socket.on('sendMessage', (msg) => {
        //emit the event to specific connection 
        // socket.emit('countUpdated',count)
        io.emit('message', msg)
    })
  
})
server.listen(port, () => {
    console.log(`server is up on port: ${port}`);
})