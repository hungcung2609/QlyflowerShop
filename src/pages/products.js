import React, { useState } from 'react';
import '../css/products/Products.css';
import FlowerList from '../components/Product/FlowerList';

function Products() {
  const [searchQuery, setSearchQuery] = useState(""); // Lưu giá trị tìm kiếm
  const [filteredApiUrl, setFilteredApiUrl] = useState(""); // Lưu URL API với tham số tìm kiếm
  const [searchResults, setSearchResults] = useState([]); // Lưu kết quả tìm kiếm
  const [noResults, setNoResults] = useState(false); // Kiểm tra có kết quả tìm kiếm hay không

  // Xử lý khi người dùng nhập vào thanh tìm kiếm
  const handleSearch = async () => {
    if (!searchQuery) {
      setNoResults(false);
      setSearchResults([]);
      setFilteredApiUrl(""); // Đặt lại URL API khi không có từ khóa tìm kiếm
      return;
    }

    // Tạo URL tìm kiếm
    const searchUrl = `http://localhost:8081/identity/products?search=${searchQuery}`;
    
    try {
      const response = await fetch(searchUrl);
      const data = await response.json();

      if (data.length === 0) {
        setNoResults(true); // Nếu không có kết quả tìm kiếm
        setSearchResults([]); // Xóa dữ liệu tìm kiếm trước đó
      } else {
        setNoResults(false); // Nếu có kết quả tìm kiếm
        setSearchResults(data); // Lưu kết quả tìm kiếm vào state
      }

      setFilteredApiUrl(searchUrl); // Cập nhật URL tìm kiếm
    } catch (error) {
      console.error("Error fetching search results:", error);
      setNoResults(true); // Nếu xảy ra lỗi, mặc định là không có kết quả
      setSearchResults([]);
    }
  };

  return (
    <div className="products-container">
      <div className="products-banner">
        <img
          src="/assets/banner.jpg" // Thay thế bằng URL banner của bạn
          alt="Banner"
          className="banner-image"
        />
      </div>

      <h1 className="products-title">Các Loại Hoa</h1>

      {/* Thanh tìm kiếm */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Tìm kiếm sản phẩm..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)} // Cập nhật trạng thái khi người dùng thay đổi giá trị tìm kiếm
        />
        <button onClick={handleSearch}>Tìm kiếm</button>
      </div>

      {/* Hiển thị kết quả tìm kiếm hoặc tất cả các loại hoa */}

      {/* Nếu chưa tìm kiếm hoặc chưa có kết quả tìm kiếm */}
      {!searchQuery && !noResults && (
        <div>
          <FlowerList
            apiUrl="http://localhost:8081/identity/products?productType=hoatang"
            title="Hoa Tặng"
          />
          <FlowerList
            apiUrl="http://localhost:8081/identity/products?productType=hoachau"
            title="Hoa Chậu"
          />
          <FlowerList
            apiUrl="http://localhost:8081/identity/products?productType=hoacuoi"
            title="Hoa Cưới"
          />
          <FlowerList
            apiUrl="http://localhost:8081/identity/products?productType=hoachucmung"
            title="Hoa Chúc Mừng"
          />
          <FlowerList
            apiUrl="http://localhost:8081/identity/products?productType=hoachiabuon"
            title="Hoa Chia Buồn"
          />
          <FlowerList
            apiUrl="http://localhost:8081/identity/products?productType=other"
            title="Các Loại Hoa Khác"
          />
        </div>
      )}

      {/* Hiển thị kết quả tìm kiếm nếu có */}
      {searchQuery && !noResults && searchResults.length > 0 && (
        <div>
          <h2>Kết quả tìm kiếm:</h2>
          <FlowerList
            apiUrl={filteredApiUrl}
          />
        </div>
      )}

      {/* Nếu không có kết quả tìm kiếm */}
      {noResults && (
        <div>
          <p>Không có kết quả tìm kiếm</p>
          <h2>Tất cả các hoa:</h2>
          <FlowerList
            apiUrl="http://localhost:8081/identity/products?productType=hoatang"
            title="Hoa Tặng"
          />
          <FlowerList
            apiUrl="http://localhost:8081/identity/products?productType=hoachau"
            title="Hoa Chậu"
          />
          <FlowerList
            apiUrl="http://localhost:8081/identity/products?productType=hoacuoi"
            title="Hoa Cưới"
          />
          <FlowerList
            apiUrl="http://localhost:8081/identity/products?productType=hoachucmung"
            title="Hoa Chúc Mừng"
          />
          <FlowerList
            apiUrl="http://localhost:8081/identity/products?productType=hoachiabuon"
            title="Hoa Chia Buồn"
          />
          <FlowerList
            apiUrl="http://localhost:8081/identity/products?productType=other"
            title="Các Loại Hoa Khác"
          />
        </div>
      )}
    </div>
  );
}

export default Products;
