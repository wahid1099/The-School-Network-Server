const router = require("express").Router();
const mongoose = require("mongoose");
const Student = require("../../models/Student/studentModels");
const RequestCare = require("../../models/Student/requestCare");
const { db } = require("../../models/Student/studentModels");
const ResultSchema = require("../../models/Shared/ResultSchema");
const ResultCollection = new mongoose.model("ResultCollection", ResultSchema);
const UserSchema = require("../../models/Shared/UserSchema");
const UserCollection = new mongoose.model("UserCollection", UserSchema);

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

router.get("/filteredStudent/:email", async (req, res) => {
  const email = req.params.email;
  console.log(email);
  try {
    const filteredResult = await UserCollection.find({ email: email });
    res.status(200).json(filteredResult);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get result according to student information

router.get("/filteredResult", async (req, res) => {
  const query = req.query;
  console.log(query);
  try {
    const filteredResult = await ResultCollection.find(query);
    res.status(200).json(filteredResult);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
