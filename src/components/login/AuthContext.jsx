// AuthContext.js
import React, { createContext, useContext, useState } from 'react';
import {useNavigate} from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const [isLoggedIn, setLoggedIn] = useState(localStorage.getItem('loggedin') === 'true');

    const login = (token, nr_tableta) => {
        setLoggedIn(true);
        localStorage.setItem('loggedin', 'true');
        localStorage.setItem('token', token);
        localStorage.setItem('nr_tableta', nr_tableta);
        // Poți face și alte operații legate de autentificare aici, dacă este necesar
        navigate('/home');
    };

    const logout = () => {
        setLoggedIn(false);
        localStorage.clear();
        navigate('/login');
    };
    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
