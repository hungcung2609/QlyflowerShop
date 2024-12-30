import React, { useState } from 'react';

function LocateManagement({ locate, setLocate }) {
  const [newLocate, setNewLocate] = useState({
    name: '',
    latitude: '',
    longitude: ''
  });

  // Xóa locate
  const handleDeleteLocate = async (locateId) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa cửa hàng này?')) {
      try {
        const response = await fetch(`http://localhost:8081/identity/locate/${locateId}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          alert('Cửa hàng đã được xóa!');
          setLocate(locate.filter((locate) => locate.id !== locateId));
        } else {
          alert('Xóa cửa hàng không thành công');
        }
      } catch (error) {
        console.error('Error deleting locate:', error);
        alert('Đã có lỗi xảy ra, vui lòng thử lại');
      }
    }
  };

  // Thêm locate mới
  const handleAddLocate = async (e) => {
    e.preventDefault();

    const { name, latitude, longitude } = newLocate;

    if (!name || !latitude || !longitude) {
      alert('Vui lòng nhập đủ thông tin');
      return;
    }

    try {
      const response = await fetch('http://localhost:8081/identity/locate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newLocate),
      });

      if (response.ok) {
        const addedLocate = await response.json();
        setLocate([...locate, addedLocate]);
        setNewLocate({ name: '', latitude: '', longitude: '' }); // Reset form
        alert('Cửa hàng đã được thêm!');
      } else {
        alert('Thêm cửa hàng không thành công');
      }
    } catch (error) {
      console.error('Error adding locate:', error);
      alert('Đã có lỗi xảy ra, vui lòng thử lại');
    }
  };

  return (
    <div>
      
      {/* Form thêm locate */}
      <form onSubmit={handleAddLocate}>
        <div>
          <label>Tên Cửa Hàng:</label>
          <input
            type="text"
            value={newLocate.name}
            onChange={(e) => setNewLocate({ ...newLocate, name: e.target.value })}
            required
          />
        </div>
        <div>
          <label>Latitude:</label>
          <input
            type="number"
            value={newLocate.latitude}
            onChange={(e) => setNewLocate({ ...newLocate, latitude: e.target.value })}
            required
          />
        </div>
        <div>
          <label>Longitude:</label>
          <input
            type="number"
            value={newLocate.longitude}
            onChange={(e) => setNewLocate({ ...newLocate, longitude: e.target.value })}
            required
          />
        </div>
        <button type="submit">Thêm Cửa Hàng</button>
      </form>

      <h2>Quản lý Vị trí Cửa Hàng</h2>
      {/* Bảng hiển thị các cửa hàng */}
      <table className="orders-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Tên Cửa Hàng</th>
            <th>Latitude</th>
            <th>Longitude</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {locate.length === 0 ? (
            <tr>
              <td colSpan="5">Không có cửa hàng nào</td>
            </tr>
          ) : (
            locate.map((locate) => (
              <tr key={locate.id}>
                <td>{locate.id}</td>
                <td>{locate.name}</td>
                <td>{locate.latitude}</td>
                <td>{locate.longitude}</td>
                <td>
                  <button onClick={() => handleDeleteLocate(locate.id)} className="delete-btn">
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

export default LocateManagement;
