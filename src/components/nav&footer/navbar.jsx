import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import '../../css/nav&footer/Navbar.css';

function Navbar({ cartIconRef }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [welcomeMessage, setWelcomeMessage] = useState(null);
  const [role, setRole] = useState(null);

  useEffect(() => {
    // Kiểm tra xem có thông tin người dùng trong state không khi chuyển hướng
    if (location.state && location.state.role && location.state.welcomeMessage) {
      setRole(location.state.role); // Lưu role vào state
      setWelcomeMessage(location.state.welcomeMessage); // Lưu welcomeMessage vào state
    } else {
      // Kiểm tra nếu có thông tin người dùng trong localStorage
      const storedRole = localStorage.getItem('role');
      const storedWelcomeMessage = localStorage.getItem('welcomeMessage');
      if (storedRole && storedWelcomeMessage) {
        setRole(storedRole); // Lưu role vào state
        setWelcomeMessage(storedWelcomeMessage); // Lưu welcomeMessage vào state
      }
    }
  }, [location]);

  const handleLogout = () => {
    // Xóa thông tin người dùng khi đăng xuất
    setRole(null);
    setWelcomeMessage(null);
    localStorage.clear();
    navigate('/signin'); 
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <a href="/">
          <img 
            src="/assets/logo.png" 
            alt="Flower_shop" 
            className="navbar-logo-img" 
          />
        </a>
      </div>
      <ul className="navbar-menu">
        <li><a href="/">Trang chủ</a></li>
        <li className="dropdown">
          <a href="/products" className="dropdown-toggle">Sản Phẩm</a>
          <ul className="dropdown-menu">
            <li><a href="/hoatang">Hoa tặng</a></li>
            <li><a href="/hoachau">Chậu hoa</a></li>
            <li><a href="/hoacuoi">Hoa Cưới</a></li>
            <li><a href="/hoachucmung">Hoa Chúc Mừng</a></li>
            <li><a href="/hoachiabuon">Hoa Chia Buồn</a></li>
          </ul>
        </li>
        <li><a href="/about">Giới Thiệu</a></li>
        <li><a href="/contact">Cửa Hàng</a></li>
      </ul>
      <div className="navbar-actions">
        <Link to="/cart" className="navbar-cart">
          <img src="assets/cart-icon.png" alt="Cart" />
        </Link>
        {welcomeMessage ? (
          <>
            <span>{welcomeMessage}</span> {/* Hiển thị welcomeMessage */}
            {/* Nếu role là admin, hiển thị link tới trang Quản Trị Viên */}
            {role === 'admin' && (
              <Link to="/admin" className="navbar-login">Quản Trị Viên</Link>
            )}
            <button onClick={handleLogout} className="navbar-login">Đăng xuất</button>
          </>
        ) : (
          <>
            <Link to="/signin" className="navbar-login">Đăng nhập</Link> 
            <Link to="/signup" className="navbar-login">Đăng ký</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
