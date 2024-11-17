import React from 'react';
import { Box, Typography } from '@mui/material';
import Images from '../image'; // Adjust the import based on your project structure
import emptyCart from '../../images/empty_cart.svg'; // Adjust the import for your image
import {Link} from 'react-router-dom'
const EmptyCart = () => {
    return (
        <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            sx={{ textAlign: 'center' }}
        >
            <Typography variant="body1" gutterBottom>
                Ooh! Sorry but it seems that you don't have items in your cart!
            </Typography>
            <Images 
                src={emptyCart} 
                alt="empty" 
                width="206" 
                height="206" 
                className="cartt"
            />
            <Typography variant="h6" fontStyle='italic'>
                Empty cart!
            </Typography>
            <Typography variant="body2" gutterBottom>
                
                
            </Typography>
            <Typography>
            <Link to="/client/birthday">
                Click here to shop!
                </Link>
            </Typography>

        </Box>
    );
};

export default EmptyCart;