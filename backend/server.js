const express = require('express');
const cors = require('cors');
const transactionRoutes = require('./routes/transactionRoutes');
const { errorHandler } = require('./middleware/errorMiddleware');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware to parse JSON and enable CORS for frontend requests
app.use(cors());
app.use(express.json());

// Transaction API routes
app.use('/api/transactions', transactionRoutes);

// Fallback route for undefined endpoints
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Error handling middleware
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Expense Tracker backend running on http://localhost:${PORT}`);
});
