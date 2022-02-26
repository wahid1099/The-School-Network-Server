const router = require("express").Router();
const Student = require("../../models/Student/studentModels");
const RequestCare = require("../../models/Student/requestCare");
const { db } = require("../../models/Student/studentModels");

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

// Assignment Submit

module.exports = router;
