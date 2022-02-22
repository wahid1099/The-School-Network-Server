const router = require("express").Router();
const mongoose = require('mongoose');
const userSchema = require('../../models/Shared/UserSchema')
const UserCollection = new mongoose.model("UserCollection", userSchema)


//Checking user
router.post("/addUser", async (req, res) => {
    console.log('hitted add user')
    const User = new UserCollection(req.body);
    try{
        await User.save()
    }
    catch(er){
        console.log(er)
    }
});

//Checking user
router.get("/checkUser", async (req, res) => {
    console.log('hitted')
    const email = req.query.email;
    console.log('email',email)
    const user = await UserCollection.findOne({email: email});
    console.log('user',user)
    if(user.role)  
    {
        res.send({userrole: user.role})
    }
    else{
        res.send({none: 'norole'})
    }
});

module.exports = router;
