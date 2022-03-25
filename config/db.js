const mongoose = require("mongoose");
const {ServerApiVersion } = require('mongodb');

const connectDB = async () => {
  const mongouri = `mongodb+srv://${process.env.USERDB}:${process.env.USERPASS}@cluster0.vsy2x.mongodb.net/TheSchoolNetwork?retryWrites=true&w=majority`;
  try {
       mongoose.connect( 
      mongouri,
      {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        serverApi: ServerApiVersion.v1
      },
      console.log("connected to database")
    );
  } catch (error) {
    console.log(error);
 
  }
};

module.exports = connectDB;