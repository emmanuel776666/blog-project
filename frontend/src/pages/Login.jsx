import { useContext, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import { AuthContext } from '../context/AuthContext';

import './Auth.css';

function Login() {

    const { login } = useContext(AuthContext);

    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError('');

        try {

            await login(email, password);

            navigate('/');

        } catch (error) {

            setError(error.message);

        }
    };

    return (
        <main className="auth-page">

            <div className="auth-card">

                <h1>Welcome Back</h1>

                <p className="auth-subtitle">
                    Login to your account
                </p>

                {error && (
                    <p className="auth-error">
                        {error}
                    </p>
                )}

                <form onSubmit={handleSubmit}>

                    <div className="form-group">

                        <label>Email</label>

                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                        />

                    </div>

                    <div className="form-group">

                        <label>Password</label>

                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                        />

                    </div>

                    <button
                        className="auth-button"
                        type="submit"
                    >
                        Login
                    </button>

                </form>

                <p className="auth-footer">
                    Don't have an account?{' '}

                    <Link to="/register">
                        Register
                    </Link>
                </p>

            </div>

        </main>
    );
}

export default Login;