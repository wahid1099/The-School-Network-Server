const router = require("express").Router();
const mongoose = require('mongoose');
const noticeSchema = require('../../models/Principal/NoticeScema')
const TeacherNotice = new mongoose.model("TeacherNotice", noticeSchema)
const AnnouncementSchema = require('../../models/Principal/AnnouncementScema')
const UserAnnouncement = new mongoose.model("UserAnnouncement", AnnouncementSchema)
const MonthlyPayment = require('../../models/Principal/PaymentUplaodSchema')
const userSchema = require('../../models/Shared/UserSchema')
const UserCollection = new mongoose.model("UserCollection", userSchema)
const ObjectId = require('mongodb').ObjectId; 
const AddmissionFormCollection = require("../../models/PaymentModel/PaymentModel");

//Publishing Text Notice
router.post("/publisNotice", async (req, res) => {
    const notice = new TeacherNotice(req.body);
    try{
        await notice.save();
        
        res.send({ success: "success" });
    } catch (er) {
        console.log(er);
    }
});

//Publishing Image Notice
router.post("/PublishImageNotice", async (req, res) => {
    const front = req.files.noticeImage.data;

    const encodedpic1 = front.toString("base64");
    const img = Buffer.from(encodedpic1, "base64");
    const notice = new TeacherNotice({ img: img });

    try {
        await notice.save();
        
        res.send({ success: "success" });
    } catch (er) {
        console.log(er);
    }
});

//Principal Geting Previous Notice
router.get("/PreviousNotice", async (req, res) => {
    const notice = await TeacherNotice.find({});
    
    res.send(notice);
});
//Principal DELETING Previous Notice
router.delete("/DeleteNotice/:id", async (req, res) => {
    await TeacherNotice.deleteOne({ _id: ObjectId(req.params.id) });
    
    res.send({ deleted: "item Deleted" });
});
//Principal geting edit  Notice
router.get("/GetEditNotice/:id", async (req, res) => {
    const notice = await TeacherNotice.findOne({
        _id: ObjectId(req.params.id),
    });
    
    res.send(notice);
});
//Principal geting edit  Notice
router.put("/PutEditNotice/:id", async (req, res) => {
    const query = { _id: ObjectId(req.params.id) };
    const notice = await TeacherNotice.findOneAndUpdate(query, {
        $set: { title: req.body.title, description: req.body.description },
    });
    
    res.send(notice);
});

//Publishing Text Announcement
router.post("/publisAnnouncement", async (req, res) => {
    const notice = new UserAnnouncement(req.body);
    try {
        await notice.save();
        
        res.send({ success: "success" });
    } catch (er) {
        console.log(er);
    }
});
//Publishing Image Announcement
router.post("/PublishImageAnnouncement", async (req, res) => {
    const front = req.files.AnnouncemetnImage.data;
    console.log("front one", front);

    const encodedpic1 = front.toString("base64");
    const img = Buffer.from(encodedpic1, "base64");
    const Announcement = new UserAnnouncement({ img: img });

    try {
        await Announcement.save();
        
        res.send({ success: "success" });
    } catch (er) {
        console.log(er);
    }
});
//Principal Geting Previous Announcement
router.get("/PreviousAnnouncement", async (req, res) => {
    const Announcement = await UserAnnouncement.find({});
    
    res.send(Announcement);
});
//Principal DELETING Previous Announcement
router.delete("/DeleteAnnouncement/:id", async (req, res) => {
    await UserAnnouncement.deleteOne({ _id: ObjectId(req.params.id) });
    
    res.send({ deleted: "item Deleted" });
});
//Principal geting edit  Announcement
router.get("/GetEditAnnouncement/:id", async (req, res) => {
    const notice = await UserAnnouncement.findOne({
        _id: ObjectId(req.params.id),
    });
    
    res.send(notice);
});
//Principal geting edit  Announcement
router.put("/PutEditAnnouncement/:id", async (req, res) => {
    const query = { _id: ObjectId(req.params.id) };
    const notice = await UserAnnouncement.findOneAndUpdate(query, {
        $set: { title: req.body.title, description: req.body.description },
    });
    
    res.send(notice);
});
//Principal posting monthly payment
router.post("/UploadMonthlyPayment", async (req, res) => {
    const notice = await MonthlyPayment.insertMany(req.body)
    
    res.send({post: 'successfully'})
});
//Principal geting all teacher info
router.get("/GetAllTeachers", async (req, res) => {
 
    const teacher = await UserCollection.find({role: 'Teacher'})
    
    res.send(teacher)
});
//Principal geting individual monthly payment details of students
router.get("/GetlPaymentDetails", async (req, res) => {
    const email = req.query.email;
    const query = {email: email}
    const details = await MonthlyPayment.find(query)
    
    res.send(details)
});
//Principal geting all Admission Forms
router.get("/GetAdmissionForms", async (req, res) => {
    const allforms = await AddmissionFormCollection.find({});
    
    res.send(allforms)
});
//Principal geting all Admission Forms
router.get("/IndividualAdmissionForm/:id", async (req, res) => {
    // console.log('hitted form route', req.params.id)

    const admissionForm = await AddmissionFormCollection.findOne({_id: ObjectId(req.params.id)});
    
    res.send(admissionForm)
});

//Principal geting all teacher info
router.delete("/RemoveTeacher/:id", async (req, res) => {
    const id = req.params.id;
    console.log(id)
    const query = {_id: ObjectId(id)}
    const teacher = await UserCollection.deleteOne(query)
    
    res.send({success: 'Deleted'}) 
});

module.exports = router;