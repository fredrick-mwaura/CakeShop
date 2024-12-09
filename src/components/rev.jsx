import React, { useState, useEffect } from "react";
import reviewsData from "./utils/Reviews.js"; // Import the reviewsData array
import "../stylesheets/Reviews.css"; // Import the CSS file for styling

const Reviews = () => {
  const [randomReviews, setRandomReviews] = useState([]);

  // Function to get 3 random reviews
  const getRandomReviews = () => {
    let shuffledReviews = [...reviewsData]; // Make a copy of the reviewsData
    shuffledReviews = shuffledReviews.sort(() => Math.random() - 0.5); // Shuffle the array
    return shuffledReviews.slice(0, 3); // Get the first 3 reviews after shuffle
  };

  useEffect(() => {
    setRandomReviews(getRandomReviews()); // Set random reviews when the component mounts
  }, []);

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={i < rating ? "star filled" : "star"}>
        ★
      </span>
    ));
  };

  return (
    <div className="reviews-container">
      <h2 className="reviews-title">What Our Clients are Saying About Us</h2>
      <div className="reviews-grid">
        {/* Corrected map to render the reviews */}
        {randomReviews.map((review) => (
          <div key={review.id} className="review-card">
            <h3 className="review-name">{review.name}</h3>
            <div className="review-stars">{renderStars(review.rating)}</div>
            <p className="review-text">{review.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reviews;
