import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';

const Footer = () => {
    return ( 
        <footer className='d-flex justify-content-around text-center p-4 text-light' style={{ backgroundColor: 'rgb(28,28,28)' }}>
          <div className="d-flex flex-column align-items-start my-5"style={{
            color:"gray",
            maxWidth: "50vw"
          }}>
            <div className='pb-3'>
              <img src="IIP white logo mark.png" height={40}></img>
            </div>
            <div style={{
              fontSize:"0.8rem"
            }} className="d-flex flex-column align-items-start"><p className="text-start">Copyright @ 2023 Investing In Potential<br></br> All rights reserved.</p></div>
            
            <div className="d-flex">
              <div className="me-2">
                <a href='https://www.instagram.com/investing.in.potential' target='_blank'>
                  <img height={20} src="2959748_instagram_photo_share_icon.png"></img>

                </a>
              </div>
              <div className="me-2">
                <a href='https://www.linkedin.com/company/investing-in-potential' target='_blank'>
                  <img height={20} src="2959747_employment_business_linkedin_work_icon.png"></img>

                </a>
              </div>
              <div className="me-2">
                <a  target='_blank'>
                  <img height={20} src="1820429_brand_logo_network_social_youtube_icon.png"></img>

                </a>
              </div>

            </div>

          </div>


          
          <div className='d-flex flex-column align-items-start my-5' style={{
            maxWidth: "50vw"
          }}>
              <div class="row justify-content-center " id="navbarNavAltMarkup">
                  
                  <div class="navbar-nav col-auto">
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
                  
                  <div class="navbar-nav col-auto">
                      
                      <Link style={{
                          fontSize:"0.8rem"
                      }} class="nav-link" to="/login">Login</Link>
                  </div>
                  <div class="navbar-nav col-auto">
                      
                      <Link style={{
                          fontSize:"0.8rem"
                      }} class="nav-link" to="/register">Register</Link>
                  </div>



              </div>
          </div>

      </footer>
     );
}
 
export default Footer;