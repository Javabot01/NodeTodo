//jshint esversion:8
const path = require('path');
const express = require('express');
const { App } = require('./config');
const bodyParser = require('body-parser');
require('./config');

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

app.listen(App.PORT, () => {
    console.log('Server started on port: ', App.PORT);

});

// const server = http.createServer((req, res) => {
//     res.write('Hello World');
//     res.end();
// })

// const port = 3000;

// server.listen(port, () => {
//     console.log("server started on port:", port);

// })
