const mongoose = require("mongoose");
const bodyParser = require("body-parser");

let userSchema = mongoose.Schema({
  ND_ID: {
    type: Number,
    required: true,
  },
  ND_TEN: {
    type: String,
    required: true,
  },
  ND_VAITRO: {
    type: String,
    required: true,
  },
  ND_SDT: {
    type: String,
  },
  ND_EMAIL: {
    type: String,
  },
  ND_TENNGUOIDUNG: {
    type: String,
    required: true,
  },
  ND_MATKHAU: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("User", userSchema);
