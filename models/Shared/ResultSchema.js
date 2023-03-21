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
    math:{
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
    draw:{
        type: String,
        required: false
    },

    bangla1mid:{
        type: String,
        required: false
    },
    bangla2mid:{
        type: String,
        required: false
    },
    english1mid:{
        type: String,
        required: false
    },
    english2mid:{
        type: String,
        required: false
    },
    religionmid:{
        type: String,
        required: false
    },
    gsmid:{
        type: String,
        required: false
    },
    mathmid:{
        type: String,
        required: false
    },
    banglamid:{
        type: String,
        required: false
    },
    englishmid:{
        type: String,
        required: false
    },
    sciencemid:{
        type: String,
        required: false
    },
    drawmid:{
        type: String,
        required: false
    },

    bangla1final:{
        type: String,
        required: false
    },
    bangla2final:{
        type: String,
        required: false
    },
    english1final:{
        type: String,
        required: false
    },
    english2final:{
        type: String,
        required: false
    },
    religionfinal:{
        type: String,
        required: false
    },
    gsfinal:{
        type: String,
        required: false
    },
    mathfinal:{
        type: String,
        required: false
    },
    banglafinal:{
        type: String,
        required: false
    },
    englishfinal:{
        type: String,
        required: false
    },
    sciencefinal:{
        type: String,
        required: false
    },
    drawfinal:{
        type: String,
        required: false
    },

    bangla1total:{
        type: String,
        required: false
    },
    bangla2total:{
        type: String,
        required: false
    },
    english1total:{
        type: String,
        required: false
    },
    english2total:{
        type: String,
        required: false
    },
    religiontotal:{
        type: String,
        required: false
    },
    gstotal:{
        type: String,
        required: false
    },
    mathtotal:{
        type: String,
        required: false
    },
    banglatotal:{
        type: String,
        required: false
    },
    englishtotal:{
        type: String,
        required: false
    },
    sciencetotal:{
        type: String,
        required: false
    },
    drawtotal:{
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
    thirdtermCgpa:{
        type: String,
        required: false
    },

    mathCgpa:{
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
    drawCgpa:{
    type: String,
    required: false
    },

    Failcount:{
        type: String,
        required: false
    },
    Failcount1:{
        type: String,
        required: false
    },
    Failcount3:{
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

