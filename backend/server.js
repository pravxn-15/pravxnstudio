const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();

const app = express();

// Connect Database
connectDB();

// CORS
app.use(
  cors({
    origin: [
      'https://pravxnstudio-p6vy.vercel.app',
      'http://localhost:5173'
    ],
    credentials: true
  })
);

// Middleware
app.use(express.json({ limit: '25mb' }));

app.use(
  express.urlencoded({
    extended: true,
    limit: '25mb'
  })
);

// Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    studio: 'pravxnstudio',
    timestamp: new Date().toISOString()
  });
});

// API Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/projects', require('./routes/projectRoutes'));
app.use('/api/services', require('./routes/serviceRoutes'));
app.use('/api/testimonials', require('./routes/testimonialRoutes'));
app.use('/api/enquiries', require('./routes/enquiryRoutes'));
app.use('/api/uploads', require('./routes/uploadRoutes'));
app.use('/api/settings', require('./routes/settingRoutes'));

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    message: 'API Endpoint Not Found'
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('[Server Error]', err.stack);

  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error'
  });
});

const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
  console.log(
    `[pravxnstudio Backend] Server running on port ${PORT}`
  );
});