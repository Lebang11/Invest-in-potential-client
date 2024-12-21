import { api, endpoints } from './config/api';
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';

const CourseSignup = () => {
    const [selectedPlan, setSelectedPlan] = useState(null);
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const plans = [
        {
            id: 'basic',
            name: 'Basic Plan',
            price: 300,
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
            price: 450,
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
            price: 700,
            features: [
                'Everything in Premium Plan',
                'Access to IIP partners & investors',
                'Personal 1-on-1 mentoring',
                'Priority support',
                'Exclusive networking events',
                'Direct business guidance'
            ]
        }
    ];

    useEffect(() => {
        const userEmail = Cookies.get('token_email');
        const userName = Cookies.get('token_username');
        
        if (!userEmail || !userName) {
            navigate('/login', { state: { from: '/course-signup' } });
        }
    }, [navigate]);

    const handlePlanSelect = (planId) => {
        setSelectedPlan(planId);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!selectedPlan) {
            setError('Please select a plan to continue');
            return;
        }
    
        navigate('/payment', { state: { plan: selectedPlan } });
    };

    return (
        <div style={{ 
            marginTop: "100px", 
            marginBottom: "50px",
            backgroundColor: "rgb(20, 20, 20)",
            color: "white",
            padding: "50px 0"
        }} className="w-100">
            <div className="container">
                <h2 className="display-5 text-center text-light mb-3">Choose Your Learning Path</h2>
                
                <div className="text-center mb-5">
                    <div className="row justify-content-center">
                        <div className="col-md-8">
                            <div className="border border-light p-4 mb-4">
                                <h4 className="text-light mb-3">Application Process</h4>
                                <p className="text-light mb-2" style={{ fontSize: "0.9rem" }}>
                                    To ensure the highest quality of learning experience for all participants, 
                                    our admission process includes the following steps:
                                </p>
                                <ol className="text-start text-light" style={{ fontSize: "0.9rem" }}>
                                    <li className="mb-2">Submit application with R50 application fee</li>
                                    <li className="mb-2">Complete Aptitude and Emotional Intelligence (EQ) assessment tests</li>
                                    <li className="mb-2">Receive admission decision within 48 hours</li>
                                    <li className="mb-2">Upon acceptance, select your preferred plan below</li>
                                </ol>
                                <div className="alert alert-light rounded-0 mt-3" role="alert" style={{ fontSize: "0.8rem" }}>
                                    <strong>Note:</strong> The R50 application fee is non-refundable and covers the cost of assessment tests. 
                                    Only candidates who pass both the Aptitude and Emotional Intelligence assessments will be eligible to join our programs.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row justify-content-center">
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
                                        R{plan.price}
                                        <small className="fw-light">/once-off</small>
                                    </h1>
                                    <ul className="list-unstyled mt-3 mb-4 text-light">
                                        {plan.features.map((feature, index) => (
                                            <li key={index} className="mb-2">
                                                <i className="bi bi-check-lg me-2" style={{ color: "#28a745" }}></i>
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                    <button
                                        onClick={() => handlePlanSelect(plan.id)}
                                        className={`mt-auto btn btn-lg w-100 rounded-0 ${
                                            selectedPlan === plan.id 
                                            ? 'btn-light' 
                                            : 'btn-outline-light'
                                        }`}
                                    >
                                        {selectedPlan === plan.id ? 'Selected' : 'Select Plan'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {error && <p className="text-danger text-center mt-4">{error}</p>}
                
                <div className="text-center mt-4">
                    <button 
                        onClick={handleSubmit}
                        className="btn btn-light btn-lg rounded-0"
                        disabled={!selectedPlan || isLoading}
                    >
                        {isLoading ? (
                            <>
                                <span className="spinner-grow spinner-grow-sm me-2" role="status" aria-hidden="true"></span>
                                Processing...
                            </>
                        ) : 'Proceed to Application'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CourseSignup; 