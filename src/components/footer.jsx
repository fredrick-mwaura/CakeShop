// import React from 'react'
import '../stylesheets/footer.css'

export default function Footer() {
    const year = new Date().getFullYear;
  return (
    <div className='foot'>
    <div className='footer'>

        <ul>
            <h4 className='text-rose-950'>Product</h4>
            <li><a href="#">Product List</a></li>
            <li><a href="#">Celebration Insights</a></li>
            <li><a href="#">Flavours</a></li>
            <li><a href="#">Cake Size Pricing</a></li>
            <li><a href="#">Reviews</a></li>
        </ul>
        <ul>
            <h4>Socials</h4>
            <li><a href="#" target="_blank"><i className="fab fa-instagram-square"></i>Instagram</a></li>
            <li><a href="#" target="_blank"><i className="fab fa-facebook-square"></i>Facebook</a></li>
            <li><a href="https://www.x.com" target="_blank"><i className="fab fa-twitter-square"></i>Twitter</a></li>
        </ul>
    <div>
        <h4>Contact</h4>
        <p>Phone: 123-456-7890</p>
        <p>Email: baker@birthdaybaker.com</p>
    </div>
    </div>

    <div  className='footer-bottom'>
        <p>© {year} Cakes by Birthday Baker. All rights reserved.</p>
      </div>
    </div>
  )
}
