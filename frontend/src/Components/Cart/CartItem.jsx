import React, { useContext, useState } from "react";
import "./CartItem.css";
import { ShopContext } from "../../Context/ShopContext";
import remove_icon from "../Assets/cart_cross_icon.png";
import Checkout from "../Checkout/Checkout";
import empty_cart from "../Assets/empty-cart-4816550-4004141.webp";

const Cart = () => {
  const {
    products,
    cartItem,
    updateCartItem,
    removeProductfromCart,
    formatCurrency,
    promotions,
  } = useContext(ShopContext);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const getPromotion = (product) => {
    return promotions.find(
      (promo) =>
        promo.KM_LOAISANPHAM.toLowerCase() === product.SP_LOAI.toLowerCase()
    );
  };

  const getTotal = () => {
    let total = 0;
    products.forEach((product) => {
      Object.entries(cartItem[product._id] || {}).forEach(([key, item]) => {
        if (item.quantity > 0) {
          const [sizeId, tableNumber] = key.split("-");
          const sizeDetail = product.CHITIETSANPHAM.find(
            (detail) => detail.KC_ID.KC_ID === parseInt(sizeId)
          );
          if (sizeDetail) {
            total += sizeDetail.CTSP_GIA * item.quantity;
            const promo = getPromotion(product);
            if (promo) {
              total -=
                (promo.KM_GIATRI / 100) * sizeDetail.CTSP_GIA * item.quantity;
            }
          }
        }
      });
    });
    return total;
  };

  const getCartItems = () => {
    const items = [];
    products.forEach((product) => {
      Object.entries(cartItem[product._id] || {}).forEach(([key, item]) => {
        if (item.quantity > 0) {
          let [sizeId, tableNumber, note] = key.split("-");
          const sizeDetail = product.CHITIETSANPHAM.find(
            (detail) => detail.KC_ID.KC_ID === parseInt(sizeId)
          );
          if (sizeDetail) {
            const promo = getPromotion(product);
            const discount = promo
              ? (promo.KM_GIATRI / 100) * sizeDetail.CTSP_GIA
              : 0;
            items.push({
              productName: product.SP_TEN,
              size: sizeDetail.KC_ID.KC_TEN,
              quantity: item.quantity,
              price:
                sizeDetail.CTSP_GIA * item.quantity - discount * item.quantity,
              originalPrice: sizeDetail.CTSP_GIA * item.quantity,
              note: note || "",
              tableNumber: tableNumber,
              promo: promo ? promo.KM_TEN : null,
              discount: discount * item.quantity,
              productId: product._id,
              sizeId: sizeDetail.KC_ID.KC_ID,
              key,
            });
          }
          localStorage.setItem("table", tableNumber);
        }
      });
    });
    return items;
  };

  const handleQuantityChange = (itemId, key, quantity) => {
    if (quantity === 0) {
      removeProductfromCart(itemId, key);
    } else if (quantity > 0) {
      updateCartItem(itemId, key, quantity);
    }
  };

  const totalAmount = getTotal();
  const cartItems = getCartItems();

  return (
    <div>
      {cartItems.length === 0 ? (
        <div className="main-empty">
          <img className="image-cart" src={empty_cart} alt="Empty Cart" />
          <h2>
            Hmm...có vẻ như giỏ hàng đang{" "}
            <strong style={{ color: "red" }}>trống!</strong>
          </h2>
        </div>
      ) : (
        <div className="cartitems">
          <div className="cartItems-format-main">
            <p>TÊN SẢN PHẨM</p>
            <p>KÍCH CỠ</p>
            <p>GIÁ TIỀN</p>
            <p>SỐ LƯỢNG</p>
            <p>TỔNG</p>
            <p>XOÁ</p>
          </div>
          <hr />
          <div>
            {products.map((product) => {
              const filteredSizes = Object.entries(
                cartItem[product._id] || {}
              ).filter(([key, item]) => item.quantity > 0);

              if (filteredSizes.length > 0) {
                return filteredSizes.map(([key, item]) => {
                  const [sizeId, tableNumber, note] = key.split("-");
                  const sizeDetail = product.CHITIETSANPHAM.find(
                    (detail) => detail.KC_ID.KC_ID === parseInt(sizeId)
                  );
                  if (sizeDetail) {
                    const promo = getPromotion(product);
                    const discount = promo
                      ? (promo.KM_GIATRI / 100) * sizeDetail.CTSP_GIA
                      : 0;
                    return (
                      <div key={`${product._id}-${key}`}>
                        <div className="cartitems-format cartItems-format-main">
                          <div>
                            <p>{product.SP_TEN}</p>
                            <p className="detail-order">
                              Thẻ: <strong>{tableNumber}</strong>
                            </p>
                            <p className="detail-order">
                              {note ? "Ghi chú: " : ""}
                              <strong style={{ color: "#1671e7" }}>
                                {note}
                              </strong>
                              {promo && (
                                <div
                                  className={`promo-applied ${
                                    promo.KM_LOAISANPHAM === "coffee"
                                      ? "brown"
                                      : `${
                                          promo.KM_LOAISANPHAM === "milktea"
                                            ? "beige"
                                            : `${
                                                promo.KM_LOAISANPHAM === "latte"
                                                  ? "beige-france"
                                                  : `${
                                                      promo.KM_LOAISANPHAM ===
                                                      "tea"
                                                        ? "yellow"
                                                        : `${
                                                            promo.KM_LOAISANPHAM ===
                                                            "fruit"
                                                              ? "fruit"
                                                              : `${
                                                                  promo.KM_LOAISANPHAM ===
                                                                  "yogurt"
                                                                    ? "yogurt"
                                                                    : ""
                                                                }`
                                                          }`
                                                    }`
                                              }`
                                        }`
                                  }`}
                                >
                                  <span>{promo.KM_TEN}</span>
                                </div>
                              )}
                            </p>
                          </div>
                          <p>
                            {sizeDetail.KC_ID.KC_TEN} - (
                            {sizeDetail.KC_ID.KC_DUNGTICH})
                          </p>
                          <p>{formatCurrency(sizeDetail.CTSP_GIA)} VND</p>
                          <div className="cartitem-quantity">
                            <button
                              className="button-quantity"
                              onClick={() =>
                                handleQuantityChange(
                                  product._id,
                                  key,
                                  item.quantity - 1
                                )
                              }
                            >
                              -
                            </button>
                            <input
                              type="number"
                              className="cartitem-quantity-input"
                              value={item.quantity}
                              onChange={(e) =>
                                handleQuantityChange(
                                  product._id,
                                  key,
                                  parseInt(e.target.value)
                                )
                              }
                              min="1"
                            />
                            <button
                              className="button-quantity"
                              onClick={() =>
                                handleQuantityChange(
                                  product._id,
                                  key,
                                  item.quantity + 1
                                )
                              }
                            >
                              +
                            </button>
                          </div>
                          <p>
                            {promo ? (
                              <>
                                <span className="original-price">
                                  {formatCurrency(
                                    sizeDetail.CTSP_GIA * item.quantity
                                  )}{" "}
                                  VND
                                </span>{" "}
                                {formatCurrency(
                                  sizeDetail.CTSP_GIA * item.quantity -
                                    discount * item.quantity
                                )}{" "}
                                VND
                              </>
                            ) : (
                              <>
                                {formatCurrency(
                                  sizeDetail.CTSP_GIA * item.quantity
                                )}{" "}
                                VND
                              </>
                            )}
                          </p>
                          <img
                            src={remove_icon}
                            onClick={() => {
                              removeProductfromCart(product._id, key);
                            }}
                            alt="remove"
                          />
                        </div>
                        <hr />
                      </div>
                    );
                  }
                  return null;
                });
              }

              return null;
            })}
            <div className="cartitems-down">
              <div className="cartitems-total">
                <h1>Tổng giỏ hàng</h1>
                <div className="cartitems-total-item">
                  <h3>Tổng thanh toán</h3>
                  <h3>{formatCurrency(totalAmount)} VND</h3>
                </div>
                <button onClick={() => setIsCheckoutOpen(true)}>
                  THANH TOÁN
                </button>
              </div>
            </div>
            <div className="cartitems-promocode"></div>
          </div>
        </div>
      )}
      <Checkout
        isOpen={isCheckoutOpen}
        onRequestClose={() => setIsCheckoutOpen(false)}
        cartItems={cartItems}
        totalAmount={totalAmount}
      />
    </div>
  );
};

export default Cart;
