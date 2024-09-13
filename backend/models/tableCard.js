const mongoose = require("mongoose");

let tableCardSchema = mongoose.Schema({
  TB_TEN: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Table Card", tableCardSchema);
