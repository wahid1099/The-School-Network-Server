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
    class: {
        type: String,
    },
    submssionarray: {
        type: Array,
    },
});

module.exports = AssignmentSchema;
