import { Request, Response, NextFunction } from 'express';
import { registerService, loginService } from '../services/auth.service';
import { ApiResponse } from '../utils/ApiResponse';

export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await registerService(req.body);
    res.status(201).json(ApiResponse.ok(result, 'Registration successful'));
  } catch (error: any) {
    res.status(400).json(ApiResponse.error(error.message));
  }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await loginService(req.body);
    res.status(200).json(ApiResponse.ok(result, 'Login successful'));
  } catch (error: any) {
    res.status(401).json(ApiResponse.error(error.message));
  }
};

export const getMe = async (req: Request, res: Response) => {
  res.status(200).json(ApiResponse.ok(req.user, 'User fetched'));
};
