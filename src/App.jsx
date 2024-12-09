import React, { useState, useEffect, useCallback } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import { ThemeProvider, createTheme } from "@mui/material/styles";
import 'font-awesome/css/font-awesome.min.css';
import CssBaseline from "@mui/material/CssBaseline";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Restricted from './components/contexts/restrict';

// Client Imports
import Home from "./components/home.jsx";
import AllCakes from "./components/AllCakes";
import BirthDay from "./components/BirthDay";
// import AddToCart from "./components/AddToCart";
import Contact from "./components/contact";
// import Footer from "./components/footer";
import CartView from "./components/productCard/cardview.jsx";
import NavBar from "./components/Header";
import AboutUs from "./components/about.jsx";
import ProductView from "./components/productCard/productview";
import ErrorBoundary from "./components/Error/errorBoundary";
import OrderPage from "./components/order/order";
import PrivateRoute from "./components/routes/PrivateRoute";
// import ProtectedRoute from "./components/routes/protectedRoutes";
import SignUp from "./components/Auth/signUp";
import Login from "./components/Auth/logIn";
import Cookie from "./components/Cookie";
import { CartProvider } from "./components/GlobalCart";
import { AuthProvider } from "./components/contexts/AuthContext.jsx";
import NewToken from "./components/Auth/new_confirmation.jsx";
import ForgotPassword from "./components/Auth/forgotPassword.jsx";
import Profile from "./components/Profile/profile";
import Blogs from "./components/Blogs.jsx";
import Reviews from "./components/Reviews.jsx";

// Admin Imports
import Analytics from "./Admin/mainGrid";
import Notfound from "./components/Error/notfound";
import ClientList from "./Admin/oftenClients";
import AdminLayout from "./Admin/AdminLayout";
import Orders from "./Admin/utils/orders";
import AOS from "aos";
import "aos/dist/aos.css";

function App() {
  const [toastId, setToastId] = useState(null);
  useEffect(() => {
    AOS.init({
      duration: 1000, 
      easing: "ease-in-out", 
      once: true, 
      mirror: false,
    });
  }, []);

  // Callback for managing toasts globally
  const showToast = useCallback(
    (message) => {
      if (toastId) {
        toast.dismiss(toastId);
      }

      const newToastId = toast(message, {
        position: "top-right",
        autoClose: 2000,
      });

      setToastId(newToastId);
    },
    [toastId]
  );

  // Listen for system theme changes
  // useEffect(() => {
  //   const handleSystemThemeChange = (e) => {
  //     setSystemMode(e.matches ? "dark" : "light");
  //   };

  //   const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
  //   mediaQuery.addEventListener("change", handleSystemThemeChange);

  //   return () => {
  //     mediaQuery.removeEventListener("change", handleSystemThemeChange);
  //   };
  // }, []);

  // const theme = createTheme({
  //   palette: {
  //     mode: mode === "system" ? systemMode : mode,
  //   },
  // });

  return (
    // <ThemeProvider >
    <div data-aos="fade-down">
      <CssBaseline />
      <ErrorBoundary fallback={<Home />}>
        <AuthProvider>
          <CartProvider>
            <Router>
              {/* <AddToCart showToast={showToast}/> */}
              <Routes data-aos="fade-up">
                {/* Client Routes */}
                <Route path="/" element={<Navigate to="/client" />} />
                <Route path="/client" element={<NavBar />}>
                  <Route index element={<Home />} />
                  <Route path="birthday" element={<BirthDay showToast={showToast} />} />
                  <Route path="all-cakes" element={<AllCakes showToast={showToast} />} />
                  <Route path="cookie" element={<Cookie showToast={showToast} />} />
                  <Route path="contact-us" element={<Contact />} />
                  <Route path="signup" element={<Restricted><SignUp /></Restricted>} />
                  <Route path="login" element={<Restricted><Login /></Restricted>} />
                  <Route path="forgot-password" element={<ForgotPassword />} />
                  <Route path="cart" element={<CartView />} />
                  <Route path="about-us" element={<AboutUs />} />
                  <Route path="product-view/:productName" element={<ProductView />} />
                  <Route path="order" element={<PrivateRoute><OrderPage /></PrivateRoute>} />
                  <Route path="profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
                  {/* <ProtectedRoute path="orders" element={<OrderPage />} />
                  <ProtectedRoute path="profile" element={<Profile />} /> */}
                  <Route path="confirm_email" element={<NewToken />} />
                  <Route path="blogs" element={<Blogs />} />
                  <Route path="reviews" element={<Reviews/>}/>
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
            </Router>
          </CartProvider>
        </AuthProvider>
      </ErrorBoundary>

      {/* Toast Container for global toasts */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
   
    </div>
  );
}

export default App;
