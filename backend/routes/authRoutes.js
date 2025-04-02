const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

// API Đăng ký
router.post("/register", async (req, res) => {
    const { username, email, password } = req.body;

    // Kiểm tra email đã tồn tại chưa
    const checkUserQuery = "SELECT * FROM users WHERE email = ?";
    db.query(checkUserQuery, [email], async (err, results) => {
        if (err) return res.status(500).json({ message: "Lỗi server!" });

        if (results.length > 0) {
            return res.status(400).json({ message: "Email đã tồn tại!" });
        }

        // Mã hóa mật khẩu
        const hashedPassword = await bcrypt.hash(password, 10);

        // Thêm user vào database
        const insertUserQuery = "INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)";
        db.query(insertUserQuery, [username, email, hashedPassword, "user"], (err, result) => {
            if (err) return res.status(500).json({ message: "Lỗi khi thêm user vào database!" });

            res.status(201).json({ message: "Đăng ký thành công!" });
        });
    });
});

// Route đăng nhập
router.post("/api/auth/login", async (req, res) => {
    try {
        await authController.login(req, res);
    } catch (error) {
        console.error("Lỗi khi xử lý đăng nhập:", error);
        res.status(500).json({ message: "Lỗi server" });
    }
});

module.exports = router;