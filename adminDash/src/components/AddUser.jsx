import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Paper } from '@mui/material';
import { toast } from 'react-toastify';

function AddUser() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName) newErrors.fullName = 'Full name is required';
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email address is invalid';
    }
    if (!formData.password || formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await fetch('/api/users', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
        const data = await response.json();

        if (response.ok) {
          // Display success toast
          toast.success('User added successfully!');
          setFormData({ fullName: '', email: '', password: '' }); // Clear the form
        } else {
          // Display error toast
          toast.error(data.message || 'Failed to add user');
        }
      } catch (error) {
        console.error(error);
        toast.error('An error occurred. Please try again.');
      }
    }
  };

  return (
    <Paper elevation={3} sx={{ padding: 4, maxWidth: 400, margin: 'auto' }}>
      <Typography variant="h5" align="center" gutterBottom>
        Add New User
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Full Name"
          name="fullName"
          fullWidth
          margin="normal"
          variant="outlined"
          value={formData.fullName}
          onChange={handleChange}
          error={!!errors.fullName}
          helperText={errors.fullName}
        />
        <TextField
          label="Email"
          name="email"
          fullWidth
          margin="normal"
          variant="outlined"
          value={formData.email}
          onChange={handleChange}
          error={!!errors.email}
          helperText={errors.email}
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          fullWidth
          margin="normal"
          variant="outlined"
          value={formData.password}
          onChange={handleChange}
          error={!!errors.password}
          helperText={errors.password}
        />
        <Box mt={2} display="flex" justifyContent="center">
          <Button type="submit" variant="contained" color="primary">
            Add User
          </Button>
        </Box>
      </form>
    </Paper>
  );
}

export default AddUser;
