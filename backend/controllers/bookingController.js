const db = require('../config/db');

exports.createBooking = (req, res) => {
    const { userId, roomId, checkInDate, checkOutDate } = req.body;

    db.query('INSERT INTO bookings (user_id, room_id, check_in, check_out) VALUES (?, ?, ?, ?)', 
        [userId, roomId, checkInDate, checkOutDate], (err, result) => {
            if (err) return res.status(500).json({ message: 'Lỗi server', error: err });

            res.status(201).json({ message: 'Đặt phòng thành công', bookingId: result.insertId });
        }
    );
};

exports.getBookings = (req, res) => {
    db.query('SELECT * FROM bookings', (err, results) => {
        if (err) return res.status(500).json({ message: 'Lỗi server', error: err });

        res.json(results);
    });
};
