import {motion} from 'framer-motion';
import {useInView} from 'react-intersection-observer';

const MotionImage = (props) => {
    const {ref, inView} = useInView({
        triggerOnce: false,
        threshold: 0.8
    })
    return ( 
        <motion.div initial={{opacity:0}} animate={inView? {opacity:1} : {opacity:0}} transition={{duration:2}} className="px-4 col-md-6 col-sm-12 col-xs-12 d-flex flex-column justify-content-center align-items-center">
                <motion.img ref={ref} animate={{scale:[1,0.96, 1]}} transition={{
                duration: 3,
                ease: "easeInOut",
                repeat:Infinity}} src={props.info.image} height="300" style={{
                    maxWidth:"90vw"
                }}></motion.img>

               
            
        </motion.div>
     );
}
 
export default MotionImage;