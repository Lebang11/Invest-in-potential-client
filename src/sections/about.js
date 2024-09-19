import { useState } from 'react';
import { HashLink as Link } from 'react-router-hash-link';
import Cookies from 'js-cookie';
import AboutMore from './aboutmore';

const About = () => {
    const [showMessage, setShowMessage] = useState("Show more")

    return ( 
        <section style={{
          backgroundColor:"rgb(20, 20, 20)"
        }} id="about" class="w-100 d-flex flex-column align-items-center text-light pb-4">
          <div className='container-xl pb-4' style={{
            maxWidth: "1300px"
          }}>
            {/* <h1 className="text-light my-4 text-center">ABOUT US</h1> */}
            <div className='row container-xl mb-4 overflow-auto' >
                <div className='col-sm-6'>
                  <div className='d-flex container justify-content-center'>
                    <img src={'gallery/A1D90854-2ED1-4714-BBA9-4D3B3D19D155.jpeg'} className=' m-3 w-100 rounded mw-100'></img>
                  </div>
                </div>
                <div className='col-sm-6 d-flex justify-content-center align-items-center'>
                  <div className='container' >
                    <p className="mx-3 text-center fst-italic" style={{
                      fontSize: "0.8rem"
                    }}>In Investing in Potential, we guide your growth in financial literacy, entrepreneurship, and personal development. Our structured course equips you with the skills to succeed professionally and personally, helping you reach your full potential.</p>
                    {/* <a class="d-flex btn btn-outline-secondary justify-content-center mb-5" data-bs-toggle="collapse" href="#about-more" role="button" aria-expanded="false" aria-controls="about-more" onClick={() => {
                      if (showMessage === "Show more") {
                        setShowMessage("Show less")
                      } else {
                        setShowMessage("Show more")
                      }
                    }}>
                        {showMessage}
                    </a> */}
                  </div>
                </div>
               <AboutMore/>
            </div> 
          
        </div>

        </section>
     );
}
 
export default About;