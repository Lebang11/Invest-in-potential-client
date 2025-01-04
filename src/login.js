import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';
import { authService } from './services/api';
import { useAuth } from './context/AuthContext';

const Login = () => {
    const { updateUser } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);
        
        try {
            const userData = await authService.login(email, password);
            updateUser(userData);

            // Navigate to the protected page they tried to visit or default route
            const from = location.state?.from || (userData.admin ? '/admin' : '/clients');
            navigate(from, { replace: true });
            
        } catch (error) {
            setError(error.message || 'Login failed. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="reg-form d-flex justify-content-center align-items-center ">
            <div className="w-75">
                <form className=" border p-4 rounded" onSubmit={(e) => {
                    handleSubmit(e)
                }}>
                    <h2 className="display-5 text-center text-muted">Sign In</h2>
            
                    <label for='email' className="form-label" >Email Address</label>
                    <input type="email" name="email" className="form-control" onChange={(e) => {
                        setEmail(e.target.value)
                    }} value={email}/>
                    
                    <label for='email' className="form-label">Password</label>
                    <input type="password" name="password" className="form-control"onChange={(e) => {
                        setPassword(e.target.value)
                    }} value={password}/>
                    
                    <p className="text-danger text-center">{error}</p>
                    <div className="mt-3 d-flex justify-content-center">
                    {!isLoading &&  <button type="submit" class='btn btn-primary'>Submit</button>}
                        {isLoading && 
                        <button class="btn btn-secondary" type="button" disabled>
                        <span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
                        Loading...
                        </button>
                        }                    </div>
                </form>
            </div>
        </div> 
        
     );
}
 
export default Login;