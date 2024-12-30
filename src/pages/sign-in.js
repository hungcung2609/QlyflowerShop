import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/log&signup/SignIn.css';

function SignIn() {
  // State để lưu trữ giá trị của email, password và thông báo lỗi
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  // Hàm xử lý sự kiện submit của form
  const handleSubmit = async (event) => {
    event.preventDefault();  // Ngừng reload trang khi submit form
  
    const userData = {
      username: username,
      password: password
    };
  
    try {
      const response = await fetch('http://localhost:8081/identity/users/login', {  
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',  // Đảm bảo header đúng
        },
        body: JSON.stringify(userData),
      });
  
      const data = await response.json();  // Giả sử API trả về dữ liệu dưới dạng JSON
  
      if (response.ok) {
        // Nếu đăng nhập thành công
        const { role, welcomeMessage } = data;  // Lấy role và welcomeMessage từ dữ liệu trả về
        
        // Lưu role và welcomeMessage vào localStorage
        localStorage.setItem('role', role);
        localStorage.setItem('welcomeMessage', welcomeMessage);
  
        // Chuyển hướng về trang chủ, kèm theo thông tin user
        navigate('/', { state: { role, welcomeMessage } });
      } else {
        // Nếu API trả về lỗi, hiển thị thông báo lỗi
        setErrorMessage('Sai tài khoản hoặc mật khẩu');
      }
    } catch (error) {
      // Xử lý lỗi khi gửi yêu cầu
      setErrorMessage('Đã có lỗi xảy ra, vui lòng thử lại');
      console.error('Error:', error);
    }
  };  

  return (
    <div className="sign-in-container">
      <div className="form-container">
        <h2 className="form-title">Welcome Back</h2>
        <p className="form-subtitle">Please enter your details.</p>

        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <form className="form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="username">Username (Email)</label>
            <input
              type="email"
              id="username"
              name="username"
              required
              placeholder="Enter your email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              required
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="form-actions">
            <div className="checkbox-container">
              <input type="checkbox" id="newsletter" name="newsletter" />
              <label htmlFor="newsletter">Subscribe to newsletter</label>
            </div>
            <a href="#" className="forgot-password">Forgot password?</a>
          </div>

          <button type="submit" className="submit-btn">Sign in</button>

          <button type="button" className="google-btn">
            <img src="/assets/logo-google.png" alt="Google" className="google-icon" />
            Sign in with Google
          </button>
        </form>
      </div>

      <div className="background-image">
        <img
          src="https://images.unsplash.com/photo-1613125700782-8394bec3e89d?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8bW91bmF0aW5zfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60"
          alt="Background"
        />
      </div>
    </div>
  );
}

export default SignIn;
