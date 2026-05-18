import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { leadsApi } from '../api/leads.api';
import { ArrowLeft, Pencil, Building2, Mail, Phone, Calendar, Tag } from 'lucide-react';
import { StatusBadge } from '../components/common/Badge';
import { PageLoader } from '../components/common/Loader';
import { LeadModal } from '../components/leads/LeadModal';
import { format } from 'date-fns';

const LeadDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isEditOpen, setIsEditOpen] = useState(false);

  const { data: lead, isLoading } = useQuery({
    queryKey: ['lead', id],
    queryFn: () => leadsApi.getById(id!),
    enabled: !!id,
  });

  if (isLoading) return <PageLoader />;
  if (!lead) return <div className="text-center py-10 text-slate-500">Lead not found</div>;

  const createdByName = typeof lead.createdBy === 'object' ? lead.createdBy.name : 'Unknown';

  return (
    <div className="max-w-2xl mx-auto">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900 dark:hover:text-slate-200 mb-6 transition-colors"
      >
        <ArrowLeft size={16} />
        Back to Leads
      </button>

      <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl rounded-2xl border border-slate-100/50 dark:border-slate-700/50 shadow-sm overflow-hidden">
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-100 dark:border-slate-700/50 flex items-start justify-between">
          <div>
            <h1 className="text-xl font-bold text-slate-900 dark:text-white">{lead.name}</h1>
            {lead.company && <p className="text-slate-500 dark:text-slate-400 text-sm mt-0.5">{lead.company}</p>}
          </div>
          <div className="flex items-center gap-2">
            <StatusBadge status={lead.status} />
            <button
              onClick={() => setIsEditOpen(true)}
              className="btn-secondary ml-2"
            >
              <Pencil size={14} />
              Edit
            </button>
          </div>
        </div>

        {/* Details */}
        <div className="px-6 py-5 space-y-4">
          {[
            { icon: Mail, label: 'Email', value: lead.email },
            { icon: Building2, label: 'Company', value: lead.company || '—' },
            { icon: Phone, label: 'Phone', value: lead.phone || '—' },
            { icon: Tag, label: 'Source', value: lead.source },
            { icon: Calendar, label: 'Added', value: format(new Date(lead.createdAt), 'MMMM dd, yyyy') },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex items-center gap-3">
              <div className="w-8 h-8 bg-slate-50 dark:bg-slate-700/50 rounded-lg flex items-center justify-center flex-shrink-0">
                <Icon size={15} className="text-slate-400 dark:text-slate-500" />
              </div>
              <div>
                <p className="text-xs text-slate-400 dark:text-slate-500 font-medium">{label}</p>
                <p className="text-sm text-slate-800 dark:text-slate-200">{value}</p>
              </div>
            </div>
          ))}

          {lead.notes && (
            <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-700/50">
              <p className="text-xs text-slate-400 dark:text-slate-500 font-medium mb-1">Notes</p>
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">{lead.notes}</p>
            </div>
          )}
        </div>

        <div className="px-6 py-4 bg-slate-50/50 dark:bg-slate-900/30 border-t border-slate-100 dark:border-slate-700/50">
          <p className="text-xs text-slate-400 dark:text-slate-500">Created by <span className="font-medium text-slate-600 dark:text-slate-300">{createdByName}</span></p>
        </div>
      </div>

      <LeadModal isOpen={isEditOpen} onClose={() => setIsEditOpen(false)} lead={lead} />
    </div>
  );
};

export default LeadDetail;

