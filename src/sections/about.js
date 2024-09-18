import { useState } from 'react';
import { HashLink as Link } from 'react-router-hash-link';
import Cookies from 'js-cookie';
import AboutMore from './aboutmore';

const About = () => {
    const [showMessage, setShowMessage] = useState("Show more")

    return ( 
        <section id="about" class="w-100 bg-dark d-flex flex-column align-items-center bg-dark text-light pb-4">
          <div className='container-xl pb-4'>
            <h1 className="text-light my-4 text-center">ABOUT US</h1>
            <div className='row container-xl mb-4 overflow-auto' >
                <div className='col-sm-6'>
                  <div className='d-flex container justify-content-center'>
                    <img src={'IMG-20231028-WA0001.jpg'} className=' m-3 w-100 rounded mw-100'></img>
                  </div>
                </div>
                <div className='col-sm-6 '>
                  <div className='container ' >
                    <p className="mx-3 text-center ">Investing in you to help you invest in yourself. <br></br> 
                    Welcome to "Investing in Yourself Inc.", where our mission is to empower you for comprehensive growth across multiple dimensions – cognitive, emotional, ethical, spiritual, physical, existential, and, naturally, financial. Embark on a transformative journey with us as we assist individuals and entrepreneurs in navigating a multidimensional path to success.</p>
                    <a class="d-flex btn btn-outline-secondary justify-content-center mb-5" data-bs-toggle="collapse" href="#about-more" role="button" aria-expanded="false" aria-controls="about-more" onClick={() => {
                      if (showMessage === "Show more") {
                        setShowMessage("Show less")
                      } else {
                        setShowMessage("Show more")
                      }
                    }}>
                        {showMessage}
                    </a>
                  </div>
                </div>
               <AboutMore/>
            </div> 
          
        </div>

        </section>
     );
}
 
export default About;