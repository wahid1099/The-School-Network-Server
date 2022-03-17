const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv").config();
const fileUpload = require("express-fileupload");
const connectDB = require("./config/db");
const port = process.env.PORT || 5000;
const path = require("path");

// import route
const principal = require("./routes/Principal/PrincipalRoute");
const student = require("./routes/Student/student");
const Shared = require("./routes/Shared/SharedRoute");
const teacher = require("./routes/Teacher/TeacherRoute");
const paymentRoute = require("./routes/PaymentRoute/PaymentRoute");
const pdfuploads = require("./routes/PdfUplaodRoute/PdfUploader");

// ---Database connection
connectDB();

// Add headers before the routes are defined
app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader(
    "Access-Control-Allow-Origin",
    "https://the-school-network.web.app/"
  );

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  // Pass to next layer of middleware
  next();
});
//middleware
app.use(cors());
app.use(express.json());
app.use(fileUpload());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// app.use(express.urlencoded({ extended: true }));

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

app.get("/", (req, res) => {
  res.send("School Network Server is Connected");
});
app.listen(port, (req, res) => {
  console.log("School Network Port Is", port);
});
