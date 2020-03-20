require('./config/config');

const express = require('express');
const app = express();
const bodyParser = require('body-parser');

//parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

//parse application/json
app.use(bodyParser.json);

app.get('/', (req, res) => {

    res.status(200).json('hello world');

});

app.listen(process.env.PORT, () => {
    console.log('escuchando puerto: ', process.env.PORT);
});