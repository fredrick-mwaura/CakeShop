import Home from "./components/home.jsx";
import CssBaseline from '@mui/material/CssBaseline';
import { Toaster } from "react-hot-toast";
import { Profile } from "./components/Profile/Userprofile.jsx";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import AllCakes from "./components/AllCakes";
import BirthDay from "./components/BirthDay";
import AddToCart from "./components/AddToCart";
import Contact from "./components/contact";
import { CartProvider } from "./components/GlobalCart";
import CartView from './components/productCard/cardview.jsx';
import Footer from "./components/footer";
import { AuthProvider } from "./components/contexts/AuthContext.jsx";
import Cookie from "./components/Cookie";
import SignUp from "./components/Auth/signUp";
import Login from "./components/Auth/logIn";
import OrderPage from "./components/order/order";
import PrivateRoute from "./components/routes/PrivateRoute";
// import Navbar from "./components/Header";
import ProductView from './components/productCard/productview';
import ErrorBoundary from "./components/Error/errorBoundary";
import Notfound from "./components/Error/notfound";

function App() {
  return (
    <>
      <CssBaseline />
      <ErrorBoundary fallback={<Home />}>
        <Toaster position="top-center" reverseOrder={true} />
        <AuthProvider>
          <CartProvider>
            <Router>
              <MainContent />
              <Footer />
            </Router>
          </CartProvider>
        </AuthProvider>
      </ErrorBoundary>
    </>
  );
}

const MainContent = () => {
  const location = useLocation();
  const isNotFound = location.pathname === '/notfound' || location.pathname === '*'; // Adjust this if your NotFound route is different

  return (
    <>
      {!isNotFound && <AddToCart />} {/* Conditionally render AddToCart */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="birthday" element={<BirthDay />} />
        <Route path="all-cakes" element={<AllCakes />} />
        <Route path="profile" element={<Profile />} />
        <Route path="cookie" element={<Cookie addToCart={AddToCart} />} />
        <Route path="contact-us" element={<Contact />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="login" element={<Login />} />
        <Route path="cart" element={<CartView />} />
        <Route path="/product-view/:productName" element={<ProductView />} />
        <Route
          path="/order"
          element={
            <PrivateRoute>
              <OrderPage />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<Notfound />} />
      </Routes>
    </>
  );
};

export default App;
