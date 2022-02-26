const router = require("express").Router();
const mongoose = require('mongoose');
const userSchema = require('../../models/Shared/UserSchema')
const UserCollection = new mongoose.model("UserCollection", userSchema)


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

module.exports = router;
