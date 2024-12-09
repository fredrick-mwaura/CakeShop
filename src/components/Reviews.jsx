import React, { useState } from "react";
import "../stylesheets/Reviews.css"; // Import the CSS file for styles
import reviewsData from './utils/Reviews.js';

// Sample reviews data  

const Reviews = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 6;

  // Pagination calculations
  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = reviewsData.slice(indexOfFirstReview, indexOfLastReview);

  const totalPages = Math.ceil(reviewsData.length / reviewsPerPage);

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={i < rating ? "star filled" : "star"}>
        ★
      </span>
    ));
  };

  return (
    <div className="reviews-container">
      <h1 className="reviews-title">What Our Clients are Saying About Us</h1>
      <div className="reviews-grid">
        {currentReviews.map((review) => (
          <div key={review.id} className="review-card">
            <h2 className="review-name">{review.name}</h2>
            <div className="review-stars">{renderStars(review.rating)}</div>
            <p className="review-text">{review.text}</p>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="pagination">
        <button
          onClick={handlePrevious}
          disabled={currentPage === 1}
          className={`pagination-button ${currentPage === 1 ? "disabled" : ""}`}
        >
          Previous
        </button>
        <p className="pagination-info">
          Page {currentPage} of {totalPages}
        </p>
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className={`pagination-button ${currentPage === totalPages ? "disabled" : ""}`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Reviews;
