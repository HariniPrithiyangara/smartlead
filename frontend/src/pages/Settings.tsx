import React from 'react';
import { useAuthStore } from '../store/authStore';
import { User, Shield, Mail } from 'lucide-react';

const Settings: React.FC = () => {
  const { user } = useAuthStore();

  return (
    <div className="max-w-2xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Settings</h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm mt-0.5">Manage your account preferences.</p>
      </div>

      <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl rounded-3xl border border-slate-100/50 dark:border-slate-700/50 shadow-sm divide-y divide-slate-100 dark:divide-slate-700/50">
        <div className="px-6 py-5">
          <h2 className="text-base font-semibold text-slate-900 dark:text-white mb-4">Profile</h2>
          <div className="space-y-3">
            {[
              { icon: User, label: 'Full Name', value: user?.name },
              { icon: Mail, label: 'Email', value: user?.email },
              { icon: Shield, label: 'Role', value: user?.role === 'admin' ? 'Administrator' : 'Sales Representative' },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-center gap-3 py-2">
                <div className="w-8 h-8 bg-slate-50 dark:bg-slate-700/50 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon size={15} className="text-slate-400 dark:text-slate-500" />
                </div>
                <div>
                  <p className="text-xs text-slate-400 dark:text-slate-500">{label}</p>
                  <p className="text-sm font-medium text-slate-800 dark:text-slate-200">{value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;

