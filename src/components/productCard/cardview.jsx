import { Children, useContext, useState } from 'react';
import { CartContext } from "../GlobalCart.jsx";
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  Divider,
  Stack,
  IconButton,
  Typography,
} from '@mui/material';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
// import emptyCart from '../../images/empty_cart.svg'
// import Images from '../image.jsx';
import EmptyCart from '../utils/emptyCart'
import '../../stylesheets/CartView.css'
import { AuthContext } from "../contexts/AuthContext";

const CartView = () => {
  const { userr } = useContext(AuthContext); 
  const [user, setUser] = useState(null);
  const { cart, setCart } = useContext(CartContext); // Assume setCart allows updating the cart directly
  const navigate = useNavigate();

  // Calculate the total price
  const calculateTotalPrice = (cartItems) =>
    cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const [totalPrice, setTotalPrice] = useState(calculateTotalPrice(cart));

  // Update item quantity
  const handleQuantityChange = (id, change) => {
    const updatedCart = cart.map((item) => {
      if (item.id === id) {
        const newQuantity = item.quantity + change;
        if (newQuantity < 1) return item; // Prevent quantity from going below 1
        return { ...item, quantity: newQuantity };
      }
      return item;
    }).filter(item => item.quantity > 0); // Remove items with quantity 0

    setCart(updatedCart); // Update the cart in the context
    setTotalPrice(calculateTotalPrice(updatedCart)); // Update total price
  };

  const handleCheckout = () => {

    if(userr){
    if (cart.length !== 0) {
      navigate('/client/order');
    } else {
      toast.warn('Nothing is in your cart please add something to order!');
      setTimeout(() => {
        navigate('/client/birthday');
      }, 300);
    }
  }
  else{
    toast.info('login to place order')
    navigate('/client/login')
  }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      {cart.length === 0 ? (

        <EmptyCart />
        
      ) : (
        <Box>
          <Typography variant="h4" textAlign="center" gutterBottom>
            Your Cart
          </Typography>

          <Stack container spacing={2} sx={{ mt: 2 }}>
            {cart.map((item) => (
              <Stack item xs={12} key={item.id}>
                <Card sx={{ display: 'flex', boxShadow: 3 }}>
                  <CardMedia
                    component="img"
                    sx={{ width: 120 }}
                    image={item.src}
                    alt={item.name}
                  />
                  <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                    <CardContent>
                      <Typography variant="h6">{item.name}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        Price: Ksh {item.price.toFixed(2)}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Total: Ksh {(item.price * item.quantity).toFixed(2)}
                      </Typography>
                    </CardContent>
                    <Box sx={{ ml: 'auto', display: 'flex', alignItems: 'center', mr: 2 }}>
                      <IconButton
                        color="primary"
                        onClick={() => handleQuantityChange(item.id, -1)}
                      >
                        <RemoveIcon />
                      </IconButton>
                      <Typography variant="body1" sx={{ mx: 1 }}>
                        {item.quantity}
                      </Typography>
                      <IconButton
                        color="primary"
                        onClick={() => handleQuantityChange(item.id, 1)}
                      >
                        <AddIcon />
                      </IconButton>
                    </Box>
                  </Box>
                </Card>
              </Stack>
            ))}
          </Stack>

          <Divider sx={{ my: 4 }} />

          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="h5">Cart Total: Ksh {totalPrice.toFixed(2)}</Typography>
            <Button
              variant="contained"
              color="primary"
              size="large"
              startIcon={<ShoppingCartCheckoutIcon />}
              onClick={handleCheckout}
            >
              Place Order
            </Button>
          </Stack>
        </Box>
      )}
    </Container>
  );
};

export default CartView;
