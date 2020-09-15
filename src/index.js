const path = require('path');
const express = require('express');
const helmet = require('helmet');

const app = express();

app.set('views',path.resolve(__dirname,'./views/'))
app.set('view engine','ejs');

//seguridad basica. modifica headers de respuesta importantes.
//NOTA: algunas opciones de helmet no permiten incluir librarias de terceros de javascript, por seguridad
//DESACTIVADO DURANTE DESARROLLO LOCAL
app.use(helmet());

// esta ruta esta disponible para toda la app de Express, se usa para toda la app.
app.use('/static',express.static(path.resolve(__dirname, 'public/assets')));

// importando rutas.
app.use(require('./Routes/root'));

//si el codigo llega a este punto, Retorna not found 404
app.use((req, res) => {
  res.statusCode = 404;
  res.send('ERROR!, no se encontro pagina!')
});

app.listen(4443, () => console.log('init'));  

