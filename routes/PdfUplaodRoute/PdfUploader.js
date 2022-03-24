const PdfModel = require("../../models/PdfModel/PdfModel");
const router = require("express").Router();
const mongoose = require("mongoose");
const fileUpload = require("express-fileupload");
const AssingmentSchema = require("../../models/Teacher/AssignmentSchema");
const studentAssignmentCollection = new mongoose.model(
    "studentAssignmentCollection",
    AssingmentSchema
);

//Student notes Submit
router.post("/pdfUpload", async (req, res) => {
    let { StudentName, StudentId, StudentEmail, PdfPath } = req.body;
    //Use the name of the input field (i.e. "avatar") to retrieve the uploaded file
    let pdf = req.files.pdf;
    pdf.mv("./uploads/" + pdf.name);
    const PdfUploadpath = "uploads/" + pdf.name;
    const assignmentData = await studentAssignmentCollection.findOne({
        _id: req.query.id,
    });
    const assignmentArray = JSON.parse(assignmentData.submssionarray);
    const data = { email: StudentEmail, assignment: PdfUploadpath };
    assignmentArray.push(data);
    const data2 = JSON.stringify(assignmentArray);
    const filter = { _id: req.query.id };
    await studentAssignmentCollection.findOneAndUpdate(filter, {
        $set: { submssionarray: data2 },
    });
    //Use the mv() method to place the file in upload directory (i.e. "uploads")

    let pdfuplaoderDetails = await new PdfModel({
        StudentName,
        StudentId,
        StudentEmail,
        PdfPath: PdfUploadpath,
    }).save();

    //send response
    res.set("Access-Control-Allow-Origin", "*");
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
        res.set("Access-Control-Allow-Origin", "*");
        res.status(200).json(studentpDf);
    } catch (err) {
        res.set("Access-Control-Allow-Origin", "*");
        res.status(500).json(err);
    }
});

// fetch the Pdf  data of a student
router.get("/studentPdf", async (req, res) => {
    // console.log(req);
    const StudentEmail = req.query.email;
    console.log(StudentEmail);
    const response = await PdfModel.find({ StudentEmail: StudentEmail });
    console.log(response);
    res.send(response);
});

module.exports = router;
