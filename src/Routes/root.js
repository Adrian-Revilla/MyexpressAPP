const express = require('express');
const path = require('path');

//ESTA OPCION EVITA QUE ESTE MODULO EN  ESPECIFICO ACEPTE rutas con mayusculas
const Rutas = express.Router({
  caseSensitive:true
}); 


Rutas.get('/', (req, res) => {
  res.redirect('/index')
})

Rutas.get('/index', (req, res) => {

  // solo envia el archivo , el html resolverá los archivos estaticos que necesite
  res.sendFile(path.resolve(__dirname, '../public/Bienvenida.html'));
  
})


Rutas.get('/tablas', (req,res) => {
  res.sendFile(path.resolve(__dirname, '../public/TablaDeDatos.html'));
})

module.exports = Rutas;