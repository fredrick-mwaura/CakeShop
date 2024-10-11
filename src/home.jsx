// import React from 'react'
import './stylesheets/Home.css'
import Cake from './images/cake.webp'
import Celebrate from './images/celebrate.webp'
import Cut from './images/cut.webp'
import Navbar from './components/Header'
import Footer from './components/footer.jsx'
import Features from './components/Features.jsx'
// import BirthDay from './components/BirthDay.jsx'

export default function Home() {
 return (
   <>
     <Navbar/>
     <div className="homepage">
       <div className="container">
         <div className="content">
           <div className="text-content">
             <h1>
               Fresh and Yummy Cakes <br /> for You
             </h1>
             <p>Your taste buds never had it so good.</p>
             <button className="shop-button">Shop Now</button>
           </div>

           <div className="image-content">
             <img src={Cut} alt="Cake Party" className="main-image" />
             <div className="side-images">
               <img src={Celebrate} alt="Closeup Cake" className="side-image" />
               <img src={Cake} alt="Orange Cake" className="side-image" />
             </div>
           </div>
         </div>
       </div>
     </div>
     <div>
       <Features />
     </div>
     {/* <BirthDay/> */}
     <div>
      <Footer/>
    </div>
   </>
 );
};
