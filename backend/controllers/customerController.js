const Customer = require("../models/customer");
const searchCustomerByPhone = async (req, res) => {
  const { numberPhone } = req.body;
  try {
    const response = await Customer.findOne({ KH_SDT: numberPhone });
    if (!response) {
      res.status(404).json({ error: "Không tìm thấy khách hàng" });
    } else {
      res.status(200).json(response);
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

const memberState = [
  "Thành viên mới",
  "Khách đặt bàn",
  "VIP 1",
  "VIP 2",
  "VIP 3",
  "GOLD",
  "PLATINUM",
];

const returnMemberState = (req, res) => {
  res.status(200).json(memberState);
};

module.exports = { searchCustomerByPhone, returnMemberState };
