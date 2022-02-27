const mongoose = require("mongoose");

const documentSchema = mongoose.Schema({
  img: {
    data: Buffer,
    contentType: String,
  },
});

module.exports = mongoose.model("Document", documentSchema);
