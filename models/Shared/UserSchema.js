const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
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
    bloodGroup: {
        type: String,
        required: false,
    },
    age: {
        type: String,
        required: false,
    },
    email: {
        type: String,
        required: false,
    },
    password: {
        type: String,
        required: false,
    },
    birthCertificateNo: {
        type: String,
        required: false,
    },
    phone: {
        type: String,
        required: false,
    },
    birthDate: {
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
    address: {
        type: String,
        required: false,
    },
    role: {
        type: String,
        required: false,
    },
    teachername: {
        type: String,
        required: false,
    },
    teacherclass: {
        type: String,
        required: false,
    },
    teachersection: {
        type: String,
        required: false,
    },
    teachernid: {
        type: String,
        required: false,
    },
    img: {
        type: mongoose.Mixed,
        required: true,
    },
    teacheraddress:  {
        type: String,
        required: false
    },
    teacherphone: { type: String },
    personalStatement: {
        type: String,
        required: true,
    },
    education: {
        type: String,
        require: true,
    },
})

module.exports = UserSchema;

