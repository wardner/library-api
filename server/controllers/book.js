const express = require('express');
const Book = require('../models/book');
const _ = require('underscore');

const app = express();


app.get('/book', (req, res) => {

    let skip = req.query.skip || 0;
    let limit = req.query.limit || 5;
    limit = Number(limit);
    skip = Number(skip);

    Book.find({}, 'isbn title author pages editorial status')
        .skip(skip)
        .limit(limit)
        .exec((err, books) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                books,
                total: books.length
            })

        });

});

app.get('/book/:isbn', (req, res) => {

    let { isbn } = req.params;

    Book.find({ isbn }, 'isbn title author pages editorial status')
        .exec((err, book) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            if (!book) {
                return res.status(400).json({
                    ok: false,
                    err: {
                        message: 'Libro no encontrado'
                    }
                });
            }

            res.json({
                ok: true,
                book
            });

        });

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

    let { isbn } = req.params;
    let body = _.pick(req.body, ['title, author, pages, editorial, status']);

    Book.findOneAndUpdate({ isbn }, body, { new: true, useFindAndModify: false },
        (err, bookDB) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            if (!bookDB) {
                return res.status(404).json({
                    ok: false,
                    err: {
                        message: 'Libro no encontrado'
                    }
                });
            }

            res.status(200).json({
                ok: true,
                book: bookDB
            });
        });

});

app.delete('/book/:isbn', (req, res) => {

    let { isbn } = req.params;

    Book.findOneAndDelete({ isbn }, (err, deletedbook) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        if (!deletedbook) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Libro no encontrado'
                }
            });
        }

        res.status(200).json({
            ok: true,
            book: deletedbook
        });

    });

});


module.exports = app;