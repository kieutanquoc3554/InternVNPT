import React, { useEffect, useState } from "react";
import "./Test.css";
import upload_area from "../Assets/upload_area.svg";

const Test = () => {
  const [all_product, setAllProduct] = useState([]);
  const [size, setSize] = useState([]);
  const [name, setName] = useState("");
  const [desp, setDesp] = useState("");
  // const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [details, setDetails] = useState([]);
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [statusCustomer, setStatusCustomer] = useState("");
  const [tableArea, setTableArea] = useState("");
  const [areaName, setAreaName] = useState("");
  const [tableName, setTableName] = useState("");
  const [ngaydat, setNgaydat] = useState("");
  const [ghichu, setGhichu] = useState("");
  const [areas, setAreas] = useState([]);
  const [tables, setTables] = useState([]);
  const [status, setStatus] = useState("");
  const [category, setCategory] = useState("");
  const [categoryList, setCategoryList] = useState([]);
  const [promoteName, setPromoteName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [value, setValue] = useState("");

  const imageHandler = (e) => {
    setImage(e.target.files[0]);
  };

  useEffect(() => {
    const fetchSize = async () => {
      try {
        const response = await fetch("http://localhost:4000/sizes/allsize");
        const data = await response.json();
        setSize(data);
      } catch (error) {
        console.log(error);
      }
    };

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
    fetchSize();
    fetchCategory();
  }, []);

  useEffect(() => {
    const fetchAreas = async () => {
      try {
        const response = await fetch("http://localhost:4000/areas/allarea");
        const data = await response.json();
        setAreas(data);
        setAreaName(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAreas();
  }, []);

  useEffect(() => {
    // Fetch tables based on selected area
    const fetchTables = async () => {
      if (!tableArea) return;
      try {
        const response = await fetch(
          `http://localhost:4000/tables/${tableArea}`
        );
        const data = await response.json();
        setTables(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchTables();
  }, [tableArea]);

  useEffect(() => {
    fetch("http://localhost:4000/products/allproduct")
      .then((res) => res.json())
      .then((data) => setAllProduct(data));
  }, []);

  const handleAddDetail = () => {
    setDetails([...details, { KC_ID: "", CTSP_GIA: "" }]);
  };

  const handleDetailChange = (index, field, value) => {
    const newDetails = [...details];
    newDetails[index][field] = value;
    setDetails(newDetails);
  };

  const handleSubmet = async (e) => {
    e.preventDefault();

    try {
      let formData = new FormData();
      let responseData;
      formData.append("product", image);
      await fetch("http://localhost:4000/upload", {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: formData,
      })
        .then((resp) => resp.json())
        .then((data) => {
          responseData = data;
        });
      const newProduct = {
        name,
        desp,
        category,
        image: responseData.image_url,
        details: details.map((detail) => ({
          KC_ID: detail.KC_ID,
          CTSP_GIA: detail.CTSP_GIA,
        })),
      };
      const response = await fetch(
        "http://localhost:4000/products/addproduct",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newProduct),
        }
      );
      if (response.ok) {
        const message = await response.text();
        alert(message);
      } else {
        const message = await response.text();
        alert(message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleBooking = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:4000/booking/booking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          phone,
          email,
          statusCustomer,
          tableName,
          tableArea,
          ngaydat,
          ghichu,
        }),
      });
      if (response.ok) {
        const message = await response.text();
        alert(message);
        // Reset form fields after successful booking
        setName("");
        setPhone("");
        setEmail("");
        setStatusCustomer("");
        setTableArea("");
        setTableName("");
        setNgaydat("");
        setGhichu("");
        setCategory("");
      } else {
        const message = await response.text();
        alert(message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCreateTable = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:4000/tables/createtable", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ tableName, areaName, status }),
      });
      if (response.ok) {
        const message = await response.text();
        alert(message);
      } else {
        const message = await response.text();
        alert(message);
      }
    } catch (error) {}
  };

  const handleCreatePromote = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:4000/promotes/addpromotebyproduct",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            KM_TEN: promoteName,
            KM_NGAYBATDAU: startDate,
            KM_NGAYKETTHUC: endDate,
            KM_GIATRI: value,
            KM_LOAISANPHAM: category,
            KM_MOTA: desp,
          }),
        }
      );
      if (response.ok) {
        const message = await response.text();
        alert(message);
      } else {
        const message = await response.text();
        alert(message);
      }
    } catch (error) {}
  };

  return (
    <div className="test-main">
      <h1>MÔI TRƯỜNG CHỈ DÀNH RIÊNG ĐỂ TEST API</h1>
      <h3>2. TEST CHỨC NĂNG THÊM SẢN PHẨM VÀO HỆ THỐNG</h3>
      <form onSubmit={handleSubmet}>
        <div className="info">
          <label htmlFor="">Tên sản phẩm: </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="info">
          <label htmlFor="">Mô tả sản phẩm: </label>
          <textarea
            value={desp}
            onChange={(e) => setDesp(e.target.value)}
          ></textarea>
        </div>
        <div className="info">
          <label htmlFor="">Loại sản phẩm: </label>
          {/* <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          /> */}
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
        <div className="info">
          <span>Ảnh sản phẩm</span>
        </div>
        <div className="info-image">
          <label htmlFor="file-input">
            <img
              src={image ? URL.createObjectURL(image) : upload_area}
              alt=""
              className="thumbnail-image"
            />
          </label>
          <input
            onChange={imageHandler}
            type="file"
            name="image"
            id="file-input"
            hidden
          />
        </div>
        <div className="info">
          {/* <h3>Chi tiết sản phẩm</h3> */}
          {details.map((detail, index) => (
            <div key={index}>
              <label htmlFor="">Kích cỡ: </label>
              <select
                value={detail.KC_ID}
                onChange={(e) =>
                  handleDetailChange(index, "KC_ID", e.target.value)
                }
                required
              >
                <option value="">Chọn kích cỡ</option>
                {size.map((size) => (
                  <option value={size._id} key={size._id}>
                    {size.KC_TEN} - {size.KC_DUNGTICH}
                  </option>
                ))}
              </select>
              <label htmlFor="">Giá: </label>
              <input
                type="number"
                value={detail.CTSP_GIA}
                onChange={(e) =>
                  handleDetailChange(index, "CTSP_GIA", e.target.value)
                }
                required
              />
            </div>
          ))}
          <button type="button" onClick={handleAddDetail}>
            Thêm chi tiết
          </button>
        </div>
        <button type="submit">Thêm sản phẩm</button>
      </form>
      <h3>3. TEST CHỨC NĂNG THÊM BÀN</h3>
      <form onSubmit={handleCreateTable}>
        <div className="add">
          <label htmlFor="">Khu vực: </label>
          <select
            id="areaName"
            value={areaName}
            onChange={(e) => setAreaName(e.target.value)}
            required
          >
            <option value="">Chọn khu vực</option>
            {areas.map((area) => (
              <option key={area._id} value={area.VT_TEN}>
                {area.VT_TEN}
              </option>
            ))}
          </select>
        </div>
        <div className="add">
          <label htmlFor="">Tên bàn: </label>
          <input
            type="text"
            value={tableName}
            id="tableName"
            onChange={(e) => setTableName(e.target.value)}
            required
          />
        </div>
        <div className="add">
          <label htmlFor="">Trạng thái bàn: </label>
          <input
            type="text"
            value={status}
            id="status"
            onChange={(e) => setStatus(e.target.value)}
            required
          />
        </div>
        <button type="submit">Tạo bàn</button>
      </form>
      <h3>4. TEST CHỨC NĂNG ĐẶT BÀN</h3>
      <form onSubmit={handleBooking}>
        <div className="booking">
          <label htmlFor="name">Tên khách hàng:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="booking">
          <label htmlFor="phone">Số điện thoại:</label>
          <input
            type="text"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>
        <div className="booking">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="booking">
          <label htmlFor="statusCustomer">Trạng thái thành viên:</label>
          <input
            type="text"
            id="statusCustomer"
            value={statusCustomer}
            onChange={(e) => setStatusCustomer(e.target.value)}
          />
        </div>
        <div className="booking">
          <label htmlFor="tableArea">Khu vực:</label>
          <select
            id="tableArea"
            value={tableArea}
            onChange={(e) => setTableArea(e.target.value)}
            required
          >
            <option value="">Chọn khu vực</option>
            {areas.map((area) => (
              <option key={area._id} value={area.VT_TEN}>
                {area.VT_TEN}
              </option>
            ))}
          </select>
        </div>
        <div className="booking">
          <label htmlFor="tableName">Chọn bàn:</label>
          <select
            id="tableName"
            value={tableName}
            onChange={(e) => setTableName(e.target.value)}
            required
          >
            <option value="">Chọn bàn</option>
            {tables.map((table) => (
              <option key={table._id} value={table.B_TEN}>
                {table.B_TEN}
              </option>
            ))}
          </select>
        </div>
        <div className="booking">
          <label htmlFor="ngaydat">Ngày đặt:</label>
          <input
            type="date"
            id="ngaydat"
            value={ngaydat}
            onChange={(e) => setNgaydat(e.target.value)}
            required
          />
        </div>
        <div className="booking">
          <label htmlFor="ghichu">Ghi chú:</label>
          <textarea
            id="ghichu"
            value={ghichu}
            onChange={(e) => setGhichu(e.target.value)}
          ></textarea>
        </div>
        <button type="submit">Đặt bàn</button>
      </form>
      <h3>5. TEST CHỨC NĂNG TẠO KHUYẾN MÃI</h3>
      <form onSubmit={handleCreatePromote}>
        <div>
          <label htmlFor="">Tên chương trình khuyến mãi</label>
          <input
            type="text"
            value={promoteName}
            onChange={(e) => setPromoteName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="">Ngày bắt đầu</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="">Ngày kết thúc</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="">Giá trị khuyến mãi</label>
          <input
            type="number"
            value={value}
            onChange={(e) => setValue(e.target.value)}
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
        <div>
          <label htmlFor="">Mô tả khuyến mãi</label>
          <textarea
            value={desp}
            onChange={(e) => setDesp(e.target.value)}
            name=""
            id=""
          ></textarea>
        </div>
        <button type="submit">Thêm khuyến mãi</button>
      </form>
    </div>
  );
};

export default Test;
