import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import logo from '../../images/logo.png';
import blankpp from '../../images/blankpp.png';
import './style.css';

export default function Header() {
    const { user, signOut } = useAuth();

    return (
        <nav className="navbar navbar-light bg-white border sticky-top" style={{ borderColor: '#e0e0e0' }}>
            <div className="container">
                <a className="navbar-brand" style={{ fontFamily: 'serif' }} href="/posts">
                    <img src={logo} alt="brand" width="30" height="24" class="d-inline-block align-text-top" />
                    UMERN
                </a>
                {user ?
                    <div className="navbar-right">
                        <a className="header-link" href="/posts">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-house-door-fill" viewBox="0 0 16 16">
                                <path d="M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5z" />
                            </svg>
                        </a>
                        <a className="header-link" href="/new-post">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-plus-square" viewBox="0 0 16 16">
                                <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                            </svg>
                        </a>
                        <div className="dropdown">
                            <button className="dropdown-toggle header-link" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                <img src={user.profilePicture ? ("data:" + user.profilePicture.mimetype + ";base64," + user.profilePicture.buffer) : blankpp} alt={user.username + " avatar"} />
                            </button>
                            <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton1">
                                <li><a className="dropdown-item" href={"/" + user.username}>My Profile</a></li>
                                <li><button className="dropdown-item" onClick={signOut}>Sign Out</button></li>
                            </ul>
                        </div>
                    </div> : <a style={{ textDecoration: 'none', color: 'black' }} href="/">Sign In</a>}
            </div>
        </nav>
    )
}

/*
<img src={user.profilePicture ? ("data:" + user.profilePicture.mimetype + ";base64," + user.profilePicture.buffer) : blankpp} alt={user.username + " avatar"} />
 */