import { useState } from 'react';
import '../stylesheets/Header.css';
import {Link} from 'react-router-dom'
import Images from './image';
import Logo from '../images/logo.png';


function Header() {

    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <header className="nillavee-header">
            <Images
                src={Logo}
                alt="Nillavee Logo"
                width="30"
                height="30"
                className="Nillave"
                // onClick={toggleMenu}
            />

            <div className="header-nav">
                <div className="logo-container">
                    <input type="text" placeholder="Search..." className="search-input" />
                    <p className="contact-info">+254723174434</p>
                </div>

                <ul className={`navigation ${isOpen ? "open" : ""}`}>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/">All Cakes</Link>
                    </li>
                    <li>
                        <Link to="/birthday">Birthday Cakes</Link>
                    </li>
                    <li>
                        <Link to="/about">About Us</Link>
                    </li>
                    <li>
                        <Link to="/contact_us">Contact Us</Link>
                    </li>
                </ul>
                <div>
                    {/* <AddToCart/> */}
                </div>
            </div>

            <div className="hamburger" onClick={toggleMenu}>
                {isOpen ? "✖" : "☰"}
            </div>
        </header>
    );
}

export default Header;
