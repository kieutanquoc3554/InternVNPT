import React, { useContext, useEffect, useState } from "react";
import "./Order.css";
import placeholder from "../Assets/placeholder.png";
import Modal from "react-modal";
import { ShopContext } from "../../Context/ShopContext";
import { motion } from "framer-motion";

const Order = ({ isOpen, onRequestClose, product }) => {
  const {
    addToCart,
    selectedTableID,
    setSelectedTableID,
    formatCurrency,
    cartItem,
    removeProductfromCart,
    updateCartItem,
  } = useContext(ShopContext);
  const [selectedSize, setSelectedSize] = useState(null);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [tableCard, setTableCard] = useState([]);
  let [note, setNote] = useState("");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      const cardData = await fetch(
        "http://localhost:4000/tables/alltable/card"
      );
      const data = await cardData.json();
      setTableCard(data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    setSelectedSize(null);
    setNote("");
    setQuantity(1);
  }, [isOpen]);

  useEffect(() => {
    if (!getCartItemQuantity()) {
      setSelectedTableID(null);
    }
  }, [cartItem]);

  const getCartItemQuantity = () => {
    return Object.values(cartItem).reduce((total, product) => {
      if (typeof product === "object" && product !== null) {
        return (
          total +
          Object.values(product).reduce((sum, item) => {
            if (
              typeof item === "object" &&
              item !== null &&
              typeof item.quantity === "number"
            ) {
              return sum + item.quantity;
            }
            return sum;
          }, 0)
        );
      }
      return total;
    }, 0);
  };

  if (!product) {
    return null;
  }

  const handleSelectSize = (sizeId) => {
    setSelectedSize(sizeId);
  };

  const handleTableCard = (value) => {
    setSelectedTableID(value);
  };

  const handleAddToCart = () => {
    if (!selectedSize || !selectedTableID) {
      setNotificationMessage("Vui lòng chọn kích cỡ và số bàn");
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 3000);
      return;
    }
    addToCart(product._id, selectedSize, selectedTableID, note, quantity);
    setNotificationMessage(
      <span>
        Đã thêm sản phẩm{" "}
        <span style={{ color: "yellow" }}>{product.SP_TEN}</span> vào giỏ hàng!
      </span>
    );

    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  const handleQuantityChange = (change) => {
    setQuantity((prevQuantity) => {
      const newQuantity = prevQuantity + change;
      return newQuantity > 0 ? newQuantity : 1;
    });
  };

  const popupVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  };

  return (
    <div>
      <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        contentLabel="Đặt sản phẩm"
        ariaHideApp={false}
        className="order-popup"
        overlayClassName="order-popup-overlay"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          variants={popupVariants}
          className="popup-content"
        >
          <div className="popup-content">
            <h2>{product.SP_TEN}</h2>
            <img
              src={product.SP_ANH}
              alt={product.SP_TEN}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = placeholder;
              }}
            />
            <div className="product-description">
              <h5 style={{ fontWeight: "500" }}>{product.SP_MOTA}</h5>
            </div>
            <div className="item-prices">
              {product.CHITIETSANPHAM.map((detail) => (
                <div className="priceSize" key={detail.KC_ID.KC_ID}>
                  <input
                    type="radio"
                    id={detail.KC_ID.KC_ID}
                    name={`size-${product._id}`}
                    value={detail.KC_ID.KC_ID}
                    onChange={() => handleSelectSize(detail.KC_ID.KC_ID)}
                  />
                  <label
                    style={{ fontWeight: "500" }}
                    htmlFor={detail.KC_ID.KC_ID}
                  >
                    {detail.KC_ID.KC_TEN} : {formatCurrency(detail.CTSP_GIA)}{" "}
                    VND
                  </label>
                </div>
              ))}
            </div>
            <p>Số lượng</p>
            <div className="quantity-selector">
              <button onClick={() => handleQuantityChange(-1)}>-</button>
              <strong>{quantity}</strong>
              <button onClick={() => handleQuantityChange(1)}>+</button>
            </div>
            {getCartItemQuantity() === 0 && (
              <>
                <p>Vui lòng chọn thẻ bàn</p>
                <div className="tableCard">
                  {tableCard.map((item) => {
                    const value = item.TB_TEN + 1;
                    const isSelected = selectedTableID === value;
                    return (
                      <div
                        key={item._id}
                        className={`tableCard-items ${
                          isSelected ? "selected" : ""
                        }`}
                        onClick={() => handleTableCard(value)}
                      >
                        {value}
                      </div>
                    );
                  })}
                </div>
              </>
            )}
            <p>Ghi chú</p>
            <div className="note">
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Nhập ghi chú tại đây"
                className="note"
              ></textarea>
            </div>

            <div className="feature-button">
              <button onClick={handleAddToCart}>Thêm vào giỏ hàng</button>
              <button onClick={onRequestClose}>Đóng</button>
            </div>
          </div>
          {showNotification && (
            <div className="notification-popup">
              <p style={{ fontWeight: "600" }}>{notificationMessage}</p>
            </div>
          )}
        </motion.div>
      </Modal>
    </div>
  );
};

export default Order;
