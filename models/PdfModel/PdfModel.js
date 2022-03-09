const mongoose = require("mongoose");

const PdfModel = mongoose.Schema({
  StudentName: {
    type: String,
    required: false,
  },
  StudentEmail: {
    type: String,
    required: false,
  },
  StudentId: {
    type: String,
    required: false,
  },
  PdfPath: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model("PdfModel", PdfModel);
