import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const EnrollmentSuccess = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { message, details } = location.state || {};

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
                        <div className="card bg-dark text-white">
                            <div className="card-body text-center">
                                <i className="bi bi-check-circle-fill text-success" style={{ fontSize: "3rem" }}></i>
                                <h2 className="mt-3 mb-4">{message}</h2>
                                <div className="text-start">
                                    {details.map((detail, index) => (
                                        <p key={index} className="mb-2">
                                            {detail}
                                        </p>
                                    ))}
                                </div>
                                <div className="mt-4">
                                    <button 
                                        className="btn btn-light mt-2"
                                        onClick={() => navigate('/weekly-outline')}
                                    >
                                        View Course Outline
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EnrollmentSuccess; 