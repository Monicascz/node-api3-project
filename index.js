// require your server and launch it
const server = require('./api/server.js')
const env = require("dotenv").config()
const express = require("express")
const app = express()
const port = process.env.PORT || 9000

app.use("/api/", (_,res)=>{
    res.json({data: "API is connected! :) "})
})

app.listen(port, ()=>{
    console.log(`Listening on port ${port}`)
})


// server.listen(1234, ()=>{
//     console.log('server running on 1234')
// })