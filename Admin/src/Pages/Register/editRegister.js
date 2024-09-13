import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import "./index.css";
import axios from "axios";

const EditRegister = () => {
  const { id } = useParams();
  const [userData, setUserData] = useState("");

  const getUserData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/users/user/${id}`
      );
      console.log(response.data);
      setUserData(response.data);
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu người dùng:", error);
    }
  };

  // Lấy dữ liệu người dùng khi component được mounted
  useEffect(() => {
    getUserData();
  }, [id]);

  // Xử lý thay đổi dữ liệu người dùng
  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const editUser = async () => {
    try {
      console.log("data", userData);
      const response = await axios.put(
        `http://localhost:4000/users/user/${id}`,
        userData
      );

      if (response.status === 200) {
        Swal.fire({
          title: "Cập nhật thành công!",
          text: "Cập nhật tài khoản thành công.",
          icon: "success",
          confirmButtonText: "OK",
        });
        navigate("/users");
      }
    } catch (error) {
      // console.error('Lỗi khi cập nhật dữ liệu người dùng:', error);
      console.error(error);
      Swal.fire({
        title: "Lỗi!",
        text: "" + error.response.data,
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  function isValidPhoneNumber(phoneNumber) {
    const cleanedPhoneNumber = phoneNumber.replace(/\D/g, "");

    const phoneRegex = /^(\+?\d{1,2}[\s-]?)?\(?\d{3}\)?[\s-]?\d{3}[\s-]?\d{4}$/;
    return phoneRegex.test(cleanedPhoneNumber);
  }

  // Xử lý cập nhật dữ liệu người dùng
  const handleSubmit = async () => {
    if (
      !userData.ND_EMAIL.trim() ||
      !userData.ND_MATKHAU.trim() ||
      !userData.ND_TENNGUOIDUNG.trim() ||
      !userData.ND_SDT.trim() ||
      !userData.ND_TEN.trim()
    ) {
      Swal.fire({
        title: "Lỗi!",
        text: "Vui lòng nhập đầy đủ thông tin!",
        icon: "error",
        confirmButtonText: "OK",
      });
    } else if (
      !/^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)*(\.\w{2,3})+$/.test(
        userData.ND_EMAIL
      )
    ) {
      Swal.fire({
        title: "Lỗi!",
        text: "Email không hợp lệ. Vui lòng nhập lại!",
        icon: "error",
        confirmButtonText: "OK",
      });
    } else if (!isValidPhoneNumber(userData.ND_SDT)) {
      Swal.fire({
        title: "Lỗi!",
        text: "Số điện thoại không hợp lệ. Vui lòng nhập lại!",
        icon: "error",
        confirmButtonText: "OK",
      });
    } else {
      editUser();
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
            <h1>Cập nhật tài khoản</h1>
          </div>

          <div className="loginsignup-fields">
            <input
              type="email"
              name="ND_EMAIL"
              value={userData.ND_EMAIL}
              onChange={handleChange}
              placeholder="Nhập email người dùng"
            />
            <input
              type="text"
              name="ND_TENNGUOIDUNG"
              value={userData.ND_TENNGUOIDUNG}
              onChange={handleChange}
              placeholder="Nhập tên đăng nhập người dùng"
            />
            <input
              type="password"
              name="ND_MATKHAU"
              value={userData.ND_MATKHAU}
              onChange={handleChange}
              placeholder="Nhập mật khẩu người dùng"
            />
            <input
              type="text"
              name="ND_TEN"
              value={userData.ND_TEN}
              onChange={handleChange}
              placeholder="Nhập tên người dùng"
            />
            <input
              type="text"
              name="ND_SDT"
              value={userData.ND_SDT}
              onChange={handleChange}
              placeholder="Nhập số điện thoại người dùng"
            />
          </div>
          <div className="signup-role">
            <label for="role">Phân quyền người dùng:</label>
            <select
              name="ND_VAITRO"
              value={userData.ND_VAITRO}
              onChange={handleChange}
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
              <button onClick={handleSubmit}>Cập nhật</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditRegister;
