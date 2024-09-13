const mongoose = require("mongoose");

let customerSchema = mongoose.Schema({
  KH_ID: {
    type: Number,
    required: true,
  },
  KH_TEN: {
    type: String,
    required: true,
  },
  KH_SDT: {
    type: String,
    required: true,
  },
  KH_EMAIL: {
    type: String,
  },
  KH_TRANGTHAITHANHVIEN: {
    type: String,
    required: true,
  },
  KH_KHUYENMAI: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Promote",
    },
  ],
});

module.exports = mongoose.model("Customer", customerSchema);
