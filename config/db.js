const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(`mongodb+srv://${process.env.USERDB}:${process.env.USERPASS}@cluster0.vsy2x.mongodb.net/TheSchoolNetwork?retryWrites=true&w=majority`);

    console.log(`MongoDB Connected`);
  }catch (error) {
      console.log(error);
      process.exit(1);
    }
};

module.exports = connectDB;
