import React, { useContext } from "react";
import "./Item.css";
import placeholder from "../Assets/placeholder.png";
import { ShopContext } from "../../Context/ShopContext";

const Item = (props) => {
  const { formatCurrency } = useContext(ShopContext);
  return (
    <div className="item" title={props.name} onClick={props.onClick}>
      <img
        onClick={() => window.scrollTo(0, 0)}
        src={props.image}
        alt={props.name}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = placeholder;
        }}
      />
      <p className="text-truncate">{props.name}</p>
      <div className="item-prices">
        {props.CHITIETSANPHAM.map((detail, index) => (
          <p key={index}>
            {detail.KC_ID.KC_TEN}: {formatCurrency(detail.CTSP_GIA)} VND
          </p>
        ))}
      </div>
    </div>
  );
};

export default Item;
