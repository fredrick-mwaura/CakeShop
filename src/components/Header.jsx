import React, { useState, useEffect } from "react";
import "../stylesheets/Header.css";
import { Outlet, Link, useNavigate } from "react-router-dom";
import Images from "./image";
import Logo from "../images/logo.png";
import { Cake, Home, Phone, Cookie } from "lucide-react";
import { Box, Button, Menu, MenuItem } from "@mui/material";
import { FaUserCircle } from "react-icons/fa";
import useResponsiveStyles from "./utils/responsive";
import { FaSignInAlt } from 'react-icons/fa';

function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const styles = useResponsiveStyles();

  const open = Boolean(anchorEl);

  // Toggle navigation menu
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Handle dropdown menu actions
  const handleClick = (event) => {
    navigate("profile");
  };

  // Load user data from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);


  return (
    <div>
      <header className="nillavee-header">
        {/* Logo */}
        <Images
          src={Logo}
          alt="Pinkies"
          width="150"
          height="100"
          className="logo-n"
          onClick={() => navigate("/")}
        />

        {/* Search and User Info */}
        <div className="header-nav">
          <div className="logo-container">
            <input type="text" placeholder="Search..." className="search-input" />            
          </div>

          {/* Navigation Links */}
          <ul className={`navigation ${isOpen ? "open" : ""}`}>
            <li>
              <Link to="/client">
                {/* Safely render user data */}
                {user ? `Home name: ${user.username}` : "Home"} 
              </Link> 
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
              <Link to="contact-us">Contact Us</Link>
            </li>
          </ul>

          {/* User Dropdown Menu */}
          <div>
            <Box
              sx={{
                position: "sticky",
                top: 16,
                right: 80,
                display: {
                  xs: "none",
                  sm: "none",
                  md: "flex",
                },
                alignItems: "center",
                justifyContent: "center",
                width: { xs: 40, sm: 50 },
                height: { xs: 40, sm: 50 },
                borderRadius: "50%",
                backgroundColor: "primary.main",
                boxShadow: 3,
                cursor: "pointer",
              }}
              onClick={handleClick}
            >
              <FaUserCircle size={60} color="white" />
            </Box>            
          </div>
        </div>

        {/* Hamburger Menu */}
        <div className="hamburger" onClick={toggleMenu}>
          {isOpen ? "✖" : "☰"}
        </div>

        {/* Dropdown Navigation for Small Screens */}
        {isOpen && (
          <ul className="dropdown">
            <li>
              <Link to="/" onClick={toggleMenu}>
                <Home color="#333" size={20} />
                Home
              </Link>
            </li>
            <li>
              <Link to="all-cakes" onClick={toggleMenu}>
                <Cake color="#333" size={20} />
                All Cakes
              </Link>
            </li>
            <li>
              <Link to="birthday" onClick={toggleMenu}>
                <Cookie color="#333" size={20} />
                Birthday
              </Link>
            </li>
            <li>
              <Link to="cookie" onClick={toggleMenu}>
                Cookie
              </Link>
            </li>
            <li>
              <Link to="about-us" onClick={toggleMenu}>
                <Phone color="#333" size={20} />
                About Us
              </Link>
            </li>
            <li>
              <Link to="contact-us" onClick={toggleMenu}>
                <Phone color="#333" size={20} />
                Contact Us
              </Link>
            </li>
            <li>
            <div>
              {user ? (
                <div className="user-mobile">
                  <Box
                    sx={{
                      position: "sticky",
                      top: 16,
                      right: 80,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: { xs: 40, sm: 50 },
                      height: { xs: 40, sm: 50 },
                      borderRadius: "50%",
                      backgroundColor: "primary.main",
                      boxShadow: 3,
                      cursor: "pointer",
                    }}
                    onClick={handleClick}
                  >
                    <FaUserCircle size={30} color="black" />
                  </Box>
                </div>
              ) : (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>                  
                  <Link to="login"> <FaSignInAlt size={24} color="blue" /> Login</Link>
                </div>
              )}
            </div>
            </li>
          </ul>
        )}
      </header>
      <Outlet />
    </div>
  );
}

export default NavBar;
