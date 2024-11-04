import React, { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types"
export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() =>{
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart): [];

});

  useEffect(() => {
 localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProductIndex = prevCart.findIndex(
        (item) => item.id === product.id
      );
      if (existingProductIndex !== -1) {
        const updatedCart = [...prevCart];
        updatedCart[existingProductIndex].quantity += 1;
        return updatedCart;
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }

    });
  };
  localStorage.removeItem('cart')

  return (
    <CartContext.Provider value={{ cart, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};

CartProvider.propTypes = {
    children: PropTypes.node.isRequired,

}

