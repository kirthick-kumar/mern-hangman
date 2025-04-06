const { Schema, model } = require('mongoose')

const wordSchema = Schema({
    word: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    }
});

module.exports = model('Word', wordSchema);
