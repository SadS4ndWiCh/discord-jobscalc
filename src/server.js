const express = require('express');
const server = express();
const routes = require('./routes');

const path = require('path');

// Alterando a 'Engine' do express para ejs
server.set('view engine', 'ejs');

// Por padrão o express detecta a pasta 'views' no root
// da aplicação, então dessa forma alteramos qual pasta ele
// enxergará, que no caso é src/views/
server.set('views', path.join(__dirname, 'views'));

// Usar os arquivos estáticos que estão na pasta public/
server.use(express.static('public'));

// Permitir que receba o Body na requisição
server.use(express.urlencoded({ extended: true }));

// Usar a rotas definidas no arquivo routes.js
server.use(routes);


server.listen(3000, () => console.log('Server listing in port 3000: http://localhost:3000/'));