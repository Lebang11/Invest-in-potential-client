import { Link } from "react-router-dom";

const Landing = () => {
    return ( 
        <section id="intro" class="d-flex flex-column justify-content-center align-items-center mt-0">
        <div class="container text-center text-md-left" data-aos="fade-up">
          <h1>Welcome to <span>IIP</span>
          
          </h1>
          <h2>Empowering youth in business. Dive into a world of growth, inspiration, and success. Join us as we talk business and build futures together! </h2>
          <div>
          <Link to="/gallery" class="btn btn-lg btn-info text-light mb-2">Gallery</Link>
          </div>
          <Link to="/members" class="btn btn-lg btn-info text-light">Members</Link>

        </div>
      </section>
        
     );
}
 
export default Landing;