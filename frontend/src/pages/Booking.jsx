import { useState } from "react";

const Booking = () => {
    const [bookingData, setBookingData] = useState({
        customer_name: "",
        customer_email: "",
        room_id: "",
        check_in: "",
        check_out: "",
    });

    const handleChange = (e) => {
        setBookingData({ ...bookingData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:3000/bookings", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(bookingData),
            });

            const data = await response.json();
            if (response.ok) {
                alert("Đặt phòng thành công!");
            } else {
                alert("Lỗi: " + data.error);
            }
        } catch (error) {
            console.error("Lỗi khi gửi yêu cầu:", error);
        }
    };

    return (
        <div>
            <h2>Đặt Phòng</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="customer_name" placeholder="Tên khách hàng" onChange={handleChange} required />
                <input type="email" name="customer_email" placeholder="Email" onChange={handleChange} required />
                <input type="number" name="room_id" placeholder="Mã phòng" onChange={handleChange} required />
                <input type="date" name="check_in" onChange={handleChange} required />
                <input type="date" name="check_out" onChange={handleChange} required />
                <button type="submit">Đặt phòng</button>
            </form>
        </div>
    );
};

export default Booking;
