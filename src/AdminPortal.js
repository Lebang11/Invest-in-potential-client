import { useState, useEffect } from 'react';
import { api, endpoints } from './config/api';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const AdminPortal = () => {
    const [activeTab, setActiveTab] = useState('users');
    const [users, setUsers] = useState([]);
    const [payments, setPayments] = useState([]);
    const [assessments, setAssessments] = useState([]);
    const [stats, setStats] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

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
            setIsLoading(true);
            setError('');
            try {
                let data;
                switch (activeTab) {
                    case 'users':
                        data = await api.get(endpoints.admin.users);
                        setUsers(data.data);
                        break;
                    case 'payments':
                        data = await api.get(endpoints.admin.payments);
                        setPayments(data.data);
                        break;
                    case 'assessments':
                        data = await api.get(endpoints.admin.assessments);
                        setAssessments(data.data);
                        break;
                    case 'dashboard':
                        data = await api.get(endpoints.admin.stats);
                        setStats(data.data);
                        break;
                    default:
                        break;
                }
            } catch (err) {
                setError('Failed to fetch data');
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, [activeTab]);

    const handlePaymentStatusUpdate = async (paymentId, newStatus) => {
        try {
            await api.patch(`${endpoints.admin.payments}/${paymentId}`, {
                status: newStatus
            });
            // Refresh payments data
            const response = await api.get(endpoints.admin.payments);
            setPayments(response.data);
        } catch (err) {
            setError('Failed to update payment status');
            console.error(err);
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

                {isLoading ? (
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
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {assessments.map(assessment => (
                                            <tr key={assessment._id}>
                                                <td>{assessment.email}</td>
                                                <td>{assessment.scores?.aptitude || 'N/A'}</td>
                                                <td>{assessment.scores?.eq || 'N/A'}</td>
                                                <td>{assessment.status}</td>
                                                <td>
                                                    {assessment.completionTime?.aptitude ? 
                                                        new Date(assessment.completionTime.aptitude).toLocaleDateString() 
                                                        : 'Not Completed'}
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
        </div>
    );
};

export default AdminPortal; 