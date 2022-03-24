const router = require("express").Router();
const mongoose = require("mongoose");
const RequestCare = require("../../models/Student/requestCare");
const ResultSchema = require("../../models/Shared/ResultSchema");
const AssingmentSchema =require("../../models/Teacher/AssignmentSchema")

const ResultCollection = new mongoose.model("ResultCollection", ResultSchema);
const NoticeSchema = require("../../models/Teacher/NoticeSchema");
const StudentNoticeCollection = new mongoose.model(
    "studentnoticecollection",
    NoticeSchema
);
const StudentAssignmentCollection = new mongoose.model(
    "studentAssignmentCollection",
    AssingmentSchema
);
const userSchema = require("../../models/Shared/UserSchema");
const userCollection = new mongoose.model("usercollection", userSchema);
const BookCollection = require("../../models/Teacher/AddBook");
const ObjectId = require('mongodb').ObjectId; 
const LentBookCollection = require('../../models/Student/Lentbook');
const LentBookCollectionTwo = require('../../models/Student/LendBookTwo');
const NotificationCollection = require("../../models/Teacher/Notification");
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
const attendanceSchema = require("../../models/Teacher/attendanceSchema");
const attendanceCollection = new mongoose.model(
  "attendanceCollection",
  attendanceSchema
);

//geting all student extra care
router.get("/requestCare", async (req, res) => {
    const teacherclass = req.query.teacherclass;

    const requests = await RequestCare.find({class: teacherclass}); //here RequestCare is the schema name
    
    res.status(200).json(requests);
});
router.post("/publishResult", async (req, res) => {
    const result = new ResultCollection(req.body);
    try {
        await result.save();
        
        res.send({ success: "success" });
    } catch (er) {
        
        console.log(er);
    }
});
  // Publish assignment from teachers for students
router.post("/assignmentPublish", async (req, res) => {
    console.log("hit")
    const assing = new StudentAssignmentCollection(req.body);
    
    try {
        await assing.save();
        
        res.send( "success" );
    } catch (er) {
        
        console.log(er);
    }
});
//Publishing Image Notice
router.post("/PublishImageAssing", async (req, res) => {
    const front = req.files.noticeImage.data;
    const data = req.body;
    const encodedpic1 = front.toString("base64");
    const img = Buffer.from(encodedpic1, "base64");

    const assignMentData = {...data, img}
    const assignMent = new StudentAssignmentCollection(assignMentData);
    
    try {
        await assignMent.save();
        
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

// Add teacher info
router.get("/GetIndividualCare/:id", async (req, res) => {
    const id = req.params.id;
    const care = await RequestCare.findOne({_id: Object(id)})
    
    res.send(care);
});

// Add teacher info
router.get("/ChangeRequestHandler", async (req, res) => {
    const query = {_id: Object(req.query.id)};
    const status = req.query.status;
    await RequestCare.findOneAndUpdate(query, {$set: {status: status,}}, {upsert: true})
    
    res.send({status: status});
});

//Teacher Adding Book Library to book
router.post("/AddBook", async (req, res) => {
    const data = req.body;
    const imgdata = req.files.bookImg.data;

    const encodedpic1 = imgdata.toString("base64");
    const bookImg = Buffer.from(encodedpic1, "base64");
    const book = {...data, bookImg}

    const addBook = new BookCollection(book);
    
    await addBook.save();
    
    res.send({success: 'success'});
});

// get all library books
router.get("/GetAllBooks", async (req, res) => {
    const books = await BookCollection.find()
    
    res.send(books);
});

// get Edit books
router.get("/GetEditBook/:id", async (req, res) => {
    const book = await BookCollection.findOne({_id: ObjectId(req.params.id)})
    
    res.send(book);
}); 

// put Edit books
router.put("/SubmitEditedBook/:id", async (req, res) => {
  
    const book = req.body
    const query = {_id: ObjectId(req.params.id)}
    const update = await BookCollection.findOneAndUpdate(
        query,
        {
            $set: { bookName:  book.bookName, writerName: book.writerName, availableBook: book.availableBook, category: book.category, description: book.description},
        },
        { upsert: true }
    );
    
    res.send({success: 'success'});
});

// deleting books
router.delete("/DeleteBook/:id", async (req, res) => {
 
    const query = {_id: ObjectId(req.params.id)}
    const book = await BookCollection.deleteOne(query)

    res.send({deleted: 'delete'});
}); 

// get all lent books
router.get("/GetAllLendBooks", async (req, res) => {
    const books = await LentBookCollectionTwo.find({})
    const BoookList = books?.sort(function(a, b){return books.indexOf(b) - books.indexOf(a)});
    res.send(BoookList);
});

// sending notification
router.post("/NotifyStudents", async (req, res) => {
    const data = req.body
    const books = new NotificationCollection(data)
    await books.save()

    res.json(books);
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

// Add Attendance Data
router.put("/AddAttendanceData", async (req, res) => {
  const email = req.body.email;
  const month = req.body.month;
  const query = { email: email, month: month };
  const add = await attendanceCollection.findOneAndUpdate(query, req.body, {
    upsert: true,
  });
  res.send(add);
});

module.exports = router;