import Cookies from "js-cookie";
import { Link } from "react-router-dom";

const NavBar = () => {
    return ( 

        <nav class="navbar navbar-expand-sm border" style={{
            backgroundColor:"white"
        }}>
            <div class="container-fluid">
                <div className="justify-content-center">
                    <a class="navbar-brand " href="/">
                        <span><img src="IIP official logo.png" height="60"></img></span></a>
                </div>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse justify-content-end me-4" id="navbarNavAltMarkup">
                    <div class="navbar-nav">
                        {
                            Cookies.get('token_id') && Cookies.get('token_username') && Cookies.get('token_email') &&
                            <a class="nav-link active" aria-current="page" href="/members">Members</a>
                        }
                        <Link class="nav-link" to="/gallery">Gallery</Link>
                    </div>
                    <div class="navbar-nav">
                        
                        <Link class="nav-link" to="/#about">About</Link>
                    </div>
                    <div class="navbar-nav">
                        
                        <Link class="nav-link" to="/">Projects</Link>
                    </div>
                    <div class="navbar-nav">
                        
                        <Link class="nav-link" to="/">Contact Us</Link>
                    </div>
                    <div class="navbar-nav">
                        
                        <Link class="nav-link" to="/login">Login</Link>
                    </div>
                    <div class="navbar-nav">
                        
                        <Link class="nav-link" to="/register">Register</Link>
                    </div>



                </div>
            </div>
        </nav>

     );
}
 
export default NavBar;