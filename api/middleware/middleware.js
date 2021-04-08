const Users = require("../users/users-model.js")

function logger(req, res, next) {
  // DO YOUR MAGIC
  console.log(
    `[${new Date().toISOString()}] ${req.method} to ${req.url} from ${req.get('Origin')}`
  )
  next();
}

const validateUserId = async (req, res, next) => {
  // DO YOUR MAGIC
  const {id} = req.params
  const user = await Users.getById(id)
  if(!user){
    //if the `id` parameter does not match any user id in the database, respond with status `404` and `{ message: "user not found" }`
    res.status(404).json({ message: "user not found" })
  }else{
    // if the `id` parameter is valid, store the user object as `req.user` and allow the request to continue
    req.user = user // THIS DOES: puts the user in the req.body so that we don't have to query again. //creates a new property on the req object called user.
    next()
  }
}

function validateUser(req, res, next) {
  // DO YOUR MAGIC
  if(!req.body.name){
    res.status(400).json({ message: "missing required name field" })
  }else{
    next()
  }
}

function validatePost(req, res, next) {
  // DO YOUR MAGIC
}

// do not forget to expose these functions to other modules

module.exports={
  logger,
  validateUserId,
  validateUser,
  validatePost
}
