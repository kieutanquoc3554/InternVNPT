const Area = require("../models/area");

const addArea = async (req, res) => {
  try {
    const { areaName } = req.body;
    const area = await new Area({
      VT_ID: (await Area.countDocuments()) + 1,
      VT_TEN: areaName,
    });
    await area.save();
    res.status(200).json(area);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getAllArea = async (req, res) => {
  try {
    const areas = await Area.find();
    res.json(areas);
  } catch (error) {
    console.error("Lỗi khi lấy tất cả khu vực:", error);
    res.status(500).send("Lỗi khi lấy dữ liệu khu vực");
  }
};

module.exports = { addArea, getAllArea };
