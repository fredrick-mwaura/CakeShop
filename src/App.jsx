import Home from "./home";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Navbar from "./components/Header";
import AllCakes from "./components/AllCakes";
import BirthDay from "./components/BirthDay";
import AddToCart from "./components/AddToCart";
import Contact from "./components/contact";
import { CartProvider } from "./components/GlobalCart";
import Footer from "./components/footer";
import Cookie from "./components/Cookie";
import Notfound from "./components/Error/notfound";
// import ErrorBoundary from "./components/Error/errorBoundary";

function App() {

  return (
    <>
      {/* <ErrorBoundary fallback= "<Home/>"> */}
      <CartProvider>
        <Router>
          <div>
            <AddToCart />
            <Navbar />
          </div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/birthday" element={<BirthDay />} />
            <Route path="/AllCakes" element={<AllCakes />} />
            {/* <Route path="/cookies" element={<Cookie/>} /> */}
            <Route path="/cookie" element={<Cookie addToCart={AddToCart} />} />
            <Route path="/contact_us" element={<Contact />} />
            <Route path="*" to={<Notfound />} />
          </Routes>
          <Footer />
        </Router>
      </CartProvider>
      {/* </ErrorBoundary> */}
    </>
  );
}

export default App;
