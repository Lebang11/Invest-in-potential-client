import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import { paymentService, assessmentService } from './services/api';

const PaymentGateway = () => {
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { user } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const checkExistingPayment = async () => {
            try {
                if (!user) {
                    navigate('/login', { state: { from: '/payment' } });
                    return;
                }

                const paymentStatus = await assessmentService.checkPaymentStatus(user.email);
                if (paymentStatus.paid) {
                    navigate('/test-rules');
                }
            } catch (error) {
                console.error('Error checking payment status:', error);
                setError('Failed to verify payment status');
            }
        };

        checkExistingPayment();
    }, [user, navigate]);

    const handlePayment = async () => {
        setLoading(true);
        setError('');

        try {
            const paymentData = {
                email: user.email,
                name: user.name,
                amount: 50, // Assessment fee amount
                planType: 'APPLICATION_FEE'
            };

            console.log('Sending payment data:', paymentData); // Add logging

            const response = await paymentService.initializePayment(paymentData);

            if (response) {
                // Create and submit PayFast form
                const form = document.createElement('form');
                form.method = 'POST';
                form.action = 'https://www.payfast.co.za/eng/process';

                // Add all PayFast fields from the response
                Object.entries(response).forEach(([key, value]) => {
                    const input = document.createElement('input');
                    input.type = 'hidden';
                    input.name = key;
                    input.value = value;
                    form.appendChild(input);
                });

                document.body.appendChild(form);
                form.submit();
            } else {
                throw new Error('Payment initialization failed');
            }
        } catch (err) {
            console.error('Payment error:', err);
            setError(err.message || 'Payment initialization failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mt-5 pt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <h2 className="card-title text-center mb-4">Assessment Fee Payment</h2>
                            
                            {error && (
                                <div className="alert alert-danger" role="alert">
                                    {error}
                                </div>
                            )}

                            <div className="mb-4">
                                <h5>Payment Details:</h5>
                                <p className="mb-2">Amount: R50.00</p>
                                <p className="mb-2">Type: Assessment Fee</p>
                                <p className="mb-4">This fee is for accessing the assessment tests.</p>
                            </div>

                            <div className="d-grid gap-2">
                                <button 
                                    className="btn btn-primary"
                                    onClick={handlePayment}
                                    disabled={isLoading}
                                >
                                    {isLoading ? (
                                        <>
                                            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                            Processing...
                                        </>
                                    ) : (
                                        'Pay Now'
                                    )}
                                </button>
                            </div>

                            <div className="mt-3 text-center">
                                <small className="text-muted">
                                    Secure payments powered by PayFast
                                </small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentGateway; 