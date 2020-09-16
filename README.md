# MyexpressAPP
Este repositorio consiste en una aplicacion de backend que hace uso de server-side rendering con EJS
tiene como base de datos Postgresql, y expressjs como framework web que une a todas estas tecnologias


### Estructura del repositorio
```
.
├── package.json
├── package-lock.json
└── src
    ├── db_conn
    │   └── db.js
    ├── index.js
    ├── public
    │   ├── assets
    │   │   ├── favicon.ico
    │   │   ├── scripts.js
    │   │   └── style.css
    │   └── Bienvenida.html
    ├── Routes
    │   └── root.js
    └── views
        ├── partials
        │   ├── form.ejs
        │   └── list.ejs
        └── Table.ejs

```
### Notas sobre el proyecto

* src/index.js es el punto central de la app, se inicializa middleware y se agregan rutas. 
* src/db_conn/db.js contiene las credenciales para conectarse en una base de datos local **(estas credenciales solo funciona en un desarrollo local, 
el link de la descripcion lleva a una web hosteada en Heroku donde si hace uso de credenciales de una postgressql DB propocionada por heroku)**
* src/Routes/root.js es un modulo  de rutas de express, donde está la mayoria del codigo de las rutas de la app.
* src/views/ donde estan las vistas que se renderizarán cuando se haga match de alguna ruta
* src/public/ solo tiene archivos estaticos que usa la app **no esta empaqueta con webpack ni ninguna otra herramienta parecida con el fin de mostrar el codigo**
