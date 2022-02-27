const mongoose = require('mongoose')

const ResultSchema = mongoose.Schema({
    bangla1:{
        type: String,
        required: false
    },
    bangla2:{
        type: String,
        required: false
    },
    english1:{
        type: String,
        required: false
    },
    english2:{
        type: String,
        required: false
    },
    religion:{
        type: String,
        required: false
    },
    gs:{
        type: String,
        required: false
    },
    firsttermCgpa:{
        type: String,
        required: false
    },
    secondtermCgpa:{
        type: String,
        required: false
    },
    mathCgpa:{
        type: String,
        required: false
    },
    thirdtermCgpa:{
        type: String,
        required: false
    },
    bangla1Cgpa:{
        type: String,
        required: false
    },
    bangla2Cgpa:{
        type: String,
        required: false
    },
    english1Cgpa:{
        type: String,
        required: false
    },
    english2Cgpa:{
        type: String,
        required: false
    },
    religionCgpa:{
        type: String,
        required: false
    },
    gsCgpa:{
        type: String,
        required: false
    },
    Failcount1:{
        type: String,
        required: false
    },
    banglaCgpa:{
        type: String,
        required: false
    },
    englishCgpa:{
        type: String,
        required: false
    },
    scienceCgpa:{
        type: String,
        required: false
    },
    bangla:{
        type: String,
        required: false
    },
    english:{
        type: String,
        required: false
    },
    science:{
        type: String,
        required: false
    },
    name:{
        type: String,
        required: false
    },
    roll:{
        type: String,
        required: false
    },
    section:{
        type: String,
        required: false
    },
    class:{
        type: String,
        required: false
    },
    term:{
        type: String,
        required: false
    },
})

module.exports = ResultSchema;

