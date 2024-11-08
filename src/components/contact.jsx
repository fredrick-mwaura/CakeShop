import React from 'react';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Stack,
  Paper,
  IconButton,
} from '@mui/material';
import { Phone, Email, LocationOn, Facebook, Instagram, Twitter } from '@mui/icons-material';

const ContactUs = () => {
  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3, backgroundColor: '#fff8e1' }}>
        
        {/* Title */}
        <Typography variant="h2" align="center" gutterBottom sx={{ color: '#6d4c41', fontWeight: 'bold' }}>
          Contact Us
        </Typography>

        <Typography variant="body1" align="center" sx={{ color: '#8d6e63', mb: 4 }}>
          Have a question? Need a custom order? Reach out to us!
        </Typography>

        {/* Contact Information Section */}
        <Box sx={{ mb: 4 }}>
          <Stack direction="column" spacing={2} alignItems="center">
            
            {/* Phone Number */}
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Phone sx={{ color: '#6d4c41', mr: 1 }} />
              <Typography variant="body1" sx={{ fontWeight: 'bold' }}>+254 7########</Typography>
            </Box>
            
            {/* Email Address */}
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Email sx={{ color: '#6d4c41', mr: 1 }} />
              <Typography variant="body1" sx={{ fontWeight: 'bold' }}>info@pinkiescupcakes.com</Typography>
            </Box>
            
            {/* Physical Address */}
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <LocationOn sx={{ color: '#6d4c41', mr: 1 }} />
              <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                123 Cake Street, Bakerstown, Nairobi 90001
              </Typography>
            </Box>
            
            {/* Social Media Icons */}
            <Stack direction="row" spacing={2} mt={2}>
              <IconButton href="https://facebook.com" target="_blank" aria-label="Facebook" sx={{ color: '#3b5998' }}>
                <Facebook />
              </IconButton>
              <IconButton href="https://instagram.com" target="_blank" aria-label="Instagram" sx={{ color: '#e1306c' }}>
                <Instagram />
              </IconButton>
              <IconButton href="https://twitter.com" target="_blank" aria-label="Twitter" sx={{ color: '#1da1f2' }}>
                <Twitter />
              </IconButton>
            </Stack>
          </Stack>
        </Box>

        {/* Contact Form */}
        <Box component="form" noValidate autoComplete="off" sx={{ mt: 4 }}>
          <Typography variant="h5" align="center" gutterBottom sx={{ color: '#6d4c41', fontWeight: 'bold' }}>
            Send Us a Message
          </Typography>
          
          <Stack spacing={2}>
            <TextField
              label="Full Name"
              name="name"
              variant="outlined"
              fullWidth
              required
            />
            <TextField
              label="Email Address"
              name="email"
              type="email"
              variant="outlined"
              fullWidth
              required
            />
            <TextField
              label="Subject"
              name="subject"
              variant="outlined"
              fullWidth
            />
            <TextField
              label="Message"
              name="message"
              variant="outlined"
              fullWidth
              required
              multiline
              rows={4}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2, backgroundColor: '#6d4c41', '&:hover': { backgroundColor: '#8d6e63' } }}
            >
              Submit
            </Button>
          </Stack>
        </Box>
      </Paper>
    </Container>
  );
};

export default ContactUs;
