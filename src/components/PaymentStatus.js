import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { paymentService } from '../services/api';

const PaymentStatus = () => {
    const [status, setStatus] = useState('checking');
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    
    useEffect(() => {
        const checkPayment = async () => {
            try {
                const reference = searchParams.get('reference');
                if (!reference) {
                    setStatus('error');
                    return;
                }

                const response = await paymentService.getPaymentStatus(reference);
                
                if (response.status === 'COMPLETE') {
                    setStatus('success');
                    // Wait 3 seconds then redirect to assessment
                    setTimeout(() => {
                        navigate('/test-rules');
                    }, 3000);
                } else {
                    setStatus('failed');
                }
            } catch (error) {
                console.error('Payment status check failed:', error);
                setStatus('error');
            }
        };

        checkPayment();
    }, [searchParams, navigate]);

    const statusMessages = {
        checking: {
            title: 'Checking Payment Status',
            message: 'Please wait while we verify your payment...',
            class: 'info'
        },
        success: {
            title: 'Payment Successful!',
            message: 'Your payment has been confirmed. Redirecting to assessment...',
            class: 'success'
        },
        failed: {
            title: 'Payment Failed',
            message: 'Your payment could not be processed. Please try again.',
            class: 'danger'
        },
        error: {
            title: 'Error',
            message: 'An error occurred while checking payment status.',
            class: 'danger'
        }
    };

    const currentStatus = statusMessages[status];

    return (
        <div className="container mt-5 pt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className={`alert alert-${currentStatus.class}`} role="alert">
                        <h4 className="alert-heading">{currentStatus.title}</h4>
                        <p>{currentStatus.message}</p>
                        {(status === 'failed' || status === 'error') && (
                            <div className="mt-3">
                                <button 
                                    className="btn btn-primary me-2"
                                    onClick={() => navigate('/payment')}
                                >
                                    Try Again
                                </button>
                                <button 
                                    className="btn btn-outline-primary"
                                    onClick={() => navigate('/')}
                                >
                                    Go Home
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentStatus; 