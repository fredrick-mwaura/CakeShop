import { useState } from "react";
import "../stylesheets/Header.css";
import { Link, useNavigate } from "react-router-dom";
import Images from "./image";
import Logo from "../images/logo.png";

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
      <header className="nillavee-header">
        <Images
            src={Logo}
            alt="Nillavee Logo"
            width="30"
            height="30"
            className="logo-n"
            onClick={() => navigate('/')}
        />

        <div className="header-nav">
          <div className="logo-container">
            <input type="text" placeholder="Search..." className="search-input" />

          </div>

          <ul className={`navigation ${isOpen ? "open" : ""}`}>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/all-cakes">All Cakes</Link>
            </li>
            <li>
              <Link to="/birthday">Birthday Cakes</Link>
            </li>
            <li>
              <Link to="/cookie">Cookie</Link>
            </li>
            <li>
              <Link to="/about">About Us</Link>
            </li>
            <li>
              <Link to="/contact_us">Contact Us</Link>
            </li>
          </ul>
        </div>

        <div className="hamburger" onClick={toggleMenu}>
          {isOpen ? "✖" : "☰"}
        </div>

        {isOpen && (
            <ul className="dropdown">
              <li>
                <Link to="/" onClick={toggleMenu}>Home</Link>
              </li>
              <li>
                <Link to="/all-cakes" onClick={toggleMenu}>All Cakes</Link>
              </li>
              <li>
                <Link to="/birthday" onClick={toggleMenu}>Birthday Cakes</Link>
              </li>
              <li>
                <Link to="/cookie" onClick={toggleMenu}>Cookie</Link>
              </li>
              <li>
                <Link to="/about" onClick={toggleMenu}>About Us</Link>
              </li>
              <li>
                <Link to="/contact_us" onClick={toggleMenu}>Contact Us</Link>
              </li>
            </ul>
        )}
      </header>
  );
}

export default Header;
