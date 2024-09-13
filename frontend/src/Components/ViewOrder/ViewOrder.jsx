import React, { useContext, useEffect, useState } from "react";
import "./ViewOrder.css";
import moment from "moment";
import { Link } from "react-router-dom";
import { ShopContext } from "../../Context/ShopContext";

const Vieworder = () => {
  const [allOrder, setAllOrder] = useState([]);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [date, setDate] = useState("");
  const { formatCurrency } = useContext(ShopContext);
  useEffect(() => {
    const fetchOrderData = async () => {
      try {
        const response = await fetch("http://localhost:4000/orders/allorder");
        if (!response.ok) {
          throw new Error("Có lỗi trong quá trình phản hồi");
        }
        const data = await response.json();
        setAllOrder(data);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchOrderData();
  }, []);

  const formatDate = (isoDate) => {
    return moment(isoDate).format("HH:mm:ss");
  };

  const groupOrderByDate = (orders) => {
    return orders.reduce((acc, order) => {
      const orderDate = moment(order.DH_NGAYLAP).format("DD/MM/YYYY");
      if (!acc[orderDate]) {
        acc[orderDate] = [];
      }
      acc[orderDate].push(order);
      return acc;
    }, {});
  };

  const filteredOrders = allOrder.filter((order) => {
    const customerName = order.DH_KHACHHANG?.KH_TEN || "Khách vãng lai";
    const orderDate = moment(order.DH_NGAYLAP).format("DD/MM/YYYY");
    const formattedDate = moment(date).format("DD/MM/YYYY");
    return (
      (order._id.includes(searchTerm) ||
        customerName.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (date === "" || orderDate === formattedDate)
    );
  });

  filteredOrders.sort((a, b) => {
    return moment(b.DH_NGAYLAP).valueOf() - moment(a.DH_NGAYLAP).valueOf();
  });

  const groupedOrders = groupOrderByDate(filteredOrders);

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  return (
    <div className="view-main">
      {/* <h1>Danh sách đơn hàng</h1> */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Tìm kiếm đơn hàng..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <input
          type="date"
          value={date}
          onChange={handleDateChange}
          className="date-input"
        />
      </div>

      <div className="order-data header">
        <p>Số bàn</p>
        <p>Tên khách hàng</p>
        <p>Tổng đơn hàng</p>
        <p>Ngày thanh toán</p>
      </div>
      <div className="main-data">
        {Object.keys(groupedOrders).length > 0 ? (
          Object.keys(groupedOrders).map((orderDate) => (
            <React.Fragment key={orderDate}>
              <div className="date-separator">{orderDate}</div>
              {groupedOrders[orderDate].map((order) => (
                <Link
                  className="order-item"
                  to={`/ordermanager/vieworder/${order._id}`}
                  key={order._id}
                >
                  <div className="order-data">
                    <p>{order.DH_THEBAN}</p>
                    <p>
                      {order.DH_KHACHHANG === null
                        ? "Khách vãng lai"
                        : order.DH_KHACHHANG.KH_TEN}
                    </p>
                    <p>{formatCurrency(order.DH_TONGTIEN)} VND</p>
                    <p>{formatDate(order.DH_NGAYLAP)}</p>
                  </div>
                </Link>
              ))}
            </React.Fragment>
          ))
        ) : (
          <p className="notice">Không tìm thấy đơn hàng</p>
        )}
      </div>
    </div>
  );
};

export default Vieworder;
