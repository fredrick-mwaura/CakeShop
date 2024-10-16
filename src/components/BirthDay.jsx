import '../stylesheets/birthday.css';
import Cake1 from '../images/cake.webp';
import Cake3 from "../images/1.jpg";
import Cake4 from "../images/2.jpg";
import Cake5 from "../images/3.jpg";
import Cake6 from "../images/4.jpg";
// import Footer from './footer'
import ProductCard from "./productCard/card.jsx";

// Array with cake details
const Product = [
  {
    id:1,
    name: "Gluten Free Chocolate",
    price: 3500,
    src: Cake1,
    description: 'Perfect for a morning pick-me-up or an afternoon break.'
  },
  {
    id: 2,
    name: "Naked Chocolate",
    price: 3500,
    src: Cake5,
    description: 'Perfect for a morning pick-me-up or an afternoon break.'
  },
  {
    id:3,
    name: "Orange Almond",
    price: 4200,
    src: Cake3,
    description: 'Perfect for a morning pick-me-up or an afternoon break.'
  },
  {
    id:4,
    name: "Gluten Free Chocolate",
    price: 3500,
    src: Cake4,
    description: 'Perfect for a morning pick-me-up or an afternoon break.'
  },
  {
    id:5,
    name: "Naked Chocolate",
    price: 2000,
    src: Cake6,
    description: 'Perfect for a morning pick-me-up or an afternoon break.'
  },
  {
    id:6,
    name: "Orange Almond",
    price: 4200,
    src: Cake5,
    description: 'Perfect for a morning pick-me-up or an afternoon break.'
  },
  {
    id:7,
    name: "Gluten Free Chocolate",
    price: 1000,
    src: Cake1,
    description: 'Perfect for a morning pick-me-up or an afternoon break.'
  },
  {
    id:8,
    name: "Naked Chocolate",
    price: 3500,
    src: Cake3,
    description: 'Perfect for a morning pick-me-up or an afternoon break.'
    },
  {
    id:9,
    name: "Orange Almond",
    price: 4200,
    src: Cake4,
    description: 'Perfect for a morning pick-me-up or an afternoon break.'
  },
  {
    id:10,
    name: "Gluten Free Chocolate",
    price: 1200,
    src: Cake1,
    description: 'Perfect for a morning pick-me-up or an afternoon break.'
  },
  {
    id:12,
    name: "Orange Almond",
    price: 4200,
    src: Cake3,
    description: 'Perfect for a morning pick-me-up or an afternoon break.'
  },
  {
    id:13,
    name: "Gluten Free Chocolate",
    price: 3500,
    src: Cake1,
    description: 'Perfect for a morning pick-me-up or an afternoon break.'
  },

  {
    id:16,
    name: "Orange Almond",
    price: 4200,
    src: Cake3,
    description: 'Perfect for a morning pick-me-up or an afternoon break.'
  },
  {
    id:17,
    name: "Gluten Free Chocolate",
    price: 3500,
    src: Cake1,
    description: 'Perfect for a morning pick-me-up or an afternoon break.'
  },

];
const BirthDay = (addToCart) => {
  return (
    <>
      <div className="cake-grid">
        {Product.map((cake, index) => (
          <ProductCard key={index}
          product={cake}
          addToCart={addToCart}
          />
          ))}
      </div>
        {/*<Footer />*/}
    </>
  );
};

export default BirthDay;
