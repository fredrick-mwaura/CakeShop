import PropTypes from "prop-types";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { faCartPlus, faEye } from "@fortawesome/free-solid-svg-icons";
import Icon from "../icon";
import "../..//stylesheets/product.css";

const ProductCard = ({ product, addToCart }) => {
  return (
    <div className="product-card">
      <img src={product.src} alt={product.name} className="product-image" />
      <h3>{product.name}</h3>
      <p>{`Ksh ${product.price}`}</p>
      <div className="product-actions">
        <Icon icon={faWhatsapp} size="lg" className="icon" />
        <Icon icon={faEye} size="lg" className="icon" />
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
  }).isRequired,
  addToCart: PropTypes.func.isRequired,
};

export default ProductCard;
