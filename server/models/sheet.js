const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let SheetSchema = new Schema({
    body: {
        type: String
    },
    isbn: {
        type: String
    }
});


module.exports = mongoose.model('Sheet', SheetSchema);