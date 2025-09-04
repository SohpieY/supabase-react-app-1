import {GoogleLogin} from "@react-oauth/google"
import googleAPI from './GoogleAPI.js'
import './Landing.css'
import { jwtDecode } from "jwt-decode"
import { useState } from 'react'
import { supabase } from '../supabaseClient'

export function Landing({onLoginSuccess}) {
    const [userType, setUserType] = useState('viewer') // 'viewer' or 'artist'
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const CLIENT_ID = "836275110441-psg7v88gkf8p9dj7i0odc9b8ehl4cmb7.apps.googleusercontent.com";


    // Handle artist login
    const artistLogin = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError('')

        try {
            // sign in with Supabase Auth
            /* this method is where supabase checks the credentials against its internal auth.users table, so it is supabase's funciton*/
            const {data, error} = await supabase.auth.signInWithPassword({
                email: username, // Using username as email
                password: password,
            })

            if (error) {
                setError('Are you the artist? Please enter valid artist username or password. ')
            } else {
                // Successfully logged in as artist
                console.log('Artist logged in:', data)
                if (onLoginSuccess) {
                    onLoginSuccess({type: 'artist', user: data.user})
                }
            }
        } catch (err) {
            setError('Login failed... Please try again :(')
            console.error('Login error:', err)
        } finally {
            setLoading(false)
        }
    }



    // Handle Google login for viewers
    const googleLoginSuccess = (credentialResponse) => {
        try {
            const decoded = jwtDecode(credentialResponse.credential)
            console.log('Viewer logged in:', decoded)
            if (onLoginSuccess) {
                onLoginSuccess({type: 'viewer', user: decoded})
            }
        } catch (err) {
            console.error('Google login decode error:', err)
            setError('Google login failed')
        }
    }

    const googleError = () => {
        console.log("Google Login Failed :(")
        setError('Google login failed')
    }

    return (
        <div className="landing-container">
            <div className="login-card">
                <h1 className="login-title">Log In</h1>

                {/* Choose between Viewer or Artist login */}
                <div className="user-type-toggle">
                    {/* Viewer button */}
                    <button
                        className={userType === 'viewer' ? 'toggle-btn active' : 'toggle-btn'}
                        onClick={() => {
                            setUserType('viewer')
                            setError('') // Clear error when switching to viewer
                            setUsername('') //clear username
                            setPassword('') // clear password
                        }}
                    >
                        <span className="toggle-icon">👁️</span>
                        Viewer
                    </button>

                    {/* Artist button */}
                    <button
                        className={userType === 'artist' ? 'toggle-btn active' : 'toggle-btn'}
                        onClick={() => {
                            setUserType('artist')
                            setError('') // Clear error when switching to artist
                            setUsername('') // Optional: also clear username
                            setPassword('') // Optional: also clear password
                        }}
                    >
                        <span className="toggle-icon">🎨</span>
                        Artist
                    </button>
                </div>

                {/* Show error message if there is one */}
                {error && (
                    <div className="error-message">
                        {error}
                    </div>
                )}

                {/* Show Google login for viewers */}
                {userType === 'viewer' && (
                    <div className="google-login-section">
                        <p className="login-description">
                            Sign in with Google to explore and purchase artworks!
                        </p>
                        <div className="google-login-container">
                            <GoogleLogin
                                onSuccess={googleLoginSuccess}
                                onError={googleError}
                            />

                            <googleAPI/>

                        </div>
                    </div>
                )}

                {/* Show username/password login for artists */}
                {userType === 'artist' && (
                    <div className="artist-login-section">
                        <p className="login-description">
                            Please enter your credentials to manage your portfolio
                        </p>

                        <form onSubmit={artistLogin} className="login-form">
                            {/* Username input */}
                            <div className="form-group">
                                <label htmlFor="username">Username</label>
                                <input
                                    type="text"
                                    id="username"
                                    value={username}
                                    onChange={(event) => setUsername(event.target.value)}
                                    required
                                    disabled={loading}
                                />
                            </div>

                            {/* Password input */}
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input
                                    type="password"
                                    id="password"
                                    value={password}
                                    onChange={(event) => setPassword(event.target.value)}
                                    required
                                    disabled={loading}
                                />
                            </div>

                            {/* Submit button */}
                            <button
                                type="submit"
                                className="login-btn"
                                disabled={loading}
                            >
                                {loading ? 'Logging in...' : 'Log in'}
                            </button>
                        </form>
                    </div>
                )}

                {/* Show sign up link for viewers */}
                {userType === 'viewer' && (
                    <p className="signup-link">
                        Don't have a Google account?
                        <a
                            href="https://accounts.google.com/signup"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Sign up here!
                        </a>
                    </p>
                )}
            </div>
        </div>
    );
}