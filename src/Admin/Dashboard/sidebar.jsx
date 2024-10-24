import React, { useState } from 'react';
import './styles/sidebar.css';  
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTachometerAlt, faBox, faUser, faShoppingCart, faEnvelope, faHeart, faChartBar, faCog, faComment } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const [catalogOpen, setCatalogOpen] = useState(false);
  const [ordersOpen, setOrdersOpen] = useState(false);
  const [marketingOpen, setMarketingOpen] = useState(false);

  const toggleCatalog = () => setCatalogOpen(!catalogOpen);
  const toggleOrders = () => setOrdersOpen(!ordersOpen);
  const toggleMarketing = () => setMarketingOpen(!marketingOpen);

  return (
    <div className="sidebar">
      <div className="brand">
        <h2>who😂😂</h2>
        <button className="admin-btn">ADMIN</button>
      </div>

      <ul className="menu">
        <li className="menu-item">
          <FontAwesomeIcon icon={faTachometerAlt} />
          <span>Dashboard</span>
        </li>

        <li className="menu-item" onClick={toggleCatalog}>
          <FontAwesomeIcon icon={faBox} />
          <span>Catalog</span>
          {catalogOpen && (
            <ul className="submenu">
              <li>Products List</li>
              <li>Product</li>
            </ul>
          )}
        </li>

        <li className="menu-item">
          <FontAwesomeIcon icon={faUser} />
          <span>  <li><Link to="/users">Users</Link></li></span>
        </li>

        <li className="menu-item" onClick={toggleOrders}>
          <FontAwesomeIcon icon={faShoppingCart} />
          <span>Orders</span>
          {ordersOpen && (
            <ul className="submenu">
              <li>Orders List</li>
              <li>Order Details</li>
            </ul>
          )}
        </li>

        <li className="menu-item" onClick={toggleMarketing}>
          <FontAwesomeIcon icon={faHeart} />
          <span>Sale</span>
          {marketingOpen && (
            <ul className="submenu">
              <li>
                <FontAwesomeIcon icon={faEnvelope} />
                <span>Notification</span>
              </li>
              <li>
                <FontAwesomeIcon icon={faComment} />
                <span>
                  Chat <span className="badge">8</span>
                </span>
              </li>
            </ul>
          )}
        </li>

        <li className="menu-item">
          <FontAwesomeIcon icon={faChartBar} />
          <span>Analytics</span>
        </li>

        <li className="menu-item">
          <FontAwesomeIcon icon={faCog} />
          <span>Settings</span>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
