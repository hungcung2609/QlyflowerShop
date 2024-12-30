import React, { useState } from 'react';
import ProductEditForm from './ProductEditForm';

function ProductsManagement({ products, setProducts }) {
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Xóa sản phẩm
  const handleDeleteProduct = async (productId) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) {
      try {
        const response = await fetch(`http://localhost:8081/identity/products/${productId}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          alert('Sản phẩm đã được xóa!');
          setProducts(products.filter((product) => product.id !== productId));
        } else {
          alert('Xóa sản phẩm không thành công');
        }
      } catch (error) {
        console.error('Error deleting product:', error);
        alert('Đã có lỗi xảy ra, vui lòng thử lại');
      }
    }
  };

  const handleEditProduct = (product) => {
    // Trước khi chọn sản phẩm để sửa, xóa form sửa nếu có
    setSelectedProduct(null);
    // Sau đó, chọn sản phẩm để sửa
    setTimeout(() => setSelectedProduct(product), 300);
  };

  return (
    <div>
      <table className="products-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Tên sản phẩm</th>
            <th>Giá</th>
            <th>Số lượng</th>
            <th>Loại</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {products.length === 0 ? (
            <tr>
              <td colSpan="6">Không có sản phẩm nào</td>
            </tr>
          ) : (
            products.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>
                  {product.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                </td>
                <td>{product.amount}</td>
                <td>{product.productType ? product.productType : 'Không xác định'}</td>
                <td>
                  <button onClick={() => handleEditProduct(product)} className="edit-btn">
                    Sửa
                  </button>
                  <button
                    onClick={() => handleDeleteProduct(product.id)}
                    className="delete-btn"
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {selectedProduct && (
        <ProductEditForm
          selectedProduct={selectedProduct}
          setSelectedProduct={setSelectedProduct}
          setProducts={setProducts}
        />
      )}
    </div>
  );
}

export default ProductsManagement;
