import {
  BarChartOutlined,
  UserOutlined,
  GiftOutlined,
  DropboxOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function SideMenu() {
  const location = useLocation();
  const [selectedKeys, setSelectedKeys] = useState("/");

  useEffect(() => {
    const pathName = location.pathname;
    setSelectedKeys(pathName);
  }, [location.pathname]);

  const navigate = useNavigate();
  return (
    <div className="SideMenu">
      <Menu
        className="SideMenuVertical"
        mode="vertical"
        onClick={(item) => {
          //item.key
          navigate(item.key);
        }}
        selectedKeys={[selectedKeys]}
        items={[
          {
            label: "Thống kê",
            icon: <BarChartOutlined />,
            key: "/",
          },
          {
            label: "Quản lý nhân viên",
            key: "/users",
            icon: <UserOutlined />,
          },
          {
            label: "Quản lý sản phẩm",
            key: "/products",
            icon: <DropboxOutlined />,
          },
          {
            label: "Quản lý khuyến mãi",
            key: "/coupon",
            icon: <GiftOutlined />,
          },
        ]}
      ></Menu>
    </div>
  );
}
export default SideMenu;
