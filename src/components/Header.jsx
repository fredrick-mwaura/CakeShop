import { useState } from "react";
import "../stylesheets/Header.css";
import { Link } from "react-router-dom";
import Images from "./image";
import Logo from "../images/logo.png";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="nillavee-header">
      <div className="menu-bar">
        <Images
          src={Logo}
          alt="Nillavee Logo"
          width=""
          height=""
          className="Nillave"
        />

        <div className="header-nav">
          <div className="logo-container">
            <input
              type="text"
              placeholder="Search..."
              className="search-input"
            />
            <p className="contact-info ">+254723174434</p>
          </div>

          <ul className={`navigation ${isOpen ? "open" : ""}`}>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/allCakes">All Cakes</Link>
            </li>
            <li>
              <Link to="/birthday">Birthday Cakes</Link>
            </li>
            <li>
              <Link to="/cookie">cookie</Link>
            </li>
            <li>
              <Link to="/contact_us">Contact Us</Link>
            </li>
          </ul>
          {/* <div><AddToCart/></div> */}
        </div>
      </div>

      <div className="hamburger" onClick={toggleMenu}>
        {isOpen ? "✖" : "☰"}
      </div>
      {/*<ul className={`dropdown ${isOpen ? "open" : ""}`}>*/}
      {/*  <li>*/}
      {/*    <Link to="/">Home</Link>*/}
      {/*  </li>*/}
      {/*  <li>*/}
      {/*    <Link to="/allCakes">All Cakes</Link>*/}
      {/*  </li>*/}
      {/*  <li>*/}
      {/*    <Link to="/birthday">Birthday Cakes</Link>*/}
      {/*  </li>*/}
      {/*  <li>*/}
      {/*    <Link to="/cookie">cookie</Link>*/}
      {/*  </li>*/}
      {/*  <li>*/}
      {/*    <Link to="/contact_us">Contact Us</Link>*/}
      {/*  </li>*/}
      {/*</ul>*/}
    </header>
  );
}

export default Navbar;
