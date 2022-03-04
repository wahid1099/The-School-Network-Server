const mongoose = require('mongoose');

const AnnouncementSchema = mongoose.Schema({
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
        type : String
    }
})
 
module.exports = AnnouncementSchema;
