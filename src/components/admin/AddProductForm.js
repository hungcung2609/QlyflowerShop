import React, { useState, useEffect } from 'react';

function AddProductForm({ setProducts }) {
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    amount: '',
    img_url: '',
    productType: '', // Loại sản phẩm mặc định
  });
  const [productTypes, setProductTypes] = useState([]);
  const [isNewProductType, setIsNewProductType] = useState(false); // Trạng thái để kiểm tra xem người dùng muốn thêm loại sản phẩm mới

  // Fetch danh sách sản phẩm và lọc ra các productType duy nhất
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:8081/identity/products');
        const data = await response.json();
        
        // Lấy các productType duy nhất
        const uniqueProductTypes = [...new Set(data.map(product => product.productType))];
        setProductTypes(uniqueProductTypes);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleAddProduct = async (e) => {
    e.preventDefault();
    const productData = { ...newProduct }; 

    try {
      const response = await fetch(`http://localhost:8081/identity/products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });

      console.log(productData);
      

      if (response.ok) {
        const addedProduct = await response.json();
        alert('Sản phẩm đã được thêm!');
        setProducts((prevProducts) => [...prevProducts, addedProduct]);
        setNewProduct({ name: '', price: '', amount: '', img_url: '', productType: '' }); // Reset form
      } else {
        alert('Thêm sản phẩm không thành công');
      }
    } catch (error) {
      console.error('Error adding product:', error);
      alert('Đã có lỗi xảy ra, vui lòng thử lại');
    }
  };

  return (
    <form onSubmit={handleAddProduct} className="add-product-form">
      <input
        type="text"
        placeholder="Tên sản phẩm"
        value={newProduct.name}
        onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
        required
      />
      <input
        type="number"
        placeholder="Giá"
        value={newProduct.price}
        onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
        required
      />
      <input
        type="number"
        placeholder="Số lượng"
        value={newProduct.amount}
        onChange={(e) => setNewProduct({ ...newProduct, amount: e.target.value })}
        required
      />
      <input
        type="text"
        placeholder="Image URL"
        value={newProduct.img_url}
        onChange={(e) => setNewProduct({ ...newProduct, img_url: e.target.value })}
        required
      />
      
      <select
        value={newProduct.productType}
        onChange={(e) => {
          const value = e.target.value;
          setNewProduct({ ...newProduct, productType: value });
          setIsNewProductType(value === 'new'); // Nếu chọn "Thêm loại mới", hiển thị trường nhập liệu mới
        }}
      >
        <option value="">Chọn loại sản phẩm</option>
        {productTypes.map((type, index) => (
          <option key={index} value={type}>
            {type}
          </option>
        ))}
        <option value="new">Thêm loại sản phẩm mới</option> {/* Thêm lựa chọn để thêm loại sản phẩm mới */}
      </select>

      {isNewProductType && (
        <input
          type="text"
          placeholder="Nhập loại sản phẩm mới"
          value={newProduct.productType}
          onChange={(e) => setNewProduct({ ...newProduct, productType: e.target.value })}
          required
        />
      )}

      <button type="submit">Thêm sản phẩm</button>
    </form>
  );
}

export default AddProductForm;
