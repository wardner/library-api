require('./config/config');

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use(require('./controllers/book'));

mongoose.connect('mongodb://localhost:27017/library', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    },
    (err, res) => {

        if (err) {
            throw err;
        }

        console.log('base de datos online');

    });

app.listen(process.env.PORT, () => {
    console.log('escuchando puerto: ', process.env.PORT);
});