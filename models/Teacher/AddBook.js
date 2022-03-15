const mongoose = require("mongoose");

const BookCollection = mongoose.Schema({
    bookName:{
        type: String
    },
    writerName:{
        type: String
    },
    availableBook:{
        type: String
    },
    category:{
        type: String
    },
    description:{
        type: String
    },
    bookImg:{
        type: mongoose.Mixed
    }
});

module.exports = mongoose.model("BookCollection", BookCollection);
