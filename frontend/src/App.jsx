import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';import PostDetails from './pages/PostDetails';
import AdminDashboard from './pages/AdminDashboard';
import AdminRoute from './components/AdminRoute';


function App() {
    return (
        <BrowserRouter>

            <Navbar />

            <Routes>

                <Route path="/" element={<Home />} />

                <Route path="/login" element={<Login />} />

                <Route path="/register" element={<Register />}
                 />

                <Route path="/posts/:id" element={<PostDetails />} />
                <Route path="/admin"element={  <AdminRoute> <AdminDashboard /></AdminRoute> }/>

            </Routes>

        </BrowserRouter>
    );
}

export default App;