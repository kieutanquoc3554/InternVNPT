import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import moment from "moment";
import "./OrderDetail.css"; // Add your styling here
import { ShopContext } from "../../Context/ShopContext";

const OrderDetail = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [error, setError] = useState(null);
  const { formatCurrency } = useContext(ShopContext);

  useEffect(() => {
    const fetchOrderDetail = async () => {
      try {
        const response = await fetch(`http://localhost:4000/orders/${orderId}`);
        if (!response.ok) {
          throw new Error("Có lỗi trong quá trình phản hồi");
        }
        const data = await response.json();
        setOrder(data);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchOrderDetail();
  }, [orderId]);

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!order) {
    return <div className="loading">Đang tải...</div>;
  }

  const customer = order.DH_KHACHHANG || {};
  const staff = order.DH_NHANVIENLAP || {};

  return (
    <div className="main-container">
      <h1>Chi tiết đơn hàng</h1>
      <div className="order-detail">
        <p>
          Mã đơn hàng: <strong> #{order._id}</strong>
        </p>{" "}
        <p>
          Ngày thanh toán:{" "}
          <strong>
            {moment(order.DH_NGAYLAP).format("DD/MM/YYYY hh:mm:ss")}
          </strong>
        </p>
        <p>
          Hình thức dùng: <strong>{order.DH_LOAI.L_TEN}</strong>
        </p>
        <p>
          Phương thức thanh toán:{" "}
          <strong>{order.DH_THANHTOAN.TT_TENPHUONGTHUC}</strong>
        </p>
        <p>
          Thẻ bàn: <strong>{order.DH_THEBAN}</strong>
        </p>
        <div className="info-item">
          <div className="info-order_detail">
            <div className="img">
              <i class="fa-regular fa-user"></i>
            </div>
            <div className="info-user">
              <p style={{ fontWeight: 700, fontSize: "20px" }}>Khách hàng</p>
              <p>
                Tên khách hàng:{" "}
                <strong>
                  {customer.KH_TEN ? `${customer.KH_TEN}` : "Khách vãng lai"}
                </strong>
              </p>
              <p>
                Số điện thoại:{" "}
                <strong>
                  {customer.KH_SDT
                    ? `${customer.KH_SDT}`
                    : "Không có số điện thoại"}
                </strong>
              </p>
              <p>
                Email:{" "}
                <strong>
                  {customer.KH_EMAIL
                    ? `${customer.KH_EMAIL}`
                    : "Chưa cung cấp email"}
                </strong>
              </p>
            </div>
          </div>
          <div className="info-order_detail">
            <div className="img">
              <i class="fa-solid fa-clipboard-user"></i>
            </div>
            <div className="info-user">
              <p style={{ fontWeight: 700, fontSize: "20px" }}>
                Nhân viên lập hoá đơn
              </p>
              <p>
                Tên nhân viên: <strong>{staff.ND_TEN}</strong>
              </p>
              <p>
                Số điện thoại: <strong>{staff.ND_SDT}</strong>
              </p>
            </div>
          </div>
          <div className="info-order_detail">
            <div className="img">
              <i class="fa-solid fa-money-bill-1-wave"></i>
            </div>
            <div className="info-user">
              <p style={{ fontWeight: 700, fontSize: "20px" }}>
                Tổng quan hoá đơn
              </p>
              <p>
                Tổng hoá đơn:{" "}
                <strong>{formatCurrency(order.DH_TONGTIEN)} VND</strong>
              </p>
              <p>
                Tiền khách đưa:{" "}
                <strong>{formatCurrency(order.DH_TIENKHACHDUA)} VND</strong>
              </p>
              <p>
                Tiền trả lại khách:{" "}
                <strong>{formatCurrency(order.DH_TIENTRALAI)} VND</strong>
              </p>
            </div>
          </div>
        </div>
        <strong style={{ fontSize: "20px" }}>Chi tiết sản phẩm</strong>
        <div>
          <div className="detail-container header">
            <strong>Sản phẩm</strong>
            <strong>Kích cỡ</strong>
            <strong>Giá</strong>
            <strong>Số lượng</strong>
            <strong>Thành tiền</strong>
            <strong>Khuyến mãi</strong>
          </div>
          <div>
            {order.CHITIETDONHANG.map((item, index) => (
              <div
                key={item._id}
                className={`detail-container ${
                  index % 2 === 0 ? "even" : "odd"
                }`}
              >
                <p>{item.CTDH_SP.SP_TEN}</p>
                <p>{item.CTDH_KICHCO.KC_TEN}</p>
                <p>{formatCurrency(item.CTDH_GIA)}</p>
                <p>{item.quantity}</p>
                <p>{formatCurrency(item.CTDH_GIA * item.quantity)}</p>
                <p>
                  {item.promotions
                    ? `Giảm ${formatCurrency(item.promotions.KM_GIATRI)}%`
                    : "Không có"}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
