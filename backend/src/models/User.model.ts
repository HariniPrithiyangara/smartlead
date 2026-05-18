import { Schema, model } from 'mongoose';
import { IUser } from '../interfaces/IUser';

const UserSchema = new Schema<IUser>(
  {
    name:     { type: String, required: true, trim: true },
    email:    { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true, minlength: 6 },
    role:     { type: String, enum: ['admin', 'sales'], default: 'sales' },
  },
  { timestamps: true }
);

export const User = model<IUser>('User', UserSchema);
