// src/components/userComponent.js
import React from 'react'
import '../Pages/Landing.css'

// Change the function name from UserProfileCentre to UserProfileCorner
export function UserProfileCorner({ user, userType, onLogout }) {
    if (!user) return null

    const getDisplayName = () => {
        if (userType === 'viewer') {
            return user.name || user.email || 'Viewer'
        } else {
            return user.email || 'Artist'
        }
    }

    const getAvatarUrl = () => {
        if (userType === 'viewer' && user.picture) {
            return user.picture
        }
        // Default avatar for artist or if no picture
        return `https://ui-avatars.com/api/?name=${encodeURIComponent(getDisplayName())}&background=4285f4&color=fff`
    }

    return (
        <div className="user-profile-corner">
            <img
                src={getAvatarUrl()}
                alt="Profile"
                className="profile-avatar"
            />
            <div className="profile-info">
                <p className="profile-name">{getDisplayName()}</p>
                <p className="profile-type">{userType === 'viewer' ? 'Viewer' : 'Artist'}</p>
            </div>
            <button
                onClick={onLogout}
                className="logout-btn"
                title="Logout"
            >
                ✕
            </button>
        </div>
    )
}

// Keep this export as is
export function LoginSuccessNotification({ show, userType, userName }) {
    if (!show) return null

    return (
        <div className="login-success-notification">
            Welcome back, {userName}! You're logged in as {userType === 'viewer' ? 'a viewer' : 'an artist'}.
        </div>
    )
}