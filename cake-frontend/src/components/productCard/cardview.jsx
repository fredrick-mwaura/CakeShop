import { useContext, useState } from 'react';
import { CartContext } from "../GlobalCart.jsx";
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
import EmptyCart from '../utils/emptyCart';
import '../../stylesheets/CartView.css';
import { AuthContext } from "../contexts/AuthContext";

const CartView = () => {
  const { userr } = useContext(AuthContext);
  const [user, setUser] = useState(null);
  const { cart, setCart } = useContext(CartContext);
  const navigate = useNavigate();

  const calculateTotalPrice = (cartItems) =>
    cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const [totalPrice, setTotalPrice] = useState(calculateTotalPrice(cart));

  const handleQuantityChange = (id, change) => {
    const updatedCart = cart.map((item) => {
      if (item.id === id) {
        const newQuantity = item.quantity + change;
        if (newQuantity < 1) return item;
        return { ...item, quantity: newQuantity };
      }
      return item;
    }).filter(item => item.quantity > 0);

    setCart(updatedCart);
    setTotalPrice(calculateTotalPrice(updatedCart));
  };

  const handleCheckout = () => {
    if (userr) {
      if (cart.length !== 0) {
        navigate('/client/order');
      } else {
        toast.warn('Nothing is in your cart please add something to order!');
        setTimeout(() => {
          navigate('/client/birthday');
        }, 300);
      }
    } else {
      toast.info('Login to place order');
      navigate('/client/login');
    }
  };

  return (
    <div className="max-w-4xl mx-auto my-10 px-4">
      {cart.length === 0 ? (
        <EmptyCart />
      ) : (
        <div>
          <h2 className="text-3xl font-semibold text-center mb-6">Your Cart</h2>

          <div className="space-y-4">
            {cart.map((item) => (
              <div key={item.id} className="flex items-center bg-white shadow-md rounded-lg overflow-hidden">
                <img
                  src={item.src}
                  alt={item.name}
                  className="w-32 h-32 object-cover"
                />
                <div className="flex-1 p-4">
                  <h3 className="text-lg font-semibold">{item.name}</h3>
                  <p className="text-gray-600">Price: Ksh {item.price.toFixed(2)}</p>
                  <p className="text-gray-600">Total: Ksh {(item.price * item.quantity).toFixed(2)}</p>
                </div>
                <div className="flex items-center space-x-2 mr-4">
                  <button
                    onClick={() => handleQuantityChange(item.id, -1)}
                    className="w-8 h-8 rounded-full bg-blue-500 text-white text-lg hover:bg-blue-600"
                  >
                    -
                  </button>
                  <span className="text-lg">{item.quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(item.id, 1)}
                    className="w-8 h-8 rounded-full bg-blue-500 text-white text-lg hover:bg-blue-600"
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t my-8"></div>

          <div className="flex justify-between items-center">
            <p className="text-xl font-semibold">Cart Total: Ksh {totalPrice.toFixed(2)}</p>
            <button
              onClick={handleCheckout}
              className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.2 6.4a1 1 0 001 1.2h12.6M7 13h0" />
              </svg>
              Place Order
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartView;