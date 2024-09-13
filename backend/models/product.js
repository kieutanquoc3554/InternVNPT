const mongoose = require("mongoose");
const bodyParser = require("body-parser");

let sanpham = mongoose.Schema({
  SP_TEN: {
    type: String,
    required: true,
  },
  SP_MOTA: {
    type: String,
  },
  SP_LOAI: {
    type: String,
    required: true,
  },
  SP_ANH: {
    type: String,
  },
  CHITIETSANPHAM: [
    {
      KC_ID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Size",
        required: true,
      },
      CTSP_GIA: {
        type: Number,
        required: true,
      },
    },
  ],
  SP_KEYWORD: [
    {
      KW_TEN: {
        type: String,
        required: true,
      },
    },
  ],
});

module.exports = mongoose.model("Product", sanpham);
