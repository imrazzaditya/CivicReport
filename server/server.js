const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { connectDB } = require('./config/db');
const errorHandler = require('./middleware/errorHandler');

// Load environment variables
dotenv.config();

// Import routes
const authRoutes = require('./routes/authRoutes');
const ticketRoutes = require('./routes/ticketRoutes');

// Initialize Express
const app = express();

// ─── MIDDLEWARE ──────────────────────────────────────────────────────────────
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ─── ROUTES ─────────────────────────────────────────────────────────────────
app.get('/', (req, res) => {
    res.json({ message: 'Civic Issue Reporting Platform API is running 🚀' });
});

app.use('/api/auth', authRoutes);
app.use('/api/tickets', ticketRoutes);

// ─── ERROR HANDLER (must be after routes) ───────────────────────────────────
app.use(errorHandler);

// ─── START SERVER ───────────────────────────────────────────────────────────
const PORT = process.env.PORT || 5000;

const startServer = async () => {
    await connectDB();
    app.listen(PORT, () => {
        console.log(`✅ Server running on port ${PORT}`);
    });
};

startServer();
