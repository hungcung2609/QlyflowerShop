import React from 'react';
import '../../css/nav&footer/Footer.css'; // Đảm bảo rằng bạn tạo file CSS cho Footer

function Footer() {
  return (
    <footer className="footer">
      <hr className="footer-divider" />
      <div className="footer-container">
        {/* Phần thông tin doanh nghiệp */}
        <div className="footer-info">
          <h3>DALAT FLOWER</h3>
          <p>Công ty TNHH Dalat FLOWER chuyên cung cấp hoa và cây cảnh chất lượng cao.</p>
          <p>Địa chỉ: Đà Lạt, Lâm Đồng, Việt Nam</p>
          <p>Điện thoại: (086) 950 7729</p>
          <p>Email: info@dalatflower.com.vn</p>
        </div>

        {/* Các liên kết đến các trang khác */}
        <div className="footer-links">
          <h4>Liên kết</h4>
          <ul>
            <li><a href="/">Trang Chủ</a></li>
            <li><a href="/about">Giới Thiệu</a></li>
            <li><a href="/products">Sản Phẩm</a></li>
            <li><a href="/contact">Cửa Hàng</a></li>
            <li><a href="/privacyPolicy">Chính sách bảo mật</a></li>
          </ul>
        </div>

        {/* Mạng xã hội */}
        <div className="footer-social">
          <h4>Kết nối với chúng tôi</h4>
          <ul>
            <li><a href="https://www.facebook.com/profile.php?id=100012988417315" target="_blank" rel="noopener noreferrer">Facebook</a></li>
            <li><a href="https://www.instagram.com/ng_hung269?fbclid=IwZXh0bgNhZW0CMTAAAR3OUr3ekSAOWIgvWWMLLk5gn2xeQMhX2aAXsMzWAMJ_GT0eziShLrqi8g8_aem_eVuvlCHqHgpU5TSaAtue2Q" target="_blank" rel="noopener noreferrer">Instagram</a></li>
            <li><a href="https://www.youtube.com/channel/dalathasfarm" target="_blank" rel="noopener noreferrer">YouTube</a></li>
          </ul>
        </div>
      </div>
      <hr className="footer-divider" />
      {/* Bản quyền */}
      <div className="footer-bottom">
        <p>&copy; 2024 Dalat Flower. All Rights Reserved.</p>
      </div>
      
    </footer>
  );
}

export default Footer;
