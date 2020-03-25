const express = require('express');
const Sheet = require('../models/sheet');

const app = express();

// /sheet
app.get('/:isbn', (req, res) => {

    let { isbn } = req.params;
    let skip = req.query.skip || 0;
    let limit = req.query.limit || 5;
    limit = Number(limit);
    skip = Number(skip);

    Sheet.find({ isbn })
        .skip(skip)
        .limit(limit)
        .exec((err, pages) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            if (!pages[0]) {
                return res.status(404).json({
                    ok: false,
                    err: {
                        message: 'No se encontraron paginas de ese libro modofoka'
                    }
                })
            }

            res.json({
                ok: true,
                pages,
                total: Sheet.length
            })

        });

});

// /sheet
app.get('/:isbn/:pagenumber', (req, res) => {

    let { isbn, pagenumber } = req.params;
    let skip = req.query.skip || 0;
    let limit = req.query.limit || 5;
    limit = Number(limit);
    skip = Number(skip);

    Sheet.find({ isbn, pagenumber })
        .skip(skip)
        .limit(limit)
        .exec((err, pages) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            if (!pages[0]) {
                return res.status(404).json({
                    ok: false,
                    err: {
                        message: `No se hayo la pagina ${pagenumber} del libro`
                    }
                });
            }

            res.json({
                ok: true,
                pages,
                total: Sheet.length
            });

        });

});

// /sheet
app.post('/', async(req, res) => {

    let { content, isbn } = req.body;

    let count = await Sheet.countDocuments({ isbn });

    let sheet = new Sheet({
        content,
        isbn,
        pagenumber: count + 1
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

// /sheet
app.put('/:isbn/:pagenumber', (req, res) => {

    let { isbn, pagenumber } = req.params;
    let body = req.body;

    Sheet.findOneAndUpdate({ isbn, pagenumber }, body, { new: true, useFindAndModify: false },
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

// /sheet
app.delete('/:isbn/:pagenumber', async(req, res) => {

    let { isbn, pagenumber } = req.params;

    Sheet.findOneAndDelete({ isbn, pagenumber }, (err, deletedSheet) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        };

        if (!deletedSheet) {
            return res.status(404).json({
                ok: false,
                err: {
                    message: 'La pagina no fue encontrada'
                }
            });
        }

        res.status(200).json({
            ok: true,
            sheet: `La pagina ${pagenumber} se ha eliminado`
        });

    });

});

module.exports = app;