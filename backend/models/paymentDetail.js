const mongoose = require("mongoose");

const paymentDetailSchema = mongoose.Schema({
  CTTT_TEN: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Payment Method",
    required: true,
  },
  CTTT_NGAY: {
    type: Date,
    require: true,
    default: Date.now,
  },
});

module.exports = mongoose.model("Payment Detail", paymentDetailSchema);
