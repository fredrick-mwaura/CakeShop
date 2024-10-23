import React, { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import './styles/sidebar.css';

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className={`sidebar ${isCollapsed ? 'collapsed' : 'expanded'}`}>
      {/* Toggle Button for Mobile */}
      <div className="toggle-button md-hidden">
        <button onClick={toggleSidebar} className="toggle-icon">
          {isCollapsed ? <FaBars /> : <FaTimes />}
        </button>
      </div>

      {/* Sidebar Content */}
      <div className="sidebar-content">
        <div className={`logo ${isCollapsed ? 'hidden' : 'visible'}`}>
          <h2 className="logo-text">Mate</h2>
        </div>
        <nav>
          <ul>
            <li className="nav-item">
              <a href="#" className="nav-link">
                <span className={`${isCollapsed ? 'hidden' : 'visible'}`}>Dashboard</span>
              </a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link">
                <span className={`${isCollapsed ? 'hidden' : 'visible'}`}>Orders</span>
              </a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link">
                <span className={`${isCollapsed ? 'hidden' : 'visible'}`}>Inventory</span>
              </a>
            </li>
            {/* Add more items as needed */}
          </ul>
        </nav>
      </div>

      {/* Toggle Button */}
      <div className="toggle-button hidden md-flex">
        <button onClick={toggleSidebar} className="toggle-icon">
          {isCollapsed ? <FaBars /> : <FaTimes />}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
