import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AssessmentComplete = () => {
    const navigate = useNavigate();
    const { user } = useAuth();

    useEffect(() => {
        if (!user) {
            navigate('/login');
        }
    }, [user, navigate]);

    return (
        <div style={{ 
            marginTop: "100px", 
            marginBottom: "50px",
            backgroundColor: "rgb(20, 20, 20)",
            color: "white",
            padding: "50px 0",
            minHeight: "70vh"
        }} className="w-100">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8 text-center">
                        <div className="mb-4">
                            <i className="bi bi-check-circle-fill text-success" style={{ fontSize: "4rem" }}></i>
                        </div>
                        
                        <h2 className="mb-4">Assessment Completed Successfully!</h2>
                        
                        <div className="alert alert-light rounded-0 mb-4">
                            <p className="mb-0">
                                Thank you for completing the assessment. Our team will review your results 
                                and get back to you within 48 hours.
                            </p>
                        </div>

                        <div className="card bg-dark text-white mb-4">
                            <div className="card-body">
                                <h5 className="card-title">Next Steps</h5>
                                <ol className="text-start">
                                    <li>Our team will evaluate your assessment results</li>
                                    <li>You'll receive an email with your results and program eligibility</li>
                                    <li>If successful, you'll be invited to select your preferred course plan</li>
                                    <li>You can then proceed with the enrollment process</li>
                                </ol>
                            </div>
                        </div>

                        <div className="d-grid gap-3 d-md-flex justify-content-md-center">
                            <button 
                                onClick={() => navigate('/course-signup')}
                                className="btn btn-outline-light"
                            >
                                View Course Plans
                            </button>
                            <button 
                                onClick={() => navigate('/')}
                                className="btn btn-light"
                            >
                                Return Home
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AssessmentComplete; 