 import {useContext, useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom'
import Icon from './icon';
import { CartContext } from "./GlobalCart";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import '../stylesheets/Cart.css'
import {toast} from "react-hot-toast";


export default function AddToCart() {
  const { cart } = useContext(CartContext);
  const navigate = useNavigate();
  const [prevCartLength, setPrevCartLength] = useState(cart.length);
  // const [productAdded, setProductAdded] = useState(false);

  const cartView = () => {
    navigate('/cart')
  }

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  console.log(cart);
  useEffect(()=> {
    const itemAdded = cart.length > prevCartLength.length ||
        cart.some((item, index) => item.quantity > (prevCartLength[index]?.quantity || 0));

    if (itemAdded) {
      toast.success('Product added to cart successfully');
    }
    setPrevCartLength(cart);
  },[cart, prevCartLength])

  return (
    <div className="addTo">
      <Icon icon={faCartShopping} size="2x" color="black" className="Cart" onClick={cartView}/>
        {totalItems > 0 && (
      <span className="badge">{totalItems}</span>
        )}

    </div>
  );
}
