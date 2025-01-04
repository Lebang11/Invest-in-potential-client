import { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = Cookies.get('token_id');
        if (token) {
            setUser({
                id: token,
                email: Cookies.get('token_email'),
                name: Cookies.get('token_username'),
                isAdmin: Cookies.get('token_admin') === 'true',
                points: parseInt(Cookies.get('token_points') || '0')
            });
        }
        setLoading(false);
    }, []);

    const updateUser = (userData) => {
        if (userData) {
            Cookies.set('token_id', userData._id);
            Cookies.set('token_email', userData.email);
            Cookies.set('token_username', userData.name);
            Cookies.set('token_admin', userData.admin);
            Cookies.set('token_points', userData.points);
            setUser({
                id: userData._id,
                email: userData.email,
                name: userData.name,
                isAdmin: userData.admin,
                points: userData.points
            });
        } else {
            Cookies.remove('token_id');
            Cookies.remove('token_email');
            Cookies.remove('token_username');
            Cookies.remove('token_admin');
            Cookies.remove('token_points');
            setUser(null);
        }
    };

    return (
        <AuthContext.Provider value={{ user, updateUser, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}; 