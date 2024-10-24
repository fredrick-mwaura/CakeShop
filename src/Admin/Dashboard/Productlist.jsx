import React, { useState, useEffect } from "react";
import axios from "axios";
import './styles/productlist.css'; // import CSS styles

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: '', price: '', description: '', image: null });

  // Fetch products from the database
  useEffect(() => {
    axios.get('/api/products')
      .then(response => setProducts(response.data))
      .catch(error => console.log(error));
  }, []);

  // Handle input changes for adding a new product
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  // Handle image upload
  const handleImageUpload = (e) => {
    setNewProduct({ ...newProduct, image: e.target.files[0] });
  };

  // Add a new product
  const handleAddProduct = () => {
    const formData = new FormData();
    formData.append('name', newProduct.name);
    formData.append('price', newProduct.price);
    formData.append('description', newProduct.description);
    formData.append('image', newProduct.image);

    axios.post('/api/products', formData)
      .then(response => {
        setProducts([...products, response.data]);
        setNewProduct({ name: '', price: '', description: '', image: null }); // Reset form
      })
      .catch(error => console.log(error));
  };

  // Delete a product
  const handleDeleteProduct = (productId) => {
    axios.delete(`/api/products/${productId}`)
      .then(() => {
        setProducts(products.filter(product => product.id !== productId));
      })
      .catch(error => console.log(error));
  };

  return (
    <div className="product-list">
      <h2>Product List</h2>
      
      {/* New Product Form */}
      <div className="new-product-form">
        <h3>Add New Product</h3>
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={newProduct.name}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="price"
          placeholder="Price"
          value={newProduct.price}
          onChange={handleInputChange}
        />
        <textarea
          name="description"
          placeholder="Description"
          value={newProduct.description}
          onChange={handleInputChange}
        />
        <input type="file" onChange={handleImageUpload} />
        <button onClick={handleAddProduct}>Add Product</button>
      </div>

      {/* Product Display */}
      <div className="products">
        {products.map(product => (
          <div key={product.id} className="product-card">
            <img src={product.image_url} alt={product.name} className="product-image" />
            <h4>{product.name}</h4>
            <p>{product.description}</p>
            <p><strong>Price:</strong> Ksh {product.price}</p>
            <button onClick={() => handleDeleteProduct(product.id)} className="delete-btn">Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
