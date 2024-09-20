import {motion} from 'framer-motion';
import {useInView} from 'react-intersection-observer';

const Intro = () => {
    const {ref, inView} = useInView({
        triggerOnce: true,
        threshold: 0.1
    })

    return ( 
        <section id="intro" class=" d-flex flex-column justify-content-start align-items-center mt-5 px-4">
          <motion.div ref={ref} initial={{opacity:0, x:-100}} animate= {inView ? {opacity:1, x:0} : {opacity:0, }} transition={{duration:2}} class="row mt-0 text-center text-md-left " style={{
            maxWidth: "1300px"
          }}>
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
            
          </motion.div>
        </section>
     );
}
 
export default Intro;