import { Link } from "react-router-dom";
import "./App.css"; // Import App.css

const Navbar = () => {
    return (
        <nav className="navbar">
            <h2 className="logo">Hotel Booking</h2>
            <div className="nav-links">
                <Link to="/">Home</Link>
                <Link to="/booking">Booking</Link>
                <Link to="/login">Login</Link>  
                <Link to="/register">Register</Link>  
            </div>
        </nav>
    );
};

export default Navbar;