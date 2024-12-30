import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import '../css/pages/Home.css';

function Home() {
  const location = useLocation();
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Kiểm tra xem có user trong state không
    if (location.state && location.state.user) {
      setUser(location.state.user); // Lưu thông tin user vào state
    }
  }, [location]);
  // Danh sách ảnh trong header
  const headerImages = [
    '/assets/header-image1.jpg',
    '/assets/header-image2.jpg',
    '/assets/header-image3.jpg',
  ];

  // Danh sách các sản phẩm
  const productCategories = [
    {
      title: 'Hoa cắt cành',
      image: '/assets/hoa-cat-canh.jpg',
      link: '/flowers',
    },
    {
      title: 'Chậu hoa',
      image: '/assets/chau-hoa.jpg',
      link: '/pots',
    },
    {
      title: 'Lẵng hoa',
      image: '/assets/lang-hoa.jpg',
      link: '/bouquets',
    },
    {
      title: 'Hoa nhập khẩu',
      image: '/assets/hoa-nhap-khau.jpg',
      link: '/imported-flowers',
    },
    {
      title: 'Phụ kiện cắm hoa',
      image: '/assets/phu-kien.jpg',
      link: '/accessories',
    },
  ];

  // Trạng thái để theo dõi ảnh hiện tại
  const [currentImage, setCurrentImage] = useState(0);

  // Chuyển ảnh tự động
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % headerImages.length);
    }, 3000); // Thay đổi ảnh sau mỗi 3 giây
    return () => clearInterval(interval);
  }, [headerImages.length]);

  return (
    <div>
      {/* Phần header */}
      <div className="header-carousel">
        {headerImages.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Header ${index + 1}`}
            className={`header-image ${currentImage === index ? 'active' : ''}`}
          />
        ))}
      </div>

      {/* Danh sách sản phẩm */}
      <div className="products-container">
        <h1 className="products-title">Sản Phẩm</h1>
        <p className="products-description">
          Khám phá bộ sưu tập hoa và sản phẩm chất lượng từ Dalat Flower.
        </p>
        <div className="products-grid">
          {productCategories.map((category, index) => (
            <div className="product-card" key={index}>
              <a href={category.link}>
                <img
                  src={category.image}
                  alt={category.title}
                  className="product-image"
                />
                <div className="product-info">
                  <h2 className="product-title">{category.title}</h2>
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
