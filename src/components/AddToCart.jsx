import {useContext, useEffect} from 'react';
import {useNavigate} from 'react-router-dom'
import Icon from './icon';
import { CartContext } from "./GlobalCart";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import '../stylesheets/Cart.css'
import {toast} from "react-hot-toast";


export default function AddToCart() {
  const { cart } = useContext(CartContext);
  const navigate = useNavigate();

  const cartView = () => {
    navigate('/cart')
  }

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  console.log(cart);

  useEffect(() => {
    if(cart.length > 0){
      toast.success("product added to cart successfully")
    }
  }, [cart]);

  return (
    <div className="addTo">
      <Icon icon={faCartShopping} size="2x" color="black" className="Cart" onClick={cartView}/>
        {totalItems > 0 && (
      <span className="badge">{totalItems}</span>
        )}

    </div>
  );
}
