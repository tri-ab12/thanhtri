const db = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config(); // Đọc biến môi trường từ .env

// 📌 Đăng ký người dùng
exports.registerUser= async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ message: "Vui lòng nhập đầy đủ thông tin!" });
        }

        // Kiểm tra email đã tồn tại chưa
        const [users] = await db.promise().query("SELECT * FROM users WHERE email = ?", [email]);
        if (users.length > 0) {
            return res.status(400).json({ message: "Email đã tồn tại!" });
        }

        // Mã hóa mật khẩu
        const hashedPassword = await bcrypt.hash(password, 10);

        // Thêm người dùng vào database
        const [result] = await db.promise().query(
            "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
            [username, email, hashedPassword]
        );

        res.status(201).json({ message: "Đăng ký thành công!", userId: result.insertId });
    } catch (error) {
        console.error("❌ Lỗi khi đăng ký:", error);
        res.status(500).json({ message: "Lỗi server", error: error.message });
    }
};

// 📌 Đăng nhập người dùng
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Vui lòng nhập email và mật khẩu!" });
        }

        // Kiểm tra email trong database
        const [users] = await db.promise().query("SELECT * FROM users WHERE email = ?", [email]);
        if (users.length === 0) {
            return res.status(400).json({ message: "Email không tồn tại!" });
        }

        const user = users[0];
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ message: "Mật khẩu không đúng!" });
        }

        // Tạo token JWT
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.json({ message: "Đăng nhập thành công!", token });
    } catch (error) {
        console.error("❌ Lỗi khi đăng nhập:", error);
        res.status(500).json({ message: "Lỗi server", error: error.message });
    }
};