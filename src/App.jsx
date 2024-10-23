import Home from "./components/home.jsx";
import { Toaster } from "react-hot-toast";
import { Profile } from "./components/Profile/Userprofile.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AllCakes from "./components/AllCakes";
import BirthDay from "./components/BirthDay";
import AddToCart from "./components/AddToCart";
import Contact from "./components/contact";
import { CartProvider } from "./components/GlobalCart";
import CartView from './components/productCard/cardview.jsx'
import Footer from "./components/footer";
import { AuthProvider } from "./components/contexts/AuthContext.jsx";
import Cookie from "./components/Cookie";
import SignUp from "./components/Auth/signUp";
import Login from "./components/Auth/logIn";
import OrderPage from "./components/order/order";
import PrivateRoute from "./components/routes/PrivateRoute";
import Navbar from "./components/Header";
import ProductView from './components/productCard/productview'
import ErrorBoundary from "./components/Error/errorBoundary";
import Dash from "./Admin/dash.jsx";

function App() {
  return (
    <>
       <ErrorBoundary fallback={<Home />} >
      <Toaster position="top-center" reverseOrder={true} />
       <AuthProvider>
      <CartProvider>
        <Router>
            <AddToCart />
            <Navbar />
          
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="birthday" element={<BirthDay />} />
            <Route path="all-cakes" element={<AllCakes />} />
            <Route path="profile" element={<Profile />} />
             <Route path="cookie" element={<Cookie addToCart={AddToCart} />} />
            <Route path="contact-us" element={<Contact />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="login" element={<Login />} />
            <Route path="cart" element={<CartView/>}/>
            <Route path="dash" element={<Dash/>}/>
            <Route path="/product-view/:productName" element={<ProductView/>}/>


            <Route
              path="/order"
              element={
                <PrivateRoute>
                  <OrderPage />
                </PrivateRoute>
              }
            />
            <Route path="*" element={<Home />} />
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
