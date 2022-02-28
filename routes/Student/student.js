const router = require("express").Router();
const mongoose = require("mongoose");
const Student = require("../../models/Student/studentModels");
const RequestCare = require("../../models/Student/requestCare");
const { db } = require("../../models/Student/studentModels");
const ResultSchema = require("../../models/Shared/ResultSchema");
const ResultCollection = new mongoose.model("ResultCollection", ResultSchema);

const userSchema = require("../../models/Shared/UserSchema");
const userCollection = new mongoose.model("usercollection", userSchema);

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

// Get single student information
router.get("/studentProfile", async (req, res) => {
  const studentEmail = req.query.email;
  const response = await userCollection.findOne({ email: studentEmail });
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
  const update = await userCollection.findOneAndUpdate(
    query,
    { $set: { img: img } },
    { upsert: true }
  );
  res.send(update);
});

module.exports = router;
