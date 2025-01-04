import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { api } from '../config/api';

const Onboarding = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [assessment, setAssessment] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedPlan, setSelectedPlan] = useState(null);

    const plans = [
        {
            id: 'standard',
            name: 'Standard Plan',
            price: 'R15,000',
            features: [
                'Full course access',
                'Group mentoring sessions',
                'Basic career support',
                'Course completion certificate'
            ]
        },
        {
            id: 'premium',
            name: 'Premium Plan',
            price: 'R25,000',
            features: [
                'Everything in Standard Plan',
                'One-on-one mentoring sessions',
                'Priority support',
                'Advanced career placement assistance',
                'Industry networking events'
            ]
        },
        {
            id: 'vip',
            name: 'VIP Plan',
            price: 'R35,000',
            features: [
                'Everything in Premium Plan',
                'Personal career coach',
                'Guaranteed internship placement',
                'Extended post-course support',
                'Exclusive workshops and events'
            ]
        }
    ];

    useEffect(() => {
        const fetchAssessmentDetails = async () => {
            try {
                const response = await api.get(`/assessment/status/${user.email}`);
                setAssessment(response.data);
                if (response.data.status !== 'passed') {
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
            navigate('/payment', { 
                state: { 
                    plan: selectedPlan,
                    email: user.email
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
                    <div className="spinner-border text-light" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="container py-5" style={{ marginTop: "80px" }}>
            <div className="row justify-content-center">
                <div className="col-md-10">
                    <h1 className="text-center mb-5">Welcome to Investing in Potential!</h1>

                    <div className="card bg-dark text-white mb-4">
                        <div className="card-body">
                            <h3 className="card-title">Getting Started</h3>
                            <p>We're excited to have you join our next cohort starting February 5th, 2024!</p>
                            
                            <h5 className="mt-4">Choose Your Plan</h5>
                            <div className="row mt-3">
                                {plans.map(plan => (
                                    <div key={plan.id} className="col-md-4 mb-3">
                                        <div className={`card h-100 ${
                                            selectedPlan === plan.id ? 'border-primary' : ''
                                        }`}>
                                            <div className="card-body">
                                                <h5 className="card-title">{plan.name}</h5>
                                                <h6 className="card-subtitle mb-2 text-muted">{plan.price}</h6>
                                                <ul className="list-unstyled">
                                                    {plan.features.map((feature, index) => (
                                                        <li key={index}>✓ {feature}</li>
                                                    ))}
                                                </ul>
                                                <button
                                                    className={`btn ${
                                                        selectedPlan === plan.id ? 'btn-primary' : 'btn-outline-primary'
                                                    } w-100`}
                                                    onClick={() => handlePlanSelect(plan.id)}
                                                >
                                                    {selectedPlan === plan.id ? 'Selected' : 'Select Plan'}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            
                            <h5 className="mt-4">Program Structure</h5>
                            <ul>
                                <li>12-week intensive program</li>
                                <li>Live online sessions</li>
                                <li>Hands-on projects</li>
                                <li>One-on-one mentoring</li>
                                <li>Career support</li>
                            </ul>

                            <h5 className="mt-4">What You'll Learn</h5>
                            <ul>
                                <li>Full-Stack Web Development</li>
                                <li>Modern JavaScript & Frameworks</li>
                                <li>Database Design & Management</li>
                                <li>API Development</li>
                                <li>DevOps & Deployment</li>
                            </ul>

                            <h5 className="mt-4">Next Steps</h5>
                            <ol>
                                <li>Select your preferred plan</li>
                                <li>Process payment</li>
                                <li>Join our student Slack community</li>
                                <li>Set up your development environment</li>
                                <li>Complete pre-course materials</li>
                            </ol>
                        </div>
                    </div>

                    <div className="text-center">
                        <button 
                            className="btn btn-primary btn-lg"
                            onClick={handleEnrollment}
                            disabled={!selectedPlan}
                        >
                            {selectedPlan ? 'Proceed to Payment' : 'Select a Plan to Continue'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Onboarding; 