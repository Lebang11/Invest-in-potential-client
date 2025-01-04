import { useState, useEffect } from 'react';
import { api, endpoints } from './config/api';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { adminService } from './services/api';

const AdminPortal = () => {
    const [activeTab, setActiveTab] = useState('dashboard');
    const [users, setUsers] = useState([]);
    const [payments, setPayments] = useState([]);
    const [assessments, setAssessments] = useState([]);
    const [stats, setStats] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const [selectedAssessment, setSelectedAssessment] = useState(null);
    const [showDetailsModal, setShowDetailsModal] = useState(false);

    // Check if admin
    useEffect(() => {
        const isAdmin = Cookies.get('token_admin') === 'true';
        if (!isAdmin) {
            navigate('/');
        }
    }, [navigate]);

    // Fetch data based on active tab
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                if (activeTab === 'users') {
                    // Fetch users...
                } else if (activeTab === 'payments') {
                    const paymentsData = await adminService.getPayments();
                    setPayments(paymentsData);
                } else if (activeTab === 'assessments') {
                    const assessmentsData = await adminService.getAssessments();
                    setAssessments(assessmentsData);
                } else if (activeTab === 'dashboard') {
                    const statsData = await adminService.getDashboardStats();
                    setStats(statsData);
                }
            } catch (err) {
                setError('Failed to fetch data');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [activeTab]);

    const handlePaymentStatusUpdate = async (paymentId, newStatus) => {
        try {
            await adminService.updatePaymentStatus(paymentId, newStatus);
            // Refresh payments data
            const response = await adminService.getPayments();
            setPayments(response);
        } catch (err) {
            setError('Failed to update payment status');
            console.error(err);
        }
    };

    const handleAssessmentStatusUpdate = async (assessmentId, newStatus) => {
        try {
            await adminService.updateAssessmentStatus(assessmentId, newStatus);
            // Refresh assessments data
            const response = await adminService.getAssessments();
            setAssessments(response);
        } catch (err) {
            setError('Failed to update assessment status');
            console.error(err);
        }
    };

    const handleViewDetails = async (assessmentId) => {
        try {
            const response = await api.get(`/assessment/${assessmentId}/details`);
            setSelectedAssessment(response.data);
            setShowDetailsModal(true);
        } catch (error) {
            setError('Failed to fetch assessment details');
            console.error(error);
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
                <h2 className="text-center mb-4">Admin Portal</h2>

                {/* Navigation Tabs */}
                <ul className="nav nav-tabs mb-4">
                    <li className="nav-item">
                        <button 
                            className={`nav-link ${activeTab === 'dashboard' ? 'active' : ''}`}
                            onClick={() => setActiveTab('dashboard')}
                        >
                            Dashboard
                        </button>
                    </li>
                    <li className="nav-item">
                        <button 
                            className={`nav-link ${activeTab === 'users' ? 'active' : ''}`}
                            onClick={() => setActiveTab('users')}
                        >
                            Users
                        </button>
                    </li>
                    <li className="nav-item">
                        <button 
                            className={`nav-link ${activeTab === 'payments' ? 'active' : ''}`}
                            onClick={() => setActiveTab('payments')}
                        >
                            Payments
                        </button>
                    </li>
                    <li className="nav-item">
                        <button 
                            className={`nav-link ${activeTab === 'assessments' ? 'active' : ''}`}
                            onClick={() => setActiveTab('assessments')}
                        >
                            Assessments
                        </button>
                    </li>
                </ul>

                {error && (
                    <div className="alert alert-danger rounded-0 mb-4">
                        {error}
                    </div>
                )}

                {loading ? (
                    <div className="text-center">
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                ) : (
                    <>
                        {/* Dashboard Stats */}
                        {activeTab === 'dashboard' && stats && (
                            <div className="row g-4 mb-4">
                                <div className="col-md-3">
                                    <div className="card bg-dark text-white">
                                        <div className="card-body">
                                            <h5 className="card-title">Total Users</h5>
                                            <h2>{stats.totalUsers}</h2>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-3">
                                    <div className="card bg-dark text-white">
                                        <div className="card-body">
                                            <h5 className="card-title">Completed Payments</h5>
                                            <h2>{stats.completedPayments}</h2>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-3">
                                    <div className="card bg-dark text-white">
                                        <div className="card-body">
                                            <h5 className="card-title">Total Revenue</h5>
                                            <h2>R{stats.revenue}</h2>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-3">
                                    <div className="card bg-dark text-white">
                                        <div className="card-body">
                                            <h5 className="card-title">Completed Assessments</h5>
                                            <h2>{stats.completedAssessments}</h2>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Users Tab */}
                        {activeTab === 'users' && (
                            <div className="table-responsive">
                                <table className="table table-dark">
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Email</th>
                                            <th>Registration Date</th>
                                            <th>Payment Status</th>
                                            <th>Assessment Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {users.map(user => (
                                            <tr key={user._id}>
                                                <td>{user.name}</td>
                                                <td>{user.email}</td>
                                                <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                                                <td>{user.paymentStatus}</td>
                                                <td>{user.assessmentStatus}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}

                        {/* Payments Tab */}
                        {activeTab === 'payments' && (
                            <div className="table-responsive">
                                <table className="table table-dark">
                                    <thead>
                                        <tr>
                                            <th>Email</th>
                                            <th>Amount</th>
                                            <th>Date</th>
                                            <th>Status</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {payments.map(payment => (
                                            <tr key={payment._id}>
                                                <td>{payment.email}</td>
                                                <td>R{payment.amount}</td>
                                                <td>{new Date(payment.createdAt).toLocaleDateString()}</td>
                                                <td>{payment.status}</td>
                                                <td>
                                                    <select 
                                                        className="form-select form-select-sm bg-dark text-white"
                                                        value={payment.status}
                                                        onChange={(e) => handlePaymentStatusUpdate(payment._id, e.target.value)}
                                                    >
                                                        <option value="pending">Pending</option>
                                                        <option value="COMPLETE">Complete</option>
                                                        <option value="FAILED">Failed</option>
                                                    </select>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}

                        {/* Assessments Tab */}
                        {activeTab === 'assessments' && (
                            <div className="table-responsive">
                                <table className="table table-dark">
                                    <thead>
                                        <tr>
                                            <th>Email</th>
                                            <th>Aptitude Score</th>
                                            <th>EQ Score</th>
                                            <th>Status</th>
                                            <th>Completion Date</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {assessments.map(assessment => (
                                            <tr key={assessment._id}>
                                                <td>{assessment.email}</td>
                                                <td>{assessment.aptitudeScore}</td>
                                                <td>{assessment.eqScore}</td>
                                                <td>
                                                    <select 
                                                        className="form-select form-select-sm"
                                                        value={assessment.status}
                                                        onChange={(e) => handleAssessmentStatusUpdate(
                                                            assessment._id, 
                                                            e.target.value
                                                        )}
                                                    >
                                                        <option value="pending">Pending</option>
                                                        <option value="reviewed">Reviewed</option>
                                                        <option value="passed">Passed</option>
                                                        <option value="failed">Failed</option>
                                                    </select>
                                                </td>
                                                <td>
                                                    {new Date(assessment.completedAt).toLocaleDateString()}
                                                </td>
                                                <td>
                                                    <button 
                                                        className="btn btn-sm btn-outline-info"
                                                        onClick={() => handleViewDetails(assessment._id)}
                                                    >
                                                        View Details
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </>
                )}
            </div>

            {/* Assessment Details Modal */}
            {showDetailsModal && selectedAssessment && (
                <div className="modal show d-block" tabIndex="-1">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content bg-dark text-white">
                            <div className="modal-header">
                                <h5 className="modal-title">Assessment Details</h5>
                                <button type="button" className="btn-close" onClick={() => setShowDetailsModal(false)}></button>
                            </div>
                            <div className="modal-body">
                                <div className="mb-4">
                                    <h6>Basic Information</h6>
                                    <p>Email: {selectedAssessment.email}</p>
                                    <p>Started: {new Date(selectedAssessment.startTime).toLocaleString()}</p>
                                    <p>Completed: {new Date(selectedAssessment.completedAt).toLocaleString()}</p>
                                    <p>Time Spent: {selectedAssessment.timeSpent.aptitude}s (Aptitude), {selectedAssessment.timeSpent.eq}s (EQ)</p>
                                    <p>Tab Switches: {selectedAssessment.tabSwitches}</p>
                                </div>
                                
                                <div className="mb-4">
                                    <h6>Scores</h6>
                                    <p>Aptitude Score: {selectedAssessment.aptitudeScore.toFixed(1)}%</p>
                                    <p>EQ Score: {selectedAssessment.eqScore.toFixed(1)}/5</p>
                                </div>

                                <div className="mb-4">
                                    <h6>Aptitude Questions</h6>
                                    {selectedAssessment.aptitudeQuestions.map((item, index) => (
                                        <div key={index} className={`mb-3 p-2 ${item.correct ? 'border-success' : 'border-danger'} border`}>
                                            <p className="mb-2">{item.question.question}</p>
                                            <p className="mb-0 small">
                                                Answer: {item.question.options[item.answer]}
                                                {!item.correct && ` (Correct: ${item.question.options[item.question.correct]})`}
                                            </p>
                                        </div>
                                    ))}
                                </div>

                                <div className="mb-4">
                                    <h6>EQ Questions</h6>
                                    {selectedAssessment.eqQuestions.map((item, index) => (
                                        <div key={index} className="mb-3 p-2 border">
                                            <p className="mb-2">{item.question.question}</p>
                                            <p className="mb-0 small">Score: {item.score}/5</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminPortal; 