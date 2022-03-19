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
const corsOptions = require("./config/CorsOption");

//middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(fileUpload());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});
// ---Database connection
connectDB();

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
