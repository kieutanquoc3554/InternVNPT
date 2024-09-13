const mongoose = require("mongoose");

let paymentMethodSchema = mongoose.Schema({
  TT_TENPHUONGTHUC: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Payment Method", paymentMethodSchema);
