/* eslint-disable no-undef */
import { useState } from "react";
import emailjs from "emailjs-com"; // Add this import
import "../stylesheets/contact.css";
import Header from "./Header";

const Contact = () => {
  // console.log(process.env.REACT_APP_EMAILJS_USER_ID);
  const serviceId = process.env.REACT_APP_EMAILJS_SERVICE_ID;
  const templateId = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
  const userId = process.env.REACT_APP_EMAILJS_USER_ID;
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

  const emailParams = {
          from_name: formData.name, // User's name
          to_name: "Recipient Name", // Replace with the recipient's name
          message: formData.message, // User's message
          from_email: formData.email, // User's email (if you want to use it)
        };
    // EmailJS configuration
    emailjs
      .send(
        serviceId,
        templateId,
        emailParams,
        userId
      )
      .then((response) => {
        console.log("SUCCESS!", response.status, response.text);
        alert("Your message has been sent successfully!");
        setFormData({
          name: "",
          email: "",
          message: "",
        });
      })
      .catch((error) => {
        console.error("FAILED...", error);
        alert("There was an issue sending your message.");
      });
  };

  return (
    <>
      <Header />
      <div className="contact">
        <div className="form-container">
          <form onSubmit={handleSubmit} id="contacT" name="contacT" autoComplete="off">
            <h2>Contact Us</h2>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit">Send</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Contact;
