const { server, io } = require('./app')
const port = process.env.PORT

let count = 0

io.on('connection', (socket) => {
    console.log('New websocket connection');

    socket.emit('countUpdated', count)

    socket.on('increment', () => {
        count++;

        //emit the event to specific connection
        // socket.emit('countUpdated',count)

        //emit the event to every single connection
        io.emit('countUpdated',count)
    })
})
server.listen(port, () => {
    console.log(`server is up on port: ${port}`);
})