import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem('noteapp_user');
        return storedUser ? JSON.parse(storedUser) : null;
    });
    const [token, setToken] = useState(localStorage.getItem('noteapp_token'));
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const storedUser = localStorage.getItem('noteapp_user');
        if (storedUser && token) {
            setUser(JSON.parse(storedUser));
        }
    }, [token]);

    const login = (userData, authToken) => {
        setUser(userData);
        setToken(authToken);
        localStorage.setItem('noteapp_user', JSON.stringify(userData));
        localStorage.setItem('noteapp_token', authToken);
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem('noteapp_user');
        localStorage.removeItem('noteapp_token');
    };

    const value = {
        user,
        token,
        loading,
        login,
        logout,
        isAuthenticated: !!token,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};
