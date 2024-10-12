// import React from 'react'
import { useContext } from 'react';
import Icon from './icon';
import { CartContext } from "./GlobalCart";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import '../stylesheets/Cart.css'


export default function AddToCart() {
  const { cart } = useContext(CartContext);
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0) || 0;
        console.log(cart);

  return (
    <div className="addTo">
      <Icon icon={faCartShopping} size="2x" color="black" className="Cart" />
        {totalItems > 0 && (
      <span className="badge">{totalItems}</span>
        )}

    </div>
  );
}
