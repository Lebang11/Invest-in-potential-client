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
            
        }  else {

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
            .catch( err => {
                console.log(err)
                alert('Error encountered')
                setUsername('')
                setEmail('')
                setPassword('')
                setPasswordConfirm('')
                setError('Error')
                setLoading(false)
            }
                )
        }


        


        
    }



    return (
        <div className="reg-form d-flex justify-content-center align-items-center ">
            <div className="w-75">
                <form className=" border p-4 rounded" onSubmit={(e) => {
                    handleSubmit(e)
                }}>
                    <h2 className="display-5 text-center text-muted">Sign Up</h2>
                    <label for='username' className="form-label">Name and Surname</label>
                    <input type="text" name="username" className="form-control" onChange={(e) => {
                        setUsername(e.target.value)
                    }} value={username}/>
                    <label for='email' className="form-label" >Email Address</label>
                    <input type="email" name="email" className="form-control" onChange={(e) => {
                        setEmail(e.target.value)
                    }} value={email}/>
                    <label for='email' className="form-label">Password</label>
                    <input type="password" name="password" className="form-control"onChange={(e) => {
                        setPassword(e.target.value)
                    }} value={password}/>
                    <label for='password-confirm' className="form-label">Confirm Password</label>
                    <input type="password" name="password-confirm" className="form-control" onChange={(e) => {
                        setPasswordConfirm(e.target.value)
                    }} value={passwordConfirm}/>
                    <p className="text-danger text-center">{error}</p>
                    <div className="mt-3 d-flex justify-content-center">
                        {!isLoading &&  <button type="submit" class='btn btn-primary'>Submit</button>}
                        {isLoading && 
                            <button class="btn btn-secondary" type="button" disabled>
                                <span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
                                Loading...
                            </button>
                        }
                    </div>
                </form>
            </div>
        </div> 
        
     );
}
 
export default Register;