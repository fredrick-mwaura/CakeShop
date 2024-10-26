import ProductCard from "./productCard/card";
// import '../stylesheets/birthday.css'
import Product from './utils/product'
import PropTypes from "prop-types";

const cakeProducts = [

];

const Cookie = ({ addToCart }) => {
  return (
    <>            
    <div className="title">Cookies</div>
      <div className="cake-grid">
        {Product.map((cake) => (
          <ProductCard
              key={cake.id}
              product={cake}
              addToCart={addToCart}
          />
        ))}
    </div>
    </>
  );
};
Cookie.propTypes = {
  addToCart: PropTypes.func,
};

export default Cookie;
