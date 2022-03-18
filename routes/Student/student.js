const router = require("express").Router();
const mongoose = require("mongoose");
const Student = require("../../models/Student/studentModels");
const RequestCare = require("../../models/Student/requestCare");
const { db } = require("../../models/Student/studentModels");
const ResultSchema = require("../../models/Shared/ResultSchema");
const ResultCollection = new mongoose.model("ResultCollection", ResultSchema);
const UserSchema = require("../../models/Shared/UserSchema");
const UserCollection = new mongoose.model("UserCollection", UserSchema);
const NoticeSchema = require("../../models/Teacher/NoticeSchema");
const StudentNoticeCollection = new mongoose.model(
    "studentnoticecollection",
    NoticeSchema
);
const MonthlyPayment = require('../../models/Principal/PaymentUplaodSchema')

//Student notes Submit
router.post("/notesSubmit", async (req, res) => {
  const newPost = new Student(req.body);
  try {
    const savedPost = await newPost.save();
    
    res.status(200).json(savedPost);
  } catch (err) {
    
    res.status(500).json(err);
  }
});

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
  const studentclass = req.query.studentclass
    try {
    const results = await StudentNoticeCollection.find({class: studentclass});
    
    res.status(200).json(results);
  } catch (err) {
    
    res.status(500).json(err);
  }
});
// fetch the montly payment data
router.get("/getMontlyPayment", async (req, res) => {
  const email = req.query.email
    try {
    const results = await MonthlyPayment.find({email: email});
    
    res.status(200).json(results);
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;
