import React, { useContext, useState } from "react";
import "./CSS/Category.css";
import { ShopContext } from "../Context/ShopContext";
import Item from "../Components/Item/Item";
import Order from "../Components/Order/Order";

const Category = (props) => {
  const { products, searchTerm, formatCurrency } = useContext(ShopContext);

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const filteredProducts = products.filter((product) => {
    const nameMatch = product.SP_TEN.toLowerCase().includes(
      searchTerm.toLowerCase()
    );
    const keywordMatch = product.SP_KEYWORD.some((keyword) =>
      keyword.KW_TEN.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return nameMatch || keywordMatch;
  });

  const handleItemClick = (item) => {
    setSelectedProduct(item);
    setIsPopupOpen(true);
  };

  return (
    <div className="category">
      {filteredProducts.length === 0 && searchTerm !== "" && (
        <p
          style={{ textAlign: "center", margin: "60px auto", fontWeight: 600 }}
          className="no-results"
        >
          Không tìm thấy sản phẩm nào.
        </p>
      )}
      <div className="category-product">
        {Array.isArray(filteredProducts) &&
          filteredProducts.map((item, i) => {
            if (props.category === item.SP_LOAI) {
              return (
                <Item
                  key={i}
                  id={item._id}
                  name={item.SP_TEN}
                  image={item.SP_ANH}
                  CHITIETSANPHAM={item.CHITIETSANPHAM}
                  onClick={() => handleItemClick(item)}
                />
              );
            }
            return null;
          })}
      </div>
      <Order
        isOpen={isPopupOpen}
        onRequestClose={() => setIsPopupOpen(false)}
        product={selectedProduct}
      ></Order>
    </div>
  );
};

export default Category;
