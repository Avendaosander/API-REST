const { body } = require('express-validator')
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
      .custom( value => {
         if (/^[A-Za-zñÑáéíóúÁÉÍÓÚüÜ\s]+$/g.test(value)) {
            return true
         } else {
            throw new Error('El nombre del autor no es valido, ingrese solo letras')
         }
      })
      .isLength({min: 3}),
   body('cuerpo', "Ingrese el contenido del articulo")
      .exists()
      .isLength({min: 10}),
   body('enlaces', "Ingrese al menos un enlace bibliografico")
      .custom( value => {
         if (typeof value === 'undefined') {
            return true
         } else {
            try {
               new URL(value)
               return true
            } catch (error) {
               return false
            }
         }
      }),
   (req,res,next) => {
      validationCreate(req, res, next)
   }
]

const validarCamposVideo = [
   body('titulo', "Ingrese un Titulo para el articulo")
      .exists()
      .isLength({min: 5}),
   body('subtitulo', "Ingrese un Subtitulo para el articulo")
      .exists()
      .isLength({min: 5}),
   body('autor', "Ingrese el Autor del articulo")
      .exists()
      .custom( value => {
         if (/^[A-Za-zñÑáéíóúÁÉÍÓÚüÜ\s]+$/g.test(value)) {
            return true
         } else {
            throw new Error('El nombre del autor no es valido, ingrese solo letras')
         }
      })
      .isLength({min: 3}),
   body('cuerpo', "Ingrese el enlace del Video")
      .exists()
      .isURL(),
   body('enlaces', "Ingrese al menos un enlace bibliografico")
      .custom( value => {
         if (typeof value === 'undefined') {
            return true
         } else {
            try {
               new URL(value)
               return true
            } catch (error) {
               return false
            }
         }
      }),
   (req,res,next) => {
      validationCreate(req, res, next)
   }
]

const validarAdmin = [
   body('email', 'Ingrese un Email valido')
      .exists()
      .isEmail(),
   body('password', 'Ingrese una Contraseña valida')
      .exists()
      .isStrongPassword()
]

module.exports = { validarAdmin, validarCampos, validarCamposVideo }