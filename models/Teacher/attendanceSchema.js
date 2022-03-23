const mongoose = require("mongoose");

const attendanceSchema = mongoose.Schema({
    email: {
        type: String,
        required: false,
    },
    month: {
        type: String,
        required: false,
    },
    totalClass: {
        type: Number,
        required: false,
    },
    presentDays: {
        type: Number,
        required: false,
    },
    absentDays: {
        type: Number,
        required: false,
    },
});

module.exports = attendanceSchema;
