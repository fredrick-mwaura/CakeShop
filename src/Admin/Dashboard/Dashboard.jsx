import React from 'react';
import Icon from '../../components/icon';
import { faBox, faUser, faFileAlt, faReceipt, faTachometerAlt } from '@fortawesome/free-solid-svg-icons';
import './styles/Dashboard.css';
// import AdHeader from './adHeader';
import Sidebar from './sidebar';
import { useNavigate } from 'react-router-dom';
// import Reports from '../components/reports';

const Dashboard = () => {
   const navigate = useNavigate();
   const reports = () => {
      navigate('/reports');
   };
   return (
      <div className="dashboardi">
      <Sidebar />
      <div className="contain">
         {/* Dashboard Section */}
         <div className="child">
            <Icon icon={faTachometerAlt} className="icon" size="2x" />
            <h2>Dashboard</h2>
            <p>Welcome back!</p>
         </div>

         {/* New Order Section */}
         <div className="child card-section">
            <Icon icon={faBox} className="icon" size="2x" />
            <h2>New Order</h2>
            <p>Orders: 10</p> {/* Replace with actual order count from notifications */}
         </div> 

         {/* Reports Section */}
         <div className="child card-section" onClick={reports}>
            <Icon 
            icon={faFileAlt}
            className="icon"
            size="2x"
            color="#00f000"
            />
              <h2>Reports</h2>
            <p>First Quarter</p>
         </div>

         {/* Users Section */}
         <div className="child card-section">
            <Icon icon={faUser} className="icon" size="2x" />
            <h2>Users</h2>
            <p>Frequent: Alex</p>
         </div>

         {/* Orders Section */}
         <div className="child">
            <Icon icon={faReceipt} className="icon" size="2x" />
            <h2>Orders</h2>
            <div className="stats-section">
               <p>Today: 5</p>
               <p>Monthly: 50</p>
            </div>
         </div>

         {/* Inventory Section */}
         <div className="child">
            <h2>Inventory</h2>
            <div className="stats-section">
               <p>Available</p>
               {/* Implement inventory data here */}
            </div>
         </div>

         {/* New Section */}
         <div className="child">
            <h2>New</h2>
            <p>Latest Orders</p>
         </div>
      </div>
      </div>
   );
};

export default Dashboard;
