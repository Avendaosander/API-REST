class listado{
   constructor(){
      this.articulos = [];
   }

   generarFecha() { 
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
         
         this.articulos[this.articulos.indexOf(artEncontrado)].vistas++;
         res.status(200).json(artEncontrado);
//promesa
         function buscarArt(data,res) {
            articulos.find(data,res)
               .then(function(artEncontrado) {
                  res.send(artEncontrado)
               })
               .catch(function(err){
                  res.send(err);
               })
           }
      }
   }

   editarArt(art,data,res){
      let artEncontrado = this.articulos.find(e => e.titulo == art);
      if(artEncontrado==undefined){
         res.status(400).send('El articulo que desea editar no existe');
      }else{
         data = {
            titulo: data.titulo,
            subtitulo: data.subtitulo,
            fecha: this.generarFecha(),
            autor: data.autor,
            cuerpo: data.cuerpo,
         }
         this.articulos[this.articulos.indexOf(artEncontrado)] = data;
         this.articulos[this.articulos.indexOf(data)].vistas = 0;
      }
   }

   //EDITAR SOLO UNA PROPIEDAD
   editarPropiedad(art,propiedad,req,res){
      let propiedades = ['titulo','subtitulo', 'autor', 'cuerpo','enlaces']
      let Articulo = this.articulos.find(e => e.titulo == art);
      if(Articulo == undefined || !propiedades.includes(propiedad)){
         res.status(400).json({'error': 'Hay dos posibles errores, o el articulo que desea editar no existe o la propiedad que desea editar no se puede editar, recuerde que la fecha es una propiedad que no se puede cambiar'});
      }else{
         switch (propiedad) {
            case 'titulo':
               this.articulos[this.articulos.indexOf(Articulo)].titulo = req.body.titulo;
               this.articulos[this.articulos.indexOf(Articulo)].fecha = this.generarFecha();
               break;
            case 'subtitulo':
               this.articulos[this.articulos.indexOf(Articulo)].subtitulo = req.body.subtitulo;
               this.articulos[this.articulos.indexOf(Articulo)].fecha = this.generarFecha();
               break;
            case 'autor':
               this.articulos[this.articulos.indexOf(Articulo)].autor = req.body.autor;
               this.articulos[this.articulos.indexOf(Articulo)].fecha = this.generarFecha();
               break;
            case 'cuerpo':
               this.articulos[this.articulos.indexOf(Articulo)].cuerpo = req.body.cuerpo;
               this.articulos[this.articulos.indexOf(Articulo)].fecha = this.generarFecha();
               break;
            case 'enlaces':
               this.articulos[this.articulos.indexOf(Articulo)].enlaces = req.body.enlaces;
               this.articulos[this.articulos.indexOf(Articulo)].fecha = this.generarFecha();
               break;
         }
      }
   }

   deleteArt(data,res){
      let artEncontrado = this.articulos.find(e=> e.titulo == data);
      if(artEncontrado==undefined){
         res.status(400).send('el articulo que desea ver no existe');
      } else {
         this.articulos = this.articulos.filter(e=> e.titulo !== data);
      }
   }
}

module.exports = listado;