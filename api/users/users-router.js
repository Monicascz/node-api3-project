const express = require('express');

// You will need `users-model.js` and `posts-model.js` both
const User = require("./users-model.js")
const Post = require("../posts/posts-model.js")
// The middleware functions also need to be required
const mw = require("../middleware/middleware.js")


const router = express.Router();


router.get('/',  (req, res) => {
  // RETURN AN ARRAY WITH ALL THE USERS
  User.get()
  .then(posts=>{
    res.status(200).json(posts)
  })
  .catch(err=>{
    res.status(500).json({message: "Error getting the users."})
  })

});

router.get('/:id', mw.validateUserId, (req, res) => {
  // RETURN THE USER OBJECT
  // [x] this needs a middleware to verify user id'
  const {id} = req.params
  User.getById(id)
  .then(posts=>{
    res.status(201).json(posts)
  })
  .catch(err=>{
    res.status(500).json({message: "Error getting the users."})
  })

});

router.post('/', (req, res) => {
  // RETURN THE NEWLY CREATED USER OBJECT
  // this needs a middleware to check that the request body is valid
});

router.put('/:id', mw.validateUserId, (req, res) => {
  // RETURN THE FRESHLY UPDATED USER OBJECT
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
});

router.delete('/:id', mw.validateUserId, (req, res) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
});

router.get('/:id/posts', mw.validateUserId, (req, res) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
});

router.post('/:id/posts', mw.validateUserId, (req, res) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
});

// do not forget to export the router
module.exports = router;