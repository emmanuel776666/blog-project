import { useContext } from 'react';
import { Link } from 'react-router-dom';

import {
    Home,
    LogIn,
    UserPlus,
    LogOut,
    LayoutDashboard
} from 'lucide-react';

import { AuthContext } from '../context/AuthContext';

import './Navbar.css';

function Navbar() {

    const { user, logout } = useContext(AuthContext);

    return (
        <nav className="navbar">

            <div className="navbar-logo">
                <Link to="/">
                    My Blog
                </Link>
            </div>

            <div className="navbar-links">

                <Link to="/">
                    <Home size={18} />
                    Home
                </Link>

                {!user && (
                    <>
                        <Link to="/login">
                            <LogIn size={18} />
                            Login
                        </Link>

                        <Link to="/register">
                            <UserPlus size={18} />
                            Register
                        </Link>
                    </>
                )}

                {user && (
                    <>
                        <span className="navbar-user">
                            {user.name}
                        </span>

                        {user.role === 'admin' && (
                            <Link to="/admin">
                                <LayoutDashboard size={18} />
                                Admin Dashboard
                            </Link>
                        )}

                        <button
                            className="logout-button"
                            onClick={logout}
                        >
                            <LogOut size={18} />
                            Logout
                        </button>
                    </>
                )}

            </div>

        </nav>
    );
}

export default Navbar;