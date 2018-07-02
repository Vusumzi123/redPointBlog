'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors')
const hogan = require('hogan-express');

const routes = require('./routes.js');


const App = function () {

    this.app = express();

    this.middleware = function () {
        this.app.engine('html', hogan);
        this.app.set('view engine', 'html');
        this.app.use(cors());
        this.app.use(express.static(path.join(__dirname + '/dist')));
        this.app.use(bodyParser.urlencoded({ extended: false }));
    }

    this.middleware();
    routes(this.app)
}

module.exports = new App().app;


