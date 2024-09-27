import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Login = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setLoading] = useState(false)

    const navigate = useNavigate();

    const handleSubmit = (e) => {
            e.preventDefault()
            setError('')
            setLoading(true)
            axios.post('https://investing-in-potential-server.vercel.app/admin/login',
            {
                email,
                password
            }
            )
            .then(response => {
                console.log(response.data)
                Cookies.set('token_id', response.data._id , { expires: 7 });
                Cookies.set('token_email', response.data.email , { expires: 7 });
                Cookies.set('token_username', response.data.username , { expires: 7 });

                alert('Logged In!')
                
                setEmail('')
                setPassword('')
                setLoading(false)

                navigate('/')
            })
            .catch(err => {
                setError(err.response.data.message);
                setPassword('')
                setLoading(false)

            })


        }



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
                        }
                    </div>
                </form>
            </div>
        </div> 
        
     );
}
 
export default Login;