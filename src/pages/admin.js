import React, { useState, useEffect } from 'react';
import '../css/admin/Admin.css';
import OrdersManagement from '../components/admin/OrdersManagement';
import ProductsManagement from '../components/admin/ProductsManagement';
import AddProductForm from '../components/admin/AddProductForm'; // Component thêm sản phẩm
import LocateManagement from '../components/admin/LocateManagement';
import Sidebar from '../components/admin/Sidebar'; // Sidebar

function Admin() {
  const [orders, setOrders] = useState([]);
  const [locate, setLocate] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('orders'); // Tab quản lý đơn hàng mặc định

  // Lấy dữ liệu đơn hàng và sản phẩm từ API
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('http://localhost:8081/identity/orders');
        const data = await response.json();
        setOrders(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:8081/identity/products');
        if (!response.ok) {
          throw new Error('Lỗi khi lấy dữ liệu sản phẩm');
        }
        const products = await response.json();
        setProducts(products);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };

    const fetchLocate = async () => {
      try {
        const response = await fetch('http://localhost:8081/identity/locate');
        if (!response.ok) {
          throw new Error('Lỗi khi lấy dữ liệu locate');
        }
        const locate = await response.json();
        setLocate(locate);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };

    fetchOrders();
    fetchProducts();
    fetchLocate();
  }, []);

  if (loading) {
    return <div>Đang tải dữ liệu...</div>;
  }

  return (
    <div className="admin-container">
      <Sidebar setActiveTab={setActiveTab} /> {/* Sidebar cho phép chọn tab */}

      <div className="admin-content">
        <h1>Quản lý Đơn Hàng và Kho Hàng</h1>

        {/* Điều hướng qua các tab */}
        {activeTab === 'orders' && (
          <>
            <h2>Quản lý Đơn Hàng</h2>
            <OrdersManagement orders={orders} setOrders={setOrders} />
          </>
        )}

        {activeTab === 'products' && (
          <>
            <h2>Quản lý Kho Hàng</h2>
            <ProductsManagement products={products} setProducts={setProducts} />
          </>
        )}

        {activeTab === 'addProduct' && (
          <>
            <h2>Thêm Sản Phẩm</h2>
            <AddProductForm setProducts={setProducts} /> {/* Form thêm sản phẩm */}
          </>
        )}

        {activeTab === 'locate' && (
          <>
            <h2>Thêm vị trí cửa hàng</h2>
            <LocateManagement locate={locate} setLocate={setLocate} /> 
          </>
        )}
      </div>
    </div>
  );
}

export default Admin;
