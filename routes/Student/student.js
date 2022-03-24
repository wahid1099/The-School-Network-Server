const router = require("express").Router();
const mongoose = require("mongoose");
const RequestCare = require("../../models/Student/requestCare");
const ResultSchema = require("../../models/Shared/ResultSchema");
const ResultCollection = new mongoose.model("ResultCollection", ResultSchema);
const UserSchema = require("../../models/Shared/UserSchema");
const UserCollection = new mongoose.model("UserCollection", UserSchema);
const NoticeSchema = require("../../models/Teacher/NoticeSchema");
const StudentNoticeCollection = new mongoose.model(
    "studentnoticecollection",
    NoticeSchema
);
const AssignmentSchema = require("../../models/Teacher/AssignmentSchema");
const StudentAssignmentCollection = new mongoose.model(
    "studentassignmentcollection",
    AssignmentSchema
);
const MonthlyPayment = require("../../models/Principal/PaymentUplaodSchema");
const LentBookCollection = require("../../models/Student/Lentbook");
const LentBookCollectionTwo = require("../../models/Student/LendBookTwo");
const ObjectId = require("mongodb").ObjectId;
const BookCollection = require("../../models/Teacher/AddBook");
const { v4: uuidv4 } = require("uuid");
const NotificationCollection = require("../../models/Teacher/Notification");
const attendanceSchema = require("../../models/Teacher/attendanceSchema");
const attendanceCollection = new mongoose.model(
  "attendanceCollection",
  attendanceSchema
);
const concessionFormSchema = require("../../models/Student/concessionForm");

//student request care

router.post("/requestCare", async (req, res) => {
    // model creation through the schema
    const newRequest = new RequestCare(req.body);
    try {
        const savedRequest = await newRequest.save();

        res.status(200).json(savedRequest);
    } catch (err) {
        res.status(500).json(err);
    }
});

// get the data from the database

router.get("/requestCare", async (req, res) => {
    try {
        // no need for database name, only the schema name is enough to fetch data
        const requests = await RequestCare.find(); //here RequestCare is the schema name

        res.status(200).json(requests);
    } catch (err) {
        res.status(500).json(err);
    }
});

// fetch the result data
router.get("/results", async (req, res) => {
    try {
        const results = await ResultCollection.find({});

        res.status(200).json(results);
    } catch (err) {
        res.status(500).json(err);
    }
});

// fetch specific student from user collection with the help of email

router.get("/filteredStudent", async (req, res) => {
    const email = req.query.email;
    console.log(email);
    const term = req.query.term;
    const filteredResult = await UserCollection.findOne({ email: email });
    // console.log(filteredResult);
    try {
        const result = await ResultCollection.findOne({
            term: term,
            class: filteredResult.class,
            roll: filteredResult.roll,
            name: filteredResult.name,
        });
        // console.log(result);

        res.send(result);
    } catch (err) {
        res.status(500).json(err);
    }
});

// get result according to student information

router.get("/filteredResult", async (req, res) => {
    const query = req.query.email;
    const student = await UserCollection.findOne({ email: query });
    // res.send(student);
    console.log(query);
    try {
        const filteredResult = await ResultCollection.find({
            name: student.name,
            roll: student.roll,
            class: student.class,
        });
        // console.log({ filteredResult, student });

        res.status(200).json(filteredResult);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Get single student information
router.get("/studentProfile", async (req, res) => {
    const studentEmail = req.query.email;
    const response = await UserCollection.findOne({ email: studentEmail });

    res.send(response);
});

// Update single student profile picture
router.put("/updateStudentPP", async (req, res) => {
    const email = req.query.email;
    const front = req.files.userImage.data;
    // console.log(email);

    const encodedpic1 = front.toString("base64");
    const img = Buffer.from(encodedpic1, "base64");

    const query = { email: email };
    const update = await UserCollection.findOneAndUpdate(
        query,
        { $set: { img: img } },
        { upsert: true }
    );

    res.send(update);
});
// fetch the notice data
router.get("/GetStudentNotice", async (req, res) => {
    const studentclass = req.query.studentclass;
    try {
        const results = await StudentNoticeCollection.find({
            class: studentclass,
        });

        res.status(200).json(results);
    } catch (err) {
        res.status(500).json(err);
    }
});
// fetch the montly payment data
router.get("/getMontlyPayment", async (req, res) => {
    const email = req.query.email;
    try {
        const results = await MonthlyPayment.find({ email: email });

        res.status(200).json(results);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Get all the assignments related to the student
router.get("/GetAllAssignments", async (req, res) => {
    res.send(
        await StudentAssignmentCollection.find({
            class: req.query.class,
        })
    );
});

// -------------library route---------//

// posting lent book form
router.post("/LentBook/:id", async (req, res) => {
    const id = req.params.id;
    const query = { _id: ObjectId(id) };
    const updateBook = await BookCollection.findOneAndUpdate(query, {
        $set: { availableBook: req.body.availableBook },
    });
    const book = new LentBookCollection(req.body);
    const bookTwo = new LentBookCollectionTwo(req.body);
    const savedBook = await book.save();
    const savedBookTwo = await bookTwo.save();
    res.status(200).json(savedBook);
});

// get all lented book
router.get("/YourLentBookList", async (req, res) => {
    const query = { email: req.query.email };

    try {
        const Checklist = await LentBookCollection.find(query);

        const lentedBook = await LentBookCollectionTwo.find(query);
        const NewBoookList = lentedBook?.sort(function (a, b) {
            return lentedBook.indexOf(b) - lentedBook.indexOf(a);
        });

        res.send({ LendList: NewBoookList, CheckList: Checklist });
    } catch (err) {
        res.status(500).json(err);
    }
});

// student returning book
router.delete("/ReturnBook", async (req, res) => {
    const statusDate = new Date().toLocaleDateString();
    const bookId = req.query.bookId;
    const id = req.query.id;

    const query = { _id: ObjectId(id) };
    const book = await LentBookCollection.deleteOne(query);

    const queryTwo = { bookId: bookId };
    const findBook = await BookCollection.findOne(queryTwo);
    const availableBook = parseInt(findBook.availableBook) + 1;
    const lentedBook = await BookCollection.findOneAndUpdate(queryTwo, {
        $set: { availableBook: availableBook },
    });

    const querythree = { bookId: bookId };
    const booktwo = await LentBookCollectionTwo.findOneAndUpdate(querythree, {
        $set: { status: statusDate },
    });

    res.send({ success: "success" });
});

// get all lented book
router.get("/GetCategoryBook", async (req, res) => {
    const query = { category: req.query.category };

    try {
        const Books = await BookCollection.find(query);

        res.send(Books);
    } catch (err) {
        res.status(500).json(err);
    }
});

// get all lented book
router.get("/GetNotification", async (req, res) => {
    const query = { email: req.query.email };

    try {
        const Books = await NotificationCollection.find(query);

        res.send(Books);
    } catch (err) {
        res.status(500).json(err);
    }
});
//   student Concession  Form submit
router.post("/concessionForm", async (req, res) => {
  // model creation through the schema
  const newRequest = new concessionFormSchema(req.body);
  try {
    const savedRequest = await newRequest.save();

    res.status(200).json(savedRequest);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get student Attendance Collections
router.get("/studentAttendanceCollections", async (req, res) => {
  const email = req.query.email;
  try {
    const results = await attendanceCollection.find({ email: email });

    res.status(200).json(results);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
