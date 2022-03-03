const mongoose = require("mongoose");

const NoticeSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    class: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

module.exports = NoticeSchema;
