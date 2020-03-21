const express = require('express');
const Book = require('../models/book');

const app = express();


app.get('/book', (req, res) => {

    res.json('get');

});

app.post('/book', (req, res) => {

    let body = req.body;

    let book = new Book({
        isbn: body.isbn,
        title: body.title,
        author: body.author,
        pages: body.pages,
        editorial: body.editorial,
        status: body.status
    });

    book.save((err, bookDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.status(200).json({
            ok: true,
            book: bookDB
        });
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