import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar(props) {
    const { logout, getIssues } = props
    return (
        <div className="navbar">
            <Link to="/profile">Profile</Link>
            <Link onClick={getIssues} to="/public">Public</Link>
            <button onClick={logout}>Logout</button>
        </div>
    )
}