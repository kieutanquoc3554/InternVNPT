import React, { useContext, useEffect, useState } from "react";
import Modal from "react-modal";
import "./Checkout.css";
import { ShopContext } from "../../Context/ShopContext";
import { useNavigate } from "react-router-dom";

const Checkout = ({ isOpen, onRequestClose, totalAmount, cartItems }) => {
  const { clearCart, clearSelectedTableID } = useContext(ShopContext);
  const [cashGiven, setCashGiven] = useState(totalAmount);
  const [change, setChange] = useState(0);
  const [numberPhone, setNumberPhone] = useState("");
  const [nameCustomer, setNameCustomer] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState([]);
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [currentUser, setCurrentUser] = useState("");
  const [currentTableCard, setCurrentTableCard] = useState("");
  const [currentDate, setCurrentDate] = useState("");
  const [type, setType] = useState([]);
  const [selectedType, setSelectedType] = useState("");
  const [method, setMethod] = useState(null);
  const [orderType, setOrderType] = useState(null);
  const [displayName, setDisplayName] = useState("");
  const [promote, setPromote] = useState([]);
  const [usedPromote, setUsedPromote] = useState(null);
  const [discount, setDiscount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      setCashGiven(totalAmount.toString());
      setChange(0);
      const date = new Date();
      const formattedHours = String(date.getHours()).padStart(2, "0");
      const formattedMinutes = String(date.getMinutes()).padStart(2, "0");
      const formattedSeconds = String(date.getSeconds()).padStart(2, "0");
      const formattedDate = `${date.getDate()}/${
        date.getMonth() + 1
      }/${date.getFullYear()} ${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
      setCurrentDate(formattedDate);
    } else {
      // Reset states when modal is closed
      setSelectedMethod(null);
      setSelectedType(null);
      setMethod(null);
      setOrderType(null);
      setNumberPhone("");
      setNameCustomer(null);
      setUsedPromote(null);
      setDiscount(0);
    }
  }, [isOpen, totalAmount]);

  useEffect(() => {
    const fetchPaymentMethods = async () => {
      try {
        const response = await fetch("http://localhost:4000/pay/allpayment");
        if (response.ok) {
          const data = await response.json();
          setPaymentMethod(data);
        } else {
          console.error("Error fetching payment methods:", response.status);
        }
      } catch (error) {
        console.error("Error fetching payment methods:", error);
      }
    };

    const fetchUser = async () => {
      try {
        const response = await fetch("http://localhost:4000/users/find", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username: localStorage.getItem("username") }),
        });
        if (response.ok) {
          const userData = await response.json();
          setCurrentUser(userData._id);
        }
        setCurrentTableCard(localStorage.getItem("table"));
      } catch (error) {
        console.log(error);
      }
    };

    const fetchType = async () => {
      try {
        const response = await fetch(
          "http://localhost:4000/orders/type/gettype"
        );
        if (response.ok) {
          const typeData = await response.json();
          setType(typeData);
        } else {
          console.error("Error fetching type:", response.status);
        }
      } catch (error) {
        console.log(error);
      }
    };

    const fetchPromotions = async () => {
      try {
        const resp = await fetch("http://localhost:4000/promotes/get/all");
        if (resp.ok) {
          const data = await resp.json();
          setPromote(data);
        } else {
          console.error("Error fetching promotions");
        }
      } catch (error) {
        console.error("Error fetching promotions");
      }
    };

    fetchPaymentMethods();
    fetchUser();
    fetchType();
    fetchPromotions();
  }, []);

  const handleCashChange = (value) => {
    let newValue;
    if (value === "C") {
      newValue = "";
    } else if (value === "000") {
      newValue = cashGiven + "000";
    } else {
      newValue = cashGiven + value;
    }
    setCashGiven(newValue);
    const numericValue = parseFloat(newValue);
    if (!isNaN(numericValue)) {
      setChange(numericValue - (totalAmount - discount));
    } else {
      setChange(0);
    }
  };

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    setCashGiven(newValue);
    const numericValue = parseFloat(newValue);
    if (!isNaN(numericValue)) {
      setChange(numericValue - (totalAmount - discount));
    } else {
      setChange(0);
    }
  };

  const handlePaymentMethodChange = async (e) => {
    localStorage.setItem("payment", e.target.value);
    setSelectedMethod(e.target.value);
    fetchPayment();
  };

  const handleTypeChange = (e) => {
    localStorage.setItem("type", e.target.value);
    setSelectedType(e.target.value);
    fetchType();
  };

  const fetchPayment = async () => {
    const payment = localStorage.getItem("payment");
    const response = await fetch("http://localhost:4000/pay/find/pay", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: payment }),
    });
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      setMethod(data._id);
    } else {
      const data = await response.json();
      alert(`Lỗi: ${data.message}`);
    }
  };

  const fetchType = async () => {
    const type = localStorage.getItem("type");
    const response = await fetch("http://localhost:4000/orders/type/findType", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: type }),
    });
    if (response.ok) {
      const data = await response.json();
      setOrderType(data._id);
    } else {
      const data = await response.json();
      alert(`Lỗi: ${data.message}`);
    }
  };

  const handleConfirmPayment = async () => {
    if (cashGiven >= totalAmount - discount) {
      if (!selectedMethod) {
        alert("Vui lòng chọn phương thức thanh toán.");
        return;
      }

      if (!selectedType) {
        alert("Vui lòng chọn loại hình đặt hàng.");
        return;
      }

      if (!method || !orderType) {
        alert(
          "Đã xảy ra lỗi khi lấy thông tin phương thức thanh toán hoặc loại hình đặt hàng."
        );
        return;
      }

      const orderData = {
        DH_TONGTIEN: totalAmount - discount,
        DH_TRANGTHAI: "Đã thanh toán",
        DH_LOAI: orderType,
        DH_NHANVIENLAP: currentUser,
        DH_THEBAN: currentTableCard,
        DH_KHACHHANG: nameCustomer,
        DH_THANHTOAN: method,
        DH_TIENKHACHDUA: cashGiven,
        DH_TIENTRALAI: change,
        CHITIETDONHANG: await Promise.all(
          cartItems.map(async (item) => {
            try {
              const productResponse = await fetch(
                "http://localhost:4000/products/product/find",
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({ SP_TEN: item.productName }),
                }
              );
              if (!productResponse.ok) {
                const errorData = await productResponse.json();
                throw new Error(errorData.message);
              }

              const productData = await productResponse.json();
              const sizeResponse = await fetch(
                "http://localhost:4000/sizes/size/find",
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({ KC_TEN: item.size }),
                }
              );
              const sizeData = await sizeResponse.json();
              if (!sizeResponse.ok) {
                const errorData = await sizeResponse.json();
                throw new Error(errorData.message);
              }

              if (!productData._id || !sizeData._id) {
                throw new Error("Product or Size not found");
              }
              return {
                CTDH_SP: productData._id,
                CTDH_KICHCO: sizeData._id,
                CTDH_GIA: item.price,
                quantity: item.quantity,
                note: item.note,
              };
            } catch (error) {
              console.error("Error fetching product/size data:", error);
              throw new Error("Failed to fetch product or size data.");
            }
          })
        ),
      };
      try {
        const response = await fetch("http://localhost:4000/orders/addorder", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(orderData),
        });
        if (response.ok) {
          const data = await response.json();
          alert("Đơn hàng đã được đặt thành công! Mã đơn hàng là: " + data._id);
          clearCart();
          clearSelectedTableID();
          setNameCustomer(null);
          onRequestClose();
          navigate("/");
        } else {
          const data = await response.json();
          alert(`Lỗi: ${data.message}`);
        }
      } catch (error) {
        console.error("Error adding order:", error);
        alert("Đã xảy ra lỗi khi thêm đơn hàng.");
      }
    } else {
      alert("Số tiền khách đưa không đủ để thanh toán!");
    }
  };

  const handlePhoneChange = async (e) => {
    const phone = e.target.value;
    setNumberPhone(phone);
    try {
      if (phone) {
        const response = await fetch("http://localhost:4000/customer/find", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ numberPhone: phone }),
        });

        if (response.ok) {
          const data = await response.json();
          setNameCustomer(data._id);
          setDisplayName(data.KH_TEN);
        } else {
          setNameCustomer(null);
          setDisplayName("Không có khách nào!");
        }
      }
    } catch (error) {
      console.error("Error fetching customer data:", error);
      setNameCustomer("");
    }
  };

  const calculateSuggestedAmounts = (total) => {
    const suggest = [];
    const roundedValue = Math.ceil(total / 1000) * 1000;
    const increments = [
      1000, 2000, 5000, 10000, 20000, 50000, 100000, 200000, 500000,
    ];
    for (const i of increments) {
      const sm = roundedValue + i;
      if (sm > total) {
        suggest.push(sm);
      }
    }
    for (const i of increments) {
      const suggestAmount = Math.ceil(total / i) * i;
      if (suggestAmount > total && !suggest.includes(suggestAmount)) {
        suggest.push(suggestAmount);
      }
    }
    suggest.sort((a, b) => a - b);
    return suggest;
  };

  const suggestedValue = calculateSuggestedAmounts(totalAmount);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Thanh toán"
      ariaHideApp={false}
      className="checkout-popup"
      overlayClassName="checkout-popup-overlay"
    >
      <h2>Xác nhận thanh toán</h2>
      <div className="main">
        <div>
          <label style={{ fontWeight: 700 }}>Hình thức thanh toán: </label>
          <div className="paymentMethod">
            {paymentMethod && paymentMethod.length > 0 ? (
              paymentMethod.map((method, i) => (
                <div key={i} className="method-item">
                  <input
                    style={{ cursor: "pointer" }}
                    type="radio"
                    id={`paymentMethod_${i}`}
                    name="paymentMethod"
                    value={method.TT_TENPHUONGTHUC}
                    checked={selectedMethod === method.TT_TENPHUONGTHUC}
                    onChange={handlePaymentMethodChange}
                  />
                  {method.TT_TENPHUONGTHUC === "Tiền mặt" ? (
                    <i className="fa-solid fa-wallet"></i>
                  ) : (
                    <i className="fa-solid fa-credit-card"></i>
                  )}
                  <label
                    style={{ cursor: "pointer", fontWeight: "500" }}
                    htmlFor={`paymentMethod_${i}`}
                  >
                    {method.TT_TENPHUONGTHUC}
                  </label>
                </div>
              ))
            ) : (
              <span>Đang tải...</span>
            )}
          </div>
          <label style={{ fontWeight: 700 }}>Loại: </label>
          <div className="ordertype">
            {type && type.length > 0 ? (
              type.map((type, i) => (
                <div key={i} className="type-item">
                  <input
                    style={{ cursor: "pointer" }}
                    type="radio"
                    id={`type_${i}`}
                    name="type"
                    value={type.L_TEN}
                    checked={selectedType === type.L_TEN}
                    onChange={handleTypeChange}
                  />
                  {type.L_TEN === "Mang đi" ? (
                    <i className="fa-solid fa-motorcycle"></i>
                  ) : (
                    <i className="fa-solid fa-store"></i>
                  )}
                  <label style={{ cursor: "pointer", fontWeight: "500" }}>
                    {type.L_TEN}
                  </label>
                </div>
              ))
            ) : (
              <span>Đang tải...</span>
            )}
          </div>
          <hr className="row" />
          <p style={{ fontWeight: 700 }}>Thông tin thanh toán</p>
          <label htmlFor="numberphone">Số điện thoại thành viên: </label>
          <input
            type="text"
            value={numberPhone}
            id="numberphone"
            placeholder="Nhập số điện thoại khách hàng thành viên"
            onChange={handlePhoneChange}
          />
          {displayName ? (
            <p>
              Tên khách hàng: <strong>{displayName}</strong>
            </p>
          ) : (
            <p>
              Tên khách hàng: <strong>Chưa có khách nào được chọn</strong>
            </p>
          )}
          <p>
            Thẻ bàn: <strong>{currentTableCard}</strong>
          </p>
          <hr />
          <label style={{ fontWeight: 700 }}>Chọn khuyến mãi</label>
          {/* <select onChange={handlePromoteChange} name="" id="">
            <option value="">Không áp dụng khuyến mãi</option>
            {promote.map((promo) => (
              <option key={promo._id} value={promo._id}>
                {promo.KM_TEN} - Giảm {promo.KM_GIATRI}%
              </option>
            ))}
          </select> */}

          <hr />
          {usedPromote && (
            <div>
              <p>Khuyến mãi áp dụng: {usedPromote.KM_TEN}</p>
              <p>Giảm giá: {discount} VND</p>
            </div>
          )}
        </div>
        <hr className="column" />
        <div>
          <div className="checkout-total">
            <h3>
              Tổng thanh toán:{" "}
              <span style={{ color: "red" }}>{totalAmount - discount} VND</span>
            </h3>
          </div>
          <div className="checkout-cash">
            <label htmlFor="cashGiven">Tiền khách đưa:</label>
            <input
              className="change"
              type="number"
              id="cashGiven"
              value={cashGiven}
              onChange={handleInputChange}
            />
          </div>
          <div className="suggested-amounts">
            <div className="amount-buttons">
              {suggestedValue.map((amount, index) => (
                <button
                  className="suggest"
                  key={index}
                  onClick={() => {
                    setCashGiven(amount.toString());
                    setChange(amount - (totalAmount - discount));
                  }}
                >
                  {amount.toLocaleString()}
                </button>
              ))}
            </div>
          </div>
          <div className="numeric-keypad">
            <button onClick={() => handleCashChange("1")}>1</button>
            <button onClick={() => handleCashChange("2")}>2</button>
            <button onClick={() => handleCashChange("3")}>3</button>
            <button onClick={() => handleCashChange("4")}>4</button>
            <button onClick={() => handleCashChange("5")}>5</button>
            <button onClick={() => handleCashChange("6")}>6</button>
            <button onClick={() => handleCashChange("7")}>7</button>
            <button onClick={() => handleCashChange("8")}>8</button>
            <button onClick={() => handleCashChange("9")}>9</button>
            <button onClick={() => handleCashChange("0")}>0</button>
            <button onClick={() => handleCashChange("000")}>000</button>
            <button onClick={() => handleCashChange("C")}>C</button>
          </div>
          <div className="checkout-change">
            <h3>Tiền thừa: {change >= 0 ? change : 0} VND</h3>
          </div>
          {parseFloat(cashGiven) < totalAmount - discount && (
            <div className="checkout-warning">
              <p style={{ color: "red" }}>
                Số tiền khách đưa không đủ để thanh toán!
              </p>
            </div>
          )}
        </div>
      </div>
      <div className="checkout-buttons">
        <button onClick={handleConfirmPayment}>Xác nhận</button>
        <button onClick={onRequestClose}>Đóng</button>
      </div>
    </Modal>
  );
};

export default Checkout;
