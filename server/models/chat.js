const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ChatSchema = mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    text: {
      requried: true,
      type: String,
      maxlength: 500,
    },
    createdAt: {
      type: Date,
    },
    likes: {
      requried: true,
      type: Number,
      default: 0,
    },
    tag: {
      required: true,
      type: String,
      maxlength: 50,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    comments: {
      type: Array,
      default: [],
    },
    images: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);
const Chat = mongoose.model("Chat", ChatSchema);

module.exports = Chat;
