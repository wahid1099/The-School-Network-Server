const mongoose = require("mongoose");

const VideoModel = mongoose.Schema(
  {
    video_title: {
      type: String,
      required: true,
    },
    author_email: {
      type: String,
      required: false,
    },
    videoUploadPath: {
      type: String,
      required: false,
    },
    target_class: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      // `Date.now()` returns the current unix timestamp as a number
      default: Date.now,
    },
  },

  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Video_Classes", VideoModel);
