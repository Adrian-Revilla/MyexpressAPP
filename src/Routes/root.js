const express = require('express');
const path = require('path');
const multer = require('multer');
const DB = require('../db_conn/db');
const body_parser = require('body-parser');



const Rutas = express.Router({
  //con esta opcion. solo se puede establecer rutas que coincidan exactamente
  //SOLO FUNCIONA BAJO ESTE ROUTER.
  caseSensitive: true
});


Rutas.get('/', (req, res) => res.redirect('/index'))

// solo envia el archivo , el html resolverá los archivos estaticos que necesite
Rutas.get('/index', (req, res) => res.sendFile(path.resolve(__dirname, '../public/Bienvenida.html')))

Rutas.get('/tablas', async (req, res) => {
  
  try {

   const respuesta = await DB.query("SELECT * FROM nodetest");
   res.render('Table', { woo: 'SERVER SIDE RENDENRING', data: respuesta.rows })

  } catch (e) {
    console.log(e.message)
    res.send('ERROR')
  }
})

Rutas.post('/tablas/submit', multer().none(), async (req, res) => {
  
  try {
    const { Name, Age, perms,UID } = req.body;
    const valores = [Name, Age, perms,UID];
    const respuesta = await DB.query("INSERT INTO nodetest (nombre,edad,perm,identificador_unico) VALUES ($1,$2,$3,$4)", valores) 
    res.send(JSON.stringify({ success: true }))
  } catch (e) {
    res.send(JSON.stringify({ success: false,error:'23505', message:'El identicador enviado ya existe, intente con otro valor' }))
  }

})


Rutas.post('/tablas/del',body_parser.json(), async (req, res) => {
 try {
  const id = [req.body.selected_id];
   const respuesta = await DB.query("DELETE FROM  nodetest WHERE  worker_id = $1 ", id)  
   res.send(JSON.stringify({data:'si'}))
   
 } catch (error) {
   
   res.send(JSON.stringify({message:'hubo un error eliminado la info, intente recargar la pagina'}))
 } 
  
})




module.exports = Rutas;