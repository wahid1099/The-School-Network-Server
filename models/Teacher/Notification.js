const mongoose = require("mongoose");

const NotificationCollection = mongoose.Schema({
    email: {
        type: String,
        required: false,
    },
    bookName: {
        type: String,
        required: false,
    },
    received: {
        type: String,
        required: false,
    },
    message: {
        type: String,
        required: false,
    },
    
});

module.exports = mongoose.model("NotificationCollection", NotificationCollection);
