import React from 'react';
import Analytics from './components/mainGrid';
// import UserCountyStats from './components/usersLoc';
import Header from './components/Header';
import Copyright from './components/copyright';
import SideMenu from './components/adminlog';
import SignIn from './components/Auth/Login'
import { Box, ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import { Settings } from '@mui/icons-material';
import Color from './components/Theme/Color';
import { useColorScheme } from '@mui/material/styles';
import Notfound from '../../CakeShop/src/components/Error/notfound';
import ClientList from './components/oftenClients';
import AddUser from './components/AddUser';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const {mode} = useColorScheme();
  const Theme = createTheme({
    palette: {
      mode: mode || 'light',
    },
  });

  return (
    <ThemeProvider theme={Theme}>
      <CssBaseline />
    <Box display="flex" flexDirection="row" sx={{ height: '100vh' }}>
      <Color/>
      <Box sx={{ width: '250px', bgcolor: 'background.default' }}>
        <SideMenu />
      </Box>
      <Box sx={{ flexGrow: 1, padding: 2 }}>
        <Header />
        <Routes>
          <Route path="/" element={<Analytics />} />
          {/* <Route path="/users" element={<UserCountyStats />} /> */}
          <Route path="/settings" element={<Settings />} />
          <Route path='/login' element={<SignIn />} />
          <Route path='/users' element={<ClientList />} />
          <Route path='/users/new' element={<AddUser/>}/>
          {/* <Analytics /> */}
          {/* <UserCountyStats /> */}
            <Route
              path="/"
              element={
                // <PrivateRoute>
                  <Analytics />
                // </PrivateRoute>
              }
            />
            <Route path='*' element={<Notfound />} />
        </Routes>
        <Copyright />
      </Box>
    </Box>
    <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
    />
    </ThemeProvider>
  );
}

export default App;
