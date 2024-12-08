import React, { useState, useEffect } from "react";
import ProductCard from "../productCard/card";
import Product from "../utils/product"; // Adjust the path to match your project structure

const BirthDay = ({ addToCart }) => {
  const [randomProducts, setRandomProducts] = useState([]);

  useEffect(() => {
    const pickedProducts = getRandomProducts(Product, 5); // Get 5 random products
    setRandomProducts(pickedProducts);
  }, []);
  // console.log("Loaded products:", Product);


  return (
    <div className="cake-grid">
      {randomProducts.map((product) => (
        <ProductCard key={product.id} product={product} addToCart={addToCart} />
      ))}
    </div>
  );
};

// Function to get random products
const getRandomProducts = (products, count) => {
  if (count > products.length) return [...products];
  const shuffled = [...products].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

export default BirthDay;
