//jshint esversion:8
const dotenv = require('dotenv');
const path = require('path');
const mongoose = require('mongoose');

dotenv.config({
    path: path.resolve(__dirname, '../.env')
});

const Config = Object.freeze({
    App: {
        PORT: process.env.PORT,
        BASE_URL: process.env.BASE_URL
    },
    Mongo: {
        URI: process.env.MONGO_URI
    }
});

mongoose.connect(Config.Mongo.URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

module.exports = Config;