const mongoose = require("mongoose");

let areaSchema = mongoose.Schema({
  VT_ID: {
    type: Number,
    required: true,
  },
  VT_TEN: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Area", areaSchema);
