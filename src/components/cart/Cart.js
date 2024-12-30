import React, { useEffect, useState } from 'react';
import '../../css/pages/Cart.css';
import { useNavigate } from 'react-router-dom';

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [user, setUser] = useState(null);
  const [totalAmount, setTotalAmount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    // Lấy thông tin sản phẩm từ localStorage
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(storedCart);

    // Lấy thông tin người dùng từ localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    // Tính tổng tiền
    calculateTotal(storedCart);
  }, []);

  const calculateTotal = (cart) => {
    const total = cart.reduce((sum, item) => sum + item.totalPrice, 0);
    setTotalAmount(total);
  };

  const handleRemoveItem = (index) => {
    const updatedCart = [...cartItems];
    updatedCart.splice(index, 1);
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    calculateTotal(updatedCart);
  };

  const handleQuantityChange = (index, quantityChange) => {
    const updatedCart = [...cartItems];
    updatedCart[index].quantity += quantityChange;

    // Đảm bảo số lượng không giảm dưới 1
    if (updatedCart[index].quantity < 1) {
      updatedCart[index].quantity = 1;
    }

    // Cập nhật tổng giá tiền cho sản phẩm
    updatedCart[index].totalPrice =
      updatedCart[index].quantity * updatedCart[index].price;

    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    calculateTotal(updatedCart);
  };

  const handleCheckout = () => {
    navigate('/checkout'); // Chuyển hướng đến trang checkout
  };

  return (
    <div className="cart-container">
      <h1>Giỏ Hàng</h1>
      {user && <h2>Chào, {user}</h2>}
      {cartItems.length === 0 ? (
        <p>Giỏ hàng trống</p>
      ) : (
        <>
          <ul className="cart-list">
            {cartItems.map((item, index) => (
              <li key={index} className="cart-item">
                <img 
                  src={item.img_url} 
                  alt={item.name} 
                  className="cart-item-image"
                />
                <div className="cart-item-details">
                  <span className="cart-item-name">{item.name}</span>
                  <span className="cart-item-price">
                    {item.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                  </span>
                  <div className="cart-item-quantity">
                    <button onClick={() => handleQuantityChange(index, -1)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => handleQuantityChange(index, 1)}>+</button>
                  </div>
                  <span className="cart-item-total">
                    Tổng: {item.totalPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                  </span>
                </div>
                <button 
                  className="cart-item-remove" 
                  onClick={() => handleRemoveItem(index)}
                >
                  Xóa
                </button>
              </li>
            ))}
          </ul>
          <div className="cart-summary">
            <h3>Tổng thanh toán: {totalAmount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</h3>
            <button className="checkout-button" onClick={handleCheckout} >
              Thanh Toán
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
