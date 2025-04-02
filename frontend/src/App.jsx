import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";  // Đường dẫn đến Navbar
import HomePage from "./pages/HomePage";
import BookingPage from "./pages/BookingPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFoundPage from "./pages/NotFoundPage";
import "./App.css";  // Import CSS

function App() {
    return (
        <>
            <Navbar /> {/* Luôn hiển thị Navbar */}
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/booking" element={<BookingPage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </>
    );
}

export default App;