const router = require("express").Router();
const mongoose = require("mongoose");
const fileUpload = require("express-fileupload");
const VideoModel = require("../../models/VideoModel/VideoModel");
const path = require("path");

// teacher video upload

router.post("/videoUpload", async (req, res) => {
  console.log(req.body);
  console.log(req.files);

  let video = req.files.video;
  // validation of video file
  const extensionName = path.extname(video.name);
  const allowedExtension = [".mp4", ".mkv"];

  //   console.log(fileType);
  if (!allowedExtension.includes(extensionName)) {
    console.log("Invalid file extension");
    return res.status(422).send("Invalid Image");
  } else {
    //Use the mv() method to place the file in upload directory (i.e. "uploads")
    video.mv("./videos/" + video.name);
    const videoUploadPath = "videos/" + video.name;
    let videoUploadFileDetail = await new VideoModel({
      video_title: req.body.title,
      author_email: req.body.email,
      target_class: req.body.class,
      videoUploadPath,
    }).save();
    res.send({
      status: true,
      message: "File Upload Successful",
      data: {
        name: video.name,
        mimetype: video.mimetype,
        size: video.size,
        path: videoUploadPath,
      },
    });
  }
});

// get all the videos

router.get("/videos", async (req, res) => {
  const target_class = req.query.class;
  console.log(target_class);
  const filter = { target_class: target_class };
  const filter2 = { target_class: "All" };
  const forAll = await VideoModel.find(filter2);
  try {
    const result = await VideoModel.find(filter);
    const newResult = [...result, ...forAll];
    res.send(newResult);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
