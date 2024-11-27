import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import {
  Container,
  Box,
  TextField,
  Button,
  CircularProgress,
  Typography,
} from '@mui/material';

const NewToken = () => {
  // Assume the email has been saved in localStorage after initial registration.
  const savedEmail = JSON.parse(localStorage.getItem('user'))?.email || '';

  const [email, setEmail] = useState(savedEmail);
  const [loading, setLoading] = useState(false);

  const handleRequestToken = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        'http://localhost/cake-backend/api/resend_confrmation.php',
        { email },
        { headers: { 'Content-Type': 'application/json' } }
      );

      if (response.status === 200) {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message || 'Unexpected error occurred');
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message || 'Server error occurred');
      } else {
        toast.error('Network error. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Box sx={{ maxWidth: 400, margin: 'auto', mt: 4 }}>
        <Typography variant="h5" gutterBottom>
          Request a New Confirmation Token
        </Typography>
        <form onSubmit={handleRequestToken}>
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            required
            disabled // Disable the input so the email cannot be changed
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={loading}
            sx={{ mt: 2 }}
          >
            {loading ? <CircularProgress size={24} /> : 'Request Token'}
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default NewToken;
