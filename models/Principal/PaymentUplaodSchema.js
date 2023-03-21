const mongoose = require('mongoose');

const MonthlyPayment = mongoose.Schema({
    class: {
        type: String,
        required: false
    },
    section:  {
        type: String,
        required: false
    },
    roll:  {
        type: String,
        required: false
    },
    name:  {
        type: String,
        required: false
    },
    email:  {
        type: String,
        required: false
    },
    phone:  {
        type: String,
        required: false
    },
    role:  {
        type: String,
        required: false
    },
    month:{
        type: String,
        required: false
    },
    amount:{
        type: String,
        required: false
    },
    publishdate:{
        type: String,
        required: false
    },
    lastdate:{
        type: String,
        required: false
    },
    paymentStatus:{
        type: String,
        required: false
    },
    tran_id:{
      type: String,
      required: false
    },
    paymentNumber:{
      type: String,
      required: false
    },
    paymentDate:{
        type: String
    }
})

module.exports = mongoose.model("MonthlyPayment", MonthlyPayment);

