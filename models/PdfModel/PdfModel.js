const mongoose = require("mongoose");

const PdfModel = mongoose.Schema(
  {
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
    date: {
      type: Date,
      // `Date.now()` returns the current unix timestamp as a number
      default: Date.now,
    },
  },

  {
    timestamps: true,
  }
);

module.exports = mongoose.model("PdfModel", PdfModel);
