import React from "react";
import '../stylesheets/birthday.css';
import Product from "./utils/BirthDayProduct";
import ProductCard from "./productCard/card.jsx";

// BirthDay Component
const BirthDay = ({ addToCart }) => {
    return (
        <>
            <div className="title">BirthDay Cakes</div>
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

export default BirthDay;
