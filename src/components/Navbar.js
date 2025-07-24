// src/components/Navbar.js
import { Link } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
    return (
        <nav className="navbar">
            {/* Left Group - need to space evenly*/}

            <div className="nav-box">
                <Link to="/works" className="nav-icon my-work">
                    <img
                        src="/images/nav-icons/mywork_logobar.png"
                        alt="My Work"
                        className="nav-img"
                    />
                    <span className="nav-label">my work</span>
                </Link>
            </div>

            {/* Middle Left - Shop */}
            <div className="nav-box">
                <Link to="/shop" className="nav-icon">
                    <img
                        src="/images/nav-icons/shop_logobar.png"
                        alt="Shop"
                        className="nav-img"
                    />
                    <span className="nav-label">shop</span>
                </Link>
            </div>


            {/* Center Logo */}
            <div className="nav-logo">
                <Link to="/home" className="nav-icon">
                    <span className="logo-main">Tina Won</span>
                    <span className="logo-sub">artist ✧ painter ✧ student</span>
                </Link>
            </div>

            {/* Middle Right - About */}
            <div className="nav-box">
                <Link to="/about" className="nav-icon about">
                    <img
                        src="/images/nav-icons/aboutme_logobar.png"
                        alt="About"
                        className="nav-img"
                    />
                    <span className="nav-label">about me</span>
                </Link>
            </div>

            {/* Right Group - need to space evenly from edge */}
            <div className="nav-box">
                <Link to="/contact" className="nav-icon">
                    <img
                        src="/images/nav-icons/letter_logobar.png"
                        alt="Contact"
                        className="nav-img"
                    />
                    <span className="nav-label">contact</span>
                </Link>
            </div>
        </nav>
    );
}

/*
export default function Navbar() {
    return (
        <header className="navbar">
            {/!* Left icon - My Work *!/}
            <Link to="/works" className="nav-icon">
                {/!* REPLACE THIS WITH IMAGE *!/}
                <img src="/images/nav-icons/mywork_logobar.png" alt="My Work" />
                <span className="fallback-text">my work</span>
            </Link>

            {/!* Left icon - Shop *!/}
            <Link to="/shop" className="nav-icon">
                <img src="/images/nav-icons/shop_logobar.png" alt="Shop" />
                <span className="fallback-text">shop</span>
            </Link>

            {/!* Center logo - Home link *!/}
            <Link to="/" className="nav-logo-text">
                <span className="logo-text">Tina Wan</span>
                <span className="logo-subtext">artist * painter * student</span>
            </Link>

            {/!* Right icon - About *!/}
            <Link to="/about" className="nav-icon">
                <img src="/images/nav-icons/aboutme_logobar.png" alt="About" />
                <span className="fallback-text">about me</span>
            </Link>

            {/!* Right icon - Contact *!/}
            <Link to="/contact" className="nav-icon">
                <img src="/images/nav-icons/letter_logobar.png" alt="Contact" />
                <span className="fallback-text">contact</span>
            </Link>
        </header>
    );
}*/
