import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import { assessmentService } from './services/api';

const TestRules = () => {
    const [isVerifying, setIsVerifying] = useState(true);
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const verifyPaymentAndAssessment = async () => {
            try {
                if (!user) {
                    navigate('/login', { state: { from: '/test-rules' } });
                    return;
                }

                const paymentStatus = await assessmentService.checkPaymentStatus(user.email);
                
                if (!paymentStatus.paid) {
                    navigate('/payment', { 
                        state: { message: 'Please complete payment to access the assessment' }
                    });
                    return;
                }

                const assessmentStatus = await assessmentService.checkAssessmentStatus(user.email);
                if (assessmentStatus.exists) {
                    navigate('/assessment-complete');
                    return;
                }

                setIsVerifying(false);

            } catch (error) {
                console.error('Verification failed:', error);
                navigate('/payment', { 
                    state: { error: 'Verification failed. Please try again.' }
                });
            }
        };

        verifyPaymentAndAssessment();
    }, [user, navigate]);

    if (isVerifying) {
        return (
            <div className="container mt-5 pt-5">
                <div className="d-flex justify-content-center">
                    <div className="spinner-border" role="status">
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
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="border border-light p-4">
                            <h2 className="text-center mb-4">Assessment Rules & Guidelines</h2>

                            <div className="mb-4">
                                <h5 className="mb-3">Time Limits</h5>
                                <ul>
                                    <li>Aptitude Assessment: 40 minutes</li>
                                    <li>Emotional Intelligence Assessment: 15 minutes</li>
                                    <li>Tests will auto-submit when time expires</li>
                                </ul>
                            </div>

                            <div className="mb-4">
                                <h5 className="mb-3">Important Rules</h5>
                                <ul>
                                    <li>No tab switching allowed (maximum 3 switches)</li>
                                    <li>No copying or pasting</li>
                                    <li>No right-clicking or keyboard shortcuts</li>
                                    <li>No returning to previous questions</li>
                                    <li>Tests must be completed in one sitting</li>
                                </ul>
                            </div>

                            <div className="alert alert-light rounded-0 mb-4">
                                <strong>Warning:</strong> Violation of these rules will result in automatic test submission and potential disqualification.
                            </div>

                            <div className="mb-4">
                                <h5 className="mb-3">Before Starting</h5>
                                <ul>
                                    <li>Ensure stable internet connection</li>
                                    <li>Find a quiet, distraction-free environment</li>
                                    <li>Have paper and pen ready for calculations</li>
                                    <li>Close all other browser tabs and applications</li>
                                </ul>
                            </div>

                            <button 
                                onClick={() => navigate('/assessment')}
                                className="btn btn-light rounded-0 w-100"
                            >
                                I Understand - Start Assessment
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TestRules; 