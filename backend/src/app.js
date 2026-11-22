// import express from 'express';
// import cors from 'cors';
// import helmet from 'helmet';
// import morgan from 'morgan';
// import rateLimit from 'express-rate-limit';
// import authRoutes from './routes/authRoutes.js';
// import leadRoutes from './routes/leadRoutes.js';
// import { errorHandler, notFound } from './middleware/errors.js';
// const app = express();
// app.use(helmet());
// app.use(cors({ origin: process.env.CLIENT_URL?.split(',') || 'http://localhost:5173' }));
// app.use(express.json({ limit: '10kb' }));
// if (process.env.NODE_ENV !== 'test') app.use(morgan('dev'));
// app.use('/api/auth', rateLimit({ windowMs: 15 * 60 * 1000, limit: 100, standardHeaders: 'draft-7', legacyHeaders: false }), authRoutes);
// app.use('/api/leads', leadRoutes);
// app.get('/api/health', (req, res) => res.json({ status: 'ok', service: 'lead-manager-api' }));
// app.use(notFound);
// app.use(errorHandler);
// export default app;



import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';

import authRoutes from './routes/authRoutes.js';
import leadRoutes from './routes/leadRoutes.js';

import { errorHandler, notFound } from './middleware/errors.js';

const app = express();

// Security middleware
app.use(helmet());

// CORS configuration
const allowedOrigins = process.env.CLIENT_URL
  ? process.env.CLIENT_URL.split(',').map((url) => url.trim())
  : ['http://localhost:5173'];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

// Request body parser
app.use(express.json({ limit: '10kb' }));

// HTTP request logger
if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('dev'));
}

// Rate limiter
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many requests. Please try again later.',
  },
});

// Routes
app.use('/api/auth', authLimiter, authRoutes);
app.use('/api/leads', leadRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    status: 'ok',
    service: 'lead-manager-api',
  });
});

// 404 handler
app.use(notFound);

// Global error handler
app.use(errorHandler);

export default app;
