import React from 'react';
import { NavLink, useNavigate, Link } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  BarChart2,
  Settings,
  LogOut,
  Zap
} from 'lucide-react';
import { useAuthStore } from '../../store/authStore';

const navItems = [
  { label: 'Dashboard', icon: LayoutDashboard, to: '/dashboard' },
  { label: 'Leads', icon: Users, to: '/leads' },
  { label: 'Analytics', icon: BarChart2, to: '/analytics' },
  { label: 'Settings', icon: Settings, to: '/settings' },
];

export const Sidebar: React.FC = () => {
  const { logout, user } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <aside className="w-56 h-screen flex flex-col bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-r border-slate-100 dark:border-slate-800 fixed left-0 top-0 z-30 transition-colors duration-300">
      {/* Logo */}
      <div className="h-16 border-b border-slate-100 dark:border-slate-800 flex items-center px-5">
        <Link to="/dashboard" className="flex items-center gap-2.5 group cursor-pointer">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#14b8a6] to-[#2dd4bf] shadow-lg shadow-[#14b8a6]/30 flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
            <Zap size={16} className="text-white" fill="white" />
          </div>
          <span className="font-bold text-slate-900 dark:text-white text-base tracking-tight group-hover:text-[#14b8a6] dark:group-hover:text-[#2dd4bf] transition-colors duration-200">SmartLeads</span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navItems.map(({ label, icon: Icon, to }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `sidebar-link ${isActive ? 'active' : ''}`
            }
          >
            <Icon size={18} />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>

      {/* User + Logout */}
      <div className="px-3 py-4 border-t border-slate-200 dark:border-slate-700 space-y-2">
        <div className="flex items-center px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/50">
          <div className="overflow-hidden">
            <p className="text-sm font-semibold text-slate-900 dark:text-white truncate">{user?.name}</p>
            <p className="text-xs text-slate-500 dark:text-slate-400 capitalize">{user?.role}</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="sidebar-link w-full text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10 dark:text-red-400"
        >
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

