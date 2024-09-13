import React, { useContext, useState, useEffect } from "react";
import "./Navbar.css";
import logo from "../Assets/logo.webp";
import cart_icon from "../Assets/cart_icon.png";
import { Link } from "react-router-dom";
import { ShopContext } from "../../Context/ShopContext";

const Navbar = () => {
  const [menu, setMenu] = useState("coffee");
  const [isLogin, setIsLogin] = useState(localStorage.getItem("login"));

  useEffect(() => {
    setIsLogin(localStorage.getItem("login"));
  }, [localStorage.getItem("login")]);

  useEffect(() => {
    // Retrieve the menu state from local storage when the component mounts
    const savedMenu = localStorage.getItem("selectedMenu");
    if (savedMenu) {
      setMenu(savedMenu);
    }
  }, []);

  const handleMenuClick = (menu) => {
    setMenu(menu);
    localStorage.setItem("selectedMenu", menu);
  };

  const { getTotalItemsInCart, handleSearchChange, searchTerm } =
    useContext(ShopContext);
  return (
    <div className="navbar">
      <div className="nav-main">
        <div className="nav-logo">
          <img src={logo} alt="" />
          <p>Passio</p>
        </div>
        <div className="nav-menu-main">
          <ul className="nav-menu">
            <li onClick={() => handleMenuClick("coffee")}>
              <Link style={{ textDecoration: "none", color: "black" }} to="/">
                Cà Phê {menu === "coffee" ? <hr /> : <></>}
              </Link>
            </li>
            <li onClick={() => handleMenuClick("tea")}>
              <Link
                to="/tea"
                style={{ textDecoration: "none", color: "black" }}
              >
                Trà nguyên vị {menu === "tea" ? <hr /> : <></>}
              </Link>
            </li>
            <li onClick={() => handleMenuClick("latte")}>
              <Link
                to="/latte"
                style={{ textDecoration: "none", color: "black" }}
              >
                Latte {menu === "latte" ? <hr /> : <></>}
              </Link>
            </li>
            <li onClick={() => handleMenuClick("fruit")}>
              <Link
                to="/fruit"
                style={{ textDecoration: "none", color: "black" }}
              >
                Trà trái cây {menu === "fruit" ? <hr /> : <></>}
              </Link>
            </li>
            <li onClick={() => handleMenuClick("milktea")}>
              <Link
                to="/milktea"
                style={{ textDecoration: "none", color: "black" }}
              >
                Trà sữa {menu === "milktea" ? <hr /> : <></>}
              </Link>
            </li>
            <li onClick={() => handleMenuClick("yogurt")}>
              <Link
                style={{ textDecoration: "none", color: "black" }}
                to="/yogurt"
              >
                Sữa chua {menu === "yogurt" ? <hr /> : <></>}
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="nav-login-cart">
        <div className="nav-search">
          <input
            className="search"
            type="text"
            placeholder="Tìm kiếm sản phẩm"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
        {localStorage.getItem("auth-token") ? (
          <div className="menu-item">
            <i class="fa-solid fa-bars hamburger-menu"></i>
            <div className="child-menu">
              <div className="child-menu-main">
                <Link
                  onClick={() => setMenu("")}
                  to="/ordermanager/vieworder"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <div className="child-menu-item">Quản lý hoá đơn</div>
                </Link>
                <Link
                  onClick={() => setMenu("")}
                  to="/tablemanage"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <div className="child-menu-item">Quản lý chỗ ngồi</div>
                </Link>
                <Link
                  onClick={() => setMenu("")}
                  to="/booking"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <div className="child-menu-item">Đặt bàn</div>
                </Link>
                <div
                  className="child-menu-item"
                  style={{ color: "red", fontWeight: "600" }}
                  onClick={() => {
                    localStorage.removeItem("auth-token");
                    window.location.replace("/");
                  }}
                >
                  Đăng xuất
                </div>
              </div>
            </div>
          </div>
        ) : (
          <a href="/login" onClick={() => setMenu("")}>
            <button>Đăng nhập</button>
          </a>
        )}
        <Link to="/cart" onClick={() => setMenu("")}>
          <img src={cart_icon} alt="" />
        </Link>
        <div className="nav-cart-count">{getTotalItemsInCart()}</div>
        {/* <Link to="/test" style={{ textDecoration: "none", color: "red" }}>
          <p>Dev Test</p>
        </Link> */}
      </div>
    </div>
  );
};

export default Navbar;
