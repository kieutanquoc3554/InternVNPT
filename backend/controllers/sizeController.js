const Size = require("../models/size");

const addSize = async (req, res) => {
  const { size, capacity } = req.body;
  const existedSize = await Size.findOne({ KC_TEN: size });
  if (existedSize) {
    res.status(400).send("Kích cỡ ly đã tồn tại");
  } else {
    try {
      const kichco = new Size({
        KC_ID: (await Size.countDocuments()) + 1,
        KC_TEN: size,
        KC_DUNGTICH: capacity,
      });
      const savedSize = await kichco.save();
      res.status(200).json(savedSize);
    } catch (error) {
      res.status(400).send("Không thể thêm");
    }
  }
};

const getAllSizes = async (req, res) => {
  const data = await Size.find({});
  res.status(200).json(data);
};

const findSizeByName = async (req, res) => {
  const { KC_TEN } = req.body;
  try {
    const size = await Size.findOne({ KC_TEN });
    if (size) {
      res.status(200).json(size);
    } else {
      res.status(404).json({ message: "Size not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { addSize, getAllSizes, findSizeByName };
