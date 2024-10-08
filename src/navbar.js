import Cookies from "js-cookie";
import { Link } from "react-router-dom";

const NavBar = () => {
    return ( 

        <nav class="navbar navbar-expand-sm border-bottom w-100" style={{
            backgroundColor:"white"
        }}>
            <div class="container-fluid">
                <div className="justify-content-center">
                    <Link class="navbar-brand " to="/">
                        <span><img src="IIP official logo.png" height="60"></img></span></Link>
                </div>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse justify-content-end me-4" id="navbarNavAltMarkup">
                    <div class="navbar-nav">
                        {
                            Cookies.get('token_id') && Cookies.get('token_username') && Cookies.get('token_email') &&
                            <a style={{
                                fontSize:"0.8rem"
                            }} class="nav-link active" aria-current="page" href="/members">Members</a>
                        }
                        <Link style={{
                            fontSize:"0.8rem"
                        }} class="nav-link" to="/gallery">Gallery</Link>
                    </div>
                    <div class="navbar-nav">
                        
                        <Link style={{
                            fontSize:"0.8rem"
                        }} class="nav-link" to="/#about">About</Link>
                    </div>
                    <div class="navbar-nav">
                        
                        <Link style={{
                            fontSize:"0.8rem"
                        }} class="nav-link" to="/">Projects</Link>
                    </div>
                    <div class="navbar-nav">
                        
                        <Link style={{
                            fontSize:"0.8rem"
                        }} class="nav-link" to="/">Contact Us</Link>
                    </div>
                    <div class="navbar-nav">
                        
                        <Link style={{
                            fontSize:"0.8rem"
                        }} class="nav-link" to="/login">Login</Link>
                    </div>
                    <div class="navbar-nav">
                        
                        <Link style={{
                            fontSize:"0.8rem"
                        }} class="nav-link" to="/register">Register</Link>
                    </div>



                </div>
            </div>
        </nav>

     );
}
 
export default NavBar;