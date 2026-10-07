import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import './Auth.css';

function Register() {

    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [error, setError] = useState('');

            const handleSubmit = async (e) => {
            e.preventDefault();

            setError('');

            try {

                await api('/auth/register', {
                    method: 'POST',

                    body: JSON.stringify({
                        name,
                        email,
                        password
                    })
                });

                navigate('/login');

            } catch (error) {

                setError(error.message);

            }
        };

    return (
        <main className="auth-page">

            <div className="auth-card">

                <h1>Create Account</h1>

                <p className="auth-subtitle">
                    Join our blog today
                </p>

                {error && (
                    <p className="auth-error">
                        {error}
                    </p>
                )}

                <form onSubmit={handleSubmit}>

                    <div className="form-group">

                        <label>Name</label>

                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter your name"
                        />

                    </div>

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
                            placeholder="Create a password"
                        />

                    </div>

                    <button
                        className="auth-button"
                        type="submit"
                    >
                        Register
                    </button>

                </form>

                <p className="auth-footer">
                    Already have an account?{' '}

                    <Link to="/login">
                        Login
                    </Link>
                </p>

            </div>

        </main>
    );
}

export default Register;