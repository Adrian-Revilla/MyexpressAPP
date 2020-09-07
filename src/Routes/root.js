const express = require('express');
const path = require('path');

const multer = require('multer');
const carga = multer();

const {Client} = require('pg')

const Cliente = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'dvdrental',
  password: '123',
  port: 5432,
});




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


Rutas.get('/tablas', (req, res) => {  
  res.render('Table',{woo:'SERVER SIDE RENDENRING'});
})


Rutas.post('/submit', carga.none(), async (req, res) => {

 await Cliente.connect()
 const respuesta= await Cliente.query("SELECT first_name FROM customer WHERE first_name LIKE 'E%' " )
  Cliente.end()
  console.log(respuesta)
  res.send('si')
   
  

  // console.log(req.body.Name)
  
})

module.exports = Rutas;