import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
// import { Toaster } from "react-hot-toast";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

// Client Imports
import Home from "./components/home.jsx";
import Profile from "./components/Profile/Userprofile.jsx";
import AllCakes from "./components/AllCakes";
import BirthDay from "./components/BirthDay";
import AddToCart from "./components/AddToCart";
import Contact from "./components/contact";
import CartView from './components/productCard/cardview.jsx';
import Footer from "./components/footer";
import NavBar from "./components/Header";
import AboutUs from "./components/about.jsx";
import ProductView from './components/productCard/productview';
import ErrorBoundary from "./components/Error/errorBoundary";
import OrderPage from "./components/order/order";
import PrivateRoute from "./components/routes/PrivateRoute";
import SignUp from "./components/Auth/signUp";
import Login from "./components/Auth/logIn";
import Cookie from "./components/Cookie";
import { CartProvider } from "./components/GlobalCart";
import { AuthProvider } from "./components/contexts/AuthContext.jsx";
import NewToken from "./components/Auth/new_confirmation.jsx";
// import { useNavigate } from "react-router-dom";

// Admin Imports
import Analytics from "./Admin/mainGrid";
import Notfound from "./components/Error/notfound";
import ClientList from "./Admin/oftenClients";
// import UserTable from "./Admin/oftenClients";
import AdminLayout from "./Admin/AdminLayout";
// import SignIn from "./Admin/Auth/Login";

function App() {
  const theme = createTheme({
    palette: {
      mode: 'light',
    },
  });

  // const Navigate = useNavigate();
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ErrorBoundary fallback={<Home />}>
        {/* <Toaster position="top-right" reverseOrder={true} /> */}
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
                  <Route path="cookie" element={<Cookie /> }/> 
                  {/* <Route path="cookie" element={<Cookie /> }/> addToCart={AddToCart} />} /> */}
                  <Route path="contact-us" element={<Contact />} />
                  <Route path="signup" element={<SignUp />} />
                  <Route path="login" element={<Login />} />
                  <Route path="cart" element={<CartView />} />
                  <Route path="about-us" element={<AboutUs />} />
                  <Route path="product-view/:productName" element={<ProductView />} />
                  <Route path="order" element={<PrivateRoute><OrderPage /></PrivateRoute>} />
                  <Route path="confirm_email" element={<NewToken/>} />
                  <Route path="*" element={<Notfound />} />
                </Route>

                {/* Admin Routes */}
                <Route path="/admin" element={<AdminLayout />}>
                  <Route index element={<Analytics />} />
                  {/* <Route path="login" element={<SignIn />} /> */}
                  <Route path="users" element={<ClientList />} />
                  <Route path="users/new" element={<ClientList />} />
                  <Route path="*" element={<Notfound />} />
                </Route>
              </Routes>
              <Footer />
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
