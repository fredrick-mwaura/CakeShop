import React, {useContext} from "react"; 
import { useLocation, useParams } from "react-router-dom";
import Product from '../../components/utils/product';
import {toast} from "react-toastify"
// import './productView.css';  
// import AddToCart from "../AddToCart";
import { CartContext } from '../GlobalCart.jsx';
import Same from "../utils/same.jsx";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import './produc.css'


const ProductView = () => {
  const location = useLocation();
  const { productName } = useParams();
  const { addToCart } = useContext(CartContext);

  const productFromState = location.state?.product;
  const product = productFromState || Product.find(p => p.name.replace(/\s+/g, "-").toLowerCase() === productName);

  const handleAddToCart = () => {
    addToCart(product);
    toast.success(`${product.name} added to cart!`);
  }

  if (!product) {
    return <p>Product not found</p>;
  }

  return (
    <>
          <div className="product-details">
  <img src={product.src} alt={product.name} className="product-image" />

  <div className="product-info">
    <h3>{product.name}</h3>
    <p className="size">
      Size: <span>1kg</span>
    </p>
    <p>
      Availability: <span className="availability">In Stock</span>
    </p>
    <p className="price">Ksh: {product.price}</p>

    <div className="button-container">
      <button className="add-to-cart-btn" onClick={handleAddToCart}>
        Add To Cart
      </button>
      <button className="whatsapp-btn">WhatsApp</button>
    </div>

    <p className="note">
      *Sizes above 5kg available. Contact us to order.
    </p>
  </div>
</div>

<div className="product-description">
  <h2>Product Description</h2>
  <p>{product.description}</p>
</div>

          <TableContainer
                component={Paper}
                sx={{
                  maxWidth: '90%',
                  margin: 'auto',
                  mt: 3,
                  boxShadow: 3,
                  overflowX: 'auto',
                  textAlign: 'center',
                }}
              >
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell className="TableHead" sx={{ fontWeight: 'bold' }}>
                        Product Name
                      </TableCell>
                      <TableCell className="TableHead" sx={{ fontWeight: 'bold' }}>
                        Christmas fruit cake
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 'bold' }}>Sizes</TableCell>
                      <TableCell>1kg - 5kg</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 'bold' }}>Prices</TableCell>
                      <TableCell>Ksh. 2000 - Ksh. 10,000</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 'bold' }}>Availability</TableCell>
                      <TableCell>In stock</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 'bold' }}>Delivery</TableCell>
                      <TableCell>Home/office delivery Nairobi</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
          <div>
            <div className="containe">
              <div className="line"></div>
            <p>Customers Also Viewed These Cakes</p>
            <div className="line"></div>
            </div>
            <Same/>
          </div>
    </>

  );
};

export default ProductView;
