const { server, io } = require('./app')
const port = process.env.PORT
const Filter = require('bad-words')
const { generateMessage, generateLocationMessage } = require('./utils/messages')
const { addUser, removeUser, getUser, getUserInRoom } = require('./utils/user')

io.on('connection', (socket) => {
    console.log('New websocket connection');

    socket.on('join', ({ username, room }, callback) => {
        const { error, user } = addUser({ id: socket.id, username, room })
        if (error) {
            return callback(error)
        }

        socket.join(user.room)
        //socket.emit, socket.broadcast.emit, io.emit
        socket.emit('message', generateMessage('Admin','Welcome!'))
        socket.broadcast.to(user.room).emit('message', generateMessage('Admin',`${user.username} has joined!`))
    })

    socket.on('sendMessage', (msg, callback) => {
        //emit the event to specific connection 
        // socket.emit('message',count)

        const filter = new Filter()

        if (filter.isProfane(msg)) {
            return callback('profanity is not allowed!')
        }
        //emit the event to all connection
        const user = getUser(socket.id)
        // console.log(user)
        io.to(user.room).emit('message', generateMessage(user.username, msg))
        callback()
    })
    socket.on('disconnect', () => {
        const user = removeUser(socket.id)
        // console.log(user)
        if (user) {
            io.to(user.room).emit('message', generateMessage(user.username,`${user.username} has left!`))
        }

    })

    //setup a listener
    socket.on('sendLocation', (coords, callback) => {
        const user = getUser(socket.id)

        io.to(user.room).emit('locationMessage', generateLocationMessage(user.username,`https://google.com/maps?q=${coords.latitude},${coords.longitude}`))
        callback()
    })

})
server.listen(port, () => {
    console.log(`server is up on port: ${port}`);
})