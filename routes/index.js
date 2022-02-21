const express = require('express');
const router = express.Router();
const fs = require('fs')
const { validarAdmin, validarCampos, validarCamposVideo, validarUpdate } = require('../validators/validator')
const articulo = require('../controllers/articulo')
const listado = require('../controllers/lista');

const jsonArticulos = fs.readFileSync('articulos.json', 'utf-8')
let articulos = JSON.parse(jsonArticulos)

function guardaJSON() {
  articulos = Listado.articulos
  let jsonArticulos = JSON.stringify(articulos)
  fs.writeFileSync('articulos.json', jsonArticulos, 'utf-8')
}

let nuevoArticulo;
let Listado = new listado();

articulos.forEach(element => {
  Listado.agregarArt(element)
})
// console.log(Listado.articulos)

/* GET home page. */
router.get('/', function(req, res) {
  res.json({ title: 'Api Rest: Blog de Publicaciones' });
})

// GET para mostrar articulos
router.get('/articulos', (req,res)=>{
  if(typeof Listado === 'undefined'){
    res.status(400).send('No hay articulos para mostrar');
  }else{
    Listado.mostrarList(res);
  }
})

router.post('/register', validarAdmin, (req, res) => {
  req.session.admin = {
    rol: "Admin",
    usuario : req.body.usuario,
    password : req.body.password
  }
  res.status(200).redirect('/perfil')
})

router.get('/perfil/:rol', (req, res) => {
  if(req.params.rol === "Admin" || req.session.admin.rol === 'Admin') {
    res.status(200).send(`Administrador En Linea: \n${req.session.admin.usuario}`)
  } else {
    res.status(400).send('Usted es un Usuario, solo puede ver la lista de los articulos disponibles')
  }
})

//GET para mostrar por nombre
router.get('/articulo/:titulo/:rol', (req,res)=>{
  if(req.params.rol === "Admin") {
    if(typeof Listado === 'undefined'){
      res.send('No hay articulos')
    }else{
      Listado.buscarArt(req.params.titulo,res)
    }
  } else {
    res.status(400).send('Usted es un Usuario, solo puede ver la lista de los articulos disponibles')
  }
})

router.post('/new-article/:rol', validarCampos, (req, res)=>{
  if(req.params.rol === "Admin") {
    nuevoArticulo = new articulo(req, res)
    Listado.agregarArt(nuevoArticulo);
    articulos.push(nuevoArticulo)
    let jsonArticulos = JSON.stringify(articulos)
    fs.writeFileSync('articulos.json', jsonArticulos, 'utf-8')
    res.status(200).send("Articulo Creado Correctamente")
  } else {
    res.status(400).send('Usted es un Usuario, solo puede ver la lista de los articulos disponibles')
  }
})

router.post('/new-article-video/:rol', validarCamposVideo, (req, res)=>{
  if(req.params.rol === "Admin") {
    nuevoArticulo = new articuloVideo(req, res)
    Listado.agregarArt(nuevoArticulo);
    articulos.push(nuevoArticulo)
    let jsonArticulos = JSON.stringify(articulos)
    fs.writeFileSync('articulos.json', jsonArticulos, 'utf-8')
    res.status(200).send("Articulo Creado Correctamente")
  } else {
    res.status(400).send('Usted es un Usuario, solo puede ver la lista de los articulos disponibles')
  }
})

router.put('/modificarArt/:titulo/:rol', validarUpdate, (req,res)=>{
  if(req.params.rol === "Admin") {
    if(typeof Listado === 'undefined'){
      res.status(400).send('No hay articulos disponibles')
    }else{
      Listado.editarArt(req.params.titulo, req.body, res);
      guardaJSON()
      res.status(200).send('Articulos Modificado');
    }
  } else {
    res.status(400).send('Usted es un Usuario, solo puede ver la lista de los articulos disponibles')
  }
})

//PUT Modificar solo una propiedad
router.put('/modificar/:propiedad/:titulo/:rol', validarUpdate, (req,res)=>{
  if(req.params.rol === "Admin") {
    if(typeof Listado === 'undefined'){
      res.status(400).send('No hay articulos disponibles')
    }else{
      Listado.editarPropiedad(req.params.titulo, req.params.propiedad,req,res);
      guardaJSON()
      res.status(200).send('La propiedad se edito correctamente');
    }
  } else {
    res.status(400).send('Usted es un Usuario, solo puede ver la lista de los articulos disponibles')
  }
})

router.delete('/delete/:titulo/:rol', (req, res) => {
  if (req.params.rol === "Admin") {
    if(typeof Listado === 'undefined'){
      res.send('No hay articulos')
    }else{
      Listado.deleteArt(req.params.titulo, res)
      guardaJSON()
      res.status(200).send('Articulo Eliminado');
    }
  } else {
    res.status(400).send('Usted es un Usuario, solo puede ver la lista de los articulos disponibles')
  }
})

module.exports = router;
