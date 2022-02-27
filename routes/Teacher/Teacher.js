const router = require("express").Router();
const mongoose = require('mongoose');
const RequestCare = require("../../models/Student/requestCare");
const ResultSchema = require("../../models/Shared/ResultSchema");
const ResultCollection = new mongoose.model("ResultCollection", ResultSchema)

//geting all student extra care
router.get("/requestCare", async (req, res) => {

      const requests = await RequestCare.find(); //here RequestCare is the schema name
      res.status(200).json(requests);

});
router.post("/PublishResult", async (req, res) => {
    const result = new ResultCollection(req.body);
    try{
        await result.save();
        res.send({success: 'success'})
    }
    catch(er){
        console.log(er)
    }

});

module.exports = router;