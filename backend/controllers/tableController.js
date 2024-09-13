const Area = require("../models/area");
const Table = require("../models/table");
const TableCard = require("../models/tableCard");
const BookingDetail = require("../models/bookingDetail");
const Customer = require("../models/customer");

const createTable = async (req, res) => {
  try {
    const { tableName, areaName, status } = req.body;
    const area = await Area.findOne({ VT_TEN: areaName });
    if (!area) {
      return res.status(404).json({ message: "Không tìm thấy khu vực" });
    }

    const existingTable = await Table.findOne({
      B_TEN: tableName,
      B_VITRI: area._id,
    });

    if (existingTable) {
      return res.status(400).send("Bàn đã tồn tại trong khu vực này");
    }

    const table = await new Table({
      B_ID: (await Table.countDocuments()) + 1,
      B_TEN: tableName,
      B_VITRI: area._id,
      B_TRANGTHAI: status,
    });
    await table.save();
    res.status(200).send("Tạo bàn thành công");
  } catch (error) {
    res.status(500).send(error);
  }
};

const getAllTable = async (req, res) => {
  const tableData = await Table.find().populate("B_VITRI");
  res.status(200).send(tableData);
};

const getTableByArea = async (req, res) => {
  const areaName = req.params.area;
  try {
    const area = await Area.findOne({ VT_TEN: areaName });
    if (!area) {
      return res.status(404).send("Không tìm thấy khu vực");
    }
    const tables = await Table.find({ B_VITRI: area._id });
    res.json(tables);
  } catch (error) {
    console.error("Lỗi khi lấy danh sách bàn:", error);
    res.status(500).send("Lỗi khi lấy danh sách bàn");
  }
};

const addTableCard = async (req, res) => {
  try {
    for (let index = 0; index < 30; index++) {
      const newCard = await new TableCard({
        TB_TEN: index,
      });
      await newCard.save();
    }
    res.status(200).send("Tạo thẻ bàn thành công");
  } catch (error) {
    res.status(500).send("Lỗi");
  }
};

const getTableCard = async (req, res) => {
  const tableCard = await TableCard.find({});
  res.status(200).json(tableCard);
};

const updateTableStatus = async (req, res) => {
  const { tableId } = req.params;
  const { status } = req.body;
  try {
    const table = await Table.findOneAndUpdate(
      { B_ID: tableId },
      { B_TRANGTHAI: status },
      { new: true }
    );
    if (!table) {
      return res.status(404).send("Không tìm thấy bàn!");
    }
    res.status(200).send("Cập nhật trạng thái bàn thành công");
  } catch (error) {
    console.error("Lỗi khi cập nhật trạng thái bàn:", error);
    res.status(500).send("Lỗi khi cập nhật trạng thái bàn");
  }
};

const deleteInfoBooking = async (req, res) => {
  const { tableId } = req.params;
  try {
    const bookInfo = await BookingDetail.findOneAndDelete({ B_ID: tableId });
    if (!bookInfo) {
      return res.status(404).send("Không tìm thấy thông tin đặt bàn");
    } else {
      return res.status(200).send("Đã xoá thông tin đặt bàn");
    }
  } catch (error) {
    return res.status(500).send(error);
  }
};

const getIDTableByAreaAndName = async (req, res) => {
  const { areaID, tableName } = req.body;
  try {
    const area = await Area.findById(areaID);
    if (!area) {
      return res.status(404).send("Không tìm thấy thông tin khu vực này!");
    }
    const table = await Table.findOne({ B_VITRI: area._id, B_TEN: tableName });
    if (!table) {
      return res.status(404).send("Không tìm thấy thông tin bàn");
    }
    res.status(200).json({ tableId: table._id });
  } catch (error) {
    console.error("Lỗi khi tìm bàn:", error);
    res.status(500).send("Lỗi khi tìm bàn");
  }
};

const getInfoBooking = async (req, res) => {
  const { tableId } = req.body;
  try {
    const table = await BookingDetail.findOne({ B_ID: tableId });
    if (!table) {
      return res.status(404).send("Không tìm thấy thông tin bàn đặt");
    } else {
      if (!table.KH_ID) {
        return res.status(404).send("Không tìm thấy khách hàng");
      } else {
        const customer = await Customer.findOne({ _id: table.KH_ID });
        return res.status(200).json({
          tableNote: table.CTDB_GHICHU,
          customerName: customer.KH_TEN,
        });
      }
    }
  } catch (error) {
    return res.status(500).send(error);
  }
};

module.exports = {
  createTable,
  getAllTable,
  getTableByArea,
  getTableCard,
  addTableCard,
  updateTableStatus,
  deleteInfoBooking,
  getIDTableByAreaAndName,
  getInfoBooking,
};
