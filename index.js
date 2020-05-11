//jshint esversion:8
const { app } = require('./app');
const { App } = require('./config')

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
