import React from "react";
import cele from "../images/cele.webp";
import "../stylesheets/Home.css";
import { useNavigate } from "react-router-dom";

const Hws = () => {
  const navigate = useNavigate();
  const Cakes = () => {
    navigate('birthday');
  };
  return (
    <div className="hero-section">
      <div className="text-content">
        <h1>Fresh and Yummy Cakes for You</h1>
        <p>Your taste buds never had it so good.</p>
        <button onClick={Cakes}>Shop Now</button>
      </div>
      <div className="photo-gallery">
        <img src={cele} alt="Celebration" className="photo" />
      </div>
    </div>
  );
};

export default Hws;
