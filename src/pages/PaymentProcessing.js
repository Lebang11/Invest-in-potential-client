import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { paymentService } from '../services/api';

const PaymentProcessing = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const planDetails = {
        basic: {
            name: 'Basic Plan',
            price: 300,
            discountedPrice: 0
        },
        premium: {
            name: 'Premium Plan',
            price: 450,
            discountedPrice: 0
        },
        vip: {
            name: 'VIP Plan',
            price: 700,
            discountedPrice: 250
        }
    };

    useEffect(() => {
        const initializePayment = async () => {
            if (!location.state?.plan || !user) {
                navigate('/onboarding');
                return;
            }

            try {
                setLoading(true);
                const selectedPlan = location.state.plan;
                const plan = planDetails[selectedPlan];
                const finalPrice = location.state.isWethinkcode ? plan.discountedPrice : plan.price;

                if (location.state.isWethinkcode && finalPrice === 0) {
                    setLoading(false);
                    return navigate('/enrollment-success', {
                        state: {
                            message: "Thank you for enrolling in our Investing In Potential course!",
                            details: [
                                "As a WeThinkCode_ student, you've been automatically enrolled.",
                                "Please check your email for important information about:",
                                "• Course start date and schedule",
                                "• Learning platform access details",
                                "• Required preparation steps",
                                "• Contact information for support",
                                "• Click below to view the course outline and get started!"
                            ]
                        }
                    });
                }

                console.log('Sending payment data:', {
                    amount: finalPrice,
                    email: user.email,
                    name: user.email,
                    planType: selectedPlan
                });

                const paymentData = {
                    amount: finalPrice,
                    email: user.email,
                    name: user.email,
                    planType: selectedPlan
                };

                const response = await paymentService.initializeEnrollmentPayment(paymentData);
                console.log('Payment response:', response);

                // Create form and submit
                const form = document.createElement('form');
                form.method = 'POST';
                form.action = 'https://www.payfast.co.za/eng/process';

                for (const key in response) {
                    const input = document.createElement('input');
                    input.type = 'hidden';
                    input.name = key;
                    input.value = response[key];
                    form.appendChild(input);
                }

                document.body.appendChild(form);
                form.submit();
            } catch (error) {
                console.error('Payment initialization error:', error);
                setError('Failed to initialize payment. Please try again.');
                setLoading(false);
            }
        };

        initializePayment();
    }, [location.state, user, navigate]);

    if (error) {
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
                        <div className="col-md-6 text-center">
                            <div className="alert alert-danger rounded-0">
                                {error}
                            </div>
                            <button 
                                className="btn btn-light rounded-0 mt-3"
                                onClick={() => navigate('/onboarding')}
                            >
                                Return to Plan Selection
                            </button>
                        </div>
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
                    <div className="col-md-6 text-center">
                        <div className="spinner-border text-light mb-3" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                        <h3 className="mb-4">Initializing Payment...</h3>
                        <p className="text-light">
                            Please wait while we redirect you to our secure payment gateway.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentProcessing; 