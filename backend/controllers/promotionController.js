const Promote = require("../models/promotion");

const allPromotions = async (req, res) => {
  try {
    const resp = await Promote.find({});
    res.status(200).json(resp);
  } catch (error) {
    res.status(500).json({ error: true, message: "Có lỗi xảy ra!" });
  }
};

const addPromotionByProduct = async (req, res) => {
  const {
    KM_TEN,
    KM_NGAYBATDAU,
    KM_NGAYKETTHUC,
    KM_GIATRI,
    KM_LOAISANPHAM,
    KM_MOTA,
  } = req.body;
  try {
    const newPromote = new Promote({
      KM_TEN,
      KM_NGAYBATDAU,
      KM_NGAYKETTHUC,
      KM_GIATRI,
      KM_LOAISANPHAM,
      KM_MOTA,
    });
    await newPromote.save();
    io.emit("newPromotion", newPromote);
    res.status(200).send("Tạo khuyến mãi thành công");
  } catch (error) {
    res.status(500).send(error);
  }
};

const removePromote = async (req, res) => {
  try {
    const deletedPromote = await Promote.findOneAndDelete({
      _id: req.params.id,
    });
    if (!deletedPromote) {
      res.status(404).send("Không tìm thấy khuyến mãi này");
    } else {
      res.status(200).send("Đã xóa khuyến mãi thành công");
    }
  } catch (error) {
    res.status(400).send(error);
  }
};

const editPromote = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      KM_TEN,
      KM_NGAYBATDAU,
      KM_NGAYKETTHUC,
      KM_GIATRI,
      KM_LOAISANPHAM,
      KM_MOTA,
    } = req.body;
    const updatedPromote = await Promote.findByIdAndUpdate(
      id,
      {
        KM_TEN,
        KM_NGAYBATDAU,
        KM_NGAYKETTHUC,
        KM_GIATRI,
        KM_LOAISANPHAM,
        KM_MOTA,
      },
      { new: true }
    );
    if (!updatedPromote) {
      res.status(404).send("Không tìm thấy khuyến mãi cần cập nhật");
    }
    res.status(200).send("Cập nhật thành công");
  } catch (error) {
    res.status(500).send(error);
  }
};

const getPromoteById = async (req, res) => {
  try {
    const { id } = req.params;
    const promote = await Promote.findById(id);
    if (!promote) {
      return res.status(404).json({ error: "Không tìm thấy khuyến mãi" });
    }
    res.status(200).json(promote);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Lỗi khi lấy thông tin khuyến mãi" });
  }
};

module.exports = {
  addPromotionByProduct,
  allPromotions,
  removePromote,
  editPromote,
  getPromoteById,
};
