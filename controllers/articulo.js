class articulo{
   constructor(req, res){
      this.titulo = req.body.titulo;
      this.subtitulo = req.body.subtitulo;
      this.fecha = this.generarFecha();
      this.autor = req.body.autor;
      this.cuerpo = req.body.cuerpo;
      if (typeof req.body.enlaces !== 'undefined') {
         this.enlaces = req.body.enlaces;
      }
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

   set Titulo(value){
      this.titulo = value
   }
   set Subtitulo(value){
      this.subtitulo = value
   }
   set Fecha(value){
      this.fecha = this.generarFecha()
   }
   set Autor(value){
      this.autor = value
   }
   set Cuerpo(value){
      this.cuerpo = value
   }
   set Enlaces(value){
      this.enlaces = value
   }

}

module.exports = articulo;