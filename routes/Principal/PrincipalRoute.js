const router = require("express").Router();
const mongoose = require("mongoose");
const noticeSchema = require("../../models/Principal/NoticeScema");
const TeacherNotice = new mongoose.model("TeacherNotice", noticeSchema);
const AnnouncementSchema = require("../../models/Principal/AnnouncementScema");
const UserAnnouncement = new mongoose.model(
    "UserAnnouncement",
    AnnouncementSchema
);
const ObjectId = require("mongodb").ObjectId;

//Publishing Text Notice
router.post("/publisNotice", async (req, res) => {
    const notice = new TeacherNotice(req.body);
    try {
        await notice.save();
        res.send({ success: "success" });
    } catch (er) {
        console.log(er);
    }
});
//Publishing Image Notice
router.post("/PublishImageNotice", async (req, res) => {
    const front = req.files.noticeImage.data;
    console.log("front one", front);

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
module.exports = router;
