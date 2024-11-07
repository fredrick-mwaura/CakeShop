import React, { useState } from "react";
import "../stylesheets/Header.css";
import {Outlet, Link, useNavigate } from "react-router-dom";
import Images from "./image";
import Logo from "../images/logo.png";
     

function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <header className="nillavee-header">
        <Images
            src={Logo}
            alt="Nillavee Logo"
            width="30"
            height="30"
            className="logo-n"
            onClick={() => navigate('/client')}
        />

        <div className="header-nav">
          <div className="logo-container">
            <input type="text" placeholder="Search..." className="search-input" />
            <p className="auth">
              <Link to='login'>Login</Link>
              <Link to='signup'>Register</Link>
            </p>

          </div>

          <ul className={`navigation ${isOpen ? "open" : ""}`}>
            <li>
              <Link to="/client">Home</Link>
            </li>
            <li>
              <Link to="all-cakes">All Cakes</Link>
            </li>
            <li>
              <Link to="birthday">Birthday Cakes</Link>
            </li>
            <li>
              <Link to="cookie">Cookie</Link>
            </li>
            <li>
              <Link to="about-us">About Us</Link>
            </li>
            <li>
              <Link to="about-us">Contact Us</Link>
            </li>
          </ul>
        </div>

        <div className="hamburger" onClick={toggleMenu}>
          {isOpen ? "✖" : "☰"}
        </div>

        {isOpen && (
            <ul className="dropdown">
              <li>
                <Link to="/client" onClick={toggleMenu}>Home</Link>
              </li>
              <li>
                <Link to="all-cakes" onClick={toggleMenu}>All Cakes</Link>
              </li>
              <li>
                <Link to="birthday" onClick={toggleMenu}>Birthday Cakes</Link>
              </li>
              <li>
                <Link to="cookie" onClick={toggleMenu}>Cookie</Link>
              </li>
              <li>
                <Link to="aabout" onClick={toggleMenu}>About Us</Link>
              </li>
              <li>
                <Link to="contact_us" onClick={toggleMenu}>Contact Us</Link>
              </li>
            </ul>
        )}
      </header>
      <Outlet/>
      </div>
  );
}

export default NavBar;
