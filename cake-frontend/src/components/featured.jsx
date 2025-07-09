import { useContext } from "react";
import PropTypes from "prop-types"; // Import PropTypes
import { CartContext } from "./GlobalCart"; // Import CartContex
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import Icon from "./icon";
import Footer from "./footer";
import "../stylesheets/birthday.css";
import Cake1 from "../images/cake.webp";
import Cake3 from "../images/1.jpg";
import Cake4 from "../images/2.jpg";
import Cake5 from "../images/3.jpg";
import Cake6 from "../images/4.jpg";

// Array with cake details
const Product = [
  {
    name: "Gluten Free Chocolate Cake",
    priceRange: [700, 1000],
    src: Cake1,
  },
  {
    name: "Naked Chocolate Cake",
    priceRange: [3000, 3500],
    src: Cake5,
  },
  {
    name: "Orange Almond Cake",
    price: 4200,
    src: Cake3,
  },
  {
    name: "Gluten Free Chocolate Cake",
    priceRange: [700, 1000],
    src: Cake4,
  },
  {
    name: "Naked Chocolate Cake",
    priceRange: [1500, 2000],
    src: Cake6,
  },
  {
    name: "Orange Almond Cake",
    price: 4200,
    src: Cake5,
  },
  {
    name: "Gluten Free Chocolate Cake",
    priceRange: [700, 1000],
    src: Cake1,
  },
]
// Card component to display each cake
const Birthday = ({ cake }) => {
  const { addToCart } = useContext(CartContext); // Access the addToCart function from the context

  return (
    <div className="cake-card">
      <img src={cake.src} alt={cake.name} className="cake-image" />
      <h3>{cake.name}</h3>
      <p>
        {Array.isArray(cake.priceRange)
          ? `Ksh ${cake.priceRange[0]} - ${cake.priceRange[1]}`
          : `Ksh ${cake.price}`}
      </p>
      <div className="Icon">
        <Icon icon={faWhatsapp} size="1.5x" color="black" className="chatty" />
        <Icon icon={faEye} size="1.5x" color="black" className="chatty" />
        <Icon
          icon={faCartPlus}
          size="1.5x"
          color="black"
          className="chatty"
          onClick={() => addToCart(cake)}
        />
      </div>
    </div>
  );
};

Birthday.propTypes = {
  cake: PropTypes.shape({
    name: PropTypes.string.isRequired,
    price: PropTypes.number,
    priceRange: PropTypes.arrayOf(PropTypes.number),
    src: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  }).isRequired,
};

// Main Component
const BirthDay = () => {
  return (
    <>
      <div className="cake-grid">
        {Product.map((cake, index) => (
          <Birthday key={index} cake={cake} />
        ))}
      </div>
      <div>
        <Footer />
      </div>
    </>
  );
};

export default BirthDay;
