import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import intakeInfo from '../utils/intakeInfo';

const CourseAccess = () => {
    const {ref, inView} = useInView({
        triggerOnce: true,
        threshold: 0.1
    });

    return (
        <section style={{
            backgroundColor: "rgb(20, 20, 20)"
        }} className="w-100 d-flex flex-column align-items-center text-light py-5">
            <motion.div 
                ref={ref} 
                initial={{opacity: 0, y: 50}} 
                animate={inView ? {opacity: 1, y: 0} : {opacity: 0, y: 50}} 
                transition={{duration: 1}}
                className="container text-center"
            >
                <h2 className="display-4 mb-4">Ready to Start Your Journey?</h2>
                <p className="lead mb-4">
                    Join our comprehensive 10-week course in financial literacy, entrepreneurship, and personal development.
                    <br />
                    <span className="badge bg-info rounded-0 mt-2">Next Intake: {intakeInfo.currentIntake.startDate}</span>
                </p>
                <div className="row justify-content-center mb-4">
                    <div className="col-md-8">
                        <div className="card bg-dark text-light border-light">
                            <div className="card-body">
                                <h5 className="card-title mb-3">Course Highlights</h5>
                                <ul className="list-unstyled">
                                    <li className="mb-2">✓ Financial Literacy Fundamentals</li>
                                    <li className="mb-2">✓ Entrepreneurship Skills</li>
                                    <li className="mb-2">✓ Personal Development</li>
                                    <li className="mb-2">✓ Practical Business Experience</li>
                                </ul>
                                <div className="d-flex justify-content-center gap-3">
                                    <Link 
                                        to="/course-signup" 
                                        className="btn btn-light disabled rounded-0 mt-3"
                                    >
                                        Enroll Now
                                    </Link>
                                    <Link 
                                        to="/weekly-outline" 
                                        className="btn btn-outline-light rounded-0 mt-3"
                                    >
                                        View Course Outline
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <p className="small" style={{ color: "#8CD4F5" }}>
                    Free access available for WeThinkCode_ students
                </p>
            </motion.div>
        </section>
    );
}

export default CourseAccess; 