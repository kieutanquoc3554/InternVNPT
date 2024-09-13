const mongoose = require("mongoose");

let promoteSchema = mongoose.Schema({
  KM_TEN: {
    type: String,
    required: true,
  },
  KM_NGAYBATDAU: {
    type: Date,
    default: Date.now,
  },
  KM_NGAYKETTHUC: {
    type: Date,
    default: Date.now,
  },
  KM_GIATRI: {
    type: Number,
    required: true,
  },
  KM_MAKHUYENMAI: {
    type: String,
  },
  KM_LOAISANPHAM: {
    type: String,
  },
  KM_MOTA: {
    type: String,
  },
  KM_SO_LAN_AP_DUNG: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("Promote", promoteSchema);
