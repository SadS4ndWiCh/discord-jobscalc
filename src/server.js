const express = require('express');
const server = express();
const routes = require('./routes');

// const path = require('path');

// Alterando a 'Engine' do express para ejs
server.set('view engine', 'ejs');

/* 
-- Por algum motivo do destino não functiona --

// Por padrão o express detecta a pasta 'views' no root
// da aplicação, então dessa forma alteramos qual pasta ele
// enxergará, que no caso é src/views/
server.set('views', __dirname + '/views/');
 */

// Usar os arquivos estáticos que estão na pasta public/
server.use(express.static('public'));

// Usar a rotas definidas no arquivo routes.js
server.use(routes);

server.listen(3000, () => console.log('Server listing in port 3000: http://localhost:3000/'));