import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from || '/';
    const message = location.state?.message;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        
        try {
            await login(email, password);
            navigate(from);
        } catch (error) {
            setError(error.message || 'Failed to log in');
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card bg-dark text-white">
                        <div className="card-body">
                            <h2 className="text-center mb-4">Login</h2>
                            {message && (
                                <div className="alert alert-info" role="alert">
                                    {message}
                                </div>
                            )}
                            {error && (
                                <div className="alert alert-danger" role="alert">
                                    {error}
                                </div>
                            )}
                            <form className="border p-4 rounded" onSubmit={(e) => {
                                handleSubmit(e)
                            }}>
                                <label for='email' className="form-label" >Email Address</label>
                                <input type="email" name="email" className="form-control" onChange={(e) => {
                                    setEmail(e.target.value)
                                }} value={email}/>
                                
                                <label for='email' className="form-label">Password</label>
                                <input type="password" name="password" className="form-control"onChange={(e) => {
                                    setPassword(e.target.value)
                                }} value={password}/>
                                
                                <div className="mt-3 d-flex justify-content-center">
                                    <button type="submit" class='btn btn-primary'>Submit</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div> 
        
     );
}
 
export default Login;