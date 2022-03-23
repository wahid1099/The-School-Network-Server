const mongoose = require("mongoose");

const AssignmentSchema = mongoose.Schema({
    title: {
        type: String,
        required: false,
    },

    description: {
        type: String,
        required: false,
    },
    img: {
        type: mongoose.Mixed,
    },
});

module.exports = AssignmentSchema;
