import React, { useState } from 'react';

function ProductEditForm({ selectedProduct, setSelectedProduct, setProducts }) {
  const [editedProduct, setEditedProduct] = useState(selectedProduct);

  const handleUpdateProduct = async () => {
    const { id, productType, ...productData } = editedProduct;

    const requestBody = {
        ...productData,
        productType: editedProduct.productType, // Thêm productType vào body
      };

    try {
      const response = await fetch(`http://localhost:8081/identity/products/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      console.log('Respons from API:', productData);

      if (response.ok) {
        const updatedProduct = await response.json();
        alert('Sản phẩm đã được cập nhật!');
        setProducts((prevProducts) =>
          prevProducts.map((product) =>
            product.id === id ? updatedProduct : product
          )
        );
        setSelectedProduct(null);
      } else {
        alert('Cập nhật sản phẩm không thành công');
      }
    } catch (error) {
      console.error('Error updating product:', error);
      alert('Đã có lỗi xảy ra, vui lòng thử lại');
    }
  };

  return (
    <div className="edit-product-form">
      <h3>Chỉnh sửa sản phẩm</h3>
      <input
        type="text"
        value={editedProduct.name}
        onChange={(e) => setEditedProduct({ ...editedProduct, name: e.target.value })}
      />
      <input
        type="number"
        value={editedProduct.price}
        onChange={(e) => setEditedProduct({ ...editedProduct, price: e.target.value })}
      />
      <input
        type="number"
        value={editedProduct.amount}
        onChange={(e) => setEditedProduct({ ...editedProduct, amount: e.target.value })}
      />

    <input
        type="text"
        value={editedProduct.productType} 
        readOnly
      />

      <button onClick={handleUpdateProduct}>Cập nhật</button>
      <button onClick={() => setSelectedProduct(null)}>Hủy</button>
    </div>
  );
}

export default ProductEditForm;
