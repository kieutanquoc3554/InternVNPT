import React, { createContext, useEffect, useState } from "react";

export const ShopContext = createContext(null);

const ShopContextProvider = (props) => {
  const getDefaultCart = (products = []) => {
    let cart = {};
    products.forEach((product) => {
      cart[product._id] = {};
      product.CHITIETSANPHAM.forEach((size) => {
        cart[product._id][size.KC_ID.KC_ID] = 0; // Fixed template literal and object property
      });
    });
    return cart;
  };

  const [cartItem, setCartItem] = useState(getDefaultCart());
  const [products, setProducts] = useState([]);
  const [promotions, setPromotions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedTableID, setSelectedTableID] = useState(null);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    if (searchTerm.trim() !== "") {
      const filtered = products.filter((product) => {
        const nameMatch = product.SP_TEN.toLowerCase().includes(
          searchTerm.toLowerCase()
        );
        const keywordMatch = product.SP_KEYWORD.some((keyword) =>
          keyword.KW_TEN.toLowerCase().includes(searchTerm.toLowerCase())
        );
        return nameMatch || keywordMatch;
      });
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts([]);
    }
  }, [searchTerm, products]);

  const formatCurrency = (number) => {
    return number.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const addToCart = (itemId, sizeId, tableNumber, note, quantity) => {
    setCartItem((prev) => {
      const key = `${sizeId}-${tableNumber}-${note}`;
      const productCart = prev[itemId] || {};
      const existingItem = productCart[key] || { quantity: 0 };
      const newQuantity = existingItem.quantity + quantity;
      return {
        ...prev,
        [itemId]: {
          ...productCart,
          [key]: { ...existingItem, quantity: newQuantity },
        },
      };
    });
  };

  const fetchProduct = async () => {
    try {
      const response = await fetch("http://localhost:4000/products/allproduct");
      const data = await response.json();
      setProducts(data);
      setCartItem(getDefaultCart(data));
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };

  const fetchPromotions = async () => {
    try {
      const resp = await fetch("http://localhost:4000/promotes/get/all");
      const data = await resp.json();
      setPromotions(data);
    } catch (error) {
      console.error("Failed to fetch promotions");
    }
  };

  useEffect(() => {
    fetchProduct();
    fetchPromotions();
  }, []);

  const removeFromCart = (itemId, key) => {
    setCartItem((prev) => {
      const updatedCart = { ...prev };
      if (
        updatedCart[itemId] &&
        updatedCart[itemId][key] &&
        updatedCart[itemId][key].quantity > 0
      ) {
        updatedCart[itemId][key].quantity -= 1;
        if (updatedCart[itemId][key].quantity === 0) {
          delete updatedCart[itemId][key];
        }
      }
      return updatedCart;
    });
  };

  const getTotalItemsInCart = () => {
    let total = 0;
    for (let productId in cartItem) {
      for (let key in cartItem[productId]) {
        let quantity = parseInt(cartItem[productId][key].quantity);
        if (!isNaN(quantity)) {
          total += quantity;
        }
      }
    }
    return total;
  };

  const updateCartItem = (productId, key, quantity) => {
    setCartItem((prevCart) => {
      const productCart = { ...prevCart[productId] };
      if (productCart[key]) {
        if (quantity > 0) {
          productCart[key].quantity = quantity;
        } else {
          delete productCart[key];
        }
      }
      return {
        ...prevCart,
        [productId]: productCart,
      };
    });
  };

  const removeProductfromCart = (productId, itemKey) => {
    setCartItem((prevCart) => {
      const productCart = { ...prevCart[productId] };
      delete productCart[itemKey];

      if (Object.keys(productCart).length === 0) {
        const newCart = { ...prevCart };
        delete newCart[productId];
        return newCart;
      }

      return {
        ...prevCart,
        [productId]: productCart,
      };
    });
  };

  const clearCart = () => {
    setCartItem(getDefaultCart(products));
  };

  const clearSelectedTableID = () => {
    setSelectedTableID(null);
  };

  const contextValue = {
    getTotalItemsInCart,
    cartItem,
    removeFromCart,
    addToCart,
    products: filteredProducts.length > 0 ? filteredProducts : products,
    promotions,
    updateCartItem,
    removeProductfromCart,
    handleSearchChange,
    searchTerm,
    selectedTableID,
    setSelectedTableID,
    clearCart,
    clearSelectedTableID,
    formatCurrency,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
