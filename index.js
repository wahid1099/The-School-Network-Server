const express = require("express");
const app = express();
const cors = require("cors");
require('dotenv').config();
const fileUpload = require("express-fileupload");
// const connectDB = require("./config/db");
const port = process.env.PORT || 5000;
const path = require("path");
const mongoose = require("mongoose");

// import route
const principal = require("./routes/Principal/PrincipalRoute");
const student = require("./routes/Student/student");
const Shared = require("./routes/Shared/SharedRoute");
const teacher = require("./routes/Teacher/TeacherRoute");
const paymentRoute = require("./routes/PaymentRoute/PaymentRoute");
const pdfuploads = require("./routes/PdfUplaodRoute/PdfUploader");
const videoUpload = require("./routes/VideoUploadRoute/VideoUploader");


//middleware
app.use(cors());
app.use(express.json());
app.use(fileUpload());
app.use(express.urlencoded({ extended: true }));
// middleware to save the uploaded files in the server
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
// to save the videos in the server
app.use("/videos", express.static(path.join(__dirname, "videos")));

// connectDB()

// ---Database connection

mongoose.connect(
  `mongodb+srv://${process.env.USERDB}:${process.env.USERPASS}@cluster0.vsy2x.mongodb.net/TheSchoolNetwork?retryWrites=true&w=majority`, 
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});

// -----------Shared Roudets start---------//
app.use("/", Shared);
// -----------Shared Roudets End---------//

// -----------Principal Roudets start---------//
app.use("/", principal);
// -----------Principal Roudets End---------//

// -----------Student Roudets start---------//
app.use("/student", student);
// -----------Student Roudets End---------//
// -----------Student Roudets start---------//
app.use("/", teacher);
// -----------Student Roudets End---------//
/////////////////////////payment route
// Routes
app.use("/", paymentRoute);

/////////////////////////

// -----------PdfUpload Roudets Start---------//
app.use("/", pdfuploads);
// -----------PdfUpload Roudets End---------//

// video upload route
app.use("/", videoUpload);

app.get("/", (req, res) => {
  res.send("School Network Server is Connected");
});
app.listen(port, (req, res) => {
  console.log("School Network Port Is", port);
});
