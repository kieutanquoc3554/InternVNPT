import React, { useState } from "react";
import "./CSS/Login.css";

const Login = () => {
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const checkLogin = async () => {
    let responseData;
    await fetch("http://localhost:4000/users/login", {
      method: "POST",
      headers: {
        Accept: "application/form-data",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((resp) => resp.json())
      .then((data) => (responseData = data));
    if (responseData.success) {
      localStorage.setItem("auth-token", responseData.token);
      localStorage.setItem("role", responseData.vaitro);
      localStorage.setItem("username", responseData.name);
      setNotificationMessage("Đăng nhập thành công!");
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 1000);
      window.location.replace("/");
    } else {
      setNotificationMessage(responseData.errors);
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 3000);
    }
  };

  const navigateAdmin = () => {
    window.location.href = "http://localhost:3001";
  };

  return (
    <div className="loginsignup">
      <div className="loginsignup-container">
        <h1>Đăng nhập vào hệ thống</h1>
        <div className="loginsignup-fields">
          <input
            onChange={changeHandler}
            type="text"
            value={formData.username}
            placeholder="Nhập tên người dùng"
            name="username"
          />
          <input
            onChange={changeHandler}
            type="password"
            value={formData.password}
            placeholder="Nhập mật khẩu người dùng"
            name="password"
          />
        </div>
        <div className="button-down">
          <button onClick={navigateAdmin}>
            Đăng nhập với tư cách quản trị viên
          </button>
          <button onClick={checkLogin}>Đăng nhập</button>
        </div>
      </div>
      {showNotification && (
        <div className="notification-popup">
          <p>{notificationMessage}</p>
        </div>
      )}
    </div>
  );
};

export default Login;
