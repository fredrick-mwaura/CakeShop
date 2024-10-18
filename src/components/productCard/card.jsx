import {
  faEye,
  faCartPlus,
} from "@fortawesome/free-solid-svg-icons";
import './product.css';
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import Icon from '../icon';
import { useContext } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { CartContext } from '../GlobalCart.jsx';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);

  // Function to open WhatsApp with a pre-filled message
const shareOnWhatsApp = () => {
  // Create the product URL using the same logic as in viewProductDetails
  const urlProduct = product.name.replace(/\s+/g, "-").toLowerCase();
  const productUrl = `http://localhost:5173/product-view/${urlProduct}`; // Replace with actual domain
  
  const message = `Check out this product: ${product.name} for Ksh ${product.price}. More details here: ${productUrl}`;
  const url = `https://wa.me/?text=${encodeURIComponent(message)}`;
  
  window.open(url, "_blank");
};


  const viewProductDetails = () => {
    const urlProduct = product.name.replace(/\s+/g, "-").toLowerCase();
    navigate(`/product-view/${urlProduct}`, { state: { product } });
  };

  return (
    <div className="product-card">
      <img src={product.src} alt={product.name} className="product-image" />
      <h3>{product.name}</h3>
      <p>{`Ksh ${product.price}`}</p>
      <div className="product-actions">
        <Icon
          icon={faWhatsapp}
          size="lg"
          className="icon"
          onClick={shareOnWhatsApp}
        />

        {/* Product Details */}
        <Icon icon={faEye} size="lg" className="icon" onClick={viewProductDetails} />

        {/* Add to Cart */}
        <Icon
          icon={faCartPlus}
          size="lg"
          className="icon"
          onClick={() => addToCart(product)}
        />
      </div>
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
  addToCart: PropTypes.func.isRequired,
};

export default ProductCard;
