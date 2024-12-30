import React, { useState, useEffect } from 'react';
import '../css/pages/Checkout.css';
import { useNavigate } from 'react-router-dom';

function Checkout() {
  const [cartItems, setCartItems] = useState([]);
  const [user, setUser] = useState({
    name: '',
    email: '',
    address: '',
    phone: '',
    deliveryTime: '',
    note: '',
    paymentMethod: 'cod', // cod = Thanh toán khi nhận hàng, qr = Thanh toán qua QR
  });
  const [totalPrice, setTotalPrice] = useState(0);
  const [qrImage, setQrImage] = useState('');
  const navigate = useNavigate();

  // Lấy dữ liệu giỏ hàng và tính tổng giá khi component mount
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(storedCart);
    calculateTotalPrice(storedCart);
  }, []);

  const calculateTotalPrice = (items) => {
    const total = items.reduce((sum, item) => sum + item.totalPrice, 0);
    setTotalPrice(total);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handlePaymentMethodChange = (e) => {
    const { value } = e.target;
    setUser({ ...user, paymentMethod: value });

    if (value === 'qr') {
      // Hiển thị ảnh QR khi chọn thanh toán qua QR
      setQrImage('/assets/QR.jpg'); // Thay bằng URL của ảnh QR
    } else {
      setQrImage('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Ngừng reload trang khi submit form

    const orderData = {
      name: user.name,
      email: user.email,
      address: user.address,
      phone: user.phone,
      deliveryTime: user.deliveryTime,
      note: user.note,
      paymentMethod: user.paymentMethod,
      price: totalPrice, // Tổng giá trị đơn hàng
      cartItems: cartItems.map(item => ({
        productName: item.name, // Tên sản phẩm
        quantity: item.quantity, // Số lượng
        totalPrice: item.totalPrice, // Tổng giá
        imgUrl: item.img_url // URL hình ảnh
      }))
    };
    
    const jsonData = JSON.stringify(orderData);
    console.log(jsonData);

    try {
      // Gửi dữ liệu lên API
      const response = await fetch('http://localhost:8081/identity/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      const responseText = await response.json(); // Parse JSON từ API
      console.log(orderData);
      
      if (response.ok) {
        // Thông báo thành công và điều hướng về trang sản phẩm
        alert('Đặt hàng thành công!');
        localStorage.removeItem('cart'); // Xóa giỏ hàng trong localStorage
        navigate('../products');
      } else {
        // Xử lý lỗi từ API
        alert(`Đặt hàng thất bại: ${responseText.message || 'Lỗi không xác định'}`);
      }
    } catch (error) {
      // Xử lý lỗi khi gửi yêu cầu
      console.error('Error:', error);
      alert('Đặt hàng thành công!');
      localStorage.removeItem('cart'); // Xóa giỏ hàng trong localStorage
      navigate('../products');
    }
  };

  return (
    <div className="checkout-container">
      <h1>Thông tin thanh toán</h1>
      <div className="cart-items">
        <h2>Giỏ hàng</h2>
        {cartItems.length === 0 ? (
          <p>Giỏ hàng trống</p>
        ) : (
          cartItems.map((item, index) => (
            <div className="cart-item" key={index}>
              <div className="cart-item-image">
                <img src={item.img_url} alt={item.name} />
              </div>
              <div className="cart-item-info">
                <div className="item-name">{item.name}</div>
                <div className="item-quantity">Số lượng: {item.quantity}</div>
                <div className="item-price">
                  {item.totalPrice.toLocaleString('vi-VN', {
                    style: 'currency',
                    currency: 'VND',
                  })}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="checkout-form">
        <h2>Thông tin khách hàng</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Họ và tên</label>
            <input
              type="text"
              id="name"
              name="name"
              value={user.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={user.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="address">Địa chỉ</label>
            <input
              type="text"
              id="address"
              name="address"
              value={user.address}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Số điện thoại</label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={user.phone}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="deliveryTime">Thời gian nhận hàng mong muốn</label>
            <input
              type="datetime-local"
              id="deliveryTime"
              name="deliveryTime"
              value={user.deliveryTime}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="note">Ghi chú</label>
            <textarea
              id="note"
              name="note"
              value={user.note}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="total">Tổng số tiền</label>
            <input
              type="text"
              id="total"
              value={totalPrice.toLocaleString('vi-VN', {
                style: 'currency',
                currency: 'VND',
              })}
              readOnly
            />
          </div>

          <div className="form-group">
            <label htmlFor="paymentMethod">Hình thức thanh toán</label>
            <select
              id="paymentMethod"
              name="paymentMethod"
              value={user.paymentMethod}
              onChange={handlePaymentMethodChange}
            >
              <option value="cod">Thanh toán khi nhận hàng</option>
              <option value="qr">Thanh toán qua QR</option>
            </select>
          </div>

          {qrImage && (
            <div className="qr-code">
              <img src={qrImage} alt="QR Code" />
              <p>Vui lòng quét mã QR để thanh toán</p>
            </div>
          )}

          <button type="submit">Đặt hàng</button>
        </form>
      </div>
    </div>
  );
}

export default Checkout;
