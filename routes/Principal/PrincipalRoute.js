const router = require("express").Router();
const mongoose = require('mongoose');
const noticeSchema = require('../../models/Principal/NoticeScema')
const TeacherNotice = new mongoose.model("TeacherNotice", noticeSchema)


//Checking user
router.post("/publisNotice", async (req, res) => {
    console.log('hitted publisNotice')
    const notice = new TeacherNotice(req.body);
    console.log(req.body)
    try{
        await notice.save();
        // res.send({success: 'success'})
    }
    catch(er){
        console.log(er)
    }
});

module.exports = router;