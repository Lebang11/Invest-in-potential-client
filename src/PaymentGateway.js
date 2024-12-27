import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { api, endpoints } from './config/api';
import Cookies from 'js-cookie';
import md5 from 'md5';

const PaymentGateway = () => {
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const userEmail = Cookies.get('token_email');
        if (!userEmail) {
            navigate('/login', { state: { from: '/payment' } });
        }
    }, [navigate]);

    const handlePayment = async () => {
        setLoading(true);
        setError('');

        try {
            const response = await api.post(endpoints.initializePayment, {
                email: Cookies.get('token_email'),
                amount: 50, // R50 application fee
                reference: md5(Date.now().toString())
            });

            if (response.data.paymentUrl) {
                window.location.href = response.data.paymentUrl;
            } else {
                throw new Error('Payment initialization failed');
            }
        } catch (err) {
            setError('Payment initialization failed. Please try again.');
            console.error('Payment error:', err);
        } finally {
            setLoading(false);
        }
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
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="border border-light p-4">
                            <h2 className="text-center mb-4">Application Fee Payment</h2>
                            
                            <div className="text-center mb-4">
                                <h3 className="mb-3">R50</h3>
                                <p className="small mb-4">Assessment and Application Fee</p>
                            </div>

                            <div className="alert alert-light rounded-0 mb-4" role="alert">
                                <strong>Note:</strong> This fee is non-refundable and covers:
                                <ul className="mt-2 mb-0">
                                    <li>Aptitude Assessment (40 minutes)</li>
                                    <li>Emotional Intelligence Assessment (15 minutes)</li>
                                    <li>Application Processing</li>
                                </ul>
                            </div>

                            {error && (
                                <div className="alert alert-danger rounded-0 mb-4">
                                    {error}
                                </div>
                            )}

                            <button 
                                className="btn btn-light rounded-0 w-100" 
                                onClick={handlePayment}
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <>
                                        <span className="spinner-grow spinner-grow-sm me-2" role="status" aria-hidden="true"></span>
                                        Processing...
                                    </>
                                ) : 'Proceed to Payment'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentGateway; 