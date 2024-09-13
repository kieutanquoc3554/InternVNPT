const Order = require("../models/order");
const TypeOrder = require("../models/ordertype");
const Size = require("../models/size");
const Product = require("../models/product");
const Promotion = require("../models/promotion");

const addOrder = async (req, res) => {
  try {
    const {
      DH_TONGTIEN,
      DH_TRANGTHAI,
      DH_LOAI,
      DH_NHANVIENLAP,
      DH_THEBAN,
      DH_KHACHHANG,
      DH_THANHTOAN,
      CHITIETDONHANG,
      DH_TIENKHACHDUA,
      DH_TIENTRALAI,
    } = req.body;

    const newOrder = new Order({
      DH_TONGTIEN,
      DH_TRANGTHAI,
      DH_LOAI,
      DH_NHANVIENLAP,
      DH_THEBAN,
      DH_KHACHHANG,
      DH_THANHTOAN,
      DH_TIENKHACHDUA,
      DH_TIENTRALAI,
    });

    for (const item of CHITIETDONHANG) {
      const product = await Product.findById(item.CTDH_SP);
      const size = await Size.findById(item.CTDH_KICHCO);

      if (!product || !size) {
        return res.status(400).json({
          message: `Không tìm thấy sản phẩm ${item.CTDH_SP} hoặc kích cỡ ${item.CTDH_KICHCO}`,
        });
      }

      const promotion = await Promotion.findOne({
        KM_LOAISANPHAM: product.SP_LOAI,
      });

      const orderItem = {
        CTDH_SP: product._id,
        CTDH_KICHCO: size._id,
        CTDH_GIA: item.CTDH_GIA,
        quantity: item.quantity,
        note: item.note || "",
        promotions: promotion
          ? {
              KM_TEN: promotion.KM_TEN,
              KM_GIATRI: promotion.KM_GIATRI,
            }
          : null,
      };

      newOrder.CHITIETDONHANG.push(orderItem);
    }

    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const allOrder = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("CHITIETDONHANG.CTDH_SP", "SP_TEN")
      .populate("CHITIETDONHANG.CTDH_KICHCO", "KC_TEN")
      .populate("DH_NHANVIENLAP", "ND_TEN ND_SDT")
      .populate("DH_KHACHHANG")
      .populate("DH_LOAI", "L_TEN")
      .populate("DH_THEBAN")
      .populate("DH_THANHTOAN", "TT_TENPHUONGTHUC");

    res.json(orders);
  } catch (error) {
    res.status(500).send(error);
  }
};

const addType = async (req, res) => {
  const { type } = req.body;
  try {
    const newType = new TypeOrder({
      L_TEN: type,
    });
    await newType.save();
    res.status(200).send("Đã tạo thành công");
  } catch (error) {
    res.status(500).send("Lỗi");
  }
};

