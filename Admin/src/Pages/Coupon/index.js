import { useEffect } from "react";
import { useState } from "react";
import {
  Input,
  InputNumber,
  Select,
  Button,
  DatePicker,
  Typography,
  Space,
  Table,
} from "antd";
import "./Coupon.css";
import moment from "moment";
import Swal from "sweetalert2";
import axios from "axios";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import { FileExcelOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { RangePicker } = DatePicker;

function Coupon() {
  const [desp, setDesp] = useState("");
  const [category, setCategory] = useState("");
  const [categoryList, setCategoryList] = useState([]);
  const [promoteName, setPromoteName] = useState("");
  const [value, setValue] = useState("");
  const [dates, setDates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [hide, setHide] = useState(false);
  const navigate = useNavigate();

  const fetchPromotion = async () => {
    try {
      const res = await fetch("http://localhost:4000/promotes/get/all");
      const data = await res.json();
      setDataSource(data);
    } catch (error) {
      console.error("Error fetching promotions:", error);
    } finally {
      setLoading(false);
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
  useEffect(() => {
    setLoading(true);

    fetchCategory();
    fetchPromotion();
  }, [hide]);

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
            KM_NGAYBATDAU: dates[0],
            KM_NGAYKETTHUC: dates[1],
            KM_GIATRI: value,
            KM_LOAISANPHAM: category,
            KM_MOTA: desp,
          }),
        }
      );
      if (response.ok) {
        const message = await response.text();
        alert(message);
        setHide(false);
      } else {
        const message = await response.text();
        alert(message);
      }
    } catch (error) {}
  };

  const getCategoryName = (category) => {
    switch (category) {
      case "coffee":
        return "Cà phê";
      case "latte":
        return "Latte";
      case "tea":
        return "Trà nguyên vị";
      case "fruit":
        return "Trà trái cây";
      case "milktea":
        return "Trà sữa";
      default:
        return "Sữa chua";
    }
  };

  const handleDelete = (id) => {
    console.log("id", id);
    Swal.fire({
      title: "Bạn có chắc chắn muốn xóa?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:4000/promotes/delete/${id}`)
          .then((response) => {
            if (response.status === 200) {
              console.log("Xóa thành công:", response.data);
              Swal.fire({
                title: "Xóa thành công!",
                text: "Khuyến mãi đã được xóa thành công.",
                icon: "success",
                confirmButtonText: "OK",
              });
              window.location.reload();
            } else {
              console.log("Không thể xóa:");
            }
          })
          .catch((error) => {
            console.error("Lỗi khi xóa dữ liệu:", error);
          });
      }
    });
  };

  const exportExcel = () => {
    const wb = new ExcelJS.Workbook();
    const ws = wb.addWorksheet("Khuyến mãi");

    const headerStyle = {
      font: { bold: true, name: "Arial", size: 12 },
      alignment: { horizontal: "center", vertical: "middle" },
      fill: { type: "pattern", pattern: "solid", fgColor: { argb: "D9EAD3" } },
      border: {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      },
    };

    const dataStyle = {
      font: { name: "Arial", size: 12 },
      alignment: { horizontal: "center", vertical: "middle" },
      fill: { type: "pattern", pattern: "solid", fgColor: { argb: "F4F4F4" } },
      border: {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      },
    };

    ws.columns = [
      { header: "Tên khuyến mãi", key: "KM_TEN", width: 30 },
      { header: "Ngày bắt đầu", key: "KM_NGAYBATDAU", width: 20 },
      { header: "Ngày kết thúc", key: "KM_NGAYKETTHUC", width: 20 },
      { header: "Giá trị khuyến mãi", key: "KM_GIATRI", width: 20 },
      { header: "Sản phẩm áp dụng", key: "KM_LOAISANPHAM", width: 30 },
    ];

    ws.getRow(1).eachCell((cell) => {
      cell.style = headerStyle;
    });

    dataSource.forEach((data, i) => {
      const row = ws.addRow({
        KM_TEN: data.KM_TEN,
        KM_NGAYBATDAU: moment(data.KM_NGAYBATDAU).format("DD/MM/YYYY"),
        KM_NGAYKETTHUC: moment(data.KM_NGAYKETTHUC).format("DD/MM/YYYY"),
        KM_GIATRI: `${data.KM_GIATRI}%`,
        KM_LOAISANPHAM: getCategoryName(data.KM_LOAISANPHAM),
      });

      row.eachCell((cell) => {
        cell.style = dataStyle;
      });
      row.height = 20;
    });

    ws.getRow(1).height = 25;
    wb.xlsx.writeBuffer().then((buffer) => {
      const blob = new Blob([buffer], { type: "application/octet-stream" });
      saveAs(blob, "Khuyến mãi.xlsx");
    });
  };

  const handleEdit = (id) => {
    navigate(`/editpromote/${id}`);
  };

  return (
    <div>
      <div className="coupon-container">
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Button
            type="primary"
            onClick={() => setHide(!hide)}
            className={hide ? "red" : ""}
          >
            {hide ? "Đóng form" : "Thêm khuyến mãi"}
          </Button>
          <Button
            type="primary"
            onClick={exportExcel}
            icon={<FileExcelOutlined />}
            style={{
              backgroundColor: "#217346",
              borderColor: "#217346",
              color: "#fff",
            }}
          >
            Xuất Excel
          </Button>
        </div>
        {hide && (
          <form onSubmit={handleCreatePromote} className="form">
            <Typography.Title level={4} style={{ fontWeight: 700 }}>
              Thêm khuyến mãi
            </Typography.Title>
            <div className="item">
              <div className="coupon-item">
                <label htmlFor="">Tên chương trình khuyến mãi</label>
                <Input
                  type="text"
                  value={promoteName}
                  onChange={(e) => setPromoteName(e.target.value)}
                />
              </div>
              <div className="coupon-item">
                <label htmlFor="">Ngày bắt đầu và kết thúc</label>
                <RangePicker
                  onChange={(dates, dateStrings) => setDates(dateStrings)}
                />
              </div>
              <div className="coupon-item">
                <label htmlFor="">Giá trị khuyến mãi</label>
                <InputNumber
                  type="number"
                  value={value}
                  onChange={(val) => setValue(val)}
                />
              </div>
              <div className="coupon-item">
                <label htmlFor="">Loại sản phẩm: </label>
                <Select value={category} onChange={(val) => setCategory(val)}>
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
                </Select>
              </div>
              <div className="coupon-item">
                <label htmlFor="">Mô tả khuyến mãi</label>
                <textarea
                  value={desp}
                  onChange={(e) => setDesp(e.target.value)}
                  name=""
                  id=""
                ></textarea>
              </div>
            </div>
            <Button type="primary" htmlType="submit">
              Thêm khuyến mãi
            </Button>
          </form>
        )}
        <Table
          loading={loading}
          columns={[
            {
              title: "Tên khuyến mãi",
              dataIndex: "KM_TEN",
            },
            {
              title: "Ngày bắt đầu",
              dataIndex: "KM_NGAYBATDAU",
              render: (value) => `${moment(value).format("DD/MM/YYYY")}`,
            },
            {
              title: "Ngày kết thúc",
              dataIndex: "KM_NGAYKETTHUC",
              render: (value) => `${moment(value).format("DD/MM/YYYY")}`,
            },
            {
              title: "Giá trị khuyến mãi",
              dataIndex: "KM_GIATRI",
              render: (value) => `${value}%`,
            },
            {
              title: "Sản phẩm áp dụng",
              dataIndex: "KM_LOAISANPHAM",
              render: (text) => getCategoryName(text),
            },

            {
              title: "Tác vụ",
              render: (id) => (
                <Space>
                  <p className="update-btn" onClick={() => handleEdit(id._id)}>
                    Cập nhật
                  </p>
                  <p
                    className="delete-btn"
                    onClick={() => handleDelete(id._id)}
                  >
                    Xóa
                  </p>
                </Space>
              ),
            },
          ]}
          dataSource={dataSource}
          rowKey="id"
          pagination={{
            pageSize: 5,
          }}
        ></Table>
      </div>
    </div>
  );
}

export default Coupon;
