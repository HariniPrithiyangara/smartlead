import axiosInstance from './axiosInstance';
import { AuthResponse, LoginInput, RegisterInput } from '../types/auth.types';

// Set to true via .env to use mock auth (no backend needed)
const USE_MOCK = import.meta.env.VITE_USE_MOCK_API === 'true';

const MOCK_USERS = [
  { id: '1', name: 'Sarah Chen', email: 'admin@demo.com', password: 'demo123', role: 'admin' as const },
  { id: '2', name: 'John Sales', email: 'sales@demo.com', password: 'demo123', role: 'sales' as const },
];

function delay(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

export const authApi = {
  login: async (data: LoginInput): Promise<AuthResponse> => {
    if (USE_MOCK) {
      await delay(500);
      const user = MOCK_USERS.find(
        (u) => u.email === data.email && u.password === data.password
      );
      if (!user) throw { response: { data: { message: 'Invalid credentials. Try admin@demo.com / demo123' } } };
      const { password: _p, ...userWithoutPassword } = user;
      return { token: 'mock-jwt-token', user: userWithoutPassword };
    }
    const res = await axiosInstance.post('/auth/login', data);
    return res.data.data;
  },

  register: async (data: RegisterInput): Promise<AuthResponse> => {
    if (USE_MOCK) {
      await delay(500);
      const exists = MOCK_USERS.find((u) => u.email === data.email);
      if (exists) throw { response: { data: { message: 'Email already registered' } } };
      const newUser = { id: String(MOCK_USERS.length + 1), name: data.name, email: data.email, role: data.role ?? 'sales' as const };
      return { token: 'mock-jwt-token', user: newUser };
    }
    const res = await axiosInstance.post('/auth/register', data);
    return res.data.data;
  },

  getMe: async () => {
    if (USE_MOCK) return null;
    const res = await axiosInstance.get('/auth/me');
    return res.data.data;
  },
};
