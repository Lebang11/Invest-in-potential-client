import Cookies from "js-cookie";
import { Link, useNavigate } from 'react-router-dom';
import { UserStatus } from './components/UserStatus';
import { useState, useEffect } from "react";

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

    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        } else {
            navigate('/#' + sectionId);
        }
    };

    return ( 
        <nav class="navbar navbar-expand-sm border-bottom w-100 fixed-top" style={{
            backgroundColor:"white",
            zIndex: 1000
        }}>
            <div class="container-fluid">
                <div className="justify-content-center">
                    <Link class="navbar-brand" to="/">
                        <span><img src="IIP official logo.png" height="60" alt="IIP Logo"></img></span>
                    </Link>
                </div>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse justify-content-end me-4" id="navbarNavAltMarkup">
                    <div class="navbar-nav">
                        <Link style={{fontSize:"0.8rem"}} class="nav-link" to="/gallery">Gallery</Link>
                    </div>
                    {isLoggedIn && (
                        <div class="navbar-nav">
                            <Link style={{fontSize:"0.8rem"}} class="nav-link" to="/clients">Client Portal</Link>
                        </div>
                    )}
                    <div class="navbar-nav">
                        <button 
                            onClick={() => scrollToSection('about')}
                            className="nav-link"
                            style={{fontSize:"0.8rem", background: 'none', border: 'none'}}
                        >
                            About
                        </button>
                    </div>
                    <div class="navbar-nav">
                        <button 
                            onClick={() => scrollToSection('projects')}
                            className="nav-link"
                            style={{fontSize:"0.8rem", background: 'none', border: 'none'}}
                        >
                            Projects
                        </button>
                    </div>
                    <div class="navbar-nav">
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
                            <div class="navbar-nav">
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
                            <div class="navbar-nav">
                                <Link style={{fontSize:"0.8rem"}} class="nav-link" to="/login">Login</Link>
                            </div>
                            <div class="navbar-nav">
                                <Link style={{fontSize:"0.8rem"}} class="nav-link" to="/register">Register</Link>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default NavBar;