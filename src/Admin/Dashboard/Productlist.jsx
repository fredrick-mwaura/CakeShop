import React, { useState } from 'react';
import './styles/productlist.css';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: '', price: '' });

  // Handle input changes for new product form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  // Add a new product
  const addProduct = (e) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.price) {
      alert('Please provide both product name and price');
      return;
    }

    setProducts((prevProducts) => [
      ...prevProducts,
      { ...newProduct, id: Date.now() }, // Add unique ID based on timestamp
    ]);

    setNewProduct({ name: '', price: '' }); // Reset the form
  };

  // Delete a product
  const deleteProduct = (id) => {
    setProducts((prevProducts) => prevProducts.filter((product) => product.id !== id));
  };

  return (
    <div className="product-management">
      <h2>Product Management</h2>

      <form onSubmit={addProduct} className="add-product-form">
        <div className="form-group">
          <label>Product Name:</label>
          <input
            type="text"
            name="name"
            value={newProduct.name}
            onChange={handleInputChange}
            placeholder="Enter product name"
          />
        </div>
        <div className="form-group">
          <label>Product Price:</label>
          <input
            type="number"
            name="price"
            value={newProduct.price}
            onChange={handleInputChange}
            placeholder="Enter product price"
          />
        </div>
        <button type="submit">Add Product</button>
      </form>

      <h3>Current Products</h3>
      {products.length > 0 ? (
        <ul className="product-list">
          {products.map((product) => (
            <li key={product.id}>
              {product.name} - ${product.price}
              <button onClick={() => deleteProduct(product.id)}>Delete</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No products available.</p>
      )}
    </div>
  );
};

export default ProductList;
