document.addEventListener('DOMContentLoaded', function () {
    const roomData = [
      { id: 1, type: "Phòng Tiêu Chuẩn", price: 500000, image: "room1.jpg" },
      { id: 2, type: "Phòng Cao Cấp", price: 800000, image: "room2.jpg" },
      { id: 3, type: "Phòng Gia Đình", price: 1200000, image: "room3.jpg" },
      { id: 4, type: "Phòng VIP", price: 2000000, image: "room4.jpg" },
      { id: 5, type: "Phòng Suite", price: 3000000, image: "room5.jpg" },
      { id: 6, type: "Phòng Tổng Thống", price: 5000000, image: "room6.jpg" },
      { id: 7, type: "Phòng Căn Hộ", price: 7000000, image: "room7.jpg" },
    ];
  
    const roomList = document.getElementById('room-list');
  
    roomData.forEach(room => {
      const roomCard = document.createElement('div');
      roomCard.classList.add('room-card');
      roomCard.innerHTML = `
        <img src="${room.image}" alt="${room.type}">
        <h3>${room.type}</h3>
        <p>Giá: ${room.price.toLocaleString()} VND</p>
        <button onclick="redirectToBooking(${room.id})">Đặt Phòng</button>
      `;
      roomList.appendChild(roomCard);
    });
  });
  
  // Chuyển hướng sang trang đặt phòng
  function redirectToBooking(roomId) {
    window.location.href = `booking.html?roomId=${roomId}`;
  }
  