const express = require('express');
const path = require('path');
const multer = require('multer');
const DB = require('../db_conn/db');
const INDEX_PAGE = path.resolve(__dirname, '../public/Bienvenida.html');

//con esta opcion. solo se puede establecer rutas que coincidan exactamente
//SOLO FUNCIONA BAJO ESTE ROUTER.
const Rutas = express.Router({ caseSensitive: true });

Rutas.get('/', (req, res) => res.redirect('/index'))

// solo envia el archivo , el html resolverá los archivos estaticos que necesite
Rutas.get('/index', (req, res) => res.sendFile(INDEX_PAGE))

Rutas.get('/tablas', async (req, res) => {
  
  try {
   const respuesta = await DB.query("SELECT * FROM nodetest");
   res.render('Table', { data: respuesta.rows })
  } catch (e) {
    res.send('¡ERROR!, intenta recargar la página')
  }
})

Rutas.post('/tablas/submit', multer().none(), async (req, res) => {
  
  try {
    const { Name, Age, perms,identificador_unico } = req.body;
    const valores = [Name, Age, perms,identificador_unico];
    await DB.query("INSERT INTO nodetest (nombre,edad,perm,identificador_unico) VALUES ($1,$2,$3,$4)", valores)
    
    res.json({Success:true,message:''})
  } catch (e) {

    switch (e.code) {
      case '23505':
        res.json({Success:false,message:'El identificador único enviado ya existe en la base de datos'})    
      break;
    
      default:
        res.json({Success:false,message:'Ha ocurrido otro error.'})    
      break;
    }

  }

})

Rutas.post('/tablas/del',express.json() , async (req, res) => {
 try {
   const id = [req.body.selected_id]

   await DB.query("DELETE FROM  nodetest WHERE  worker_id = $1 ", id)  

   res.json({Success:true,message:''})
   
 } catch (e) {

   res.json({Success:false,message:'¡¡Error en el backend!!'})
 } 
  
})

module.exports = Rutas;