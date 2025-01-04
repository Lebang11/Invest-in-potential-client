import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { paymentService } from '../services/api';
import { useAuth } from '../context/AuthContext';

const PaymentStatus = () => {
    const [status, setStatus] = useState('checking');
    const [paymentDetails, setPaymentDetails] = useState(null);
    const location = useLocation();
    const navigate = useNavigate();
    const { user } = useAuth();

    useEffect(() => {
        const checkPaymentStatus = async () => {
            try {
                // Get reference from URL parameters
                const params = new URLSearchParams(location.search);
                const reference = params.get('pf_payment_id');
                const type = params.get('type');

                if (!reference) {
                    setStatus('error');
                    return;
                }

                const response = await paymentService.getPaymentStatus(reference);
                setPaymentDetails(response);

                if (response.status === 'COMPLETE') {
                    setStatus('success');
                    // If it's an enrollment payment, redirect to appropriate page
                    if (type === 'enrollment') {
                        setTimeout(() => {
                            navigate('/clients');
                        }, 5000);
                    }
                } else if (response.status === 'FAILED' || response.status === 'CANCELLED') {
                    setStatus('failed');
                } else {
                    setStatus('pending');
                }
            } catch (error) {
                console.error('Error checking payment status:', error);
                setStatus('error');
            }
        };

        if (user) {
            checkPaymentStatus();
        } else {
            navigate('/login');
        }
    }, [location, navigate, user]);

    const renderStatusMessage = () => {
        switch (status) {
            case 'success':
                return (
                    <div className="alert alert-success">
                        <h4>Payment Successful!</h4>
                        <div className="mb-4">
                            <p>Thank you for enrolling in our Investing In Potential course!</p>
                            <p>Please check your email for important information about:</p>
                            <ul className="text-start">
                                <li>Course start date and schedule</li>
                                <li>Learning platform access details</li>
                                <li>Required preparation steps</li>
                                <li>Contact information for support</li>
                            </ul>
                        </div>
                        <button 
                            className="btn btn-primary mt-3"
                            onClick={() => navigate('/weekly-outline')}
                        >
                            View Course Outline
                        </button>
                    </div>
                );
            case 'failed':
                return (
                    <div className="alert alert-danger">
                        <h4>Payment Failed</h4>
                        <p>Your payment was not successful. Please try again.</p>
                        <button 
                            className="btn btn-primary mt-3"
                            onClick={() => navigate(-1)}
                        >
                            Return to Payment
                        </button>
                    </div>
                );
            case 'error':
                return (
                    <div className="alert alert-danger">
                        <h4>Error</h4>
                        <p>There was an error processing your payment status.</p>
                        <button 
                            className="btn btn-primary mt-3"
                            onClick={() => navigate(-1)}
                        >
                            Go Back
                        </button>
                    </div>
                );
            default:
                return (
                    <div className="text-center">
                        <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                        <p className="mt-3">Checking payment status...</p>
                    </div>
                );
        }
    };

    return (
        <div className="container py-5" style={{ marginTop: "80px" }}>
            <div className="row justify-content-center">
                <div className="col-md-6">
                    {renderStatusMessage()}
                </div>
            </div>
        </div>
    );
};

export default PaymentStatus; 