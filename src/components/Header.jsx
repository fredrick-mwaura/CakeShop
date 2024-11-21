import React, { useState, useEffect } from "react";
import "../stylesheets/Header.css";
import { Outlet, Link, useNavigate } from "react-router-dom";
import Images from "./image";
// import AddToCart from "./AddToCart";
import Logo from "../images/logo.png";
     

function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <div>
      <header className="nillavee-header">
        <Images
          src={Logo}
          alt="Nillavee Logo"
          width="150"
          height="100"
          className="logo-n"
          onClick={() => navigate("/client")}
        />
        

        <div className="header-nav">
          <div className="logo-container">
            <input type="text" placeholder="Search..." className="search-input" />
           <div>
            {user ? (
              <div className="user">
                <h3>
                  welcome, {user.Username}
                </h3>
              </div>
            ) : (
              <p className="auth">
                <Link to='login'>Login</Link>
                <Link to='signup'>Register</Link>
              </p>
            )

            }
            </div>

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
              <Link to="Contact-us">Contact Us</Link>
            </li>
          </ul>
        </div>

        <div className="hamburger" onClick={toggleMenu}>
              {isOpen ? "✖" : "☰"}
            </div>

        {isOpen && (
          <ul className="dropdown">
            <li>
              <Link to="/client" onClick={toggleMenu}>
                Home
              </Link>
            </li>
            <li>
              <Link to="all-cakes" onClick={toggleMenu}>
                All Cakes
              </Link>
            </li>
            <li>
              <Link to="birthday" onClick={toggleMenu}>
                Birthday Cakes
              </Link>
            </li>
            <li>
              <Link to="cookie" onClick={toggleMenu}>
                Cookie
              </Link>
            </li>
            <li>
              <Link to="about-us" onClick={toggleMenu}>
                About Us
              </Link>
            </li>
            <li>
              <Link to="contact-us" onClick={toggleMenu}>
                Contact Us
              </Link>
            </li>
          </ul>
        )}

        <div>
          {user ? (
            <div className="user">
              <h3>welcome, {user.Username}</h3>
            </div>
          ) : (
            <p className="auth">
              <Link to="login">Login</Link>
              <Link to="signup">Register</Link>
            </p>
          )}
        </div>
      </header>
      <Outlet />
    </div>
  );
}

export default NavBar;
