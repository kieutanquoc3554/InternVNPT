const mongoose = require("mongoose");

let tableSchema = mongoose.Schema({
  B_ID: {
    type: Number,
    required: true,
  },
  B_TEN: {
    type: String,
    required: true,
  },
  B_VITRI: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Area",
    required: true,
  },
  B_TRANGTHAI: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Table", tableSchema);
