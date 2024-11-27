import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Color from "./Admin/Theme/Color.jsx";

// Client Imports
import Home from "./components/home.jsx";
import Profile from "./components/Profile/Userprofile.jsx";
import AllCakes from "./components/AllCakes";
import BirthDay from "./components/BirthDay";
import AddToCart from "./components/AddToCart";
import Contact from "./components/contact";
<<<<<<< HEAD
import CartView from './components/productCard/cardview.jsx';
import Footer from "./components/footer";
=======
import CartView from "./components/productCard/cardview.jsx";
>>>>>>> 64b62985bd2ca7180a4b1ac25b0b07e82f0b73c5
import NavBar from "./components/Header";
import AboutUs from "./components/about.jsx";
import ProductView from "./components/productCard/productview";
import ErrorBoundary from "./components/Error/errorBoundary";
import OrderPage from "./components/order/order";
import PrivateRoute from "./components/routes/PrivateRoute";
import SignUp from "./components/Auth/signUp";
import Login from "./components/Auth/logIn";
import Cookie from "./components/Cookie";
import { CartProvider } from "./components/GlobalCart";
import { AuthProvider } from "./components/contexts/AuthContext.jsx";
import NewToken from "./components/Auth/new_confirmation.jsx";

// Admin Imports
import Analytics from "./Admin/mainGrid";
import Notfound from "./components/Error/notfound";
import ClientList from "./Admin/oftenClients";
import AdminLayout from "./Admin/AdminLayout";
import Orders from "./Admin/utils/orders";

const lightTheme = createTheme({
  palette: {
    mode: "light",
  },
});

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  const [mode, setMode] = useState(() => {
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    
  });

  const [systemMode, setSystemMode] = useState(mode); // Tracks actual system mode

  useEffect(() => {
    const handleSystemThemeChange = (e) => {
      setSystemMode(e.matches ? "dark" : "light");
    };

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    mediaQuery.addEventListener("change", handleSystemThemeChange);

    return () => {
      mediaQuery.removeEventListener("change", handleSystemThemeChange);
    };
  }, []);

//   console.log(lightTheme);
// console.log(darkTheme);


  const theme = createTheme({
    palette: {
      mode: mode === "system" ? systemMode : mode,
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Color mode={mode} setMode={setMode} />
      <ErrorBoundary fallback={<Home />}>
        <AuthProvider>
          <CartProvider>
            <Router>
              <AddToCart />
              <Routes>
                {/* Client Routes */}
                <Route path="/" element={<Navigate to="/client" />} />
                <Route path="/client" element={<NavBar />}>
                  <Route index element={<Home />} />
                  <Route path="birthday" element={<BirthDay />} />
                  <Route path="all-cakes" element={<AllCakes />} />
                  <Route path="profile" element={<Profile />} />
                  <Route path="cookie" element={<Cookie />} />
                  <Route path="contact-us" element={<Contact />} />
                  <Route path="signup" element={<SignUp />} />
                  <Route path="login" element={<Login />} />
                  <Route path="cart" element={<CartView />} />
                  <Route path="about-us" element={<AboutUs />} />
                  <Route path="product-view/:productName" element={<ProductView />} />
                  <Route path="order" element={<PrivateRoute><OrderPage /></PrivateRoute>} />
                  <Route path="confirm_email" element={<NewToken />} />
                  <Route path="*" element={<Notfound />} />
                </Route>

                {/* Admin Routes */}
                <Route path="/admin" element={<AdminLayout />}>
                  <Route index element={<Analytics />} />
                  <Route path="notifications" element={<Orders />} />
                  <Route path="users" element={<ClientList />} />
                  <Route path="users/new" element={<ClientList />} />
                  <Route path="*" element={<Notfound />} />
                </Route>
              </Routes>
<<<<<<< HEAD
              <Footer />
=======
>>>>>>> 64b62985bd2ca7180a4b1ac25b0b07e82f0b73c5
            </Router>
          </CartProvider>
        </AuthProvider>
      </ErrorBoundary>

      <ToastContainer
        position="top-right"
        autoClose={3000}
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
