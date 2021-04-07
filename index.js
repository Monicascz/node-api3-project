// require your server and launch it
const server = require('./api/server.js')

server.listen(1234, ()=>{
    console.log('server running on 1234')
})