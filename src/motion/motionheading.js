import {motion} from 'framer-motion';
import {useInView} from 'react-intersection-observer';

const MotionHeader = (props) => {
    const {ref, inView} = useInView({
        triggerOnce: false,
        threshold: 0
    })
  
    return ( 
        <>
        {props.header.map((letter, index) => {
                                        
            let delay = index;
            return (
                <motion.span ref={ref} initial={{opacity:0}} animate={inView? {opacity:1} : {opacity:0}} transition={inView? {delay: delay*0.1} : {}}>{letter}</motion.span>
            )
        })}
        </>
     );
}
 
export default MotionHeader;