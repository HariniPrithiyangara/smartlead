import { Request, Response, NextFunction } from 'express';
import { ApiResponse } from '../utils/ApiResponse';

export const requireRole = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(401).json(ApiResponse.error('Unauthorized'));
      return;
    }

    if (!roles.includes(req.user.role)) {
      res.status(403).json(ApiResponse.error('Forbidden: Insufficient permissions'));
      return;
    }

    next();
  };
};
