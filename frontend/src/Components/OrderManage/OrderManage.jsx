import React from "react";
import "./OrderManage.css";
import OrderSidebar from "../OrderSidebar/OrderSidebar";
import { Outlet } from "react-router-dom";

const OrderManage = () => {
  return (
    <div className="order">
      <OrderSidebar></OrderSidebar>
      <div className="order-content">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default OrderManage;
