import axios from 'axios';

const API_URL = process.env.REACT_APP_BACKEND_URL;

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Add response interceptor for better error handling
api.interceptors.response.use(
    response => response,
    error => {
        if (error.response) {
            return Promise.reject(error.response.data);
        } else if (error.request) {
            return Promise.reject({ message: 'No response from server' });
        } else {
            return Promise.reject({ message: 'Error setting up request' });
        }
    }
);

export const authService = {
    login: async (email, password) => {
        try {
            const response = await api.post('/login', { email, password });
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    register: async (userData) => {
        try {
            const response = await api.post('/user', userData);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    logout: async () => {
        try {
            await api.post('/logout');
        } catch (error) {
            console.error('Logout error:', error);
        }
    }
};

export const jobService = {
    getAllJobs: async () => {
        try {
            const response = await api.get('/jobs');
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    createJob: async (jobData) => {
        try {
            const response = await api.post('/jobs', jobData);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    applyForJob: async (applicationData) => {
        try {
            const response = await api.post('/applications', applicationData);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    checkApplication: async (email, job) => {
        try {
            const response = await api.get('/applications', { 
                params: { email, job } 
            });
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    }
};

export const paymentService = {
    initializePayment: async (paymentData) => {
        try {
            const response = await api.post('/payment/initialize', paymentData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            return response.data;
        } catch (error) {
            console.error('Payment initialization error:', error);
            throw error.response?.data || error.message;
        }
    },

    getPaymentStatus: async (reference) => {
        try {
            const response = await api.get(`/payment/status/${reference}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    }
};

export const adminService = {
    getPayments: async () => {
        try {
            const response = await api.get('/admin/payments');
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    updatePaymentStatus: async (id, status) => {
        try {
            const response = await api.patch(`/admin/payments/${id}`, { status });
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    getAssessments: async () => {
        try {
            const response = await api.get('/assessment/all');
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    updateAssessmentStatus: async (id, status) => {
        try {
            const response = await api.patch(`/assessment/${id}/status`, { status });
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    getDashboardStats: async () => {
        try {
            const response = await api.get('/admin/stats');
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    }
};

export const contactService = {
    sendMessage: async (messageData) => {
        try {
            const response = await api.post('/email', messageData);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    }
};

export const assessmentService = {
    checkPaymentStatus: async (email) => {
        try {
            const response = await api.get('/payment/check', {
                params: { email }
            });
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },
    checkAssessmentStatus: async (email) => {
        try {
            const response = await api.get(`/assessment/status/${email}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    }
};

export default api; 