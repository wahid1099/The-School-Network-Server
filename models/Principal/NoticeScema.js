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
        type : String,
    },
    noticeFrom:{
        type: String,
        required: false
    }
})
 
module.exports = NoticeSchema;
