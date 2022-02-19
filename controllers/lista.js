class listado{
   constructor(){
      this.articulos = [];
   }

   agregarArt(data){
      this.articulos.push(data);
   }

   mostrarList(res){
      let ListaArt=[];
      this.articulos.forEach(e => {
         ListaArt.push({
            titulo: e.titulo
         })
      });
      res.status(200).json(ListaArt);
   }
   buscarArt(data,res){
      let artEncontrado = this.articulos.find(e=> e.titulo == data);
      if(artEncontrado==undefined){
         res.status(400).send('el articulo que desea ver no existe');
      }else{
         res.status(200).json(artEncontrado);
      }
   }

   editarArt(art,data,res){
      let artEncontrado = this.articulos.find(e => e.titulo == art);
      if(artEncontrado==undefined){
         res.status(400).send('El articulo que desea editar no existe');
      }else{
         this.articulos[this.articulos.indexOf(artEncontrado)] = data;
         res.status(200).send('Articulo Modificado');
      }
   }
}

module.exports = listado;