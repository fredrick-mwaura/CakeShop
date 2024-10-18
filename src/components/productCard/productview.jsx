import React, {useContext} from "react";
import { useLocation, useParams } from "react-router-dom";
import Product from '../../components/utils/product';
import './productView.css';  // Import the CSS file
// import AddToCart from "../AddToCart";
import { CartContext } from '../GlobalCart.jsx';

const ProductView = () => {
  const location = useLocation();
  const { productName } = useParams();
  const { addToCart } = useContext(CartContext);

  const productFromState = location.state?.product;
  const product = productFromState || Product.find(p => p.name.replace(/\s+/g, "-").toLowerCase() === productName);

  const handleAddToCart = () => {
    addToCart(product);
  }

  if (!product) {
    return <p>Product not found</p>;
  }

  return (
    <>
          <div className="product-details">
            <img src={product.src} alt={product.name} className="product-image" />
            
            <div className="product-info">
              <h3>{product.name}</h3>
              <p className="size">size <span>1kg</span></p>
              <p className="availability">In Stock</p>
              <p className="price">Ksh: {product.price}</p>

              <div className="button-container">
                <button className="add-to-cart-btn" onClick={handleAddToCart}>Add To Cart</button>
                <button className="whatsapp-btn">WhatsApp</button>
              </div>
              
              <p className="note">
                *Sizes above 5kg available. Contact us to order.
              </p>
            </div>
          </div>

          <div className="product-description">
            <h4>Product Description</h4>
            <p>{product.description}</p>
          </div>
    </>

  );
};

export default ProductView;
