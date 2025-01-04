import { createContext, useContext, useState } from 'react';
import { authService } from '../services/api';
import Cookies from 'js-cookie';

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
        const email = Cookies.get('user_email');
        const admin = Cookies.get('token_admin') === 'true';
        const token = Cookies.get('token_id');
        return email && token ? { email, isAdmin: admin, token } : null;
    });

    const login = async (email, password) => {
        try {
            const userData = await authService.login(email, password);
            Cookies.set('user_email', userData.email, { expires: 7 });
            Cookies.set('token_admin', userData.admin, { expires: 7 });
            Cookies.set('token_id', userData._id, { expires: 7 });
            setUser({
                ...userData,
                isAdmin: userData.admin
            });
            return userData;
        } catch (error) {
            throw error;
        }
    };

    const logout = async () => {
        try {
            await authService.logout();
            setUser(null);
            Cookies.remove('user_email');
            Cookies.remove('token_admin');
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    const value = {
        user,
        login,
        logout,
        setUser
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}; 