// components/WithNavbar.jsx
//this is a wrapper class
// src/components/withNavbar.jsx
/*A wrapper component in programming,
particularly in front-end development with frameworks like React,
is a custom component that encapsulates or surrounds another component or elements,
adding extra functionality, styling, or behavior*/

// src/components/withNavbar.jsx
import Navbar from './Navbar';
import './Navbar.css'; // Make sure this is imported

export default function withNavbar(WrappedComponent) {
    return function WithNavbar(props) {
        return (
            <div className="page-container">
                <Navbar />
                <main className="content">
                    <WrappedComponent {...props} />
                </main>
            </div>
        );
    }
}