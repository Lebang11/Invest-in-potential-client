import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { api, endpoints } from './config/api';
import Cookies from 'js-cookie';
import md5 from 'md5';

const PaymentGateway = () => {
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

                            <div className="alert alert-warning rounded-0 mb-4" role="alert">
                                <strong>Coming Soon!</strong> Our payment system is currently under maintenance. 
                                Please check back later or contact us for alternative arrangements.
                            </div>

                            <button 
                                className="btn btn-light rounded-0 w-100" 
                                disabled={true}
                            >
                                Payment Currently Unavailable
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentGateway; 