const allType = async (req, res) => {
  try {
    const data = await TypeOrder.find({});
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
};

const findTypeByName = async (req, res) => {
  const { name } = req.body;
  try {
    const response = await TypeOrder.findOne({ L_TEN: name });
    res.status(200).json({ _id: response._id, name: response.L_TEN });
  } catch (error) {
    res.status(500).json(error);
  }
};

const findOrderByID = async (req, res) => {
  const { orderId } = req.params;
  try {
    const response = await Order.findById(orderId)
      .populate("CHITIETDONHANG.CTDH_SP", "SP_TEN SP_ANH")
      .populate("CHITIETDONHANG.CTDH_KICHCO", "KC_TEN")
      .populate("DH_NHANVIENLAP", "ND_TEN ND_SDT")
      .populate("DH_KHACHHANG")
      .populate("DH_LOAI", "L_TEN")
      .populate("DH_THEBAN")
      .populate("DH_THANHTOAN", "TT_TENPHUONGTHUC");
    res.status(200).send(response);
  } catch (error) {
    res.status(500).send(error);
  }
};

const AnalyticInDay = async (req, res) => {
  try {
    const current = new Date();
    const orders = await Order.find().populate(
      "CHITIETDONHANG.CTDH_SP",
      "SP_TEN quantity SP_GIA"
    );
    const productQuantities = {};
    let totalPrice = 0;

    const ordersInDay = orders.filter((item) => {
      const orderDate = new Date(item.DH_NGAYLAP);
      return orderDate.toDateString() === current.toDateString();
    });

    ordersInDay.forEach((order) => {
      const productsOrder = order.CHITIETDONHANG;
      productsOrder.forEach((product) => {
        const name = product.CTDH_SP.SP_TEN;
        const quantity = product.quantity;
        const price = product.CTDH_GIA;

        if (productQuantities[name]) {
          productQuantities[name].quantity += quantity;
        } else {
          productQuantities[name] = {
            quantity: quantity,
            price: price / quantity,
          };
        }
        totalPrice += price;
      });
    });

    res.status(200).json({ productQuantities, totalPrice });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

const AnalyticByWeek = async (req, res) => {
  try {
    const data = req.body.data;
    const startDate = new Date(data);

    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 6);
    const revenueByDay = {};

    const orders = await Order.find({});

    for (
      let date = startDate;
      date <= endDate;
      date.setDate(date.getDate() + 1)
    ) {
      const ordersInDay = orders.filter((item) => {
        const orderDate = new Date(item.DH_NGAYLAP);
        return orderDate.toDateString() === date.toDateString();
      });

      let totalRevenue = 0;
      ordersInDay.forEach((order) => {
        totalRevenue += order.DH_TONGTIEN;
      });

      revenueByDay[date.toDateString()] = totalRevenue;
    }

    res.status(200).json({ revenueByDay });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

const formatDate = (isoString) => {
  const date = new Date(isoString);
  const month = date.getUTCMonth() + 1;
  const year = date.getUTCFullYear();
  return `${month}/${year}`;
};

const AnalyticByMonth = async (req, res) => {
  try {
    const current = new Date();
    const currentMonth = current.getMonth() + 1;
    const currentYear = current.getFullYear();

    const months = [];

    for (let i = 0; i < 12; i++) {
      const month = (currentMonth - i + 12) % 12;
      const year = currentYear - Math.floor((i + 12 - currentMonth) / 12);
      const monthString = `${month + 1}/${year}`;
      months.push(monthString);
    }

    const revenueByMonth = {};

    const orders = await Order.find({});
    months.reverse().forEach((month) => {
      const ordersInMonth = orders.filter((item) => {
        const orderMonth = new Date(item.DH_NGAYLAP);
        return formatDate(orderMonth) === month;
      });

      let totalRevenue = 0;
      ordersInMonth.forEach((order) => {
        totalRevenue += order.DH_TONGTIEN;
      });

      revenueByMonth[month] = totalRevenue;
    });
    res.status(200).json({ revenueByMonth });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

const AnalyticItemByWeek = async (req, res) => {
  try {
    const data = req.body.data;
    const startDate = new Date(data);

    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 6);
    const quantityByWeek = {};

    let totalPrice = 0;
    const orders = await Order.find().populate(
      "CHITIETDONHANG.CTDH_SP",
      "SP_TEN quantity SP_GIA"
    );

    for (
      let date = startDate;
      date <= endDate;
      date.setDate(date.getDate() + 1)
    ) {
      const ordersInDay = orders.filter((item) => {
        const orderDate = new Date(item.DH_NGAYLAP);
        return orderDate.toDateString() === date.toDateString();
      });

      ordersInDay.forEach((order) => {
        const productsOrder = order.CHITIETDONHANG;
        productsOrder.forEach((product) => {
          const name = product.CTDH_SP.SP_TEN;
          const quantity = product.quantity;
          const price = product.CTDH_GIA;

          if (quantityByWeek[name]) {
            quantityByWeek[name].quantity += quantity;
          } else {
            quantityByWeek[name] = {
              quantity: quantity,
              price: price / quantity,
            };
          }
          totalPrice += price;
        });
      });
    }

    res.status(200).json({ quantityByWeek, totalPrice });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

const AnalyticItemByMonth = async (req, res) => {
  try {
    const data = req.body.data;
    const startDate = new Date(data);

    const endDate = new Date(
      startDate.getFullYear(),
      startDate.getMonth() + 1,
      0
    );

    const quantityByMonth = {};
    let totalPrice = 0;
    const orders = await Order.find().populate(
      "CHITIETDONHANG.CTDH_SP",
      "SP_TEN quantity SP_GIA"
    );
    for (
      let date = startDate;
      date <= endDate;
      date.setDate(date.getDate() + 1)
    ) {
      const ordersInDay = orders.filter((item) => {
        const orderDate = new Date(item.DH_NGAYLAP);
        return orderDate.toDateString() === date.toDateString();
      });

      ordersInDay.forEach((order) => {
        const productsOrder = order.CHITIETDONHANG;
        productsOrder.forEach((product) => {
          const name = product.CTDH_SP.SP_TEN;
          const quantity = product.quantity;
          const price = product.CTDH_GIA;

          if (quantityByMonth[name]) {
            quantityByMonth[name].quantity += quantity;
          } else {
            quantityByMonth[name] = {
              quantity: quantity,
              price: price / quantity,
            };
          }
          totalPrice += price;
        });
      });
    }

    res.status(200).json({ quantityByMonth, totalPrice });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  addOrder,
  allOrder,
  addType,
  allType,
  findTypeByName,
  findOrderByID,
  AnalyticInDay,
  AnalyticByWeek,
  AnalyticByMonth,
  AnalyticItemByWeek,
  AnalyticItemByMonth,
};
