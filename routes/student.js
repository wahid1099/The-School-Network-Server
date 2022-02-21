const router = require("express").Router();
const Student = require("../models/Student/studentModels.js");

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

module.exports = router;
