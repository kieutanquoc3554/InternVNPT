import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import "./Coupon.css";
import axios from "axios";

const EditCoupon = () => {
  const { id } = useParams();
  const [promoteData, setPromoteData] = useState("");
  const [categoryList, setCategoryList] = useState([]);
  const [category, setCategory] = useState("");

  const getPromoteData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/promotes/getpromote/${id}`
      );
      console.log(response.data);
      setPromoteData(response.data);
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu khuyến mãi:", error);
    }
  };

  // Lấy dữ liệu người dùng khi component được mounted
  useEffect(() => {
    getPromoteData();
  }, [id]);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const resp = await fetch("http://localhost:4000/products/category/get");
        const data = await resp.json();
        if (Array.isArray(data)) {
          setCategoryList(data);
        } else {
          console.error("Unexpected response format", data);
        }
      } catch (error) {}
    };
    fetchCategory();
  }, []);

  // Xử lý thay đổi dữ liệu người dùng
  const handleChange = (e) => {
    setPromoteData({
      ...promoteData,
      [e.target.name]: e.target.value,
    });
  };

  const editPromote = async () => {
    try {
      console.log("data", promoteData);
      const response = await axios.put(
        `http://localhost:4000/promotes/edit/updatepromote/${id}`,
        promoteData
      );

      if (response.status === 200) {
        Swal.fire({
          title: "Cập nhật thành công!",
          text: "Cập nhật khuyến mãi thành công.",
          icon: "success",
          confirmButtonText: "OK",
        });
        navigate("/coupon");
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

  // Xử lý cập nhật dữ liệu người dùng
  const handleSubmit = async () => {
    if (
      !promoteData.KM_TEN.trim() ||
      !promoteData.KM_NGAYBATDAU.trim() ||
      !promoteData.KM_NGAYKETTHUC.trim() ||
      !promoteData.KM_LOAISANPHAM.trim() ||
      !promoteData.KM_MOTA.trim()
    ) {
      Swal.fire({
        title: "Lỗi!",
        text: "Vui lòng nhập đầy đủ thông tin!",
        icon: "error",
        confirmButtonText: "OK",
      });
    } else {
      editPromote();
    }
  };

  const navigate = useNavigate();
  const handleCancel = () => {
    navigate("/coupon");
  };

  return (
    <div className="register-container">
      <div className="loginsignup">
        <div className="loginsignup-container">
          <div>
            <h1>Cập nhật khuyến mãi</h1>
          </div>

          <div className="loginsignup-fields">
            <input
              type="text"
              name="KM_TEN"
              value={promoteData.KM_TEN}
              onChange={handleChange}
              placeholder="Nhập tên khuyến mãi"
            />
            <input
              type="date"
              name="KM_NGAYBATDAU"
              value={promoteData.KM_NGAYBATDAU}
              onChange={handleChange}
            />
            <input
              type="date"
              name="KM_NGAYKETTHUC"
              value={promoteData.KM_NGAYKETTHUC}
              onChange={handleChange}
            />
            <input
              type="number"
              name="KM_GIATRI"
              value={promoteData.KM_GIATRI}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="">Loại sản phẩm: </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              id=""
            >
              <option value="">Chọn loại sản phẩm</option>
              {categoryList.map((c) => (
                <option value={c} key={c}>
                  {c === "coffee"
                    ? "Cà phê"
                    : c === "latte"
                    ? "Latte"
                    : c === "tea"
                    ? "Trà nguyên vị"
                    : c === "fruit"
                    ? "Trà trái cây"
                    : c === "milktea"
                    ? "Trà sữa"
                    : "Sữa chua"}
                </option>
              ))}
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

export default EditCoupon;
