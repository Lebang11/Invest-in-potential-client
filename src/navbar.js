import Cookies from "js-cookie";
import { Link, useNavigate } from 'react-router-dom';
import { UserStatus } from './components/UserStatus';
import { useState, useEffect } from "react";
import useScrollToSection from './utils/useScrollToSection';

const NavBar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const navigate = useNavigate();
    const scrollToSection = useScrollToSection();

    useEffect(() => {
        const checkLoginStatus = () => {
            const token = Cookies.get('token_id');
            const adminStatus = Cookies.get('token_admin');
            setIsLoggedIn(!!token);
            setIsAdmin(adminStatus === 'true');
        };

        checkLoginStatus();
        const interval = setInterval(checkLoginStatus, 1500);
        
        return () => clearInterval(interval);
    }, []);

    const handleLogout = () => {
        Cookies.remove('token_id');
        Cookies.remove('token_email');
        Cookies.remove('token_username');
        Cookies.remove('token_admin');
        Cookies.remove('token_points');
        setIsLoggedIn(false);
        setIsAdmin(false);
        alert('Logged Out!');
        navigate('/');
    };

    return ( 
        <nav className="navbar navbar-expand-lg navbar-light fixed-top" style={{backgroundColor: "white"}}>
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">
                    <span>
                        <img src="IIP official logo.png" className="logo-large" height="60" alt="IIP Logo" />
                        <img src="IIP logo mark.png" className="logo-small" height="60" alt="IIP Logo" />
                    </span>
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link" to="/gallery">Gallery</Link>
                        </li>
                        {isLoggedIn && (
                            <li className="nav-item">
                                <Link className="nav-link" to="/clients">Client Portal</Link>
                            </li>
                        )}
                        <li className="nav-item">
                            <button 
                                onClick={() => scrollToSection('about', '/')}
                                className="nav-link"
                                style={{ background: 'none', border: 'none' }}
                            >
                                About
                            </button>
                        </li>
                        <li className="nav-item">
                            <button 
                                onClick={() => scrollToSection('projects', '/')}
                                className="nav-link"
                                style={{ background: 'none', border: 'none' }}
                            >
                                Projects
                            </button>
                        </li>
                        <li className="nav-item">
                            <button 
                                onClick={() => scrollToSection('contact', '/')}
                                className="nav-link"
                                style={{ background: 'none', border: 'none' }}
                            >
                                Contact Us
                            </button>
                        </li>
                        {isLoggedIn ? (
                            <>
                                <UserStatus />
                                <li className="nav-item">
                                    <button 
                                        onClick={handleLogout}
                                        className="nav-link"
                                        style={{ background: 'none', border: 'none' }}
                                        title="Logout"
                                    >
                                        <i className="bi bi-box-arrow-right text-danger"></i>
                                    </button>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/login">Login</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/register">Register</Link>
                                </li>
                            </>
                        )}
                        {isAdmin && (
                            <li className="nav-item">
                                <Link className="nav-link" to="/admin">Admin Portal</Link>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;