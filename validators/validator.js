const { body } = require('express-validator')
const { validationResult } = require('express-validator')
const { validationCreate } = require('../helpers/ValidatorHelper')

const validarCampos = [
   body('titulo', "Ingrese un Titulo para el articulo")
      .exists()
      .isLength({min: 5}),
   body('subtitulo', "Ingrese un Subtitulo para el articulo")
      .exists()
      .isLength({min: 5}),
   body('autor', "Ingrese el Autor del articulo")
      .exists()
      .isLength({min: 3}),
   body('cuerpo', "Ingrese el contenido del articulo")
      .exists()
      .isLength({min: 10}),
   body('enlaces', "Ingrese los Enlaces Bibliograficos del articulo")
      .isURL(),
   (req,res,next) => {
      validationCreate(req, res, next)
   }
]

module.exports = { validarCampos }