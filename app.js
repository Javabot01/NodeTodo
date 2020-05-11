//jshint esversion:8
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const App = require('./config');

const { TodoRouter } = require('./routes/todo');

const app = express();

app.set('view engine', 'ejs');
// app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'assets')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.render('index', {
        title: 'My App',
        baseUrl: App.BASE_URL
    });
});


app.use('/todo', TodoRouter);

module.exports = { app };