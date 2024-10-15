import {useContext, useState} from 'react';
import { CartContext } from "../GlobalCart.jsx";
import '../../stylesheets/CartView.css';
// import Navbar from '../Header.jsx'
import {useNavigate} from 'react-router-dom';

const CartView = () => {
    const { cart } = useContext(CartContext);
    const navigate = useNavigate();
    const [quantity, setQuantity] = useState(cart.length)


    // Calculate the total price of all items in the cart
    const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);
    const Checkout=()=>{
        navigate('/order')

    }


    const increaseQuantity = () => {
        setQuantity(prevQuantity => prevQuantity + 1);
    };

    const decreaseQuantity = () => {
        setQuantity(prevQuantity => (prevQuantity > 1 ? prevQuantity - 1 : 1)); // Prevent going below 1
    };

    return (
        <>
            <div className="cart-view">
                {/*<Navbar/>*/}
                {/*<h2>Your cart</h2>*/}
                {cart.length === 0 ? (
                    <p>Your cart is empty.</p>
                ) : (
                    <div className="cart-items">
                        {cart.map((item) => (
                            <div className="cart-item" key={item.id}>
                                <img src={item.src} alt={item.name} className="cart-item-image"/>
                                <div className="cart-item-details">
                                    <h3>{item.name}</h3>
                                    <p>Price: Ksh {item.price}</p>
                                    <p>Quantity: {item.quantity}</p>
                                    <p>Total: Ksh {item.price * item.quantity}</p>
                                </div>
                                <div className="flex items-center mt-4">
                                    <button onClick={decreaseQuantity}
                                            className="bg-gray-300 text-black py-1 px-2 rounded">
                                        -
                                    </button>
                                    <span className="mx-2">{quantity}</span>
                                    <button onClick={increaseQuantity}
                                            className="bg-gray-300 text-black py-1 px-2 rounded">
                                        +
                                    </button>
                                </div>
                            </div>
                        ))}

                        <div className="cart-total">
                            <h3>Cart Total: Ksh {totalPrice.toFixed()}</h3>
                        </div>
                    </div>
                )}
            </div>
            <button className='checkout' onClick={Checkout}>place order</button>
        </>
    );
};

export default CartView;
