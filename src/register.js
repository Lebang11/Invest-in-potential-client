import axios from "axios";
import { useState } from "react";

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(username);
            console.log(email);
            console.log(password);
            console.log(passwordConfirm)
        
        if (!username || !email || !password || !passwordConfirm) {
            setError('Enter valid details')
        } else if (password !== passwordConfirm) {
            setPassword('')
            setPasswordConfirm('')
            setError('Passwords don\'t match')
        } else if (password.length < 5) {
            setPassword('')
            setPasswordConfirm('')
            setError('Password must be at least 5 characters')
        }  else {
            console.log(username);
            console.log(email);
            console.log(password);

            axios.post('https://investing-in-potential.onrender.com/register',
            {
                username,
                email,
                password
            }
            )
            .then(res => {
                alert('User created successfully')
                setUsername('')
                setEmail('')
                setPassword('')
                setPasswordConfirm('')
                
            })
        }

        


        
    }



    return (
        <div className="reg-form d-flex justify-content-center align-items-center ">
            <div className="w-75">
                <form className=" border p-4 rounded" onSubmit={(e) => {
                    handleSubmit(e)
                }}>
                    <h2 className="display-5 text-center text-muted">Sign Up</h2>
                    <label for='email' className="form-label">Username</label>
                    <input type="email" name="username" className="form-control" onChange={(e) => {
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
                        <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Submit</button>
                    </div>
                </form>
            </div>
        </div> 
        
     );
}
 
export default Register;