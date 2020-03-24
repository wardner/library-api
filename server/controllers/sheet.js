const express = require('express');
const Sheet = require('../models/sheet');

const app = express();


app.get('/sheet', (req, res) => {

    let skip = req.query.skip || 0;
    let limit = req.query.limit || 5;
    limit = Number(limit);
    skip = Number(skip);

    Sheet.find({})
        .skip(skip)
        .limit(limit)
        .exec((err, pages) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            Sheet.countDocuments({}, (err, count) => {
                res.json({
                    ok: true,
                    pages,
                    total: count
                })
            });

        });

});

app.post('/sheet', async(req, res) => {

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

app.put('/sheet/:id', (req, res) => {

    let isbn = req.params.id;
    let body = req.body;

    Sheet.findOneAndUpdate({ isbn }, body, { new: true, useFindAndModify: false },
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

app.delete('/sheet/:isbn/:pagenumber', async(req, res) => {

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
            sheet: deletedSheet
        });

    });

});

module.exports = app;