import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { assessmentService } from '../services/api';
import intakeInfo from '../utils/intakeInfo';

const Onboarding = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [assessment, setAssessment] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedPlan, setSelectedPlan] = useState(null);
    const [isWethinkcode, setIsWethinkcode] = useState(false);
    const [wethinkcodeName, setWethinkcodeName] = useState('');
    const [wethinkcodeEmail, setWethinkcodeEmail] = useState('');
    const [isVerified, setIsVerified] = useState(false);

    const plans = [
        {
            id: 'basic',
            name: 'Basic Plan',
            regularPrice: 300,
            discountedPrice: 0,
            features: [
                'Full course access',
                'Basic learning materials',
                'Community forum access',
                'Monthly Q&A sessions'
            ]
        },
        {
            id: 'premium',
            name: 'Premium Plan',
            regularPrice: 450,
            discountedPrice: 0,
            features: [
                'Everything in Basic Plan',
                'Participate in final business project',
                'Potential IIP funding',
                'Business registration support',
                'Weekly group mentoring'
            ]
        },
        {
            id: 'vip',
            name: 'VIP Plan',
            regularPrice: 700,
            discountedPrice: 250,
            features: [
                'Everything in Premium Plan',
                'Access to IIP partners & investors',
                'Personal 1-on-1 mentoring',
                'Priority support',
                'Exclusive workshops and events',
                'Direct business guidance'
            ]
        }
    ];

    const getPrice = (regularPrice, discountedPrice) => {
        return isWethinkcode ? discountedPrice : regularPrice;
    };

    const isValidWethinkCodeEmail = (email) => {
        return email.endsWith('@student.wethinkcode.co.za') || 
               email.endsWith('@wethinkcode.co.za');
    };

    const handleWethinkCodeVerification = (e) => {
        e.preventDefault();
        if (!isValidWethinkCodeEmail(wethinkcodeEmail)) {
            alert('Please enter a valid WeThinkCode_ email address');
            return;
        }
        if (!wethinkcodeName.trim()) {
            alert('Please enter your full name');
            return;
        }
        setIsVerified(true);
    };

    useEffect(() => {
        const fetchAssessmentDetails = async () => {
            try {
                const response = await assessmentService.checkAssessmentStatus(user.email);
                setAssessment(response);
                if (response.status !== 'passed') {
                    navigate('/');
                }
            } catch (error) {
                console.error('Error fetching assessment:', error);
                navigate('/');
            } finally {
                setLoading(false);
            }
        };

        if (user) {
            fetchAssessmentDetails();
        } else {
            navigate('/login', { 
                state: { 
                    from: location.pathname,
                    message: "Please log in to access your onboarding page."
                } 
            });
        }
    }, [user, navigate, location.pathname]);

    const handlePlanSelect = (planId) => {
        setSelectedPlan(planId);
    };

    const handleEnrollment = async () => {
        if (!selectedPlan) {
            alert('Please select a plan to continue');
            return;
        }
        
        try {
            navigate('/payment-processing', { 
                state: { 
                    plan: selectedPlan,
                    email: user.email,
                    isWethinkcode: isWethinkcode && isVerified
                }
            });
        } catch (error) {
            console.error('Enrollment error:', error);
            alert('Failed to process enrollment. Please try again.');
        }
    };

    if (loading) {
        return (
            <div className="container py-5" style={{ marginTop: "80px" }}>
                <div className="text-center">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div style={{ 
            marginTop: "100px", 
            marginBottom: "50px",
            backgroundColor: "rgb(20, 20, 20)",
            color: "white",
            padding: "50px 0"
        }} className="w-100">
            <div className="container">
                <div className="text-center mb-5">
                    <h2 className="display-4 text-light mb-3">Applications Currently Closed</h2>
                    <p className="lead text-light mb-4">
                        Thank you for your interest! We are currently not accepting new applications. 
                        Please check back later for updates on our next intake dates.
                    </p>
                </div>

                <div className="text-center mb-5">
                    <div className="row justify-content-center">
                        <div className="col-md-8">
                            <div className="border border-light p-4 mb-4">
                                <div className="alert alert-info rounded-0 mb-4" role="alert">
                                    <strong>Course Start Date:</strong> {intakeInfo.currentIntake.startDate}
                                    <br />
                                    <strong>Application Deadline:</strong> {intakeInfo.currentIntake.applicationDeadline}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="text-center mb-4">
                    <div className="form-check form-switch d-inline-block">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            id="wethinkcode-switch"
                            checked={isWethinkcode}
                            onChange={(e) => {
                                setIsWethinkcode(e.target.checked);
                                if (!e.target.checked) {
                                    setIsVerified(false);
                                    setWethinkcodeName('');
                                    setWethinkcodeEmail('');
                                }
                            }}
                        />
                        <label className="form-check-label ms-2 text-light" htmlFor="wethinkcode-switch">
                            I am a WeThinkCode_ student
                        </label>
                    </div>
                </div>

                {isWethinkcode && !isVerified && (
                    <div className="row justify-content-center mb-5">
                        <div className="col-md-6">
                            <div className="border border-light p-4">
                                <h4 className="text-light mb-4">WeThinkCode_ Student Verification</h4>
                                <form onSubmit={handleWethinkCodeVerification}>
                                    <div className="mb-3">
                                        <label className="form-label text-light">Full Name</label>
                                        <input
                                            type="text"
                                            className="form-control rounded-0"
                                            value={wethinkcodeName}
                                            onChange={(e) => setWethinkcodeName(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label text-light">WeThinkCode_ Email</label>
                                        <input
                                            type="email"
                                            className="form-control rounded-0"
                                            value={wethinkcodeEmail}
                                            onChange={(e) => setWethinkcodeEmail(e.target.value)}
                                            placeholder="example@student.wethinkcode.co.za"
                                            required
                                        />
                                    </div>
                                    <button type="submit" className="btn btn-light rounded-0 w-100">
                                        Verify & Continue
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                )}

                {(!isWethinkcode || isVerified) && <div className="row justify-content-center">
                    {plans.map((plan) => (
                        <div key={plan.id} className="col-md-4 mb-4">
                            <div className={`card h-100 rounded-0 ${
                                selectedPlan === plan.id ? 'border-light' : ''
                            }`} style={{
                                backgroundColor: "rgb(20, 20, 20)",
                                borderColor: "white",
                                position: "relative"
                            }}>
                                {plan.id === 'premium' && (
                                    <div style={{
                                        position: "absolute",
                                        top: "-12px",
                                        right: "20px",
                                        backgroundColor: "#28a745",
                                        color: "white",
                                        padding: "4px 12px",
                                        fontSize: "0.8rem",
                                        fontWeight: "500",
                                        letterSpacing: "0.5px"
                                    }}>
                                        RECOMMENDED
                                    </div>
                                )}
                                <div className="card-header text-center border-light rounded-0">
                                    <h3 className="my-0 fw-normal text-light">{plan.name}</h3>
                                </div>
                                <div className="card-body d-flex flex-column">
                                    <h1 className="card-title text-center text-light">
                                        R{getPrice(plan.regularPrice, plan.discountedPrice)}
                                        <small className="fw-light">/once-off</small>
                                    </h1>
                                    {isWethinkcode && plan.discountedPrice === 0 && (
                                        <div className="badge bg-success mb-3 align-self-center">
                                            FREE for WeThinkCode_ students
                                        </div>
                                    )}
                                    <ul className="list-unstyled text-light mt-3 mb-4">
                                        {plan.features.map((feature, index) => (
                                            <li key={index} className="mb-2">
                                                <i className="bi bi-check-lg me-2" style={{ color: "#28a745" }}></i>
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                    <button
                                        onClick={() => handlePlanSelect(plan.id)}
                                        className={`btn ${
                                            selectedPlan === plan.id ? 'btn-light' : 'btn-outline-light'
                                        } btn-lg w-100 rounded-0 mt-auto`}
                                    >
                                        {selectedPlan === plan.id ? 'Selected' : 'Select Plan'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>}

                <div className="text-center">
                    <button 
                        className="btn btn-light btn-lg rounded-0"
                        onClick={handleEnrollment}
                        disabled={!selectedPlan}
                    >
                        {selectedPlan ? 'Proceed to Payment' : 'Select a Plan to Continue'}
                    </button>
                    <p className="text-light mt-3">
                        Need help choosing? Contact our admissions team at admissions@investinginpotential.com
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Onboarding; 