const mongoose = require("mongoose");

let orderSchema = mongoose.Schema({
  DH_NGAYLAP: {
    type: Date,
    default: Date.now,
  },
  DH_TONGTIEN: {
    type: Number,
  },
  DH_TRANGTHAI: {
    type: String,
  },
  DH_LOAI: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Order Type",
  },
  CHITIETDONHANG: [
    {
      CTDH_SP: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
      CTDH_KICHCO: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Size",
      },
      CTDH_GIA: {
        type: Number,
      },
      quantity: {
        type: Number,
      },
      note: {
        type: String,
      },
      promotions: {
        KM_TEN: String,
        KM_GIATRI: Number,
      },
    },
  ],
  DH_NHANVIENLAP: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  DH_THEBAN: {
    type: Number,
    required: true,
  },
  DH_KHACHHANG: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
  },
  DH_THANHTOAN: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Payment Method",
  },
  DH_TIENKHACHDUA: {
    type: Number,
  },
  DH_TIENTRALAI: {
    type: Number,
  },
});

module.exports = mongoose.model("Order", orderSchema);
