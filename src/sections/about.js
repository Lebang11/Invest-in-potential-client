import { useState } from 'react';
import { HashLink as Link } from 'react-router-hash-link';
import Cookies from 'js-cookie';
import AboutMore from './aboutmore';
import {motion} from 'framer-motion';
import {useInView} from 'react-intersection-observer';

const About = () => {
    const [showMessage, setShowMessage] = useState("Show more");

    const {ref, inView} = useInView({
      triggerOnce: true,
      threshold: 0.5
  })


    return ( 
        <section style={{
          backgroundColor:"rgb(20, 20, 20)"
        }} id="about" class="w-100 d-flex flex-column align-items-center text-light pb-4">
          <div className='container-xl pb-4' style={{
            maxWidth: "1300px"
          }}>
            {/* <h1 className="text-light my-4 text-center">ABOUT US</h1> */}
            <div className='row container-xl mb-4 overflow-auto' >
                <motion.div ref={ref} initial={{opacity:0, x:-100}} animate={inView ? {opacity:1, x:0} : {opacity:0, x:-100}} transition={{duration:3}} className='col-sm-6'>
                  <div className='d-flex container justify-content-center'>
                    <img src={'gallery/A1D90854-2ED1-4714-BBA9-4D3B3D19D155.jpeg'} className=' m-3 w-100 rounded mw-100'></img>
                  </div>
                </motion.div>
                <motion.div ref={ref} initial={{opacity:0}} animate={inView? {opacity:1} : {opacity:0}} transition={{duration:3}} className='col-sm-6 d-flex justify-content-center align-items-center'>
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
                </motion.div>
            </div> 
            <AboutMore/>

          
        </div>

        </section>
     );
}
 
export default About;