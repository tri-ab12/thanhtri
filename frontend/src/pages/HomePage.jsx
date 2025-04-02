import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function HomePage() {
    const [rooms, setRooms] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/api/rooms") // Gọi API lấy danh sách phòng
            .then((res) => res.json())
            .then((data) => setRooms(data))
            .catch((err) => console.error("Lỗi khi lấy danh sách phòng:", err));
    }, []);

    return (
        <div>
            <h1>Danh sách phòng khách sạn</h1>
            <ul>
                {rooms.map((room) => (
                    <li key={room.id}>
                        <h3>{room.name}</h3>
                        <p>Giá: {room.price} VND</p>
                        <Link to="/booking">Đặt phòng</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default HomePage;
