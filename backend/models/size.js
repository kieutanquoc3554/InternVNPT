const mongoose = require("mongoose");

let sizeSchema = mongoose.Schema({
  KC_ID: {
    type: Number,
    required: true,
  },
  KC_TEN: {
    type: String,
    required: true,
  },
  KC_DUNGTICH: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Size", sizeSchema);
