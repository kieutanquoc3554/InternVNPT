const payment = require("../models/paymentDetail");

const addPaymentDetail = async (req, res) => {
  const { name, date } = req.body;
  try {
    const newDetail = await new payment({
      CTTT_TEN: name,
      CTTT_date: date,
    });
    await newDetail.save();
    res.status(200).send("Đã lưu");
  } catch (error) {
    res.status(500).send("Lỗi");
  }
};

module.exports = { addPaymentDetail };
