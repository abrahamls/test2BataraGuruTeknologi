const errorHandler = (error, req, res, next) => {
  let message = 'Internal Server Error'
  let status = 500
  switch (error.name) {
    case 'badRequest':
      status = 400
      message = error.message
      break
    case 'unauthorized':
      status = 401
      message = error.message
      break
    case 'JsonWebTokenError':
      status = 401
      message = error.message
      break
    case 'notFound':
      status = 404
      message = error.message
      break
  }
  res.status(status).json({ message })
}

module.exports = { errorHandler }
