const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv").config();
const fileUpload = require("express-fileupload");
const connectDB = require("./config/db");
const port = process.env.PORT || 5000;

// import route
const principal = require("./routes/Principal/PrincipalRoute");
const student = require("./routes/Student/student");
const Shared = require("./routes/Shared/SharedRoute");

// ---Database connection
connectDB();

//middleware
app.use(cors());
app.use(express.json());
app.use(fileUpload());

// -----------Shared Roudets start---------//
app.use("/shared", Shared);
// -----------Shared Roudets End---------//

// -----------Principal Roudets start---------//
app.use("/principal", principal);
// -----------Principal Roudets End---------//

// -----------Student Roudets start---------//
app.use("/student", student);
// -----------Student Roudets End---------//

app.get("/", (res, req) => {
  res.send("School Network Server is Connected");
});
app.listen(port, (res, req) => {
  console.log("School Network Port Is", port);
});
