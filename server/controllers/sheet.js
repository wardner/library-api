const express = require('express');
const Sheet = require('../models/sheet');

const app = express();


app.get('/sheet', (req, res) => {

    res.json('get');

});

app.post('/sheet', (req, res) => {

    let body = req.body;

    let sheet = new Sheet({
        content: body.content,
        isbn: body.isbn
    });

    sheet.save((err, sheetDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.status(200).json({
            ok: true,
            sheet: sheetDB
        });

    });

});

app.put('/sheet/:id', (req, res) => {

    let isbn = req.params.id;
    let body = req.body;

    Sheet.findOneAndUpdate(isbn, body, { new: true, useFindAndModify: false },
        (err, sheetDB) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            res.status(200).json({
                ok: true,
                sheet: sheetDB
            });

        });


});



module.exports = app;