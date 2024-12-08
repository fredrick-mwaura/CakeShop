import React from "react";
import '../stylesheets/birthday.css';
import Product from "./utils/product";
import ProductCard from "./productCard/card";

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
