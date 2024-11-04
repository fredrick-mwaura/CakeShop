import React, { useState } from 'react';
import './order.css';

const OrderPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    location: '',
    street: '',
    house: '',
    email: '',
    date: '',
    instructions: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' }); // Clear error message on change
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name) newErrors.name = "Please write your name!";
    if (!formData.phone) newErrors.phone = "Please write your phone number!";
    if (!formData.location) newErrors.location = "Please write your location!";
    if (!formData.street) newErrors.street = "Please write your street!";
    if (!formData.house) newErrors.house = "Please write your house!";
    if (!formData.email) newErrors.email = "Please write your email!";
    if (!formData.date) newErrors.date = "Please select a date!";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      // Proceed with form submission logic (e.g., send to EmailJS)
      alert('Order placed successfully!');
      // Reset form after successful submission
      setFormData({
        name: '',
        phone: '',
        location: '',
        street: '',
        house: '',
        email: '',
        date: '',
        instructions: ''
      });
      setErrors({});
    }
  };

  return (
      <div className="checkout-container">
        <h2>Checkout</h2>
        <form className="checkout-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label>Name</label>
              <input type="text" name="name" placeholder="Enter your name" value={formData.name} onChange={handleChange} />
              {errors.name && <span className="error">{errors.name}</span>}
            </div>
            <div className="form-group">
              <label>Phone</label>
              <input type="text" name="phone" placeholder="Enter your phone number" value={formData.phone} onChange={handleChange} />
              {errors.phone && <span className="error">{errors.phone}</span>}
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Location</label>
              <input type="text" name="location" placeholder="Enter your location" value={formData.location} onChange={handleChange} />
              {errors.location && <span className="error">{errors.location}</span>}
            </div>
            <div className="form-group">
              <label>Road/Street</label>
              <input type="text" name="street" placeholder="Enter your street" value={formData.street} onChange={handleChange} />
              {errors.street && <span className="error">{errors.street}</span>}
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>House</label>
              <input type="text" name="house" placeholder="Enter your house" value={formData.house} onChange={handleChange} />
              {errors.house && <span className="error">{errors.house}</span>}
            </div>
            <div className="form-group">
              <label>Email</label>
              <input type="email" name="email" placeholder="Enter your email" value={formData.email} onChange={handleChange} />
              {errors.email && <span className="error">{errors.email}</span>}
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Date</label>
              <input type="date" name="date" value={formData.date} onChange={handleChange} />
              {errors.date && <span className="error">{errors.date}</span>}
            </div>
            <div className="form-group">
              <label>Instructions</label>
              <textarea name="instructions" placeholder="Additional instructions" value={formData.instructions} onChange={handleChange}></textarea>
            </div>
          </div>
          <button type="submit" className="submit-btn">Place Order</button>
        </form>
      </div>
  );
};

export default OrderPage;