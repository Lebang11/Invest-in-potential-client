import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { api, endpoints } from './config/api';
import Cookies from 'js-cookie';
import md5 from 'md5';

const PaymentGateway = () => {
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [paymentData, setPaymentData] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();
    const selectedPlan = location.state?.plan;

    useEffect(() => {
        const initializePayment = async () => {
            try {
                // Get payment signature and details from our backend
                const response = await api.post(endpoints.initializePayment, {
                    email: Cookies.get('token_email'),
                    name: Cookies.get('token_username'),
                    amount: 50,
                    planType: selectedPlan
                });
                console.log(response.data);
                setPaymentData(response.data);
            } catch (err) {
                setError('Failed to initialize payment. Please try again.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        initializePayment();
    }, [selectedPlan]);

    if (isLoading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
                <div className="spinner-border text-light" role="status">
                    <span className="visually-hidden">Loading...</span>
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

                            {error && <div className="alert alert-danger rounded-0 mb-4">{error}</div>}

                            {paymentData && (
                                <form action="https://sandbox.payfast.co.za/eng/process" method="post">
                                    <input type="hidden" name="merchant_id" value={paymentData.merchant_id} />
                                    <input type="hidden" name="merchant_key" value={paymentData.merchant_key} />
                                    <input type="hidden" name="return_url" value={paymentData.return_url} />
                                    <input type="hidden" name="cancel_url" value={paymentData.cancel_url} />
                                    <input type="hidden" name="notify_url" value={paymentData.notify_url} />
                                    <input type="hidden" name="name_first" value={paymentData.name_first} />
                                    <input type="hidden" name="email_address" value={paymentData.email_address} />
                                    <input type="hidden" name="amount" value={paymentData.amount} />
                                    <input type="hidden" name="item_name" value="Assessment Fee" />
                                    {/* <input type="hidden" name="signature" value={paymentData.signature} /> */}

                                    <button 
                                        type="submit"
                                        className="btn btn-light rounded-0 w-100"
                                    >
                                        Proceed to Payment
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentGateway; 