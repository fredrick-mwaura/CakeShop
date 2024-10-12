import ProductCard from "./productCard/card";
import Cake1 from "../images/1.jpg";
import Cake2 from "../images/2.jpg";
import Cake3 from "../images/3.jpg";
import '../stylesheets/birthday.css'
import PropTypes from "prop-types";

const cakeProducts = [
  { name: "Gluten Chocolate Cake", price: 5800, src: Cake1 },
  { name: "Naked Chocolate Cake", price: 4000, src: Cake2 },
  { name: "Orange Almond Cake", price: 4200, src: Cake3 },
  { name: "Gluten Chocolate Cake", price: 5800, src: Cake1 },
  { name: "Naked Chocolate Cake", price: 4000, src: Cake2 },
  { name: "Orange Almond Cake", price: 4200, src: Cake3 },
  { name: "Gluten Chocolate Cake", price: 5800, src: Cake1 },
  { name: "Naked Chocolate Cake", price: 4000, src: Cake2 },
  { name: "Orange Almond Cake", price: 4200, src: Cake3 },
  { name: "Gluten Chocolate Cake", price: 5800, src: Cake1 },
  { name: "Naked Chocolate Cake", price: 4000, src: Cake2 },
  { name: "Orange Almond Cake", price: 4200, src: Cake3 },
];

const Cookie = ({ addToCart }) => {
  return (
    <div className="cake-grid">
      {cakeProducts.map((product, index) => (
        <ProductCard key={index} 
        product={product} 
        addToCart={addToCart} 
        />
      ))}
    </div>
  );
};
Cookie.propTypes = {
  addToCart: PropTypes.func,
};

export default Cookie;
