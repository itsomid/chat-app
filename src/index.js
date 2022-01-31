const { server, io } = require('./app')
const port = process.env.PORT
const Filter = require('bad-words')
const { generateMessage, generateLocationMessage } = require('./utils/messages')

io.on('connection', (socket) => {
    console.log('New websocket connection');

    socket.emit('message', generateMessage('Welcome!'))
    socket.broadcast.emit('message', generateMessage('A new user has joined!'))
    socket.on('sendMessage', (msg, callback) => {
        //emit the event to specific connection 
        // socket.emit('message',count)
        const filter = new Filter()

        if (filter.isProfane(msg)) {
            return callback('profanity is not allowed!')
        }
        //emit the event to all connection
        io.emit('message', generateMessage(msg))
        callback()
    })
    socket.on('disconnect', () => {
        io.emit('message', generateMessage('user has left!'))
    })

    //setup a listener
    socket.on('sendLocation', (coords, callback) => {
        io.emit('locationMessage', generateLocationMessage(`https://google.com/maps?q=${coords.latitude},${coords.longitude}`))
        callback()
    })

})
server.listen(port, () => {
    console.log(`server is up on port: ${port}`);
})