const router = require("express").Router();
const RequestCare = require("../../models/Student/requestCare");

router.get("/requestCare", async (req, res) => {

      const requests = await RequestCare.find(); //here RequestCare is the schema name
      res.status(200).json(requests);

  });
  module.exports = router;