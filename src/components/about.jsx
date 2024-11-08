import React from 'react';
import { Container, Typography, Box, Paper } from '@mui/material';

const AboutUs = () => {
  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3, backgroundColor: '#fff8e1' }}>
        
        <Typography variant="h2" align="center" gutterBottom sx={{ color: '#6d4c41', fontWeight: 'bold' }}>
          About Us
        </Typography>
        
        <Typography variant="h5" align="center" gutterBottom sx={{ color: '#8d6e63', fontStyle: 'italic' }}>
          Welcome to Sweet Treats Cake Shop!
        </Typography>

        <Typography variant="body1" sx={{ mt: 2, mb: 3, lineHeight: 1.8 }}>
          At Sweet Treats, we believe that every celebration deserves a delicious cake. Our journey began with a passion for baking and a love for creating beautiful desserts that bring joy to every occasion. From birthdays to weddings, we are dedicated to crafting exquisite cakes that not only look amazing but taste divine.
        </Typography>

        <Typography variant="h5" gutterBottom sx={{ color: '#8d6e63', fontWeight: 'bold' }}>
          Our Mission
        </Typography>
        <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.8 }}>
          Our mission is to provide our customers with the finest quality cakes made from the freshest ingredients. We strive to create memorable experiences through our custom cake designs and exceptional customer service.
        </Typography>

        <Typography variant="h5" gutterBottom sx={{ color: '#8d6e63', fontWeight: 'bold' }}>
          Why Choose Us?
        </Typography>
        <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.8 }}>
          <ul>
            <li><strong>Handcrafted Quality:</strong> Each cake is lovingly handcrafted with attention to detail.</li>
            <li><strong>Custom Designs:</strong> We work with you to create a cake that reflects your unique style and theme.</li>
            <li><strong>Fresh Ingredients:</strong> We use only the highest quality ingredients to ensure the best taste.</li>
            <li><strong>Customer Satisfaction:</strong> Your happiness is our top priority!</li>
          </ul>
        </Typography>

        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <Typography variant="h6" sx={{ color: '#6d4c41', fontWeight: 'bold' }}>
            Join Us for a Sweet Experience!
          </Typography>
          <Typography variant="body2" sx={{ mt: 1, color: '#6d4c41' }}>
            Visit us or contact us for custom orders. We can’t wait to bake for you!
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default AboutUs;
