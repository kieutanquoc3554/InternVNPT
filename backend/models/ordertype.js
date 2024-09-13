const mongoose = require("mongoose");

let ordertype = mongoose.Schema({
  L_TEN: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Order Type", ordertype);
