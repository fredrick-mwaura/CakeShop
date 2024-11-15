import React, { useContext } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { faEye, faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import Icon from '../icon';
import { CartContext } from '../GlobalCart.jsx';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './product.css';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);

  // Function to open WhatsApp with a pre-filled message
  const shareOnWhatsApp = () => {
    const urlProduct = product.name.replace(/\s+/g, "-").toLowerCase();
    const productUrl = `http://localhost:5173/client/product-view/${urlProduct}`;
    
    const message = `Check out this product: ${product.name} for Ksh ${product.price}. More details here: ${productUrl}`;
    const url = `https://wa.me/?text=${encodeURIComponent(message)}`;
    
    window.open(url, "_blank");
  };

  const viewProductDetails = () => {
    const urlProduct = product.name.replace(/\s+/g, "-").toLowerCase();
    navigate(`/client/product-view/${urlProduct}`, { state: { product } });
  };

  const handleAddToCart = () => {
    addToCart(product);
    // toast("done")
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <div className="product-card">
      <img src={product.src} alt={product.name} className="product-image" />
      <h3>{product.name}</h3>
      <p>{`Ksh ${product.price}`}</p>
      <div className="product-actions">
        <Icon icon={faWhatsapp} size="lg" className="icon" onClick={shareOnWhatsApp} />

        {/* Product Details */}
        <Icon icon={faEye} size="lg" className="icon" onClick={viewProductDetails} />

        {/* Add to Cart */}
        <Icon
          icon={faCartPlus}
          size="lg"
          className="icon"
          onClick={handleAddToCart}
        />
      </div>

      {/* Toast Container */}
      {/* <ToastContainer position="top-right" autoClose={2000} hideProgressBar={false} /> */}
    </div>
  );
};

ProductCard.propTypes = {
  product: PropTypes.shape({
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    src: PropTypes.string.isRequired,
    description: PropTypes.string,
  }).isRequired,
};

export default ProductCard;
