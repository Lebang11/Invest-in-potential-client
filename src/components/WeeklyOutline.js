import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';
import { isApplicationOpen } from '../utils/intakeInfo';

const WeeklyOutline = () => {
    const weeklyContent = [
        {
            week: 1,
            title: "Foundations & Self-Discovery",
            topics: [
                "Understanding your cognitive patterns",
                "Personal values assessment",
                "Financial mindset exploration",
                "Setting holistic growth goals"
            ]
        },
        {
            week: 2,
            title: "Emotional Intelligence & Finance",
            topics: [
                "Emotional relationship with money",
                "Decision-making under pressure",
                "Building financial resilience",
                "Mindful investment practices"
            ]
        },
        {
            week: 3,
            title: "Ethical Business Foundations",
            topics: [
                "Business ethics principles",
                "Sustainable business practices",
                "Social responsibility",
                "Value-based entrepreneurship"
            ]
        },
        {
            week: 4,
            title: "Purpose-Driven Business Planning",
            topics: [
                "Aligning business with personal values",
                "Spiritual intelligence in leadership",
                "Creating meaningful business goals",
                "Impact-focused strategies"
            ]
        },
        {
            week: 5,
            title: "Conscious Marketing & Communication",
            topics: [
                "Authentic brand building",
                "Ethical marketing practices",
                "Mindful communication strategies",
                "Building genuine connections"
            ]
        },
        {
            week: 6,
            title: "Holistic Leadership",
            topics: [
                "Emotional intelligence in management",
                "Spiritual leadership principles",
                "Creating conscious company culture",
                "Ethical decision-making frameworks"
            ]
        },
        {
            week: 7,
            title: "Personal Growth Integration",
            topics: [
                "Work-life harmony",
                "Stress management techniques",
                "Mindfulness in business",
                "Building emotional resilience"
            ]
        },
        {
            week: 8,
            title: "Existential Business Perspectives",
            topics: [
                "Finding meaning through work",
                "Legacy planning",
                "Long-term impact assessment",
                "Personal fulfillment in business"
            ]
        },
        {
            week: 9,
            title: "Practical Application & Integration",
            topics: [
                "Holistic business case studies",
                "Ethical problem-solving",
                "Spiritual growth exercises",
                "Emotional intelligence practice"
            ]
        },
        {
            week: 10,
            title: "Future Vision & Integration",
            topics: [
                "Personal mission statement",
                "Holistic success metrics",
                "Sustainable growth planning",
                "Life-business integration"
            ]
        }
    ];

    const {ref, inView} = useInView({
        triggerOnce: true,
        threshold: 0.1
    });

    const googleCalendarUrl = "https://calendar.google.com/calendar/render?action=TEMPLATE&text=IIP%20Course%20Session&details=10-week%20course%20in%20financial%20literacy%2C%20entrepreneurship%2C%20and%20personal%20development.%20%0A%0ATime%3A%208%3A00%20PM%20SAST%20(South%20African%20Standard%20Time)&dates=20240201T180000Z%2F20240201T193000Z&recur=RRULE:FREQ=WEEKLY;COUNT=10";

    const growthAreas = [
        {
            title: "Cognitive Growth",
            description: "Develop critical thinking, decision-making, and strategic planning abilities"
        },
        {
            title: "Emotional Growth",
            description: "Build emotional intelligence, resilience, and interpersonal skills"
        },
        {
            title: "Ethical Growth",
            description: "Strengthen moral compass and develop principled business practices"
        },
        {
            title: "Spiritual Growth",
            description: "Connect with deeper purpose and meaning in business endeavors"
        },
        {
            title: "Existential Growth",
            description: "Explore personal meaning and long-term impact through business"
        }
    ];

    const startupProject = {
        title: "Final Startup Project",
        duration: "3-6 months",
        description: "After completing the 10-week course, students transition into the practical startup phase where they'll apply their learning to build real businesses.",
        phases: [
            {
                name: "Ideation & Validation",
                activities: [
                    "Market research and validation",
                    "Business model refinement",
                    "Customer discovery interviews",
                    "MVP development planning"
                ]
            },
            {
                name: "Development & Launch",
                activities: [
                    "MVP creation",
                    "Initial customer acquisition",
                    "Business registration",
                    "Financial planning and setup"
                ]
            },
            {
                name: "Growth & Support",
                activities: [
                    "Mentorship sessions",
                    "Investor pitch preparation",
                    "Networking opportunities",
                    "Access to IIP partner resources"
                ]
            }
        ],
        support: [
            "Weekly mentorship meetings",
            "Access to IIP's network of entrepreneurs",
            "Potential seed funding opportunities",
            "Ongoing technical and business support"
        ]
    };

    const applicationOpen = isApplicationOpen();

    return (
        <div style={{ 
            backgroundColor: "rgb(20, 20, 20)",
            color: "white",
            padding: "50px 0"
        }} className="w-100">
            <div className="container">
                <div className="d-flex justify-content-center align-items-center mb-4 gap-3">
                    <h2 className="text-center mb-0">10-Week Course Outline</h2>
                    <a 
                        href={googleCalendarUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-outline-light btn-sm rounded-0"
                        style={{ whiteSpace: 'nowrap' }}
                    >
                        <i className="bi bi-calendar-plus me-2"></i>
                        Add to Calendar
                    </a>
                </div>
                <p className="text-center mb-5">A holistic approach to business and personal development</p>

                {/* Growth Areas Overview */}
                <div className="row mb-5">
                    {growthAreas.map((area, index) => (
                        <motion.div 
                            key={index}
                            ref={ref}
                            initial={{opacity: 0, y: 20}}
                            animate={inView ? {opacity: 1, y: 0} : {opacity: 0, y: 20}}
                            transition={{duration: 0.5, delay: index * 0.1}}
                            className="col-md-4 mb-4"
                        >
                            <div className="card h-100 bg-dark text-light border-light rounded-0">
                                <div className="card-body">
                                    <h5 className="card-title">{area.title}</h5>
                                    <p className="card-text small">{area.description}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Weekly Content */}
                <h3 className="text-center mb-4">Weekly Breakdown</h3>
                <div className="row">
                    {weeklyContent.map((week, index) => (
                        <motion.div 
                            key={week.week}
                            ref={ref}
                            initial={{opacity: 0, y: 20}}
                            animate={inView ? {opacity: 1, y: 0} : {opacity: 0, y: 20}}
                            transition={{duration: 0.5, delay: index * 0.1}}
                            className="col-md-6 mb-4"
                        >
                            <div className="card h-100 bg-dark text-light border-light rounded-0">
                                <div className="card-header border-light">
                                    <h5 className="mb-0">Week {week.week}</h5>
                                </div>
                                <div className="card-body">
                                    <h6 className="card-title">{week.title}</h6>
                                    <ul className="list-unstyled mt-3">
                                        {week.topics.map((topic, i) => (
                                            <li key={i} className="mb-2">
                                                <i className="bi bi-check2 me-2"></i>
                                                {topic}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Points System & Client Portal Access */}
                <motion.div 
                    ref={ref}
                    initial={{opacity: 0, y: 20}}
                    animate={inView ? {opacity: 1, y: 0} : {opacity: 0, y: 20}}
                    transition={{duration: 0.5}}
                    className="mt-5 mb-5"
                >
                    <h2 className="text-center mb-4">Points System & Client Portal Access</h2>
                    <div className="row">
                        <div className="col-md-6 mb-4">
                            <div className="card h-100 bg-dark text-light border-light rounded-0">
                                <div className="card-header border-light">
                                    <h5 className="mb-0">Points System</h5>
                                </div>
                                <div className="card-body">
                                    <p>Our points system tracks your participation and engagement throughout the course. Points are awarded for:</p>
                                    <ul className="list-unstyled mt-3">
                                        <li className="mb-2">
                                            <i className="bi bi-star-fill me-2 text-warning"></i>
                                            Active participation in sessions
                                        </li>
                                        <li className="mb-2">
                                            <i className="bi bi-star-fill me-2 text-warning"></i>
                                            Completing assignments and projects
                                        </li>
                                        <li className="mb-2">
                                            <i className="bi bi-star-fill me-2 text-warning"></i>
                                            Contributing to discussions
                                        </li>
                                        <li className="mb-2">
                                            <i className="bi bi-star-fill me-2 text-warning"></i>
                                            Helping fellow students
                                        </li>
                                    </ul>
                                    <div className="alert alert-info rounded-0 mt-3">
                                        Your points determine your eligibility for client job opportunities and future project considerations.
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 mb-4">
                            <div className="card h-100 bg-dark text-light border-light rounded-0">
                                <div className="card-header border-light">
                                    <h5 className="mb-0">Client Portal Access</h5>
                                </div>
                                <div className="card-body">
                                    <p className="mb-3">Premium & VIP Members get exclusive access to our client portal with the following benefits:</p>
                                    <ul className="list-unstyled">
                                        <li className="mb-2">
                                            <i className="bi bi-check-lg me-2" style={{ color: "#28a745" }}></i>
                                            Access to client job board
                                        </li>
                                        <li className="mb-2">
                                            <i className="bi bi-check-lg me-2" style={{ color: "#28a745" }}></i>
                                            Submit proposals for projects
                                        </li>
                                        <li className="mb-2">
                                            <i className="bi bi-check-lg me-2" style={{ color: "#28a745" }}></i>
                                            View client requirements
                                        </li>
                                        <li className="mb-2">
                                            <i className="bi bi-check-lg me-2" style={{ color: "#28a745" }}></i>
                                            Direct client communication
                                        </li>
                                    </ul>
                                    <div className="alert alert-success rounded-0 mt-3">
                                        Client portal access is available to both Premium and VIP members throughout the course duration.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Updated enrollment section */}
                <div className="text-center mt-5 mb-5">
                    {applicationOpen ? (
                        <Link 
                            to="/course-signup" 
                            className="btn btn-light rounded-0 px-4 py-2"
                        >
                            Enroll Now
                        </Link>
                    ) : (
                        <div className="alert alert-warning rounded-0 d-inline-block">
                            Applications are currently closed
                        </div>
                    )}
                </div>

                {/* Updated Startup Project Section */}
                <motion.div 
                    ref={ref}
                    initial={{opacity: 0, y: 20}}
                    animate={inView ? {opacity: 1, y: 0} : {opacity: 0, y: 20}}
                    transition={{duration: 0.5}}
                    className="mt-5 position-relative"
                >
                    <div 
                        className="position-absolute" 
                        style={{
                            top: "-12px",
                            right: "20px",
                            backgroundColor: "#28a745",
                            color: "white",
                            padding: "4px 12px",
                            fontSize: "0.8rem",
                            fontWeight: "500",
                            letterSpacing: "0.5px",
                            zIndex: 1
                        }}
                    >
                        PREMIUM & VIP ONLY
                    </div>
                    
                    <h2 className="text-center mb-4">Final Startup Project</h2>
                    <p className="text-center mb-5">
                        {startupProject.description}
                        <br/>
                        <span style={{
                            color: "grey"
                        }}>Duration: {startupProject.duration}</span>
                    </p>

                    <div className="row">
                        {startupProject.phases.map((phase, index) => (
                            <div key={index} className="col-md-4 mb-4">
                                <div className="card h-100 bg-dark text-light border-light rounded-0">
                                    <div className="card-body">
                                        <h5 className="card-title mb-3">{phase.name}</h5>
                                        <ul className="list-unstyled">
                                            {phase.activities.map((activity, i) => (
                                                <li key={i} className="mb-2">
                                                    <i className="bi bi-arrow-right me-2"></i>
                                                    {activity}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="row mt-4">
                        <div className="col-12">
                            <div className="card bg-dark text-light border-light rounded-0">
                                <div className="card-body">
                                    <h5 className="card-title mb-3">Ongoing Support</h5>
                                    <div className="row">
                                        {startupProject.support.map((item, index) => (
                                            <div key={index} className="col-md-6 mb-2">
                                                <i className="bi bi-check-circle me-2"></i>
                                                {item}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default WeeklyOutline; 