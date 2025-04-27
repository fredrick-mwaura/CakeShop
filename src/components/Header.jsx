import React, { useState, useEffect } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import Images from "./image";
import Logo from "../images/logo.png";
import { Cake, Home, Phone, Cookie } from "lucide-react";
import { FaUserCircle, FaSignInAlt } from "react-icons/fa";

function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Toggle navigation menu
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Handle dropdown menu actions
  const handleClick = () => {
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
      <header className="flex items-center justify-between p-4 bg-white shadow-md sticky top-0 z-50">
        {/* Logo */}
        <Images
          src={Logo}
          alt="Pinkies"
          width="150"
          height="100"
          className="cursor-pointer"
          onClick={() => navigate("/")}
        />

        {/* Search and User Info */}
        <div className="flex items-center space-x-6">
          {/* Search Input - Hidden on mobile */}
          <div className="hidden md:block">
            <input
              type="text"
              placeholder="Search..."
              className="px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-pink-300"
            />
          </div>

          {/* Navigation Links - Hidden on mobile */}
          <nav className="hidden md:flex space-x-6">
            <Link to="/client" className="text-gray-700 hover:text-pink-600">
              {user ? `Hi, ${user.username}` : "Home"}
            </Link>
            <Link to="all-cakes" className="text-gray-700 hover:text-pink-600">
              All Cakes
            </Link>
            <Link to="birthday" className="text-gray-700 hover:text-pink-600">
              Birthday Cakes
            </Link>
            <Link to="cookie" className="text-gray-700 hover:text-pink-600">
              Cookies
            </Link>
            <Link to="about-us" className="text-gray-700 hover:text-pink-600">
              About Us
            </Link>
            <Link to="contact-us" className="text-gray-700 hover:text-pink-600">
              Contact Us
            </Link>
          </nav>

          {/* User Icon - Hidden on mobile */}
          {user ? (
            <div className="hidden md:block">
              <div
                className="flex items-center justify-center w-12 h-12 rounded-full bg-pink-500 shadow-lg cursor-pointer hover:bg-pink-600 transition-colors"
                onClick={handleClick}
              >
                <FaUserCircle size={24} className="text-white" />
              </div>
            </div>
          ) : (
            <Link
              to="login"
              className="hidden md:flex items-center space-x-2 text-blue-600 hover:text-blue-800"
            >
              <FaSignInAlt size={20} />
              <span>Login</span>
            </Link>
          )}
        </div>

        {/* Hamburger Menu - Mobile only */}
        <button
          className="md:hidden text-2xl focus:outline-none"
          onClick={toggleMenu}
        >
          {isOpen ? "✖" : "☰"}
        </button>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden absolute top-20 left-0 right-0 bg-white shadow-lg py-4 px-6 z-40">
            <div className="mb-4">
              <input
                type="text"
                placeholder="Search..."
                className="w-full px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-pink-300"
              />
            </div>
            
            <nav className="flex flex-col space-y-4">
              <Link
                to="/"
                onClick={toggleMenu}
                className="flex items-center space-x-2 text-gray-700 hover:text-pink-600"
              >
                <Home size={20} />
                <span>Home</span>
              </Link>
              <Link
                to="all-cakes"
                onClick={toggleMenu}
                className="flex items-center space-x-2 text-gray-700 hover:text-pink-600"
              >
                <Cake size={20} />
                <span>All Cakes</span>
              </Link>
              <Link
                to="birthday"
                onClick={toggleMenu}
                className="flex items-center space-x-2 text-gray-700 hover:text-pink-600"
              >
                <Cookie size={20} />
                <span>Birthday</span>
              </Link>
              <Link
                to="cookie"
                onClick={toggleMenu}
                className="text-gray-700 hover:text-pink-600"
              >
                Cookies
              </Link>
              <Link
                to="about-us"
                onClick={toggleMenu}
                className="flex items-center space-x-2 text-gray-700 hover:text-pink-600"
              >
                <Phone size={20} />
                <span>About Us</span>
              </Link>
              <Link
                to="contact-us"
                onClick={toggleMenu}
                className="flex items-center space-x-2 text-gray-700 hover:text-pink-600"
              >
                <Phone size={20} />
                <span>Contact Us</span>
              </Link>
              
              {user ? (
                <div
                  className="flex items-center space-x-2 cursor-pointer"
                  onClick={() => {
                    handleClick();
                    toggleMenu();
                  }}
                >
                  <FaUserCircle size={20} className="text-gray-700" />
                  <span>Profile</span>
                </div>
              ) : (
                <Link
                  to="login"
                  onClick={toggleMenu}
                  className="flex items-center space-x-2 text-blue-600 hover:text-blue-800"
                >
                  <FaSignInAlt size={20} />
                  <span>Login</span>
                </Link>
              )}
            </nav>
          </div>
        )}
      </header>
      <Outlet />
    </div>
  );
}

export default NavBar;