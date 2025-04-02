const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Thông báo khi backend khởi động
console.log("🚀 Backend đang khởi động...");

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Kết nối MySQL
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "hotel_booking",
});

db.connect((err) => {
  if (err) {
    console.error("❌ Lỗi kết nối MySQL: ", err.message);
    return;
  }
  console.log("✅ Kết nối MySQL thành công!");
});

// API kiểm tra backend hoạt động
app.get("/", (req, res) => {
  res.send("Backend đang chạy!");
});

// Khởi động server
app.listen(PORT, () => {
  console.log(`✅ Server chạy tại http://localhost:${PORT}`);
});
