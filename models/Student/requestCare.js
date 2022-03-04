const mongoose = require("mongoose");

const requestSchema = mongoose.Schema(
  {
    firstName: {
      type: "string",
      required: true,
    },
    middleName: {
      type: "string", 
      required: true,
    },
    lastName: {
      type: "string",
      required: true,
    },
    class: {
      type: "string",
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    email: {
      type: "string",
      required: true,
    },
    courseName: {
      type: "string",
      required: true,
    },
    teacherName: {
      type: "string",
      required: true,
    },
    section: {
      type: "string",
      required: true,
    },
    description: {
      type: "string",
      required: true,
    },
    status: {
      type: "string",
      default: "pending",
    },
    roll: {
      type: "number",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("RequestCare", requestSchema);
