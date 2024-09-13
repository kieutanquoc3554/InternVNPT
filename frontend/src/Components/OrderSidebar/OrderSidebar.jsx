import React from "react";
import "./OrderSidebar.css";
import { Link } from "react-router-dom";
const OrderSidebar = () => {
  return (
    <div className="order-sidebar">
      <Link to="/ordermanager/vieworder" style={{ textDecoration: "none" }}>
        <div className="sidebar-item">
          <p>Xem đơn hàng</p>
        </div>
      </Link>
      {/* <Link to="/ordermanager/refund" style={{ textDecoration: "none" }}>
        <div className="sidebar-item">
          <p>Hoàn tiền đơn hàng</p>
        </div>
      </Link>
      <Link to="/ordermanager/notcomplete" style={{ textDecoration: "none" }}>
        <div className="sidebar-item">
          <p>Đơn hàng chưa giao</p>
        </div>
      </Link>
      <Link to="/ordermanager/vieworder" style={{ textDecoration: "none" }}>
        <div className="sidebar-item">
          <p>Đơn hàng hoàn tất</p>
        </div>
      </Link>
      <Link to="/ordermanager/vieworder" style={{ textDecoration: "none" }}>
        <div className="sidebar-item">
          <p>Đơn hàng hoàn tiền</p>
        </div>
      </Link> */}
    </div>
  );
};
export default OrderSidebar;
