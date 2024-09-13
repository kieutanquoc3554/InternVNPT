const Customer = require("../models/customer");
const Area = require("../models/area");
const Table = require("../models/table");
const BookingDetail = require("../models/bookingDetail");
const mongoose = require("mongoose");
const moment = require("moment");

const booking = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const {
      name,
      phone,
      email,
      statusCustomer,
      tableName,
      tableArea,
      ngaydat,
      ghichu,
    } = req.body;

    // Cập nhật khách hàng
    let customer = await Customer.findOne({ KH_TEN: name }).session(session);
    if (!customer) {
      customer = new Customer({
        KH_ID: (await Customer.countDocuments().session(session)) + 1,
        KH_TEN: name,
        KH_SDT: phone,
        KH_EMAIL: email,
        KH_TRANGTHAITHANHVIEN: statusCustomer,
      });
      await customer.save({ session });
    }

    // Tìm chỗ
    let area = await Area.findOne({ VT_TEN: tableArea }).session(session);
    if (!area) {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).send("Khu vực đặt bàn không tồn tại");
    }

    // Tìm bàn
    let table = await Table.findOne({
      B_TEN: tableName,
      B_VITRI: area._id,
    }).session(session);
    if (!table) {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).send("Bàn không có trong cơ sở dữ liệu");
    }

    // Kiểm tra bàn
    if (table.B_TRANGTHAI !== "Trống") {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).send("Bàn hiện đã có người đặt");
    }

    // Tạo thông tin đặt bàn
    const booking = new BookingDetail({
      KH_ID: customer._id,
      B_ID: table._id,
      CTDB_NGAYDAT: moment(ngaydat).toDate(),
      CTDB_GHICHU: ghichu,
    });
    table.B_TRANGTHAI = "Đã đặt";

    await booking.save({ session });
    await table.save({ session });

    await session.commitTransaction();
    session.endSession();

    res.status(201).send("Đặt bàn thành công!");
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.error("Lỗi khi đặt bàn:", error);
    res.status(500).send("Lỗi khi đặt bàn" + error);
  }
};

const getInfoBook = async (req, res) => {
  let bookingData = await BookingDetail.find()
    .populate({
      path: "KH_ID",
      select: "KH_TEN KH_SDT KH_EMAIL KH_TRANGTHAITHANHVIEN",
    })
    .populate({
      path: "B_ID",
      populate: {
        path: "B_VITRI",
        select: "VT_TEN",
      },
      select: "B_TEN B_VITRI",
    });
  res.status(200).json(bookingData);
};

module.exports = { getInfoBook, booking };
