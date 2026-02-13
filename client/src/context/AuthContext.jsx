import { createContext, useContext, useState, useEffect } from 'react';
import api from '../utils/api';

const AuthContext = createContext();

/**
 * Custom hook to access auth state and helpers.
 */
export const useAuth = () => useContext(AuthContext);

/**
 * AuthProvider — manages user state, login, register, and logout.
 * Persists user data (including JWT) in localStorage.
 */
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Rehydrate user from localStorage on mount
    useEffect(() => {
        const stored = localStorage.getItem('user');
        if (stored) {
            setUser(JSON.parse(stored));
        }
        setLoading(false);
    }, []);

    /**
     * Register a new account and auto-login.
     */
    const register = async (name, email, password, role = 'user') => {
        const { data } = await api.post('/auth/register', {
            name,
            email,
            password,
            role,
        });
        if (data.success) {
            localStorage.setItem('user', JSON.stringify(data.data));
            setUser(data.data);
        }
        return data;
    };

    /**
     * Login with email & password.
     */
    const login = async (email, password) => {
        const { data } = await api.post('/auth/login', { email, password });
        if (data.success) {
            localStorage.setItem('user', JSON.stringify(data.data));
            setUser(data.data);
        }
        return data;
    };

    /**
     * Logout — clear state and storage.
     */
    const logout = () => {
        localStorage.removeItem('user');
        setUser(null);
    };

    return (
        <AuthContext.Provider
            value={{ user, loading, login, register, logout, isAdmin: user?.role === 'admin' }}
        >
            {children}
        </AuthContext.Provider>
    );
};
