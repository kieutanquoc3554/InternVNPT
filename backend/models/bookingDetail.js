const mongoose = require("mongoose");

let bookingDetailSchema = mongoose.Schema(
  {
    KH_ID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },
    B_ID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Table",
      required: true,
    },
    CTDB_NGAYDAT: {
      type: Date,
      required: true,
    },
    CTDB_GHICHU: {
      type: String,
      required: true,
    },
  },
  { timeStamp: true }
);
bookingDetailSchema.index({ KH_ID: 1, B_ID: 1 }, { unique: true });

module.exports = mongoose.model("BookingDetail", bookingDetailSchema);
