const User = require("../models/user");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  const { username, password, name, role, phone, email } = req.body;
  try {
    const userCount = await User.countDocuments();
    const newUser = new User({
      ND_ID: userCount + 1,
      ND_TEN: name,
      ND_VAITRO: role,
      ND_SDT: phone,
      ND_EMAIL: email,
      ND_TENNGUOIDUNG: username,
      ND_MATKHAU: password,
    });
    await newUser.save();
    res.status(200).send("Đã tạo tài khoản thành công");
  } catch (error) {
    res.status(400).send(error);
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;
  let user = await User.findOne({ ND_TENNGUOIDUNG: username });
  if (user) {
    if (user.ND_MATKHAU === password) {
      const data = {
        ND_EMAIL: user.ND_EMAIL,
        ND_TEN: user.ND_TEN,
        ND_VAITRO: user.ND_VAITRO,
      };
      const token = jwt.sign(data, "secret-key");
      res.json({
        success: true,
        token,
        name: user.ND_TENNGUOIDUNG,
        vaitro: user.ND_VAITRO,
      });
    } else {
      res.json({ success: false, errors: "Sai mật khẩu" });
    }
  } else {
    res.json({ success: false, errors: "Email không hợp lệ" });
  }
};

const getAllUsers = async (req, res) => {
  const userData = await User.find({});
  res.status(200).json(userData);
};

const findUserByUsername = async (req, res) => {
  const { username } = req.body;
  try {
    const response = await User.findOne({ ND_TENNGUOIDUNG: username });
    if (response) {
      res.status(200).json({ ND_TEN: response.ND_TEN, _id: response._id });
    } else {
      res.status(200).send("Không có nhân viên nào!");
    }
  } catch (error) {
    res.status(200).send(error);
  }
};

const deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findOneAndDelete({ _id: req.params.id });
    if (!deletedUser) {
      res.status(404).send("Không tìm thấy tài khoản cần xóa");
    } else {
      res.status(200).send("Đã xóa tài khoản thành công");
    }
  } catch (error) {
    res.status(400).send(error);
  }
};

const editUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { ND_TEN, ND_EMAIL, ND_SDT, ND_TENNGUOIDUNG, ND_MATKHAU, ND_VAITRO } =
      req.body;
    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        ND_TEN,
        ND_EMAIL,
        ND_SDT,
        ND_TENNGUOIDUNG,
        ND_MATKHAU,
        ND_VAITRO,
      },
      { new: true }
    );

    if (!updatedUser) {
      res.status(404).send("Không tìm thấy người dùng cần cập nhật");
    }
    res.status(200).send("Cập nhật thành công");
  } catch (error) {
    res.status(500).send(error);
  }
};

const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: "Không tìm thấy người dùng" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Lỗi khi lấy thông tin người dùng" });
  }
};

const loginAdmin = async (req, res) => {
  const { phone, password } = req.body.data;
  try {
    const response = await User.findOne({
      ND_SDT: phone,
      ND_MATKHAU: password,
    });
    if (response) {
      if (response.ND_VAITRO === "Quản trị viên") {
        res.status(200).send({ success: true });
      } else {
        res.status(500).send({ success: false });
      }
    } else {
      res.status(500).send("Người dùng không hợp lệ");
    }
  } catch (error) {
    res.status(500).send("lỗi đã xảy ra: " + error);
  }
};

const home = async (req, res) => {
  res.send("Hello World");
};

module.exports = {
  register,
  login,
  getAllUsers,
  findUserByUsername,
  deleteUser,
  editUser,
  getUser,
  loginAdmin,
  home,
};
