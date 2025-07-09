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
    <main className="hero-section">
      <div className="text-content">
        <h1>Fresh and Yummy Cakes for You</h1>
        <h5>Your taste buds never had it so good.</h5>
        <button onClick={Cakes}>Shop Now</button>
      </div>
      <section className="photo-gallery">
        <img src={cele} alt="Celebration" className="photo" />
      </section>
    </main>
  );
};

export default Hws;
