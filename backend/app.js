const server_port = 4000;
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const routes = require("./routes/index");
const connect = require("./utility/database");
const upload = require("./utility/upload");

connect();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(routes);

// Tai hinh anh len
app.use("/images", express.static("upload/images"));
app.post("/upload", upload.single("product"), (req, res) => {
  res.json({
    success: 1,
    image_url: `http://localhost:${server_port}/images/${req.file.filename}`,
  });
});

app.listen(server_port, (error) => {
  if (!error) {
    console.log(
      "\x1b[1mTHÔNG BÁO MÁY CHỦ:\x1b[0m Máy chủ đang chạy trên cổng: " +
        server_port
    );
  } else {
    console.log(error);
  }
});
