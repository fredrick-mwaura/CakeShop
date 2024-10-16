import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from './icon';
import { CartContext } from "./GlobalCart";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import '../stylesheets/Cart.css';
import { toast } from "react-hot-toast";

export default function AddToCart() {
  const { cart } = useContext(CartContext);
  const navigate = useNavigate();
  const [prevCart, setPrevCart] = useState(cart); // Track previous cart state

  const cartView = () => {
    navigate('/cart');
  };

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  // Log current cart for debugging
  console.log("Current Cart:", cart);

  useEffect(() => {
    // Check if any item has been added or updated in the cart
    const itemAdded = cart.length > prevCart.length ||
        cart.some((item, index) => item.quantity > (prevCart[index]?.quantity || 0));

    if (itemAdded) {
      toast.success('Product added to cart successfully');
    }

    // Update prevCart to current cart state
    setPrevCart(cart);
  }, [cart]); // Only depend on cart

  return (
      <div className="addTo">
        <Icon icon={faCartShopping} size="2x" color="black" className="Cart" onClick={cartView} />
        {totalItems > 0 && (
            <span className="badge">{totalItems}</span>
        )}
      </div>
  );
}