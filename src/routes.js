const express = require('express');
const routes = express();

const basePath = __dirname + '/views/';

const profile = {
    name: 'SadS4ndWiCh',
    avatar: 'https://github.com/SadS4ndWiCh.png',
    'monthly-budget': 4500,
    'hours-per-day': 6,
    'days-per-week': 4,
    'vacation-per-year': 6,
}

routes.get('/', (req, res) => res.render(basePath + 'index'));
routes.get('/job', (req, res) => res.render(basePath + 'job'));
routes.get('/job/edit', (req, res) => res.render(basePath + 'job-edit'));
routes.get('/profile', (req, res) => res.render(basePath + 'profile', { profile }));

module.exports = routes;