const mongoose = require("mongoose");

const concessionFormSchema = mongoose.Schema({
  class: {
    type: String,
    required: false,
  },
  section: {
    type: String,
    required: false,
  },
  roll: {
    type: String,
    required: false,
  },
  name: {
    type: String,
    required: false,
  },
  phone: {
    type: Number,
    required: false,
  },
  email: {
    type: String,
    required: false,
  },

  fatherName: {
    type: String,
    required: false,
  },
  motherName: {
    type: String,
    required: false,
  },
  fatherOccupation: {
    type: String,
    required: false,
  },
  fatherMonthlyIncome: {
    type: Number,
    required: false,
  },
  fatherContactNo: {
    type: Number,
    required: false,
  },
  details: {
    type: Number,
    required: false,
  },
});

module.exports = mongoose.model("ConcessionForm", concessionFormSchema);
