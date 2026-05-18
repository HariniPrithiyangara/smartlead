import React, { useState } from 'react';
import { Search, Bell, Moon, Sun } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { useThemeStore } from '../../store/themeStore';
import { useNavigate } from 'react-router-dom';

interface TopBarProps {
  onSearch?: (value: string) => void;
}

export const TopBar: React.FC<TopBarProps> = ({ onSearch }) => {
  const { user } = useAuthStore();
  const { isDarkMode, toggleTheme } = useThemeStore();
  const [searchValue, setSearchValue] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchValue.trim()) {
      navigate(`/leads?search=${encodeURIComponent(searchValue.trim())}`);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    onSearch?.(e.target.value);
  };

  const initials = user?.name
    ? user.name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)
    : 'U';

  return (
    <header className="h-16 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border-b border-slate-100/50 dark:border-slate-800/50 flex items-center justify-between px-6 fixed top-0 right-0 left-56 z-20 transition-colors duration-300">
      {/* Global Search */}
      <div className="relative w-80">
        <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" />
        <input
          type="search"
          placeholder="Search leads, contacts, or accounts... (Press Enter)"
          value={searchValue}
          onChange={handleInputChange}
          onKeyDown={handleSearch}
          className="w-full pl-9 pr-4 py-2 text-sm bg-slate-50/50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#14b8a6]/40 dark:focus:ring-[#2dd4bf]/40 focus:border-[#14b8a6] dark:focus:border-[#2dd4bf] transition-all text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 backdrop-blur-sm"
        />
      </div>

      {/* Right side */}
      <div className="flex items-center gap-4">
        <button
          onClick={toggleTheme}
          className="relative p-2 rounded-xl text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          title="Toggle Theme"
        >
          {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        <button className="relative p-2 rounded-xl text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
          <Bell size={18} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white dark:border-slate-900" />
        </button>

        <button
          className="flex items-center gap-2.5 hover:bg-slate-50 dark:hover:bg-slate-800/80 rounded-xl px-2 py-1.5 transition-colors border border-transparent dark:hover:border-slate-700"
          onClick={() => navigate('/settings')}
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#14b8a6] to-[#2dd4bf] flex items-center justify-center text-white text-xs font-semibold shadow-md shadow-[#14b8a6]/20">
            {initials}
          </div>
          <div className="text-left hidden sm:block">
            <p className="text-sm font-semibold text-slate-900 dark:text-white leading-none">{user?.name}</p>
            <p className="text-xs text-slate-500 dark:text-slate-400 capitalize mt-0.5">{user?.role === 'admin' ? 'Admin' : 'Sales Rep'}</p>
          </div>
        </button>
      </div>
    </header>
  );
};

