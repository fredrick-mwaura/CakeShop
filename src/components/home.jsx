import React from 'react';
// import Header from './Header.jsx'
import Features from './Features.jsx';
import Hws from './hws.jsx'
import AddToCart from "./AddToCart.jsx";

function Home() {
  // console.log('Home.jsx is logged');
  return (
      <>
        <Header/>
        <AddToCart/>
        <Hws/>
        <Features />
      </>
  )
}
export default Home;
