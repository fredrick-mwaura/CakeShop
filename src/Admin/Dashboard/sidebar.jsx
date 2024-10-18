import React, { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import './styles/sidebar.css'
import Sidebar from './sidebar';

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className={`sidebar ${isCollapsed ? 'w-16' : 'w-64'} bg-gray-800 text-white h-screen p-4 flex flex-col justify-between fixed md:relative transition-width duration-300`}>
      {/* Toggle Button for Mobile */}
      <div className="md:hidden flex items-center justify-end mb-4">
        <button onClick={toggleSidebar} className="text-white focus:outline-none">
          {isCollapsed ? <FaBars /> : <FaTimes />}
        </button>
      </div>

      {/* Sidebar Content */}
      <div className="flex flex-col">
        <div className={`logo mb-6 ${isCollapsed ? 'hidden' : 'block'}`}>
          <h2 className="text-lg font-bold">Mate</h2>
        </div>
        <nav>
          <ul>
            <li className="mb-4">
              <a href="#" className="flex items-center">
                <span className={`${isCollapsed ? 'hidden' : 'block'}`}>Dashboard</span>
              </a>
            </li>
            <li className="mb-4">
              <a href="#" className="flex items-center">
                <span className={`${isCollapsed ? 'hidden' : 'block'}`}>Orders</span>
              </a>
            </li>
            <li className="mb-4">
              <a href="#" className="flex items-center">
                <span className={`${isCollapsed ? 'hidden' : 'block'}`}>Inventory</span>
              </a>
            </li>
            {/* Add more items as needed */}
          </ul>
        </nav>
      </div>

      {/* Toggle Button */}
      <div className="hidden md:flex items-center justify-center mt-4">
        <button onClick={toggleSidebar} className="text-white focus:outline-none">
          {isCollapsed ? <FaBars /> : <FaTimes />}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
