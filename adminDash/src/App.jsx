import React from 'react';
import Analytics from './components/mainGrid';
import UserCountyStats from './components/usersLoc';
import Header from './components/Header';
import Copyright from './components/copyright';
import SideMenu from './components/adminlog';
import { Box } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import { Settings } from '@mui/icons-material';

function App() {
  return (
    <Box display="flex" flexDirection="row" sx={{ height: '100vh' }}>
      <Box sx={{ width: '250px', bgcolor: 'background.default' }}>
        <SideMenu />
      </Box>
      <Box sx={{ flexGrow: 1, padding: 2 }}>
        <Header />
        <Routes>
          <Route path="/" element={<Analytics />} />
          <Route path="/users" element={<UserCountyStats />} />
          <Route path="/settings" element={<Settings />} />
          {/* <Analytics />
          <UserCountyStats /> */}
        </Routes>
        <Copyright />
      </Box>
    </Box>
  );
}

export default App;
