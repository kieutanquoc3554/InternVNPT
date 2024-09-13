const mongoose = require("mongoose");

const mongoURL =
  "mongodb+srv://kieutanquoc2002:Kieutanquoc3554@cluster0.c6rsr3z.mongodb.net/iCafe";

const connect = async () => {
  try {
    mongoose.connect(mongoURL).then(() => {
      console.log(
        "\x1b[1mTHÔNG BÁO KẾT NỐI:\x1b[0m Kết nối đến cơ sở dữ liệu thành công!"
      );
    });
  } catch (error) {
    console.log(
      "\x1b[1mTHÔNG BÁO KẾT NỐI:\x1b[0m Kết nối đến cơ sở dữ liệu không thành công!"
    );
    console.error(err);
    process.exit(1);
  }
};

module.exports = connect;
