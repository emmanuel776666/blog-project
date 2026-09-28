import { createContext, useState } from 'react';

const AuthContext = createContext();

function AuthProvider({ children }) {
    const [user, setUser] = useState(
        JSON.parse(localStorage.getItem('user')) || null
    );

    const [token, setToken] = useState(
        localStorage.getItem('token') || null
    );

    const login = async (email, password) => {
        const response = await fetch(
            'http://localhost:5000/api/auth/login',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email,
                    password
                })
            }
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message);
        }

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