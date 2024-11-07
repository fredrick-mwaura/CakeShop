import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';
import Color from "./Theme/Color";
import SideMenu from "./adminlog";
import Header from "./Header";
import Copyright from "./copyright";

const AdminLayout = () => (
  <Box display="flex" flexDirection="row" sx={{ height: '100vh' }}>
    <Color />
    <Box sx={{ width: '250px', bgcolor: 'background.default' }}>
      <SideMenu />
    </Box>
    <Box sx={{ flexGrow: 1, padding: 2 }}>
      <Header />
      <Outlet />
      <Copyright />
    </Box>
  </Box>
);

export default AdminLayout;
