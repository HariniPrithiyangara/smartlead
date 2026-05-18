import React from 'react';
import { BarChart2, TrendingUp, Users, Target, Activity, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { useLeadStats } from '../hooks/useLeads';
import { PageLoader } from '../components/common/Loader';

const Analytics: React.FC = () => {
  const { data: stats, isLoading } = useLeadStats();

  if (isLoading) return <div className="p-8"><PageLoader /></div>;
  if (!stats) return null;

  const conversionRate = stats.total > 0 ? ((stats.qualified / stats.total) * 100).toFixed(1) : '0.0';
  const activeLeads = stats.newLeads + stats.contacted;

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Activity className="text-[#14b8a6]" size={24} />
            Pipeline Analytics
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Deep dive into your sales performance and lead conversion.</p>
        </div>
      </div>

      {/* Top Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Conversion Rate Card */}
        <div className="bg-gradient-to-br from-[#14b8a6] to-teal-700 rounded-3xl p-6 text-white shadow-lg shadow-teal-500/20 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:scale-110 transition-transform duration-500">
            <Target size={80} />
          </div>
          <p className="text-teal-100 font-medium text-sm mb-2 relative z-10">Conversion Rate</p>
          <div className="flex items-end gap-3 relative z-10">
            <h3 className="text-4xl font-bold">{conversionRate}%</h3>
            <span className="flex items-center text-sm font-medium text-teal-100 bg-white/20 px-2 py-0.5 rounded-full mb-1">
              <ArrowUpRight size={14} className="mr-0.5" /> +2.4%
            </span>
          </div>
          <p className="text-teal-100/80 text-xs mt-4 relative z-10">Qualified leads out of total pipeline</p>
        </div>

        {/* Active Pipeline Card */}
        <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl rounded-3xl border border-slate-100/50 dark:border-slate-700/50 p-6 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center">
              <TrendingUp className="text-blue-500" size={20} />
            </div>
            <span className="flex items-center text-xs font-semibold text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-500/10 px-2 py-1 rounded-lg">
              <ArrowUpRight size={12} className="mr-1" /> Active
            </span>
          </div>
          <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-1">{activeLeads}</h3>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Leads in Progress</p>
          <p className="text-xs text-slate-400 dark:text-slate-500 mt-3">New and currently contacted leads</p>
        </div>

        {/* Total Reach Card */}
        <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl rounded-3xl border border-slate-100/50 dark:border-slate-700/50 p-6 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-500/10 flex items-center justify-center">
              <Users className="text-purple-500" size={20} />
            </div>
          </div>
          <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-1">{stats.total}</h3>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Total Lifetime Leads</p>
          <p className="text-xs text-slate-400 dark:text-slate-500 mt-3">Across all sources and statuses</p>
        </div>
      </div>

      {/* Main Breakdown Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Funnel Breakdown */}
        <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl rounded-3xl border border-slate-100/50 dark:border-slate-700/50 p-6 sm:p-8 shadow-sm">
          <div className="flex items-center gap-2 mb-8">
            <BarChart2 className="text-[#14b8a6]" size={20} />
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">Pipeline Funnel</h2>
          </div>
          
          <div className="space-y-6">
            {[
              { label: 'New Leads', value: stats.newLeads, color: 'bg-blue-500', bg: 'bg-blue-50 dark:bg-blue-500/10', text: 'text-blue-600 dark:text-blue-400' },
              { label: 'In Contact', value: stats.contacted, color: 'bg-amber-500', bg: 'bg-amber-50 dark:bg-amber-500/10', text: 'text-amber-600 dark:text-amber-400' },
              { label: 'Qualified', value: stats.qualified, color: 'bg-green-500', bg: 'bg-green-50 dark:bg-green-500/10', text: 'text-green-600 dark:text-green-400' },
            ].map(({ label, value, color, bg, text }, idx) => {
              const percentage = stats.total > 0 ? ((value / stats.total) * 100).toFixed(0) : '0';
              return (
                <div key={label} className="relative">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full ${bg} flex items-center justify-center font-bold text-sm ${text}`}>
                        {idx + 1}
                      </div>
                      <span className="font-semibold text-slate-700 dark:text-slate-200">{label}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-lg font-bold text-slate-900 dark:text-white">{value}</span>
                      <span className="text-xs text-slate-400 dark:text-slate-500 ml-2">({percentage}%)</span>
                    </div>
                  </div>
                  <div className="h-3 w-full bg-slate-100 dark:bg-slate-700/50 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${color} rounded-full transition-all duration-1000 ease-out`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Actionable Insights */}
        <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl rounded-3xl border border-slate-100/50 dark:border-slate-700/50 p-6 sm:p-8 shadow-sm flex flex-col">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Actionable Insights</h2>
          
          <div className="flex-1 flex flex-col justify-center space-y-4">
            <div className="p-4 rounded-2xl bg-amber-50/50 dark:bg-amber-500/5 border border-amber-100/50 dark:border-amber-500/10">
              <h4 className="text-sm font-semibold text-amber-800 dark:text-amber-400 flex items-center gap-2 mb-1">
                <TrendingUp size={16} /> Follow-up Required
              </h4>
              <p className="text-sm text-amber-700/80 dark:text-amber-500/80">
                You have <span className="font-bold">{stats.newLeads} new leads</span> waiting to be contacted. Engaging within 24 hours increases conversion by 400%.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-green-50/50 dark:bg-green-500/5 border border-green-100/50 dark:border-green-500/10">
              <h4 className="text-sm font-semibold text-green-800 dark:text-green-400 flex items-center gap-2 mb-1">
                <Target size={16} /> Conversion Health
              </h4>
              <p className="text-sm text-green-700/80 dark:text-green-500/80">
                Your pipeline is generating a <span className="font-bold">{conversionRate}%</span> qualification rate.
                Keep nurturing your {stats.contacted} contacted leads to push this higher!
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/50 mt-auto">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-500 dark:text-slate-400">Total Lost Leads</span>
                <span className="text-lg font-bold text-red-500">{stats.lost}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;

