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
    name: "Gluten Free Chocolate",
    price: 3500,
    src: Cake1,
  },
  {
    name: "Naked Chocolate",
    price: 3500,
    src: Cake5,
  },
  {
    name: "Orange Almond",
    price: 4200,
    src: Cake3,
  },
  {
    name: "Gluten Free Chocolate",
    price: 3500,
    src: Cake4,
  },
  {
    name: "Naked Chocolate",
    price: 2000,
    src: Cake6,
  },
  {
    name: "Orange Almond",
    price: 4200,
    src: Cake5,
  },
  {
    name: "Gluten Free Chocolate",
    price: 1000,
    src: Cake1,
  },
  {
    name: "Naked Chocolate",
    price: 3500,
    src: Cake3,
    },
  {
    name: "Orange Almond",
    price: 4200,
    src: Cake4,
  },
  {
    name: "Gluten Free Chocolate",
    price: 1200,
    src: Cake1,
  },
  {
    name: "Naked Chocolate",
    price: 3000,
    src: "https://ke.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/72/6737701/1.jpg?2184",
  },
  {
    name: "Orange Almond",
    price: 4200,
    src: Cake3,
  },
  {
    name: "Gluten Free Chocolate",
    price: 3500,
    src: Cake1,
  },
  {
    name: "Naked Chocolate",
    price: 3500,
    src: "https://ke.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/72/6737701/1.jpg?2184",
  },
  {
    name: "Orange Almond",
    price: 4200,
    src: Cake3,
  },
  {
    name: "Gluten Free Chocolate",
    price: 3500,
    src: Cake1,
  },
  {
    name: "Naked Chocolate",
    price: 3500,
    src: "https://ke.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/72/6737701/1.jpg?2184",
  },
  {
    name: "Orange Almond",
    price: 4200,
    src: Cake3,
  },
  {
    name: "Gluten Free Chocolate",
    price: 3500,
    src: Cake1,
  },
  {
    name: "Naked Chocolate",
    price: 3500,
    src: "https://ke.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/72/6737701/1.jpg?2184",
  },
  {
    name: "Orange Almond",
    price: 4200,
    src: Cake3,
  },
  {
    name: "Gluten Free Chocolate",
    price: 3500,
    src: Cake1,
  },
  {
    name: "Naked Chocolate",
    price: 3500,
    src: "https://ke.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/72/6737701/1.jpg?2184",
  },
  {
    name: "Orange Almond",
    price: 4200,
    src: Cake3,
  },
  {
    name: "Gluten Free Chocolate",
    price: 3500,
    src: Cake1,
  },
  {
    name: "Naked Chocolate",
    price: 3500,
    src: "https://ke.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/72/6737701/1.jpg?2184",
  },
  {
    name: "Orange Almond",
    price: 4200,
    src: Cake3,
  },
  {
    name: "Gluten Free Chocolate",
    price: 3500,
    src: Cake1,
  },
  {
    name: "Naked Chocolate",
    price: 3500,
    src: "https://ke.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/72/6737701/1.jpg?2184",
  },
  {
    name: "Orange Almond",
    price: 4200,
    src: Cake3,
  },
  {
    name: "Gluten Free Chocolate",
    price: 3500,
    src: Cake1,
  },
  {
    name: "Naked Chocolate",
    price: 3500,
    src: "https://ke.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/72/6737701/1.jpg?2184",
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
