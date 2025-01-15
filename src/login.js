import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from || '/';
    const message = location.state?.message;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);
        
        try {
            await login(email, password);
            navigate(from);
        } catch (error) {
            setError(error.message || 'Failed to log in');
            setIsLoading(false);
        }
    };

    return (
        <div style={{ 
            minHeight: "100vh",
            backgroundColor: "white",
            paddingTop: "100px"
        }}>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-5">
                        <div className="card border-0 shadow">
                            <div className="card-body p-5">
                                <h2 className="text-center mb-4 text-dark">Welcome Back</h2>
                                {message && (
                                    <div className="alert alert-info rounded-0" role="alert">
                                        {message}
                                    </div>
                                )}
                                {error && (
                                    <div className="alert alert-danger rounded-0" role="alert">
                                        {error}
                                    </div>
                                )}
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                        <label htmlFor="email" className="form-label text-dark">Email Address</label>
                                        <input 
                                            type="email" 
                                            id="email"
                                            className="form-control form-control-lg rounded-0"
                                            onChange={(e) => setEmail(e.target.value)}
                                            value={email}
                                            required
                                        />
                                    </div>
                                    
                                    <div className="mb-4">
                                        <label htmlFor="password" className="form-label text-dark">Password</label>
                                        <input 
                                            type="password" 
                                            id="password"
                                            className="form-control form-control-lg rounded-0"
                                            onChange={(e) => setPassword(e.target.value)}
                                            value={password}
                                            required
                                        />
                                    </div>
                                    
                                    <div className="d-grid">
                                        <button 
                                            type="submit" 
                                            className="btn btn-dark btn-lg rounded-0"
                                            disabled={isLoading}
                                        >
                                            {isLoading ? (
                                                <>
                                                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                                    Logging in...
                                                </>
                                            ) : 'Login'}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;