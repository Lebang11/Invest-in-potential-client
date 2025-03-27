import { createContext, useContext, useState } from 'react';
import { authService } from '../services/api';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const email = Cookies.get('token_email');
        const username = Cookies.get('token_username');
        const admin = Cookies.get('token_admin') === 'true';
        const id = Cookies.get('token_id');
        const points = Number(Cookies.get('token_points') || 0);
        const student = Cookies.get('token_student') === 'true';

        return email && id ? {
            email,
            name: username,
            isAdmin: admin,
            _id: id,
            points,
            student
        } : null;
    });

    const login = async (email, password) => {
        try {
            const userData = await authService.login(email, password);
            
            // Set all cookies with a longer expiration (30 days) and path to root
            const cookieOptions = { 
                expires: 30, 
                path: '/',
                secure: true,
                sameSite: 'Lax'
            };

            // Set all user data as cookies with token_ prefix
            Cookies.set('token_email', userData.email, cookieOptions);
            Cookies.set('token_username', userData.name, cookieOptions);
            Cookies.set('token_admin', userData.admin, cookieOptions);
            Cookies.set('token_id', userData._id, cookieOptions);
            Cookies.set('token_points', userData.points || 0, cookieOptions);
            Cookies.set('token_student', userData.student || false, cookieOptions);
            
            setUser({
                email: userData.email,
                name: userData.name,
                isAdmin: userData.admin,
                _id: userData._id,
                points: userData.points || 0,
                student: userData.student || false
            });
            
            return userData;
        } catch (error) {
            throw error;
        }
    };

    const updateUser = (userData) => {
        const cookieOptions = { 
            expires: 30, 
            path: '/',
            secure: true,
            sameSite: 'Lax'
        };

        // Update cookies with new user data
        if (userData.email) Cookies.set('token_email', userData.email, cookieOptions);
        if (userData.name) Cookies.set('token_username', userData.name, cookieOptions);
        if (userData.admin !== undefined) Cookies.set('token_admin', userData.admin, cookieOptions);
        if (userData._id) Cookies.set('token_id', userData._id, cookieOptions);
        if (userData.points !== undefined) Cookies.set('token_points', userData.points, cookieOptions);
        if (userData.student !== undefined) Cookies.set('token_student', userData.student, cookieOptions);

        // Update user state
        setUser(prevUser => ({
            ...prevUser,
            ...userData
        }));
    };

    const logout = () => {
        // First clear user state
        setUser(null);
        
        // Then remove all cookies
        Cookies.remove('token_email', { path: '/' });
        Cookies.remove('token_username', { path: '/' });
        Cookies.remove('token_admin', { path: '/' });
        Cookies.remove('token_id', { path: '/' });
        Cookies.remove('token_points', { path: '/' });
        Cookies.remove('token_student', { path: '/' });

        // Simple redirect
        window.location.href = '/';
    };

    const value = {
        user,
        login,
        logout,
        updateUser,
        setUser
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}; 