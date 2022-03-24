const mongoose = require("mongoose");

const connectDB = async () => {
  const mongouri = `mongodb+srv://${process.env.USERDB}:${process.env.USERPASS}@cluster0.vsy2x.mongodb.net/TheSchoolNetwork?retryWrites=true&w=majority`;
  try {
    await new mongoose.connect(
      mongouri,
      {
        useUnifiedTopology: true,
        useNewUrlParser: true,
      },
      console.log("connected to database")
    );
  } catch (error) {
    console.log(error);
 
  }
};

module.exports = connectDB;