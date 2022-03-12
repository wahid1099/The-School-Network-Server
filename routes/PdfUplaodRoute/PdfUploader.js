const PdfModel = require("../../models/PdfModel/PdfModel");
const router = require("express").Router();
const mongoose = require("mongoose");
const fileUpload = require("express-fileupload");

//Student notes Submit
router.post("/pdfUpload", async (req, res) => {
  console.log(req.body);
  let { StudentName, StudentId, StudentEmail, PdfPath } = req.body;
  //Use the name of the input field (i.e. "avatar") to retrieve the uploaded file
  let pdf = req.files.pdf;

  //Use the mv() method to place the file in upload directory (i.e. "uploads")
  pdf.mv("./uploads/" + pdf.name);
  const PdfUploadpath = "uploads/" + pdf.name;
  let pdfuplaoderDetails = await new PdfModel({
    StudentName,
    StudentId,
    StudentEmail,
    PdfPath: PdfUploadpath,
  }).save();

  //send response
  res.send({
    status: true,
    message: "File is uploaded",
    data: {
      name: pdf.name,
      mimetype: pdf.mimetype,
      size: pdf.size,
      path: PdfUploadpath,
    },
  });
});

router.get("/GetAllPdfs", async (req, res) => {
  try {
    // no need for database name, only the schema name is enough to fetch data
    const studentpDf = await PdfModel.find(); //here RequestCare is the schema name
    res.status(200).json(studentpDf);
  } catch (err) {
    res.status(500).json(err);
  }
});

// fetch the Pdf  data of a student
router.get("/studentPdfID", async (req, res) => {
  const StudentId = req.query.StudentId;
  console.log(StudentId);
  const response = await PdfModel.findOne({ StudentId: StudentId });
  console.log(response);
  res.send(response);
});

module.exports = router;
