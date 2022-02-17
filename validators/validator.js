const { check } = require('express-validator')
const { validationCreate } = require('../helpers/ValidatorHelper')

const validarCampos = [
   check('titulo', "Ingrese un Titulo para el articulo")
      .exists()
      .not()
      .isEmpty()
      .isLength({min: 5}),
   check('subtitulo', "Ingrese un Subtitulo para el articulo")
      .exists()
      .not()
      .isEmpty()
      .isLength({min: 5}),
   check('autor', "Ingrese el Autor del articulo")
      .exists()
      .not()
      .isEmpty()
      .isLength({min: 3}),
   check('cuerpo', "Ingrese el contenido del articulo")
      .exists()
      .not()
      .isEmpty()
      .isLength({min: 10}),
   check('enlaces', "Ingrese los Enlaces Bibliograficos del articulo")
      .isURL(),
   (req,res,next) => {
      validationCreate(req, res, next)
   }
]

module.exports = { validarCampos }