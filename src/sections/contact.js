import MotionHeader from "../motion/motionheading";
import { useState } from 'react';
import { api, endpoints } from '../config/api';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setStatus('');

        // Basic validation
        if (!formData.name || !formData.email || !formData.message) {
            setStatus('Please fill in all fields');
            setLoading(false);
            return;
        }

        // Email format validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            setStatus('Please enter a valid email address');
            setLoading(false);
            return;
        }

        try {
            const response = await api.post(endpoints.contact, formData);
            console.log('Contact form response:', response.data);
            
            if (response.status === 200) {
                setStatus('Message sent successfully!');
                setFormData({ name: '', email: '', message: '' });
            } else {
                throw new Error('Unexpected response status: ' + response.status);
            }
        } catch (error) {
            console.error('Error details:', error);
            setStatus(error.response?.data?.message || 'Failed to send message. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return ( 
        <section id="contact" style={{
            backgroundColor:"rgb(20, 20, 20)"
        }} className="d-flex flex-column justify-content-start align-items-center mt-5 px-4">
            <div className="container border my-5 py-4" style={{
                backgroundColor: "rgb(20, 20, 20)",
                width: "90vw",
                maxWidth:"800px"
            }}>
                <h1 className="display-4 text-center mt-3 text-light">
                    <MotionHeader header={"Contact Us".split("")}/>
                </h1>
                <form className="d-flex flex-column justify-content-center align-items-center" onSubmit={handleSubmit}>
                    <input 
                        style={{
                            backgroundColor: "rgb(20, 20, 20)",
                            borderColor:"white"
                        }} 
                        className="form-control mt-3 w-75 rounded-0 text-light" 
                        placeholder="Full name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required 
                    />
                    <input 
                        type="email" 
                        style={{
                            backgroundColor: "rgb(20, 20, 20)",
                            borderColor:"white"
                        }} 
                        className="form-control mt-3 w-75 rounded-0 text-light" 
                        placeholder="Email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    <textarea 
                        style={{
                            backgroundColor: "rgb(20, 20, 20)",
                            borderColor:"white"
                        }} 
                        className="form-control mt-3 w-75 rounded-0 text-light" 
                        placeholder="What's on your mind?"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows="4"
                        required
                    />
                    {status && (
                        <div className={`mt-3 text-${status.includes('success') ? 'success' : 'danger'}`}>
                            {status}
                        </div>
                    )}
                    <button 
                        className="mt-3 rounded-0 btn btn-outline-light" 
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? (
                            <span>
                                <i className="bi bi-hourglass-split me-2"></i>
                                Sending...
                            </span>
                        ) : 'Submit'}
                    </button>
                </form>
            </div>
        </section>
    );
}

export default Contact;