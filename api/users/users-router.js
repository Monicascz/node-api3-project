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
  .then(users=>{
    res.status(200).json(users)
  })
  .catch(err=>{
    res.status(500).json({message: "Error getting the users."})
  })

});

////////////////////////////////////////////////////////////////////////////////////
router.get('/:id', mw.validateUserId, (req, res) => {
  // [x] RETURN THE USER OBJECT
  // [x] this needs a middleware to verify user id'
  const {id} = req.params
  User.getById(id)
  .then(users=>{
    res.status(200).json(users)
  })
  .catch(()=>{
    res.status(500).json({message: "Error getting the users."})
  })

});


////////////////////////////////////////////////////////////////////////////////////
router.post('/', mw.validateUser, (req, res) => {
  // RETURN THE NEWLY CREATED USER OBJECT
  // [x] this needs a middleware to check that the request body is valid
  const user = req.body
  User.insert(user)
  .then(users=>{
    res.status(201).json(users)
  })
  .catch(()=>{
    res.status(500).json({message: "Error getting the users."})
  })


});
////////////////////////////////////////////////////////////////////////////////////
router.put('/:id', mw.validateUserId, mw.validateUser, (req, res) => {
  // [x] RETURN THE FRESHLY UPDATED USER OBJECT
  // [x] this needs a middleware to verify user id
  // [x] and another middleware to check that the request body is valid
  const {id} = req.params
  const changes = req.body

    User.getById(id)
    .then(userFound=>{
      if(!userFound){
        res.status(404).json({message: "the user you are trying to update was not found"})
      }
      else{
        return User.update(id,changes)
      }
    })
    .then(data=>{
      if (data){
        return User.getById(id)
      }
    })
    .then(users=>{
      if(users){
        res.status(200).json(users)
      }else{
        res.status(404).json({message: "Cannot find the user"})
      }
    })
    .catch(()=>{
      res.status(500).json({message: "Error getting the users."})
    })

});
////////////////////////////////////////////////////////////////////////////////////
router.delete('/:id', mw.validateUserId, (req, res) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  // [x]this needs a middleware to verify user id
});
////////////////////////////////////////////////////////////////////////////////////
router.get('/:id/posts', mw.validateUserId, (req, res) => {
  // RETURN THE ARRAY OF USER POSTS
  // [x] this needs a middleware to verify user id
});
////////////////////////////////////////////////////////////////////////////////////
router.post('/:id/posts', mw.validateUserId, mw.validateUser, (req, res) => {
  // RETURN THE NEWLY CREATED USER POST
  // [x]this needs a middleware to verify user id
  // [x]and another middleware to check that the request body is valid
});

// do not forget to export the router
module.exports = router;