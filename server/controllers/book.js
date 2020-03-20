const express = require('express');

const app = express();


app.get('/book', (req, res) => {

    res.json('get');

});

app.post('/book', (req, res) => {

    let body = req.body;

    res.status(200).json({
        book: body
    });

});

app.put('/book/:id', (req, res) => {

    let id = req.params.id;

    res.status(200).json({
        id
    });

});

app.delete('/book', (req, res) => {

    res.json('delete');

});


module.exports = app;