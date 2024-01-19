import { useState } from 'react';
import { HashLink as Link } from 'react-router-hash-link';
import Cookies from 'js-cookie';

const Landing = () => {
    const [showMessage, setShowMessage] = useState("Show more")

    return (
      <div> 
        <section id="intro" class="d-flex flex-column justify-content-center align-items-center mt-0 ">
          <div class="container text-center text-md-left" data-aos="fade-up">
            <h1>Welcome to <span>IIP</span>
          
            </h1>
            <h2>Empowering youth in business. Dive into a world of growth, inspiration, and success. Join us as we talk business and build futures together! </h2>
            <div className="d-flex flex-column align-items-center">
              <Link to="/gallery" class="btn btn-lg btn-info text-light mb-2">Gallery</Link>
              {Cookies.get('token_id') && Cookies.get('token_username') && Cookies.get('token_email') &&
                <Link to="/members" class="btn btn-lg btn-info text-light mb-2">Members</Link>

              }
              <Link to="#about" class="btn btn-lg btn-info text-light">About Us</Link>
            
            </div>

          </div>
        </section>
        <section id="about" class="bg-light d-flex flex-column align-items-center bg-light pb-4">
          <div className='container-xl bg-light pb-4'>
            <h1 className="text-muted my-4 text-center">ABOUT US</h1>
            <div className='row container-xl mb-4 overflow-auto' >
                <div className='col-sm-6'>
                  <div className='d-flex container justify-content-center'>
                    <img src={'IMG-20231028-WA0001.jpg'} className=' m-3 w-100 rounded'></img>
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
            </div> 
          <div id="about-more" className='collapse bg-light'>
            <div class="row pb-5">
          <div class="col-sm-6">
          <div class="card text-dark bg-light mb-3 mx-3">
            <div class="card-header">About Us</div>
            <div class="card-body">
              <h5 class="card-title">Our Holistic directive</h5>
              <p class="card-text">At Investing in Potential Inc. our commitment extends beyond financial literacy, encompassing cognitive, emotional, ethical, spiritual, physical, and existential well-being. Unearth the rudiments of a balanced life and commence your odyssey toward a nuanced and successful existence.</p>
            </div>
          </div>
          </div>
        <div class="col-sm-6">
        <div class="card text-dark bg-light mb-3 mx-3">
          <div class="card-header">Mentorship Program</div>
          <div class="card-body">
            <h5 class="card-title">Cultivating Cognition</h5>
            <p class="card-text">Our mentorship initiative transcends financial growth, addressing cognitive challenges, offering ethical and moral guidance, and promoting physical and existential growth. Delve into strategies to navigate complexities, make informed decisions, and cultivate a holistic lifestyle that aligns with professional and personal success.</p>
          </div>
        </div>
        </div>
        <div class="col-sm-6">
        <div class="card text-dark bg-light mb-3 mx-3">
          <div class="card-header">Holistic Growth Quadrant</div>
          <div class="card-body">
            <h5 class="card-title">Balancing Success Across Dimensions</h5>
        <p class="card-text">Explore our comprehensive success framework, designed to harmonize cognitive, emotional, ethical, spiritual, physical, and existential facets. Develop an abundance mindset, derive insights from diverse experiences, and foster prosperity across all life dimensions.</p>
      </div>
      </div>
      </div>
      <div class="col-sm-6">
      <div class="card text-dark bg-light mb-3 mx-3">
        <div class="card-header">Producing Holistic Growth</div>
        <div class="card-body">
          <h5 class="card-title">Strategic Living Unveiled</h5>
          <p class="card-text">Navigate the intricacies of living a balanced life. Identify authentic value in various dimensions, distinguish between inhibiting factors and guiding principles, and curate a lifestyle that harmoniously integrates success across cognitive, emotional, ethical, spiritual, physical, and existential realms.</p>
        </div>
      </div>
      </div>
      <div class="col-sm-6">
      <div class="card text-dark bg-light mb-3 mx-3">
        <div class="card-header">Investments</div>
        <div class="card-body">
          <h5 class="card-title">Strategic Investments for a Fulfilling Life</h5>
          <p class="card-text">Discover nuanced approaches to self-investment, spanning beyond financial portfolios to encompass cognitive sharpness, emotional intelligence, ethical acumen, and existential fulfillment. Learn to manage the complexities of life, transforming aspirations into tangible achievements across all dimensions.</p>
        </div>
      </div>
      </div>
            </div> 
        </div>
        </div>

        </section>
      </div>
     );
}
 
export default Landing;