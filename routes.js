const express = require('express');
const route = express.Router();
const {middlewareGlobal, checkCsrfError} = require('./src/middlewares/middleware.js');
const homeController = require('./src/Controllers/homeController');
const loginController = require('./src/Controllers/loginController');
route.get('/', homeController.index);
route.get('/login/index', loginController.index);
module.exports = route;