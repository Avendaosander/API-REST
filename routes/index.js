var express = require('express');
var router = express.Router();
const { validarCampos, validarCamposVideo } = require('../validators/validator')
const articulo = require('../controllers/articulo')

var nuevoArticulo;

/* GET home page. */
router.get('/', function(req, res) {
  res.json({ title: 'Api Rest' });
});

router.post('/new-article', validarCampos, (req, res)=>{
  nuevoArticulo = new articulo(req, res)
  console.log(nuevoArticulo)
  res.status(200).send("Articulo Creado Correctamente")
})

router.post('/new-article-video', validarCamposVideo, (req, res)=>{
  nuevoArticulo = new articulo(req, res)
  console.log(nuevoArticulo)
  res.status(200).send("Articulo Creado Correctamente")
})

module.exports = router;
