var express = require('express');
var router = express.Router();
const { validarCampos } = require('../validators/validator')

/* GET home page. */
router.get('/', function(req, res) {
  res.json({ title: 'Api Rest' });
});

function generarFecha() { 
  const fecha = new Date();
  const year = fecha.getFullYear();
  const mes = fecha.getMonth() + 1;
  const dia = fecha.getDate() + 1;
  const hora = fecha.getHours()
  const minutos = fecha.getMinutes()
  const segundos = fecha.getSeconds()
  const fechaCompleta = `${year}/${mes}/${dia} - ${hora}:${minutos}:${segundos}`;
  return fechaCompleta
}

router.post('/new-article', validarCampos, (req, res)=>{
  const { titulo, subtitulo, autor, cuerpo, enlaces } = req.body
  const fecha = generarFecha()
  const nuevoArticulo = { titulo, subtitulo, fecha, autor, cuerpo, enlaces }
  console.log(nuevoArticulo)
  res.status(200).send("Articulo Creado Correctamente")
})

module.exports = router;
