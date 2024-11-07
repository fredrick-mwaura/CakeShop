import React from 'react';
import { Container, Typography, Box, Stack, Paper } from '@mui/material';

const AboutUs = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h2" align="center" gutterBottom>
        About Us
      </Typography>
      
      <Typography variant="h5" gutterBottom>
        Welcome to Sweet Treats Cake Shop!
      </Typography>
      <Typography variant="body1" sx={{mb:"2"}}>
        At Sweet Treats, we believe that every celebration deserves a delicious cake. Our journey began with a passion for baking and a love for creating beautiful desserts that bring joy to every occasion. From birthdays to weddings, we are dedicated to crafting exquisite cakes that not only look amazing but taste divine.
      </Typography>

      <Typography variant="h5" gutterBottom>
        Our Mission
      </Typography>
      <Typography variant="body1" sx={{mb:"2"}}>
        Our mission is to provide our customers with the finest quality cakes made from the freshest ingredients. We strive to create memorable experiences through our custom cake designs and exceptional customer service.
      </Typography>

      <Typography variant="h5" gutterBottom>
        Why Choose Us?
      </Typography>
      <Typography variant="body1" sx={{mb:"2"}}>
        - Handcrafted Quality: Each cake is lovingly handcrafted with attention to detail.<br />
        - Custom Designs: We work with you to create a cake that reflects your unique style and theme.<br />
        - Fresh Ingredients: We use only the highest quality ingredients to ensure the best taste.<br />
        - Customer Satisfaction: Your happiness is our top priority!
      </Typography>
      <Box sx={{ mt: 4, textAlign: 'center' }}>
        <Typography variant="h6">Join Us for a Sweet Experience!</Typography>
        <Typography variant="body2">Visit us or contact us for custom orders. We can’t wait to bake for you!</Typography>
      </Box>
    </Container>
  );
};

export default AboutUs;
