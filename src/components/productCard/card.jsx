import {
  faEye,
  faCartPlus,
} from "@fortawesome/free-solid-svg-icons";
import './product.css'
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import Icon from '../icon'
import { useState, useContext } from "react";
// import AddToCart from "../AddToCart.jsx";
import PropTypes from "prop-types";
// import {Product} from '../BirthDay.jsx'
import {useNavigate} from "react-router-dom";
import {CartContext} from '../GlobalCart.jsx';

const ProductCard = ({ product }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();
  const {addToCart} = useContext(CartContext);

  // Function to open WhatsApp with a pre-filled message
  const shareOnWhatsApp = () => {
    const message = `Check out this product: ${product.name} for Ksh ${product.price}`;
    const url = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  // Function to toggle product preview modal
  const toggleModal = () => {
    setModalOpen(!isModalOpen);
  };

  const ProductView = () =>{
    const urlProduct = product.name.replace(/\s+/g, "-").toLowerCase();
    navigate(`product-view/${urlProduct}`)
  }

  return (
      <div className="product-card">
        <img src={product.src} alt={product.name} className="product-image" />
        <h3>{product.name}</h3>
        <p>{`Ksh ${product.price}`}</p>
        <div className="product-actions">
          {/* WhatsApp Share */}
          <Icon
              icon={faWhatsapp}
              size="lg"
              className="icon"
              onClick={shareOnWhatsApp}
          />

          {/* Product Preview Modal */}
          <Icon icon={faEye} size="lg" className="icon" onClick={ProductView} />

          {/* Add to Cart */}
          <Icon
              icon={faCartPlus}
              size="lg"
              className="icon"
            onClick={() => addToCart(product)}
          />
        </div>

        {/* Modal for product preview  */}
        {isModalOpen && (
            <div className="modal">
              <div className="modal-content">
            <span className="close" onClick={toggleModal}>
              &times;
            </span>
                <img src={product.src} alt={product.name} className="modal-image" />
                <h3>{product.name}</h3>
                <p>{`Ksh ${product.price}`}</p>
                <p>{product.description}</p>
              </div>
            </div>
        )}
      </div>
  );
};
ProductCard.propTypes = {
  product: PropTypes.shape({
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    src: PropTypes.string.isRequired,
    description: PropTypes.string, // Optional
  }).isRequired,
  addToCart: PropTypes.func.isRequired,
};

export default ProductCard;