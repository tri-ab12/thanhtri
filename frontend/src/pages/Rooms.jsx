import { useEffect, useState } from "react";

const Rooms = () => {
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch("http://localhost:3000/rooms")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Lỗi khi tải dữ liệu phòng!");
                }
                return response.json();
            })
            .then((data) => {
                setRooms(data);
                setLoading(false);
            })
            .catch((error) => {
                setError(error.message);
                setLoading(false);
            });
    }, []);

    if (loading) return <p>Đang tải danh sách phòng...</p>;
    if (error) return <p>Lỗi: {error}</p>;

    return (
        <div>
            <h2>Danh sách phòng</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
                {rooms.map((room) => (
                    <div key={room.id} style={{ border: "1px solid #ddd", padding: "10px", borderRadius: "5px" }}>
                        <h3>{room.name}</h3>
                        <p>Giá: {room.price} VND / đêm</p>
                        <p>Trạng thái: {room.available ? "Còn trống" : "Đã đặt"}</p>
                        <button disabled={!room.available} style={{ padding: "5px 10px", cursor: room.available ? "pointer" : "not-allowed" }}>
                            Đặt phòng
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Rooms;