import React from 'react';
import Features from './Features.jsx';
import Hws from './hws.jsx';
import AddToCart from './AddToCart.jsx';
// import Whatsapp from './Button/Whatsapp.jsx';
// import Birthday from './featured' ;
import QRCodeOnHover from './Button/test.jsx'
import Footer from './footer'

function Home() {
  // console.log('Home.jsx is logged');
  return (
      <div>
        <AddToCart/>
        <Hws/>
        <Features />
        <QRCodeOnHover/>
        <Footer/>
        
        {/* <Whatsapp/> */}
      </div>
  )
}
export default Home;
