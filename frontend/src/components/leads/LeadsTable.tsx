import React from 'react';
import { format } from 'date-fns';
import { Pencil, Trash2, ExternalLink, Search } from 'lucide-react';
import { StatusBadge } from '../common/Badge';
import { Lead } from '../../types/lead.types';
import { useAuthStore } from '../../store/authStore';
import { useNavigate } from 'react-router-dom';

interface LeadsTableProps {
  leads: Lead[];
  onEdit: (lead: Lead) => void;
  onDelete: (lead: Lead) => void;
}

export const LeadsTable: React.FC<LeadsTableProps> = ({ leads, onEdit, onDelete }) => {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const isAdmin = user?.role === 'admin';

  if (leads.length === 0) {
    return (
      <div className="text-center py-20 px-6">
        <div className="w-16 h-16 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4 border border-slate-100 dark:border-slate-700">
          <Search size={24} className="text-slate-400 dark:text-slate-500" />
        </div>
        <h3 className="text-slate-900 dark:text-white font-medium mb-1">No leads found</h3>
        <p className="text-slate-500 dark:text-slate-400 text-sm">Try adjusting your filters or add a new lead.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-slate-100 dark:border-slate-800/50">
            {['Company & Contact', 'Email', 'Status', 'Source', 'Added', 'Action'].map((col) => (
              <th
                key={col}
                className="text-left text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider px-4 py-3.5 first:pl-5 last:pr-5"
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-50 dark:divide-slate-800/50">
          {leads.map((lead) => (
            <tr key={lead._id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors group">
              <td className="px-4 py-4 first:pl-5">
                <div>
                  <p className="font-semibold text-sm text-slate-900 dark:text-slate-100">{lead.company || lead.name}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{lead.name}</p>
                </div>
              </td>
              <td className="px-4 py-4 text-sm text-slate-600 dark:text-slate-300">{lead.email}</td>
              <td className="px-4 py-4">
                <StatusBadge status={lead.status} />
              </td>
              <td className="px-4 py-4 text-sm text-slate-600 dark:text-slate-300">{lead.source}</td>
              <td className="px-4 py-4 text-sm text-slate-500 dark:text-slate-400 whitespace-nowrap">
                {format(new Date(lead.createdAt), 'MMM dd, yyyy')}
              </td>
              <td className="px-4 py-4 last:pr-5">
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => navigate(`/leads/${lead._id}`)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                    title="View lead"
                  >
                    <ExternalLink size={14} />
                  </button>
                  <button
                    onClick={() => onEdit(lead)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-[#14b8a6] dark:hover:text-[#2dd4bf] hover:bg-[#14b8a6]/10 dark:hover:bg-[#2dd4bf]/10 transition-colors"
                    title="Edit lead"
                  >
                    <Pencil size={14} />
                  </button>
                  {isAdmin && (
                    <button
                      onClick={() => onDelete(lead)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors"
                      title="Delete lead"
                    >
                      <Trash2 size={14} />
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

