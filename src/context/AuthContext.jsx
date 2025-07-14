// src/context/AuthContext.js
import { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const navigate = useNavigate(); // ✅ moved here inside the component

    const storedUser = JSON.parse(localStorage.getItem('info-user'));
    const [user, setUser] = useState(storedUser ?? null);

    const login = (userData) => {
        setUser(userData);
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('info-user');
        localStorage.removeItem('user-favourite')
        navigate('/'); 
    }
    useEffect(() => {
        localStorage.setItem('info-user', JSON.stringify(user));
    }, [user]);

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}
