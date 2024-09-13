import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "./index.css";
import axios from "axios";

const SignUp = (isOpen, onRequestClose) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("Quản trị viên");

  function isValidPhoneNumber(phoneNumber) {
    const cleanedPhoneNumber = phoneNumber.replace(/\D/g, "");

    const phoneRegex = /^(\+?\d{1,2}[\s-]?)?\(?\d{3}\)?[\s-]?\d{3}[\s-]?\d{4}$/;
    return phoneRegex.test(cleanedPhoneNumber);
  }

  const addRegister = async () => {
    try {
      const response = await axios.post(
        "http://localhost:4000/users/register",
        {
          email,
          password,
          username,
          name,
          phone,
          role,
        }
      );
      console.log("nuongtrangthai", response.status);
      console.log("nuong123", response.data);
      if (response.status === 200) {
        Swal.fire({
          title: "Tạo thành công!",
          text: "Tạo tài khoản mới thành công.",
          icon: "success",
          confirmButtonText: "OK",
        });
        navigate("/users");
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "Lỗi!",
        text: "" + error.response.data,
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  const handleRegister = async () => {
    if (
      !email.trim() ||
      !password.trim() ||
      !username.trim() ||
      !phone.trim() ||
      !name.trim()
    ) {
      Swal.fire({
        title: "Lỗi!",
        text: "Vui lòng nhập đầy đủ thông tin!",
        icon: "error",
        confirmButtonText: "OK",
      });
    } else if (
      !/^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)*(\.\w{2,3})+$/.test(email)
    ) {
      Swal.fire({
        title: "Lỗi!",
        text: "Email không hợp lệ. Vui lòng nhập lại!",
        icon: "error",
        confirmButtonText: "OK",
      });
    } else if (!isValidPhoneNumber(phone)) {
      Swal.fire({
        title: "Lỗi!",
        text: "Số điện thoại không hợp lệ. Vui lòng nhập lại!",
        icon: "error",
        confirmButtonText: "OK",
      });
    } else {
      addRegister();
    }
  };

  const navigate = useNavigate();
  const handleCancel = () => {
    navigate("/users");
  };

  return (
    <div className="register-container">
      <div className="loginsignup">
        <div className="loginsignup-container">
          <div>
            <h1>Đăng ký tài khoản vào hệ thống</h1>
          </div>

          <div className="loginsignup-fields">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Nhập email người dùng"
            />
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Nhập tên đăng nhập người dùng"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Nhập mật khẩu người dùng"
            />
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nhập tên người dùng"
            />
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Nhập số điện thoại người dùng"
            />
          </div>
          <div className="signup-role">
            <label for="role">Phân quyền người dùng:</label>
            <select
              name="role"
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="Quản trị viên">Quản trị viên</option>
              <option value="Nhân viên">Nhân Viên</option>
            </select>
          </div>
          <div className="register-btn">
            <div className="register-btn-item">
              <button className="register-btn-cancel" onClick={handleCancel}>
                Hủy
              </button>
              <button onClick={handleRegister}>Đăng ký</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
