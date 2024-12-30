import React, { useState, useEffect } from 'react';
import '../../css/products/Products.css';

function Products({ apiUrl, title }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState(() => {
    const existingCart = JSON.parse(localStorage.getItem('cart')) || [];
    // Lọc giỏ hàng theo apiUrl hiện tại
    return existingCart.filter((item) => item.apiUrl === apiUrl);
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:8081/identity/products?productType=hoachucmung");
        const data = await response.json();
        setProducts(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, [apiUrl]);

  const updateCart = (updatedCart) => {
    setCart(updatedCart);
    // Lưu toàn bộ giỏ hàng, kể cả từ các API khác
    const existingCart = JSON.parse(localStorage.getItem('cart')) || [];
    const filteredCart = existingCart.filter((item) => item.apiUrl !== apiUrl);
    localStorage.setItem('cart', JSON.stringify([...filteredCart, ...updatedCart]));
  };

  const handleAddToCart = (product) => {
    const existingCart = [...cart];
    const existingProductIndex = existingCart.findIndex((item) => item.id === product.id);

    if (existingProductIndex !== -1) {
      existingCart[existingProductIndex].quantity += 1;
      existingCart[existingProductIndex].totalPrice =
        existingCart[existingProductIndex].quantity * product.price;
    } else {
      existingCart.push({
        ...product,
        apiUrl, // Gắn API hiện tại vào sản phẩm
        quantity: 1,
        totalPrice: product.price,
      });
    }

    updateCart(existingCart);
  };

  const handleRemoveFromCart = (product) => {
    const existingCart = [...cart];
    const existingProductIndex = existingCart.findIndex((item) => item.id === product.id);

    if (existingProductIndex !== -1) {
      if (existingCart[existingProductIndex].quantity > 1) {
        existingCart[existingProductIndex].quantity -= 1;
        existingCart[existingProductIndex].totalPrice =
          existingCart[existingProductIndex].quantity * product.price;
      } else {
        existingCart.splice(existingProductIndex, 1);
      }
    }

    updateCart(existingCart);
  };

  const getProductQuantity = (productId) => {
    const productInCart = cart.find((item) => item.id === productId);
    return productInCart ? productInCart.quantity : 0;
  };

  const formatPrice = (price) => {
    return price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
  };

  if (loading) {
    return <div className="loading">Đang tải sản phẩm...</div>;
  }

  return (
    <div className="products-container">
      <div className="products-content">
        <h1 className="products-title">Hoa Chúc Mừng</h1>
        <div className="products-grid">
          {products.map((product) => (
            <div className="product-card" key={product.id}>
              <a href={`/products/${product.id}`} className="product-link">
                <img
                  src={product.img_url}
                  alt={product.name}
                  className="product-image"
                />
                <div className="product-info">
                  <h2 className="product-name">{product.name}</h2>
                  <p className="product-price">{formatPrice(product.price)}</p>
                </div>
              </a>
              <div className="cart-controls">
                {getProductQuantity(product.id) > 0 ? (
                  <div className="cart-quantity-controls">
                    <button
                      className="quantity-button"
                      onClick={() => handleRemoveFromCart(product)}
                    >
                      -
                    </button>
                    <span className="quantity-display">
                      {getProductQuantity(product.id)}
                    </span>
                    <button
                      className="quantity-button"
                      onClick={() => handleAddToCart(product)}
                    >
                      +
                    </button>
                  </div>
                ) : (
                  <button
                    className="add-product-button"
                    onClick={() => handleAddToCart(product)}
                  >
                    + Thêm vào giỏ
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Products;
