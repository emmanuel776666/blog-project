const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const {
    protect,
    adminOnly
} = require('./middleware/authMiddleware');
const postRoutes = require('./routes/postRoutes');

const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.get('/api/admin', protect, adminOnly, (req, res) => {
    res.json({
        message: 'Welcome Admin'
    });
});

app.get('/api/protected', protect, (req, res) => {
    res.json({
        message: 'You can access this protected route',
        user: req.user
    });
});

app.get('/', (req, res) => {
    res.send('Blog API is running');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});