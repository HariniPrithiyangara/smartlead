import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt';
import { User } from '../models/User.model';
import { ApiResponse } from '../utils/ApiResponse';

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json(ApiResponse.error('Unauthorized: No token provided'));
      return;
    }

    const token = authHeader.split(' ')[1];
    const decoded = verifyToken(token);

    const user = await User.findById(decoded.id).select('-password');
    if (!user) {
      res.status(401).json(ApiResponse.error('Unauthorized: User not found'));
      return;
    }

    req.user = { _id: user._id, name: user.name, email: user.email, role: user.role };
    next();
  } catch (error) {
    res.status(401).json(ApiResponse.error('Unauthorized: Invalid or expired token'));
  }
};
