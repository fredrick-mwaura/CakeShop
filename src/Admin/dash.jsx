import React from 'react';
import Sidebar from './Dashboard/sidebar';
import { Routes, Route } from "react-router-dom";
import Users from './Dashboard/users';

const Dash = () => {
   return (
      <div className='admin'>
         {/* <Router> */}
         <Sidebar/>
            <Routes>
               <Route path="/admin" element={<h1>Welcome to the Dashboard</h1>} />
               <Route path="/users" element={<Users/>} />
               <Route path="/orders" element={<h1>Orders</h1>} />
               <Route path="/products" element={<h1>Products</h1>} />
            </Routes>
         {/* </Router> */}
      </div>
      
   );
}

export default Dash;
