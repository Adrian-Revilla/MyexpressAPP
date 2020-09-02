const express = require('express');
const path = require('path');
const APP = express();
const helmet = require('helmet');
const Rutas_raiz = require('./Routes/root')




//seguridad basica. modifica headers de respuesta importantes.
//NOTA: algunas opciones de helmet no permiten incluir librarias de tercer de javascript, por seguridad
APP.use(helmet());


// SOLO IMPORTA ARCHIVOS ESTATICOS para que este disponible bajo la ruta "/static".
// esta ruta esta disponible para toda la app de Express
APP.use('/static',express.static(path.resolve(__dirname, 'public/assets')));

// importando rutas.
APP.use(Rutas_raiz);


//si el codigo llega a este punto, Retorna not found 404
APP.use((req, res) => {
  res.statusCode = 404;
  res.send('ERROR!, no se encontro pagina!')
});


APP.listen(8000);