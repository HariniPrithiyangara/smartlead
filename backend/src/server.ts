import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { connectDB } from './config/db';
import { env } from './config/env';
import { errorHandler } from './middleware/errorHandler';
import authRoutes from './routes/auth.routes';
import leadRoutes from './routes/lead.routes';

const app = express();

// Security & logging middleware
app.use(helmet());
app.use(cors({
  origin: function (origin, callback) {
    const allowedOrigins = [process.env.FRONTEND_URL, 'http://localhost:5173', 'http://localhost:3000'].filter(Boolean);
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/leads', leadRoutes);

// Health check
app.get('/api/health', (_, res) => res.json({ status: 'ok', timestamp: new Date().toISOString() }));

// Global error handler
app.use(errorHandler);

// Start server
const startServer = async () => {
  await connectDB();
  app.listen(env.PORT, () => {
    console.log(`🚀 Server running on http://localhost:${env.PORT}`);
    console.log(`📁 Environment: ${env.NODE_ENV}`);
  });
};

startServer();
