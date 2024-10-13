import Home from "./components/home.jsx";
import { Toaster } from "react-hot-toast";
import { Profile } from "./components/Profile/Userprofile.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AllCakes from "./components/AllCakes";
import BirthDay from "./components/BirthDay";
import AddToCart from "./components/AddToCart";
import Contact from "./components/contact";
import { CartProvider } from "./components/GlobalCart";
import Footer from "./components/footer";
import { AuthProvider } from "./components/contexts/AuthContext.jsx";
import Cookie from "./components/Cookie";
import SignUp from "./components/Auth/signUp";
import Login from "./components/Auth/logIn";
import OrderPage from "./components/order/order";
import PrivateRoute from "./components/routes/PrivateRoute";
import NotFound from "./components/Error/notfound";
import Navbar from "./components/Header";
import ErrorBoundary from "./components/Error/errorBoundary";

function App() {
  return (
    <>
       <ErrorBoundary fallback={<Home />} >
      <Toaster position="top-right" reverseOrder={false} />
       <AuthProvider>
      <CartProvider>
        <Router>
          {/* <div> */}
            <AddToCart />
            <Navbar />
          {/* </div> */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/birthday" element={<BirthDay />} />
            <Route path="/all-cakes" element={<AllCakes />} />
            <Route path="/profile" element={<Profile />} />
             <Route path="/cookie" element={<Cookie addToCart={AddToCart} />} />
            <Route path="/contact-us" element={<Contact />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/order"
              element={
                <PrivateRoute>
                  <OrderPage />
                </PrivateRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </Router>
      </CartProvider>
       </AuthProvider>
       </ErrorBoundary>
    </>
  );
}

export default App;
