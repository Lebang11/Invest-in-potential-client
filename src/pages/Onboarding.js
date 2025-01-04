import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { api } from '../config/api';

const Onboarding = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [assessment, setAssessment] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAssessment = async () => {
            try {
                const response = await api.get(`/assessment/user/${user.email}`);
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
            fetchAssessment();
        } else {
            navigate('/login');
        }
    }, [user, navigate]);

    if (loading) {
        return <div>Loading...</div>;
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
                            
                            <h5 className="mt-4">Your Selected Plan</h5>
                            <p>{assessment.paymentPlan?.name}</p>
                            
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
                                <li>Complete your payment</li>
                                <li>Join our student Slack community</li>
                                <li>Set up your development environment</li>
                                <li>Complete pre-course materials</li>
                            </ol>
                        </div>
                    </div>

                    <div className="text-center">
                        <button 
                            className="btn btn-primary btn-lg"
                            onClick={() => {/* Handle payment/enrollment completion */}}
                        >
                            Complete Enrollment
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Onboarding; 