import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import '../css/log&signup/SignUp.css';

function SignUp() {
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [toastMessage, setToastMessage] = useState(""); // Toast message state
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const userData = { username, firstName, lastName, password };

    try {
      const response = await fetch("http://localhost:8081/identity/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      console.log(userData);
      

      if (response.ok) {
        setSuccessMessage("Đăng ký thành công! Vui lòng đăng nhập.");
        setErrorMessage("");
        setToastMessage("Đăng ký thành công!"); // Hiển thị toast thành công
        setTimeout(() => setToastMessage(""), 3000); // Ẩn toast sau 3 giây
        setTimeout(() => {
          navigate("/signin");
        }, 3000);
      } else {
        const responseText = await response.text();
        setErrorMessage(responseText || "Đăng ký thất bại.");
        setSuccessMessage("");
        setToastMessage("Đăng ký thất bại!"); // Hiển thị toast lỗi
        setTimeout(() => setToastMessage(""), 3000); // Ẩn toast sau 3 giây
      }
    } catch (error) {
      setErrorMessage("Đã có lỗi xảy ra, vui lòng thử lại.");
      setSuccessMessage("");
      setToastMessage("Có lỗi xảy ra, thử lại sau.");
      setTimeout(() => setToastMessage(""), 3000);
    }
  };

  return (
    <div className="signup-container">
      <section className="signup-content">
        <h2 className="signup-title">Join us today</h2>
        <p className="signup-subtitle">Enter your details to register.</p>

        <form className="signup-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Enter your username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="first_name">First Name</label>
            <input
              type="text"
              id="first_name"
              name="first_name"
              placeholder="Enter your first name"
              required
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="last_name">Last Name</label>
            <input
              type="text"
              id="last_name"
              name="last_name"
              placeholder="Enter your last name"
              required
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="signup-button">
            Get Started
          </button>

          <div className="divider">
            <hr />
            <span>OR</span>
            <hr />
          </div>

          <button type="button" className="social-button">
            <img src="/assets/logo-google.png" alt="Google" />
            Sign up with Google
          </button>
          <button type="button" className="social-button">
            <img src="/assets/logo-facebook.png" alt="Facebook" />
            Sign up with Facebook
          </button>
          <button type="button" className="social-button">
            <img src="/assets/logo-apple.png" alt="Apple" />
            Sign up with Apple
          </button>

          <p className="login-link">
            Already have an account? <a href="/signin">Log in</a>
          </p>
        </form>
      </section>

      {/* Toast message */}
      {toastMessage && (
        <div className={`toast ${successMessage ? "success" : ""} show`}>
          {toastMessage}
        </div>
      )}
    </div>
  );
}

export default SignUp;
