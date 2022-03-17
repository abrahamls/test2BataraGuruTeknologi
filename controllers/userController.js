const { hashPassword, checkPassword } = require('../helpers/bcrypt')
const { getToken } = require('../helpers/jwt')
const User = require('../models/users')

class UserController {
  static async registerUser(req, res, next) {
    try {
      const { email, password } = req.body
      if (!email) {
        throw { name: "badRequest", message: "Email is required!" }
      }
      if (!password) {
        throw { name: "badRequest", message: "Password is required!" }
      }
      const hashedPassword = hashPassword(password)
      await User.create({ email, password: hashedPassword })
      res.status(201).json({ message: "registration is successful" })
    } catch (error) {
      if (error._message === 'User validation failed') {
        res.status(400).json({ message: "Email must be unique" })
      } else {
        next(error)
      }
    }
  }
  static async login(req, res, next) {
    try {
      const { email, password } = req.body
      if (!email) {
        throw { name: "badRequest", message: "Email is required!" }
      }
      if (!password) {
        throw { name: "badRequest", message: "Password is required!" }
      }
      const foundUser = await User.findOne({ email })
      if (!foundUser || !checkPassword(password, foundUser.password)) {
        throw { name: "unauthorized", message: "Invalid email/password!" }
      }
      const access_token = getToken({
        _id: foundUser._id,
        email: foundUser.email
      })
      res.status(200).json({ access_token })
    } catch (error) {
      next(error)
    }
    
  }
}

module.exports = UserController