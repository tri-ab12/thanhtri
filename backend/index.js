require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("./config/db"); // Import kết nối MySQL
const bcrypt = require("bcryptjs");

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Kiểm tra kết nối MySQL
db.getConnection((err) => {
    if (err) {
        console.error("❌ Lỗi kết nối MySQL:", err.message);
        process.exit(1);
    }
    console.log("✅ Kết nối MySQL thành công!");
});

// ✅ API kiểm tra backend
app.get("/", (req, res) => {
    res.send("✅ Hotel Booking API is running...");
});

// ✅ Route: Đăng ký người dùng
app.post("/register", async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ message: "Vui lòng nhập đầy đủ thông tin!" });
    }

    try {
        // Kiểm tra xem email đã tồn tại chưa
        db.query("SELECT * FROM users WHERE email = ?", [email], async (err, results) => {
            if (err) {
                console.error("❌ Lỗi khi kiểm tra email:", err);
                return res.status(500).json({ message: "Lỗi server", error: err.message });
            }

            if (results.length > 0) {
                return res.status(400).json({ message: "Email đã tồn tại!" });
            }

            // Mã hóa mật khẩu
            const hashedPassword = await bcrypt.hash(password, 10);

            // Thêm user vào database
            db.query(
                "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
                [username, email, hashedPassword],
                (err, result) => {
                    if (err) {
                        console.error("❌ Lỗi khi đăng ký:", err);
                        return res.status(500).json({ message: "Lỗi server", error: err.message });
                    }

                    res.status(201).json({ message: "✅ Đăng ký thành công!", userId: result.insertId });
                }
            );
        });
    } catch (err) {
        console.error("❌ Lỗi không xác định:", err);
        res.status(500).json({ message: "Lỗi server", error: err.message });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server đang chạy tại: http://localhost:${PORT}`);
});
