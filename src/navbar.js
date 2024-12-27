import Cookies from "js-cookie";
import { Link, useNavigate } from 'react-router-dom';
import { UserStatus } from './components/UserStatus';
import { useState, useEffect } from "react";
import { scrollToSection } from './utils/scrollUtils';

const NavBar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const navigate = useNavigate();

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
        <nav className="navbar navbar-expand-lg fixed-top" style={{
            backgroundColor: "white",
            borderBottom: "1px solid rgba(255, 255, 255, 0.0)"
        }}>
            <div className="container-fluid">
                <div className="justify-content-center">
                    <Link className="navbar-brand" to="/">
                        <span>
                            <img src="IIP official logo.png" className="logo-large" height="60" alt="IIP Logo" />
                            <img src="IIP logo mark.png" className="logo-small" height="60" alt="IIP Logo" />
                        </span>
                    </Link>
                </div>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-end me-4" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        <Link style={{fontSize:"0.8rem"}} className="nav-link" to="/gallery">Gallery</Link>
                    </div>
                    {isLoggedIn && (
                        <div className="navbar-nav">
                            <Link style={{fontSize:"0.8rem"}} className="nav-link" to="/clients">Client Portal</Link>
                        </div>
                    )}
                    <div className="navbar-nav">
                        <button 
                            onClick={() => scrollToSection('about')}
                            className="nav-link"
                            style={{fontSize:"0.8rem", background: 'none', border: 'none'}}
                        >
                            About
                        </button>
                    </div>
                    <div className="navbar-nav">
                        <button 
                            onClick={() => scrollToSection('projects')}
                            className="nav-link"
                            style={{fontSize:"0.8rem", background: 'none', border: 'none'}}
                        >
                            Projects
                        </button>
                    </div>
                    <div className="navbar-nav">
                        <button 
                            onClick={() => scrollToSection('contact')}
                            className="nav-link"
                            style={{fontSize:"0.8rem", background: 'none', border: 'none'}}
                        >
                            Contact Us
                        </button>
                    </div>
                    {isLoggedIn ? (
                        <>
                            <UserStatus />
                            <div className="navbar-nav">
                                <button 
                                    onClick={handleLogout}
                                    className="nav-link"
                                    style={{fontSize:"0.8rem", background: 'none', border: 'none'}}
                                    title="Logout"
                                >
                                    <i className="bi bi-box-arrow-right text-danger"></i>
                                </button>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="navbar-nav">
                                <Link style={{fontSize:"0.8rem"}} className="nav-link" to="/login">Login</Link>
                            </div>
                            <div className="navbar-nav">
                                <Link style={{fontSize:"0.8rem"}} className="nav-link" to="/register">Register</Link>
                            </div>
                        </>
                    )}
                    {isAdmin && (
                        <div className="navbar-nav">
                            <Link 
                                className="nav-link" 
                                to="/admin"
                                style={{ color: "black", textAlign: "center" }}
                            >
                                Admin Portal
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default NavBar;