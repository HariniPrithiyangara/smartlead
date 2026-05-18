import dotenv from 'dotenv';
dotenv.config();

export const env = {
  PORT: process.env.PORT || '5000',
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/smartleads',
  JWT_SECRET: process.env.JWT_SECRET || 'fallback_secret',
  NODE_ENV: process.env.NODE_ENV || 'development',
};
