import React, { useEffect, useState } from "react";
import "./Table.css";
import { Select, Row, Col, Card } from "antd";
import { Option } from "antd/es/mentions";
import Modal from "react-modal";

const Table = () => {
  const [areas, setAreas] = useState([]);
  const [tables, setTables] = useState([]);
  const [selectedArea, setSelectedArea] = useState(null);
  const [selectedTable, setSelectedTable] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmationModal, setIsConfirmationModal] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [statusCustomer, setStatusCustomer] = useState("");
  const [ngaydat, setNgaydat] = useState("");
  const [giocat, setGiocat] = useState("");
  const [ghichu, setGhichu] = useState("");
  const [tableArea, setTableArea] = useState("");
  const [tableName, setTableName] = useState("");
  const [status, setStatus] = useState([]);
  const [selectedTableID, setSelectedTableID] = useState("");
  const [note, setNote] = useState("");
  const [nameCustomer, setNameCustomer] = useState("");

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  useEffect(() => {
    fetch("http://localhost:4000/areas/allarea")
      .then((res) => res.json())
      .then((data) => setAreas(data))
      .catch((err) => console.error(err));

    const fetchStatus = async () => {
      try {
        const resp = await fetch(
          "http://localhost:4000/customer/status/member"
        );
        const data = await resp.json();
        if (Array.isArray(data)) {
          setStatus(data);
        } else {
          console.error("Unexpected response format", data);
        }
      } catch (error) {}
    };
    fetchStatus();
  }, []);

  useEffect(() => {
    if (selectedArea) {
      fetch(`http://localhost:4000/tables/${selectedArea}`)
        .then((res) => res.json())
        .then((data) => setTables(data))
        .catch((err) => console.error(err));
    }
  }, [selectedArea]);

  const getStatusStyle = (status) => {
    return {
      color: status === "Đã đặt" ? "red" : "rgb(0, 157, 255)",
    };
  };

  const handleClick = async (table) => {
    setSelectedTable(table);
    setTableName(table);

    const resp = await fetch("http://localhost:4000/tables/find/getID", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ areaID: table.B_VITRI, tableName: table.B_TEN }),
    });
    if (resp.ok) {
      const data = await resp.json();
      const tableId = data.tableId;
      setSelectedTableID(tableId);

      const getInfoResp = await fetch(
        "http://localhost:4000/tables/get/infobooking",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ tableId: tableId }),
        }
      );
      if (getInfoResp.ok) {
        const info = await getInfoResp.json();
        setNote(info.tableNote);
        setNameCustomer(info.customerName);
      } else {
        throw new Error("Failed to fetch table info");
      }
    }
    if (table.B_TRANGTHAI === "Đã đặt") {
      setIsConfirmationModal(true);
    } else {
      setIsModalOpen(true);
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setIsConfirmationModal(false);
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
          tableName: tableName.B_TEN,
          tableArea,
          ngaydat,
          giocat, // Thêm giờ đặt vào payload
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
        setNgaydat("");
        setGiocat("");
        setGhichu("");
        setIsModalOpen(false);
        setIsConfirmationModal(false);
        updateTableStatus(tableName.B_ID, "Đã đặt");
      } else {
        const message = await response.text();
        console.log(tableName);
        alert(message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateTableStatus = async (tableId, status) => {
    try {
      const resp = await fetch(
        `http://localhost:4000/tables/update/${tableId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status }),
        }
      );
      if (resp.ok) {
        const updatedTable = await resp.json();
        setTables((prevTables) =>
          prevTables.map((table) =>
            table.B_ID === tableId ? { ...table, B_TRANGTHAI: status } : table
          )
        );
      } else {
        const msg = await resp.text();
        alert(msg);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleConfirmTakeOver = async () => {
    setIsConfirmationModal(false);
    updateTableStatus(selectedTable.B_ID, "Đã có khách nhận bàn");
  };

  const handleCancel = async () => {
    const response = await fetch(
      `http://localhost:4000/tables/info/deletebooking/${selectedTableID}`,
      {
        method: "DELETE",
      }
    );
    if (response.ok) {
      setIsConfirmationModal(false);
      updateTableStatus(selectedTable.B_ID, "Trống");
    } else {
      const message = await response.text();
      alert(message);
    }
  };

  return (
    <div className="title">
      <h1>TRANG QUẢN LÝ CHỖ NGỒI VÀ ĐẶT BÀN</h1>
      <Select
        placeholder="Chọn khu vực"
        style={{ width: 200, fontFamily: "lora", fontWeight: 700 }}
        onChange={(value) => {
          setSelectedArea(value);
          setTableArea(value);
        }}
      >
        {areas.map((a) => (
          <Option
            key={a.VT_TEN}
            value={a.VT_TEN}
            style={{ fontFamily: "lora", fontWeight: 700 }}
          >
            {a.VT_TEN}
          </Option>
        ))}
      </Select>
      <Row gutter={[16, 16]} style={{ marginTop: 20 }}>
        {tables.map((table) => (
          <Col key={table.B_ID} span={6}>
            <Card
              className="card"
              title={`${table.B_TEN}`}
              bordered={true}
              style={{
                textAlign: "center",
                fontFamily: "lora",
                fontWeight: 700,
              }}
              onClick={() => handleClick(table)}
            >
              Trạng thái:{" "}
              <span style={getStatusStyle(table.B_TRANGTHAI)}>
                {table.B_TRANGTHAI}
              </span>
            </Card>
          </Col>
        ))}
      </Row>
      <Modal
        className="order-popup"
        overlayClassName="order-popup-overlay"
        isOpen={isModalOpen}
        onRequestClose={handleModalClose}
        style={customStyles}
        contentLabel="Đặt bàn"
      >
        <h2>Đặt bàn</h2>
        <p>Bàn: {selectedTable && selectedTable.B_TEN}</p>
        <p>Khu vực: {selectedArea}</p>
        <div className="booking">
          <label htmlFor="name">Tên khách hàng:</label>
          <input
            className="info-booking"
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
            className="info-booking"
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
            className="info-booking"
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="booking">
          <label htmlFor="statusCustomer">Trạng thái thành viên:</label>
          <select
            value={statusCustomer}
            onChange={(e) => setStatusCustomer(e.target.value)}
          >
            <option value="">Chọn trạng thái</option>
            {status.map((status) => (
              <option key={status} value={status}>
                {status}
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
        <div className="button-feature">
          <button onClick={handleBooking}>Đặt bàn</button>
          <button onClick={handleModalClose}>Hủy</button>
        </div>
      </Modal>
      <Modal
        className="order-popup"
        overlayClassName="confirmation-popup-overlay"
        isOpen={isConfirmationModal}
        onRequestClose={handleModalClose}
        style={customStyles}
        contentLabel="Xác nhận nhận bàn"
      >
        <h2>Xác nhận nhận bàn</h2>
        <p>
          Bàn:{" "}
          <span style={{ fontWeight: 700 }}>
            {selectedTable && selectedTable.B_TEN}
          </span>
        </p>
        <p>
          Khu vực: <span style={{ fontWeight: 700 }}>{selectedArea}</span>
        </p>
        <p>
          Ghi chú: <span style={{ fontWeight: 700 }}>{note}</span>
        </p>
        <p>
          Bàn này đã được đặt bởi{" "}
          <span style={{ color: "red", fontWeight: 600 }}>{nameCustomer}</span>.
          Bạn muốn <strong>nhận bàn</strong> này hay <strong>huỷ bàn</strong> đã
          đặt?
        </p>
        <div className="button-feature">
          <button onClick={handleConfirmTakeOver}>Nhận bàn</button>
          <button onClick={handleCancel}>Huỷ bàn</button>
          <button onClick={handleModalClose}>Đóng</button>
        </div>
      </Modal>
    </div>
  );
};

export default Table;
