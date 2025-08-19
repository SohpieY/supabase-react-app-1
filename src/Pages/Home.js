// src/Pages/Home.js
import { Link } from 'react-router-dom';

import './Home.css';


export default function Home() {

    return (
        <div className="artistic-layout">
            {/*<Link to="/about" style={{ position: 'fixed', top: '10px', left: '10px', zIndex: 9999, background: 'red' }}>
                TEST ABOUT LINK
            </Link>*/}

            <div className={"login-directory"}>
                <Link to="/Landing" className="login-button">
                    <img src="/images/icons/user_icon.svg" alt="login" />
                    <span>log in</span>
                </Link>

            </div>
            <div className="content-wrapper">
                {/* Top Left - My Work */}
                <Link to="/Works" className="corner-image top-left">
                    <img src="/images/main-icon/mywork_mainpage.png" alt="My Work" />
                    <span>my work</span>
                </Link>

                {/* Top Right - Shop */}
                <Link to="/Shop" className="corner-image top-right">
                    <img src="/images/main-icon/shoppingcart1_mainpage.png" alt="Shop" />
                    <span>shop</span>
                </Link>

                <div className="swirl-container">
                    <img className= "swirl" src="/images/main-icon/swirl_mainpage.png" alt="Swirl" />
                </div>

                {/* Center Content */}
                <div className="center-heading">
                    <h1 className="center-subheading">My name is...</h1>
                    <span className="typing-container">
                        <span className="letter">T</span>
                        <span className="letter">i</span>
                        <span className="letter">n</span>
                        <span className="letter">a</span>
                        <span className="cursor">|</span>
                    </span>
                    <h2 className="center-subheading-2">and I'm an</h2>
                    <h2 className="center-subheading-3">artist ⭐ painter ⭐ student</h2>
                </div>

                {/* Bottom Left - About Me */}
                <Link to="/About" className="corner-image bottom-left">
                    <img src="/images/main-icon/aboutme_mainpage.png" alt="About Me" />
                    <span>about me</span>
                </Link>

                {/* Bottom Right - Contact */}
                <Link to="/Contact" className="corner-image bottom-right">
                    <img src="/images/main-icon/contactme_mainpage.png" alt="Contact" />
                    <span>contact</span>
                </Link>




            </div>

            <div className="content-side">
                <div className="side-bar">
                    <div className="pin-and-text">
                        <img
                            src={"/images/main-icon/pin.png"}
                            alt="locationpin"
                            className="pin-location"
                        />
                        <div className="vertical-text">
                            H<br />O<br />N<br />G<br /> <br />K<br />O<br />N<br />G<br />●<br />X<br />X<br />X<br />X<br />X<br />X<br />X<br /> <br /> I<br />N<br />T<br />L<br /> <br /> S<br />C<br />H<br />O<br />O<br />L
                        </div>
                    </div>
                </div>

            </div>


            <div className="connecting-bar">

                <img className="dog-bar" src={"/images/main-icon/dotted_mainpage.png"} alt={"dogbar"}/>
                <img className="dog" src={"/images/main-icon/dog_mainpage.png"} alt={"dog"}/>

            </div>

            <div className="gallery">
                <h2 className={"gallery-heading"}>Gallery</h2>
                <div className="gallery-img">
                    <img className={"flowerpot"} src={"/images/artwork/AW3_flower_mainpage.png"} alt={"flowerpot"}/>
                    <img className={"pattern-painting"} src={"/images/artwork/AW7_flowers_mainpage.png"} alt={"patternpainting"}/>
                    <img className={"laying-painting"} src={"/images/artwork/AW6_laying_mainpage.png"} alt={"layingpainting"}/>
                    <img className={"apples-painting"} src={"/images/artwork/AW1_apples_mainpage.png"} alt={"applespainting"}/>
                    <img className={"thread-artwork"} src={"/images/artwork/AW2_thread_mainpage.png"} alt={"thread-artwork"}/>
                </div>
                <img
                    src="/images/gifs/arrow_mainpage.gif"
                    className="arrow-gif"
                    alt="Scroll indicator arrow"
                />
                <span className={"arrow-message"}>Click for more!</span>
            </div>
            <div className="page-extender"></div>


        </div>
    );
}