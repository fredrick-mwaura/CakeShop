import React, { useContext } from "react";
import { useLocation, useParams } from "react-router-dom";
import Product from '../../components/utils/product';
import { toast } from "react-toastify";
import { CartContext } from '../GlobalCart.jsx';
import Same from "../utils/same.jsx";
import './produc.css'; // You can keep this if you have custom styles not related to MUI

const ProductView = () => {
  const location = useLocation();
  const { productName } = useParams();
  const { addToCart } = useContext(CartContext);

  const productFromState = location.state?.product;
  const product = productFromState || Product.find(p =>
    p.name.replace(/\s+/g, "-").toLowerCase() === productName
  );

  const handleAddToCart = () => {
    addToCart(product);
    toast.success(`${product.name} added to cart!`);
  };

  if (!product) {
    return <p className="text-center mt-10">Product not found</p>;
  }

  return (
    <>
      <div className="max-w-5xl mx-auto my-8 p-4 bg-white shadow-md rounded-lg flex flex-col md:flex-row gap-6">
        <img
          src={product.src}
          alt={product.name}
          className="w-full md:w-1/2 object-cover rounded-lg"
        />

        <div className="flex-1">
          <h3 className="text-2xl font-bold mb-2">{product.name}</h3>
          <p className="text-gray-700 mb-1">Size: <span className="font-medium">1kg</span></p>
          <p className="text-gray-700 mb-1">
            Availability: <span className="text-green-600 font-medium">In Stock</span>
          </p>
          <p className="text-xl font-semibold text-red-600 mb-4">Ksh: {product.price}</p>

          <div className="flex gap-4 mb-4">
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
              onClick={handleAddToCart}
            >
              Add To Cart
            </button>
            <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded">
              WhatsApp
            </button>
          </div>

          <p className="text-sm italic text-gray-600">
            *Sizes above 5kg available. Contact us to order.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 my-6">
        <h2 className="text-2xl font-bold mb-2">Product Description</h2>
        <p className="text-gray-700">{product.description}</p>
      </div>

      <div className="max-w-5xl mx-auto px-4 my-8 overflow-x-auto">
        <table className="min-w-full border border-gray-200 text-center">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4 border-b font-semibold">Product Name</th>
              <th className="py-2 px-4 border-b font-semibold">Christmas fruit cake</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="py-2 px-4 border-b font-medium">Sizes</td>
              <td className="py-2 px-4 border-b">1kg - 5kg</td>
            </tr>
            <tr>
              <td className="py-2 px-4 border-b font-medium">Prices</td>
              <td className="py-2 px-4 border-b">Ksh. 2000 - Ksh. 10,000</td>
            </tr>
            <tr>
              <td className="py-2 px-4 border-b font-medium">Availability</td>
              <td className="py-2 px-4 border-b">In stock</td>
            </tr>
            <tr>
              <td className="py-2 px-4 font-medium">Delivery</td>
              <td className="py-2 px-4">Home/office delivery Nairobi</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="text-center my-10">
        <div className="flex items-center justify-center gap-4 mb-4">
          <div className="w-24 h-px bg-gray-300" />
          <p className="text-lg font-medium">Customers Also Viewed These Cakes</p>
          <div className="w-24 h-px bg-gray-300" />
        </div>
        <Same />
      </div>
    </>
  );
};

export default ProductView;