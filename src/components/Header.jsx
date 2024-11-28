import React, { useState, useEffect } from "react";
import "../stylesheets/Header.css";
import { Outlet, Link, useNavigate } from "react-router-dom";
import Images from "./image";
import Logo from "../images/logo.png";
import { Cake } from "lucide-react";
import { Home } from "lucide-react";
import { Phone } from "lucide-react";
import { Cookie } from "lucide-react";



     

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

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
  
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget); 
    };
  
    const handleClose = () => {
      setAnchorEl(null); 
    };
  
    const handleOptionClick = (option) => {
      handleClose(); 
      switch (option) {
        case "Profile":
          navigate("/client/profile");
          break;
        default:
          // console.log("Unknown option");
          navigate('/client/login')
      }
    };

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
          <div>
      <Box
        sx={{
          position: "absolute", // Place it on top
          top: 16, // Distance from the top (adjust as needed)
          right: 80, // Distance from the right (adjust as needed)
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: { xs: 40, sm: 50 }, // Responsive width
          height: { xs: 40, sm: 50 }, // Responsive height
          borderRadius: "50%",
          backgroundColor: "primary.main",
          color: "transparent",
          boxShadow: 3,
          cursor: "pointer",
        }}
        onClick={handleClick} // Attach the click handler
      >
        <FaUserCircle size={30} color="white" />
      </Box>
      {/* Dropdown Menu */}
      <Menu
        anchorEl={anchorEl} // Anchor element for the menu
        open={open} // Whether the menu is open
        onClose={handleClose} // Close the menu when clicking outside
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuItem onClick={() => handleOptionClick("Profile")}>
          Profile
        </MenuItem>
        <MenuItem onClick={() => handleOptionClick("Settings")}>
          Settings
        </MenuItem>
        <MenuItem onClick={() => handleOptionClick("Logout")}>Logout</MenuItem>
      </Menu>
    </div>
        </div>

        <div className="hamburger" onClick={toggleMenu}>
              {isOpen ? "✖" : "☰"}
            </div>

        {isOpen && (
          <ul className="dropdown">
            <li>
              <Link to="/client" onClick={toggleMenu}>
              <Home color={'#333'} size={20} />
                Home
              </Link>
            </li>
            <li>
              <Link to="all-cakes" onClick={toggleMenu}>
              <Cake color={'#333'} size={20} />

              All Cakes
              </Link>
            </li>
            <li>
              <Link to="birthday" onClick={toggleMenu}>
              <Cookie color={'#333'} size={20} />

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
              <Phone color={'#333'} size={20} />

                About Us
              </Link>
            </li>
            <li>
              <Link to="contact-us" onClick={toggleMenu}>
              <Phone color={'#333'} size={20} />
                Contact Us
              </Link>
            </li>
          </ul>
        )}

        {/* <div>
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
        </div> */}
      </header>
      <Outlet />
    </div>
  );
}

export default NavBar;
