const express = require('express');
const router = express.Router();
const fs = require('fs')
const { validarCampos, validarCamposVideo } = require('../validators/validator')
const articulo = require('../controllers/articulo')
const listado = require('../controllers/lista');
// const archJson = require('../articulos.json')

const jsonArticulos = fs.readFileSync('articulos.json', 'utf-8')
let articulos = JSON.parse(jsonArticulos)
// console.log(articulos[1])

let nuevoArticulo;
let Listado = new listado();

articulos.forEach(element => {
  Listado.agregarArt(element)
});
// console.log(Listado.articulos)

/* GET home page. */
router.get('/', function(req, res) {
  res.json({ title: 'Api Rest' });
});

// GET para mostrar articulos
router.get('/articulos', (req,res)=>{
  if(Listado === undefined){
    res.status(400).send('No hay articulos');
  }else{
    Listado.mostrarList(res);
  }
})

//GET para mostrar por nombre
router.get('/articulo/:titulo', (req,res)=>{
  if(Listado === undefined){
    res.send('No hay articulos')
  }else{
    Listado.buscarArt(req.params.titulo,res)
  }
})

router.post('/new-article', validarCampos, (req, res)=>{
  nuevoArticulo = new articulo(req, res)
  Listado.agregarArt(nuevoArticulo);
  console.log(Listado.articulos)
  // articulos.push()
  // let jsonArticulos = JSON.stringify(articulos)
  // fs.writeFileSync('articulos.json', jsonArticulos, 'utf-8')
  res.status(200).send("Articulo Creado Correctamente")
})

router.post('/new-article-video', validarCamposVideo, (req, res)=>{
  nuevoArticulo = new articulo(req, res)
  Listado.agregarArt(nuevoArticulo);
  console.log(nuevoArticulo)
  res.status(200).send("Articulo Creado Correctamente")
})

router.put('/modificarArt/:titulo', (req,res)=>{
  if(Listado === undefined){
    res.status(400).send('No hay articulos disponibles')
  }else{
    Listado.editarArt(req.params.titulo, req.body, res);
  }
})

module.exports = router;
