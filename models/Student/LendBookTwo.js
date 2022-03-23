const mongoose = require("mongoose");

const LentBookCollectionTwo = mongoose.Schema({
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
    },
    name:{
        type: String
    },
    roll:{
        type: String
    },
    class:{
        type: String
    },
    section:{
        type: String
    },
    email:{
        type: String
    },
    lentDate:{type: String},
    status:{type: String},
    bookId:{type: String} 
});

module.exports = mongoose.model("LentBookCollectionTwo", LentBookCollectionTwo);