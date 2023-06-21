require('dotenv').config();
const express = require('express');
const app = express();

const mongoose = require('mongoose');
mongoose.connect(process.env.connectionString,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
      })
      .then(() => {
        app.emit('pronto');
      })
      .catch(e => console.log(e)
    );
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');

const routes = require('./routes');
const path = require('path');
const csrf = require('csurf');
const {middlewareGlobal, checkCsrfError, csrfMiddleware} = require('./src/middlewares/middleware');

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'public')));

//configurando a session
app.use(
    session({
    secret: 'segredo guardado',
    store: MongoStore.create({mongoUrl: process.env.connectionString}),//mongooseConnection: mongoose.connection}),
    resave: false,
    saveUninitialized: false,
    cookie:{
        maxAge: 1000*60*60*24*7, // milisegundo*segundos*minutos*horas*dias
        httpOnly:true
    }
}));
app.use(flash());

app.set('views', path.resolve(__dirname, 'src', 'views'));
app.set('view engine', 'ejs');

app.use(csrf());

app.use(middlewareGlobal);
app.use(checkCsrfError);
app.use(csrfMiddleware);

app.use(routes);
app.on('pronto', () => {
    app.listen(7000, () => {
        console.log('Estamos rodando no canal: http://localhost:7000');
    });
  });