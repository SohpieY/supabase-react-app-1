// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import withNavbar from './components/withNavbar';
import Home from './Pages/Home';
import About from './Pages/About'
import Works from './Pages/Works';
import Shop from './Pages/Shop';
import Contact from './Pages/Contact';
import Cart from './Pages/Cart';
import { Landing } from "./Pages/Landing";
import { UserProfileCorner, LoginSuccessNotification } from './components/userComponent';
import { supabase } from './supabaseClient';
import GoogleAPI from './Pages/GoogleAPI'

// Import the artist versions of the pages
import shopArtist from './Pages/shopArtist';
import worksArtist from './Pages/worksArtist';

// Create wrapped components
const HomeWithNavbar = withNavbar(Home);
const AboutWithNavbar = withNavbar(About);
const WorksWithNavbar = withNavbar(Works);
const ShopWithNavbar = withNavbar(Shop);
const ContactWithNavbar = withNavbar(Contact);
const LoginWithNavbar = withNavbar(Landing);
const CartWithNavbar = withNavbar(Cart);

// Create wrapped components for artist views
const ShopArtistWithNavbar = withNavbar(shopArtist);
const WorksArtistWithNavbar = withNavbar(worksArtist);

function App() {
    const [user, setUser] = useState(null);
    const [userType, setUserType] = useState(null);
    const [showSuccessNotification, setShowSuccessNotification] = useState(false);

    // Check for existing session on app load
    useEffect(() => {
        checkSession();

        // Listen for auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
            if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
                setUser(session.user);
                setUserType('artist');
            } else if (event === 'SIGNED_OUT') {
                setUser(null);
                setUserType(null);
            }
        });

        return () => subscription.unsubscribe();
    }, []);

    const checkSession = async () => {
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
            setUser(session.user);
            setUserType('artist'); // Supabase auth is only for artists
        }
    };

    const handleLoginSuccess = ({ type, user: loggedInUser }) => {
        setUser(loggedInUser);
        setUserType(type);
        setShowSuccessNotification(true);

        // Hide notification after 3 seconds
        setTimeout(() => {
            setShowSuccessNotification(false);
        }, 3000);
    };

    const handleLogout = async () => {
        if (userType === 'artist') {
            // Logout from Supabase
            await supabase.auth.signOut();
        }

        setUser(null);
        setUserType(null);
    };

    const getUserName = () => {
        if (userType === 'viewer') {
            return user?.name || user?.email || 'Viewer';
        } else {
            return user?.email || 'Artist';
        }
    };

    return (
        <>
            {/* User Profile Corner - shows when logged in */}
            {user && (
                <UserProfileCorner
                    user={user}
                    userType={userType}
                    onLogout={handleLogout}
                />
            )}

            {/* Login Success Notification */}
            <LoginSuccessNotification
                show={showSuccessNotification}
                userType={userType}
                userName={getUserName()}
            />

            <Router>
                <Routes>

                    <Route path="/" element={<HomeWithNavbar />} />

{/*
                    <Route path="/" element={<ShopArtistWithNavbar />} />
*/}

                    <Route path="/About" element={<AboutWithNavbar />} />
                    <Route path="/Home" element={<HomeWithNavbar />} />
                    <Route path="/Shop" element={<ShopWithNavbar />} />
                    <Route path="/Contact" element={<ContactWithNavbar />} />
                    <Route
                        path="/Works"
                        element={<WorksWithNavbar />}
                    />
                    {/* Artist-only routes - only accessible when logged in as artist */}
                    {userType === 'artist' && (
                        <>
                            <Route path="/shop-artist" element={<ShopArtistWithNavbar />} />
                            <Route path="/works-artist" element={<WorksArtistWithNavbar />} />
                        </>
                    )}
                    {/*<Route
                        path="/Landing"
                        element={
                            <LoginWithNavbar
                                onLoginSuccess={handleLoginSuccess}
                            />
                        }
                    />*/}

                    <Route
                        path="/Landing"
                        element={
                            <GoogleAPI onLoginSuccess={handleLoginSuccess} />
                        }
                    />
                    {/*path finder for cart */}
                    <Route path={"/Cart"} element={<CartWithNavbar/>} />

                    {/* Redirect to home for any unknown routes */}
                    <Route path="*" element={<HomeWithNavbar />} />
                </Routes>
            </Router>
        </>
    );
}

export default App;