const {server, io} = require('./app')
const port = process.env.PORT

io.on('connection',()=>{
    console.log('New websocket connection');
})
server.listen(port,()=>{
    console.log(`server is up on port: ${port}`);
})