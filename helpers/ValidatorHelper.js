const { validationResult } = require('express-validator')

const validationCreate = (req, res, next) => {
   try {
      validationResult(req).throw()
      return next()
   } catch (error) {
      res.status(403).send({ errors: error.array() })
   }
}

module.exports = { validationCreate }