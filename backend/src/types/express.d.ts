import { Request } from 'express';
import { IUser } from '../interfaces/IUser';

declare global {
  namespace Express {
    interface Request {
      user?: Pick<IUser, '_id' | 'name' | 'email' | 'role'>;
    }
  }
}
