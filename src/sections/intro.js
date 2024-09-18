const Intro = () => {
    return ( 
        <section id="intro" class=" d-flex flex-column justify-content-start align-items-center mt-5 px-4">
          <div class="row mt-0 text-center text-md-left ">
            <div className='col-sm d-flex flex-column justify-content-center align-items-center'>
              <h4 className=''>Welcome to <span>IIP</span>
              </h4>
              <p className=' lead'>Empowering youth in tech and business. Dive into a world of growth, inspiration, and success. Join us as we talk business and build futures together! </p>

            </div>
            <div className='col-sm d-flex justify-content-center align-items-center' style={{
              // minHeight: "500px"
            }}>
                <img style={{
                  
                  maxHeight:"80%",
                  
                  }} src={'IMG-20231107-WA0004.jpg'} className=' m-3 w-100 rounded' ></img>
              
            </div>
            
          </div>
        </section>
     );
}
 
export default Intro;