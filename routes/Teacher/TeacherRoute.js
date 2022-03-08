const router = require("express").Router();
const mongoose = require("mongoose");
const RequestCare = require("../../models/Student/requestCare");
const ResultSchema = require("../../models/Shared/ResultSchema");
const ResultCollection = new mongoose.model("ResultCollection", ResultSchema);
const NoticeSchema = require("../../models/Teacher/NoticeSchema");
const StudentNoticeCollection = new mongoose.model(
    "studentnoticecollection",
    NoticeSchema
);
const userSchema = require("../../models/Shared/UserSchema");
const userCollection = new mongoose.model("usercollection", userSchema);
const ObjectId = require("mongodb").ObjectId;
const classRoutineSchema = require("../../models/Teacher/ClassRoutineSchema");
const classRoutineCollection = new mongoose.model(
    "classRoutineCollection",
    classRoutineSchema
);
const examRoutineSchema = require("../../models/Teacher/ExamRoutineSchema");
const examRoutineCollection = new mongoose.model(
    "examRoutineCollection",
    examRoutineSchema
);

//geting all student extra care
router.get("/requestCare", async (req, res) => {
    const teacherclass = req.query.teacherclass;

    const requests = await RequestCare.find({ class: teacherclass }); //here RequestCare is the schema name
    res.status(200).json(requests);
});
router.post("/PublishResult", async (req, res) => {
    const result = new ResultCollection(req.body);
    try {
        await result.save();
        res.send({ success: "success" });
    } catch (er) {
        console.log(er);
    }
});

// Publish notice from teachers for students
router.post("/PublishNotice", async (req, res) => {
    const notice = new StudentNoticeCollection(req.body);

    try {
        await notice.save();
        res.send({ success: "success" });
    } catch (er) {
        console.log(er);
    }
});

// Get teachers information
router.get("/TeacherProfile", async (req, res) => {
    const teacherEmail = req.query.email;
    const response = await userCollection.findOne({ email: teacherEmail });
    res.send(response);
});

// Update teachers profile picture
router.put("/UpdateTeacherDP", async (req, res) => {
    const email = req.query.email;
    const front = req.files.userImage.data;
    // console.log(email);

    const encodedpic1 = front.toString("base64");
    const img = Buffer.from(encodedpic1, "base64");

    const query = { email: email };
    const update = await userCollection.findOneAndUpdate(
        query,
        { $set: { img: img } },
        { upsert: true }
    );
    res.send(update);
});

// Add teacher info
router.put("/AddTeacherInfo", async (req, res) => {
    const personalStatement = req.body.personalStatement;
    const education = req.body.education;
    const email = req.body.email;
    // console.log(statement, education, email);
    const query = { email: email };
    const update = await userCollection.findOneAndUpdate(
        query,
        {
            $set: { personalStatement, education },
        },
        { upsert: true }
    );
    res.send(update);
});

// Get Extra Care Request
router.get("/GetIndividualCare/:id", async (req, res) => {
    const id = req.params.id;
    console.log("ids", id);
    const care = await RequestCare.findOne({ _id: Object(id) });
    res.send(care);
});

// Upload Class Routine
router.post("/UploadClassRoutine", async (req, res) => {
    const front = req.files.routineImg.data;
    const studentClass = req.query.class;
    const section = req.query.section;

    const encodedpic1 = front.toString("base64");
    const routineImg = Buffer.from(encodedpic1, "base64");

    const data = { routineImg, class: studentClass, section };

    const routine = new classRoutineCollection(data);
    try {
        await routine.save();
        res.send({ success: "success" });
    } catch (er) {
        console.log(er);
    }
});

// Upload Exam Routine
router.post("/UploadExamRoutine", async (req, res) => {
    const front = req.files.routineImg.data;
    const studentClass = req.query.class;
    const term = req.query.term;

    const encodedpic1 = front.toString("base64");
    const routineImg = Buffer.from(encodedpic1, "base64");

    const data = { routineImg, class: studentClass, term };

    const routine = new examRoutineCollection(data);
    try {
        await routine.save();
        res.send({ success: "success" });
    } catch (er) {
        console.log(er);
    }
});

// Get All Class Routine
router.get("/GetClassRoutine", async (req, res) => {
    res.send(await classRoutineCollection.find({}));
});

// Get All Exam Routine
router.get("/GetExamRoutine", async (req, res) => {
    res.send(await examRoutineCollection.find({}));
});

// Delete A Class Routine
router.delete("/DeleteClassRoutine", async (req, res) => {
    try {
        await classRoutineCollection.deleteOne({ _id: ObjectId(req.query.id) });
        res.send({ success: "success" });
    } catch (error) {
        console.log(error);
    }
});

// Delete A Exam Routine
router.delete("/DeleteExamRoutine", async (req, res) => {
    try {
        await examRoutineCollection.deleteOne({ _id: ObjectId(req.query.id) });
        res.send({ success: "success" });
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;
