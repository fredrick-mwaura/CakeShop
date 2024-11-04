import { useContext } from 'react';
import { CartContext } from "../GlobalCart.jsx";
import '../../stylesheets/CartView.css';
import { toast } from "react-hot-toast";
import { useNavigate } from 'react-router-dom';

const CartView = () => {
    const { cart } = useContext(CartContext);
    const navigate = useNavigate();

    // Calculate the total price of all items in the cart
    const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

    const handleCheckout = () => {
        if (cart.length !== 0) {
            navigate('/order');
        } else {
            toast.error('Nothing is in your cart');
            setTimeout(() => {
                navigate('/birthday');
            }, 500);
        }
    };

    return (
        <div className="cart-view">
            {cart.length === 0 ? (
                <p className="empty-cart">Your cart is empty.</p>
            ) : (
                <div className="cart-items">
                    {cart.map((item) => (
                        <div className="cart-item" key={item.id}>
                            <img src={item.src} alt={item.name} className="cart-item-image" />
                            <div className="cart-item-details">
                                <h3>{item.name}</h3>
                                <p>Price: Ksh {item.price}</p>
                                <p>Quantity: {item.quantity}</p>
                                <p>Total: Ksh {item.price * item.quantity}</p>
                            </div>
                        </div>
                    ))}
                    <div className="cart-summary">
                        <h3>Cart Total: Ksh {totalPrice.toFixed(2)}</h3>
                        <button className="checkout-button" onClick={handleCheckout}>Place Order</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CartView;
