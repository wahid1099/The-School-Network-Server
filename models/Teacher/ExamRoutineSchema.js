const mongoose = require("mongoose");

const ExamRoutineSchema = mongoose.Schema({
    class: {
        type: String,
        required: false,
    },
    term: {
        type: String,
        required: false,
    },
    routineImg: {
        type: mongoose.Mixed,
    },
});

module.exports = ExamRoutineSchema;
