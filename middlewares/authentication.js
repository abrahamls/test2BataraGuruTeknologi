const { verifyToken } = require("../helpers/jwt")
const { User } = require("../models")

async function authentication(req, res, next) {
  try {
    const { access_token } = req.headers
    if (!access_token) {
      throw { name: "unauthorized", message: "please login first" }
    }
    const user = verifyToken(access_token)
    const foundUser = await User.findByPk(user.id)
    if (!foundUser) {
      throw { name: "unauthorized", message: "invalid access token" }
    }
    req.currentUser = {
      id: foundUser.id,
      username: foundUser.username,
      email: foundUser.email,
      role: foundUser.role,
    }
    next()
  } catch (error) {
    next(error)
  }
}

module.exports = { authentication }
