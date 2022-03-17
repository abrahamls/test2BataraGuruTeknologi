const { verifyToken } = require("../helpers/jwt")
const { User } = require("../models/users")

async function authentication(req, res, next) {
  try {
    const { access_token } = req.headers
    if (!access_token) {
      throw { name: "unauthorized", message: "please login first" }
    }
    const user = verifyToken(access_token)
    const foundUser = await User.findById(user._id)
    if (!foundUser) {
      throw { name: "unauthorized", message: "invalid access token" }
    }
    req.currentUser = {
      _id: foundUser._id,
      email: foundUser.email,
    }
    next()
  } catch (error) {
    next(error)
  }
}

module.exports = { authentication }
