import React from 'react';

function Sidebar({ setActiveTab }) {
  return (
    <div className="sidebar">
      <ul>
        <li>
          <button onClick={() => setActiveTab('orders')}>Quản lý Đơn Hàng</button>
        </li>
        <li>
          <button onClick={() => setActiveTab('products')}>Quản lý Kho Hàng</button>
        </li>
        <li>
          <button onClick={() => setActiveTab('addProduct')}>Thêm Sản Phẩm</button>
        </li>
        <li>
        <button onClick={() => setActiveTab('locate')}>Vị Trí Cửa Hàng</button>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
