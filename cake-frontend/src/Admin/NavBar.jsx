import React from 'react'
// Added Outlet for nested routing
import { Outlet } from 'react-router-dom'

function NavBar() {
   return (
      <div className="main">class1
        {/* Render nested routes here */}
        <Outlet />
      </div>
   )
}

export default NavBar

