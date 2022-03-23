const mongoose = require("mongoose");

const ClassRoutineSchema = mongoose.Schema({
    class: {
        type: String,
        required: false,
    },
    section: {
        type: String,
        required: false,
    },
    routineImg: {
        type: mongoose.Mixed,
    },
});

module.exports = ClassRoutineSchema;
