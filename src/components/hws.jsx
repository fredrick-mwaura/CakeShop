import React from "react";
// import { Box, Button, Typography, Stack, useMediaQuery } from "@mui/material";
import cut from "../images/cut.webp";
import cake from "../images/cake.jpg";
import cele from "../images/cele.webp";
import "../stylesheets/Home.css";

const Hws = () => {
  // const isSmallScreen = useMediaQuery("(max-width: 768px)");

  // import React from "react";

  // const OverlappingPhotos = () => {
  return (
    <div className="hero-section">

      <div className="text-content">
        <h1>Fresh and Yummy Cakes for You</h1>
        <p>Your taste buds never had it so good.</p>
        <button>Shop Now</button>
      </div>

      <div className="photo-gallery">

        <img src={cele} alt="Celebration" className="photo photo1" />

        {/* <img src={cake} alt="Cake table" className="photo photo2" /> */}

        {/* <img src={cake} alt="Birthday cake" className="photo photo3" /> */}

      </div>
    </div>
  );
};

export default Hws;
