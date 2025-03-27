import { api, endpoints } from './config/api';
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true)
        
        if (!username || !email || !password || !passwordConfirm) {
            setError('Enter valid details')
            setLoading(false)
        } else if (password !== passwordConfirm) {
            setPassword('')
            setPasswordConfirm('')
            setError('Passwords don\'t match')
            setLoading(false)
        } else if (password.length < 5) {
            setPassword('')
            setPasswordConfirm('')
            setError('Password must be at least 5 characters')
            setLoading(false)
        } else {
            api.post(endpoints.register, {
                username,
                email,
                password
            })
            .then(res => {
                alert('User created successfully')
                setUsername('')
                setEmail('')
                setPassword('')
                setPasswordConfirm('')
                navigate('/login')
                setLoading(false)
            })
            .catch(err => {
                console.log(err)
                setUsername('')
                setEmail('')
                setPassword('')
                setPasswordConfirm('')
                setError(err.response.data.message || 'An error occurred during registration')
                setLoading(false)
            })
        }
    }

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
                                <div className="text-center mb-4">
                                    <img 
                                        src="IIP logo mark.png" 
                                        alt="IIP Logo" 
                                        height="80" 
                                        className="mb-3"
                                    />
                                    <h2 className="text-dark">Create Account</h2>
                                </div>
                                {error && (
                                    <div className="alert alert-danger rounded-0" role="alert">
                                        {error}
                                    </div>
                                )}
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                        <label htmlFor="username" className="form-label text-dark">Name and Surname</label>
                                        <input 
                                            type="text" 
                                            id="username"
                                            className="form-control form-control-lg rounded-0"
                                            onChange={(e) => setUsername(e.target.value)}
                                            value={username}
                                            required
                                        />
                                    </div>
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
                                    <div className="mb-3">
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
                                    <div className="mb-4">
                                        <label htmlFor="password-confirm" className="form-label text-dark">Confirm Password</label>
                                        <input 
                                            type="password" 
                                            id="password-confirm"
                                            className="form-control form-control-lg rounded-0"
                                            onChange={(e) => setPasswordConfirm(e.target.value)}
                                            value={passwordConfirm}
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
                                                    Creating Account...
                                                </>
                                            ) : 'Create Account'}
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

export default Register;