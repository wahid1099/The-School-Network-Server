const router = require("express").Router();
const mongoose = require('mongoose');
const userSchema = require('../../models/Shared/UserSchema')
const UserCollection = new mongoose.model("UserCollection", userSchema)
const ResultSchema = require("../../models/Shared/ResultSchema");
const ResultCollection = new mongoose.model("ResultCollection", ResultSchema)
const ObjectId = require('mongodb').ObjectId;
const multer  = require('multer')

//Adding user to database
router.post("/addUser", async (req, res) => {
    const User = new UserCollection(req.body);
    try{
        await User.save()
        
        res.send({useradded: 'addeduser'})
    }
    catch(er){
        console.log(er)
    }
});

//Checking user
router.get("/checkUser", async (req, res) => {
    const email = req.query.email;
    const user = await UserCollection.findOne({email: email});
    if(user.role)  
    {
        
        res.send({userrole: user.role})
        
    }
    else{
        
        res.send({none: 'norole'})
    }
});
//geting all students for manage
router.get("/GetAllStudents", async (req, res) => {
    const studentclass = req.query.studentclass;
    const students = await UserCollection.find({class: studentclass})
    
    res.send(students)
});

//principal geting  student individual performance
router.get("/IndividualPerformance/:id", async (req, res) => {
    const id = req.params.id;
    const studentInfo = await UserCollection.findOne({_id: ObjectId(id)})
    if(studentInfo.roll){
        const result = await ResultCollection.find({class: studentInfo.class, name: studentInfo.name, roll: studentInfo.roll})
        
        res.send(result)
    }
    else{
        
        res.send({error: 'result not found'})
    }
});

module.exports = router; 
