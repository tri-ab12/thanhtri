const db = require('../config/db');

exports.getRooms = (req, res) => {
    db.query('SELECT * FROM rooms', (err, results) => {
        if (err) return res.status(500).json({ message: 'Lỗi server', error: err });

        res.json(results);
    });
};

exports.getRoomById = (req, res) => {
    const { id } = req.params;

    db.query('SELECT * FROM rooms WHERE id = ?', [id], (err, results) => {
        if (err) return res.status(500).json({ message: 'Lỗi server', error: err });

        if (results.length === 0) {
            return res.status(404).json({ message: 'Không tìm thấy phòng' });
        }

        res.json(results[0]);
    });
};
