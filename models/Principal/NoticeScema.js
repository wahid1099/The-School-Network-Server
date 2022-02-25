const mongoose = require('mongoose');

const NoticeSchema = mongoose.Schema({
    title: {
        type: String,
        required: false
    },
    description:  {
        type: String,
        required: false
    },
    img:{
        type: mongoose.Mixed
    },
    date:{
        type : Date, default: Date.now 
    }
})
 
module.exports = NoticeSchema;
