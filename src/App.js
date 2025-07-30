// src/App.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import withNavbar from './components/withNavbar';
import Home from './Pages/Home';
import About from './Pages/About'
import Works from './Pages/Works';
import Shop from './Pages/Shop';
import Contact from './Pages/Contact';

// Create wrapped components
const HomeWithNavbar = withNavbar(Home);
const AboutWithNavbar = withNavbar(About);
const WorksWithNavbar = withNavbar(Works);
const ShopWithNavbar = withNavbar(Shop);
const ContactWithNavbar = withNavbar(Contact);

function App() {
    return (
        <Router>
            <Routes>
                {/*
                <Route path="/" element={<HomeWithNavbar />} />
                */}
                <Route path="/" element={<WorksWithNavbar />} />


                {/* Other pages */}
                <Route path="/About" element={<AboutWithNavbar />} />
                <Route path="/Home" element={<HomeWithNavbar />} />
                <Route path="/Shop" element={<ShopWithNavbar />} />
                <Route path="/Contact" element={<ContactWithNavbar />} />
                <Route path="/Works" element={<WorksWithNavbar />} />
            </Routes>
        </Router>
    );
}

export default App;