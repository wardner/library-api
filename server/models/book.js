const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let BookSchema = new Schema({

    isbn: {
        type: String,
        required: [true, 'Es necesario el ISBN'],
        unique: true
    },
    title: {
        type: String,
        required: [true, 'El Titulo del libro es necesario']
    },
    author: {
        type: String
    },
    pages: {
        type: Number
    },
    editorial: {
        type: String
    },
    status: {
        type: Boolean
    },

});

module.exports = mongoose.model('Book', BookSchema);