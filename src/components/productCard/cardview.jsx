import { useContext } from 'react';
import { CartContext } from "../GlobalCart.jsx";
import '../../stylesheets/CartView.css';

const CartView = () => {
    const { cart } = useContext(CartContext);

    // Calculate the total price of all items in the cart
    const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

    return (
        <div className="cart-view">
            <h2>Your Cart</h2>

            {cart.length === 0 ? (
                <p>Your cart is empty.</p>
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

                    <div className="cart-total">
                        <h3>Cart Total: Ksh {totalPrice.toFixed(2)}</h3>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CartView;
