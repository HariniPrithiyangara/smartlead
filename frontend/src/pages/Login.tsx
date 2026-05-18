import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link, useNavigate } from 'react-router-dom';
import { Zap, Eye, EyeOff, Moon, Sun } from 'lucide-react';
import { useState } from 'react';
import { authApi } from '../api/auth.api';
import { useAuthStore } from '../store/authStore';
import { useThemeStore } from '../store/themeStore';
import { Loader } from '../components/common/Loader';
import { toast } from 'sonner';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

type LoginForm = z.infer<typeof loginSchema>;

const Login: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { setAuth } = useAuthStore();
  const { isDarkMode, toggleTheme } = useThemeStore();
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginForm) => {
    setIsLoading(true);
    try {
      const result = await authApi.login(data);
      setAuth(result.user, result.token);
      toast.success(`Welcome back, ${result.user.name}!`);
      navigate('/dashboard');
    } catch (err: any) {
      toast.error(err?.response?.data?.message || 'Invalid credentials');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex items-center justify-center p-4 transition-colors duration-300">
      <button
        onClick={toggleTheme}
        className="absolute top-6 right-6 p-2 rounded-xl text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
        title="Toggle Theme"
      >
        {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
      </button>
      <div className="w-full max-w-md bg-white dark:bg-slate-800 rounded-2xl shadow-xl shadow-slate-200/80 dark:shadow-none border border-slate-100 dark:border-slate-700/50 overflow-hidden">
        <div className="px-8 pt-8 pb-6">
          {/* Logo */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-12 h-12 rounded-2xl bg-[#14b8a6] flex items-center justify-center mb-4 shadow-lg shadow-[#14b8a6]/30">
              <Zap size={22} className="text-white" fill="white" />
            </div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">SmartLeads</h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Welcome back</p>
            <p className="text-slate-400 dark:text-slate-500 text-xs mt-0.5">Enter your details to access your dashboard</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label htmlFor="email" className="form-label">Email</label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                {...register('email')}
                className="form-input"
                placeholder="sarah@example.com"
              />
              {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label htmlFor="password" className="form-label mb-0">Password</label>
                <a href="#" className="text-xs text-[#14b8a6] hover:underline">Forgot password?</a>
              </div>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  {...register('password')}
                  className="form-input pr-10"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password.message}</p>}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#14b8a6] hover:bg-[#0d9488] text-white font-semibold py-2.5 rounded-lg text-sm transition-colors duration-150 flex items-center justify-center gap-2 disabled:opacity-70 mt-2"
            >
              {isLoading ? <Loader size={18} /> : null}
              Sign In
            </button>
          </form>



          <p className="text-center text-sm text-slate-500 dark:text-slate-400 mt-4">
            Don't have an account?{' '}
            <Link to="/register" className="text-[#14b8a6] dark:text-[#2dd4bf] font-medium hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

