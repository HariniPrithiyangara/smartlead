import React, { useState } from 'react';
import { Users, CheckCircle, UserPlus, XCircle, Plus, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { StatCard } from '../components/dashboard/StatCard';
import { useLeadStats, useLeads } from '../hooks/useLeads';
import { PageLoader } from '../components/common/Loader';
import { LeadModal } from '../components/leads/LeadModal';

const RecentLeadsFeed = () => {
  const { data, isLoading } = useLeads({ limit: 5, sort: 'latest' });

  if (isLoading) return <div className="py-4"><PageLoader /></div>;
  if (!data?.data?.length) return <div className="text-center py-8 text-slate-500">No leads added yet.</div>;

  return (
    <div className="space-y-3">
      {data.data.map((lead) => (
        <div key={lead._id} className="flex items-center justify-between p-3 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors border border-transparent hover:border-slate-100 dark:hover:border-slate-700/50 group">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-500 to-[#14b8a6] flex items-center justify-center text-white font-bold text-sm shadow-sm">
              {lead.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-900 dark:text-white">{lead.name}</p>
              <p className="text-xs text-slate-500">{lead.company || 'No Company'}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-xs font-medium text-slate-700 dark:text-slate-300">{lead.status}</p>
              <p className="text-[11px] text-slate-400">{format(new Date(lead.createdAt), 'MMM d, yyyy')}</p>
            </div>
            <Link to="/leads" className="text-slate-400 hover:text-teal-500 opacity-0 group-hover:opacity-100 transition-opacity">
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

const Dashboard: React.FC = () => {
  const { data: stats, isLoading } = useLeadStats();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  if (isLoading) return <PageLoader />;

  return (
    <div>
      {/* Page Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Overview</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-0.5">Track your sales performance and pipeline.</p>
        </div>
        <button
          id="dashboard-add-lead-btn"
          onClick={() => setIsAddModalOpen(true)}
          className="btn-primary"
        >
          <Plus size={18} />
          Add Lead
        </button>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard
          title="Total Leads"
          value={stats?.total ?? 0}
          change={12.5}
          icon={<Users size={18} className="text-purple-500" />}
          iconBg="bg-purple-50"
        />
        <StatCard
          title="Qualified Leads"
          value={stats?.qualified ?? 0}
          change={5.2}
          icon={<CheckCircle size={18} className="text-green-500" />}
          iconBg="bg-green-50"
        />
        <StatCard
          title="New Leads"
          value={stats?.newLeads ?? 0}
          change={18.1}
          icon={<UserPlus size={18} className="text-blue-500" />}
          iconBg="bg-blue-50"
        />
        <StatCard
          title="Lost Leads"
          value={stats?.lost ?? 0}
          change={-2.4}
          icon={<XCircle size={18} className="text-red-400" />}
          iconBg="bg-red-50"
        />
      </div>

      {/* Recent Leads Feed */}
      <div className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl rounded-3xl border border-slate-100/50 dark:border-slate-800/50 p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">Recent Leads</h2>
          <span className="text-xs font-medium text-slate-500 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-full">
            Just added
          </span>
        </div>
        
        {/* We reuse the hook with a limit of 5 for recent leads */}
        <RecentLeadsFeed />
      </div>

      <LeadModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />
    </div>
  );
};

export default Dashboard;

