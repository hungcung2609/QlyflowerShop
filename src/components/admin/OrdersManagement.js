import React from 'react';

function OrdersManagement({ orders, setOrders }) {
  // Xóa đơn hàng
  const handleDeleteOrder = async (orderId) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa đơn hàng này?')) {
      try {
        const response = await fetch(`http://localhost:8081/identity/orders/${orderId}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          alert('Đơn hàng đã được xóa!');
          setOrders(orders.filter((order) => order.id !== orderId));
        } else {
          alert('Xóa đơn hàng không thành công');
        }
      } catch (error) {
        console.error('Error deleting order:', error);
        alert('Đã có lỗi xảy ra, vui lòng thử lại');
      }
    }
  };

  return (
    <div>
      <table className="orders-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Tên khách hàng</th>
            <th>Email</th>
            <th>Địa chỉ</th>
            <th>Thanh toán</th>
            <th>Tổng tiền</th>
            <th>Sản phẩm</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {orders.length === 0 ? (
            <tr>
              <td colSpan="8">Không có đơn hàng nào</td>
            </tr>
          ) : (
            orders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.name}</td>
                <td>{order.email}</td>
                <td>{order.address}</td>
                <td>{order.paymentMethod === 'cod' ? 'Thanh toán khi nhận hàng' : 'Thanh toán qua QR'}</td>
                <td>
                  {order.cartItems && order.cartItems.length > 0
                    ? order.cartItems
                        .reduce((total, item) => total + item.totalPrice, 0)
                        .toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })
                    : 'Chưa có sản phẩm'}
                </td>
                <td>
                  {order.cartItems && order.cartItems.length > 0 ? (
                    <ul>
                      {order.cartItems.map((item, index) => (
                        <li key={index}>
                          {item.productName} x{item.quantity}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    'Không có sản phẩm'
                  )}
                </td>
                <td>
                  <button onClick={() => handleDeleteOrder(order.id)} className="delete-btn">
                    Xóa
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default OrdersManagement;
