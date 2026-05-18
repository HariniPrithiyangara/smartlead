import bcrypt from 'bcryptjs';
import { User } from '../models/User.model';
import { signToken } from '../utils/jwt';
import { RegisterInput, LoginInput } from '../validations/auth.validation';

export const registerService = async (data: RegisterInput) => {
  const existing = await User.findOne({ email: data.email });
  if (existing) throw new Error('Email already registered');

  const hashedPassword = await bcrypt.hash(data.password, 12);
  const user = await User.create({ ...data, password: hashedPassword });

  const token = signToken({ id: user._id.toString(), role: user.role });

  return {
    token,
    user: { id: user._id, name: user.name, email: user.email, role: user.role },
  };
};

export const loginService = async (data: LoginInput) => {
  const user = await User.findOne({ email: data.email });
  if (!user) throw new Error('Invalid credentials');

  const isMatch = await bcrypt.compare(data.password, user.password);
  if (!isMatch) throw new Error('Invalid credentials');

  const token = signToken({ id: user._id.toString(), role: user.role });

  return {
    token,
    user: { id: user._id, name: user.name, email: user.email, role: user.role },
  };
};
