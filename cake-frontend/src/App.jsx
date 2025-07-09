import React, { useState, useEffect, useCallback, lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import 'font-awesome/css/font-awesome.min.css';
import CssBaseline from "@mui/material/CssBaseline";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
// import Restricted from './components/contexts/restrict';

// Client Imports

import Home from "./components/home.jsx";
import NavBar from "./components/Header";
import ErrorBoundary from "./components/Error/errorBoundary";
import PrivateRoute from "./components/routes/PrivateRoute";
// import ProtectedRoute from "./components/routes/protectedRoutes";
import { CartProvider } from "./components/GlobalCart";
import { AuthProvider } from "./components/contexts/AuthContext.tsx";

// Admin Imports
const AllCakes = lazy(() => import("./components/AllCakes"));
const BirthDay = lazy(() => import("./components/BirthDay"));
const Contact = lazy(() => import("./components/contact"));
const CartView = lazy(() => import("./components/productCard/cardview.jsx"));
const AboutUs = lazy(() => import("./components/about.jsx"));
const ProductView = lazy(() => import("./components/productCard/productview"));
const OrderPage = lazy(() => import("./components/order/order"));
const SignUp = lazy(() => import("./components/Auth/signUp"));
const Login = lazy(() => import("./components/Auth/logIn"));
const Cookie = lazy(() => import("./components/Cookie"));
const NewToken = lazy(() => import("./components/Auth/new_confirmation.jsx"));
const ForgotPassword = lazy(() => import("./components/Auth/forgotPassword.jsx"));
const Profile = lazy(() => import("./components/Profile/profile"));
const Blogs = lazy(() => import("./components/Blogs.jsx"));
const Reviews = lazy(() => import("./components/Reviews.jsx"));
const Analytics = lazy(() => import("./Admin/mainGrid"));
const Notfound = lazy(() => import("./components/Error/notfound"));
const ClientList = lazy(() => import("./Admin/oftenClients"));
const AdminLayout = lazy(() => import("./Admin/AdminLayout"));
const Orders = lazy(() => import("./Admin/utils/orders"));
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

  return (
    // <ThemeProvider >
    <div data-aos="fade-down">
      <Suspense fallback={<div className="text-center min-h-screen">Loading...</div>}>
      <CssBaseline />
      <ErrorBoundary>
        <AuthProvider>
          <CartProvider>
            <Router>
              {/* <AddToCart showToast={showToast}/> */}
              <Routes data-aos="fade-up">
                {/* All client routes under root with NavBar */}
                <Route path="/" element={<NavBar />}>
                  {/* Pass showToast to Home so AddToCart works as expected */}
                  {/* <Route index element={<Home showToast={showToast} />} /> nimetoa juu there is routing and rendering issue*/}
                  <Route index element={<div>Test Render</div>} />
                  <Route path="birthday" element={<BirthDay showToast={showToast} />} />
                  <Route path="all-cakes" element={<AllCakes showToast={showToast} />} />
                  <Route path="cookie" element={<Cookie showToast={showToast} />} />
                  <Route path="contact-us" element={<Contact />} />
                  <Route path="signup" element={<SignUp />} />
                  <Route path="login" element={<Login />} />
                  <Route path="forgot-password" element={<ForgotPassword />} />
                  <Route path="cart" element={<CartView />} />
                  <Route path="about-us" element={<AboutUs />} />
                  <Route path="product-view/:productName" element={<ProductView />} />
                  <Route path="order" element={OrderPage}/>
                  <Route path="profile" element={<Profile/>}/>
                  <Route path="confirm_email" element={<NewToken />} />
                  <Route path="blogs" element={<Blogs />} />
                  <Route path="*" element={<Notfound />} />
                </Route>

                {/* Auth routes outside main NavBar layout (moved for direct access) */}
                {/* Removed showToast from Auth routes for clarity: */}
                {/* <Route path="/signup" element={<SignUp showToast={showToast} />} /> */}
                {/* <Route path="/login" element={<Login showToast={showToast} />} /> */}
                {/* <Route path="/forgot-password" element={<ForgotPassword showToast={showToast} />} /> */}

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

      </Suspense>   
    </div>
  );
}

export default App;