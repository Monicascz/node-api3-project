const express = require('express');
//const morgan = require('morgan'); // if you don't put in a path then it just reads this as a node module.
//morgan is a testing tool that gives us some information about our request (displays in the terminal)
//tells us what type of request it was, endpoint was, what the status was and what it returns, and how long it took (how fast the server is)
//const helmet = require("helmet") // protects the headers from knowing what information is being used.

const mw = require('./middleware/middleware.js')
const usersRouter = require('./users/users-router.js')
const server = express();

// remember express by default cannot parse JSON in request bodies

// global middlewares and the user's router need to be connected here


server.use(express.json()) // every endpoint uses this global middleware
//server.use(morgan("dev")) // to use morgan you have to initialize the library and pass in "dev" to let morgan know that we are in a development environment.
//server.use(helmet()) // you need to initialize helmet. 

server.use('/api/users',  usersRouter)
server.use(mw.logger) // every endpoint uses this global middleware

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

module.exports = server;
