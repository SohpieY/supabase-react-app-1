/*import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import withNavbar from './components/withNavbar';
/!*import Navbar from './components/Navbar';*!/
import Home from './Pages/Home.js';
import About from './Pages/About.js';
import Works from './Pages/Works.js';
import Shop from './Pages/Shop.js';
import Contact from './Pages/Contact.js';*/

// src/App.js
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import withNavbar from './components/withNavbar';
import Home from './Pages/Home.js';
import About from './Pages/About.js';
import Works from './Pages/Works.js';
import Shop from './Pages/Shop.js';
import Contact from './Pages/Contact.js';

// Create wrapped components using the HOC
const HomeWithNavbar = withNavbar(Home);
const AboutWithNavbar = withNavbar(About);
const WorksWithNavbar = withNavbar(Works);
const ShopWithNavbar = withNavbar(Shop);
const ContactWithNavbar = withNavbar(Contact);

function App() {
    return (
        <Router>
            <Routes>
                {/* Redirect root path to /about */}
                <Route path="/" element={<Navigate to="/about" replace />} />

                {/* About Page - First entry point */}
                <Route
                    path="/about"
                    element={<AboutWithNavbar />}
                />

                {/* Home Page */}
                <Route
                    path="/home"
                    element={<HomeWithNavbar />}
                />

                {/* Works Page */}
                <Route
                    path="/works"
                    element={<WorksWithNavbar />}
                />

                {/* Shop Page */}
                <Route
                    path="/shop"
                    element={<ShopWithNavbar />}
                />

                {/* Contact Page */}
                <Route
                    path="/contact"
                    element={<ContactWithNavbar />}
                />
            </Routes>
        </Router>
    );
}

export default App;