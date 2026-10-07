import { createContext, useState } from 'react';

import api from '../services/api';

const AuthContext = createContext();

function AuthProvider({ children }) {

    const [user, setUser] = useState(
        JSON.parse(localStorage.getItem('user')) || null
    );

    const [token, setToken] = useState(
        localStorage.getItem('token') || null
    );

    const login = async (email, password) => {

        const data = await api('/auth/login', {
            method: 'POST',

            body: JSON.stringify({
                email,
                password
            })
        });

        setUser(data.user);
        setToken(data.token);

        localStorage.setItem(
            'user',
            JSON.stringify(data.user)
        );

        localStorage.setItem(
            'token',
            data.token
        );

        return data;
    };

    const logout = () => {

        setUser(null);
        setToken(null);

        localStorage.removeItem('user');
        localStorage.removeItem('token');
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                token,
                login,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export { AuthContext, AuthProvider };