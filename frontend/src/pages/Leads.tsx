import React, { useState, useEffect } from 'react';
import { Search, Download, Plus, SlidersHorizontal } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import { useLeads } from '../hooks/useLeads';
import { useCSVExport } from '../hooks/useCSVExport';
import { LeadsTable } from '../components/leads/LeadsTable';
import { LeadModal } from '../components/leads/LeadModal';
import { DeleteConfirmModal } from '../components/leads/DeleteConfirmModal';
import { Pagination } from '../components/common/Pagination';
import { PageLoader } from '../components/common/Loader';
import { Lead, LeadFilters } from '../types/lead.types';

const STATUS_OPTIONS = ['All', 'New', 'Contacted', 'Qualified', 'Lost'];
const SOURCE_OPTIONS = ['All', 'Website', 'Referral', 'Instagram', 'LinkedIn', 'Cold Outreach', 'Event'];

const Leads: React.FC = () => {
  const [searchParams] = useSearchParams();
  const initialSearch = searchParams.get('search') || '';

  const [filters, setFilters] = useState<Partial<LeadFilters>>({
    search: initialSearch,
    status: '',
    source: '',
    sort: 'latest',
    page: 1,
    limit: 10,
  });

  // Sync when URL changes from TopBar
  useEffect(() => {
    const urlSearch = searchParams.get('search');
    if (urlSearch !== null && urlSearch !== filters.search) {
      setFilters(prev => ({ ...prev, search: urlSearch, page: 1 }));
    }
  }, [searchParams]);

  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const { data, isLoading, isFetching } = useLeads(filters);
  const { exportToCSV } = useCSVExport();

  const handleEdit = (lead: Lead) => {
    setSelectedLead(lead);
    setIsEditModalOpen(true);
  };

  const handleDelete = (lead: Lead) => {
    setSelectedLead(lead);
    setIsDeleteModalOpen(true);
  };

  const handleExport = () => {
    if (data?.data) exportToCSV(data.data);
  };

  const updateFilter = (key: keyof LeadFilters, value: string | number) => {
    setFilters((prev) => ({ ...prev, [key]: value, page: 1 }));
  };

  return (
    <div>
      {/* Page Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Leads</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-0.5">Manage and track your potential customers.</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            id="leads-export-btn"
            onClick={handleExport}
            className="btn-secondary"
          >
            <Download size={16} />
            Export
          </button>
          <button
            id="leads-add-btn"
            onClick={() => setIsAddModalOpen(true)}
            className="btn-primary"
          >
            <Plus size={18} />
            Add Lead
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl rounded-3xl border border-slate-100/50 dark:border-slate-800/50 shadow-sm transition-all duration-300">
        <div className="flex flex-wrap items-center gap-3 px-5 py-4 border-b border-slate-50 dark:border-slate-800/50">
          <div className="relative flex-1 min-w-[200px] max-w-xs">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" />
            <input
              id="leads-search-input"
              type="search"
              placeholder="Search leads..."
              value={filters.search}
              onChange={(e) => updateFilter('search', e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 text-sm bg-slate-50/50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#14b8a6]/40 dark:focus:ring-[#2dd4bf]/40 focus:border-[#14b8a6] dark:focus:border-[#2dd4bf] transition-all text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500"
            />
          </div>

          <select
            id="leads-status-filter"
            value={filters.status || ''}
            onChange={(e) => updateFilter('status', e.target.value === 'All' ? '' : e.target.value)}
            className="text-sm border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2.5 bg-slate-50/50 dark:bg-slate-800/50 focus:outline-none focus:ring-2 focus:ring-[#14b8a6]/40 dark:focus:ring-[#2dd4bf]/40 focus:border-[#14b8a6] text-slate-600 dark:text-slate-300 transition-all cursor-pointer"
          >
            {STATUS_OPTIONS.map((s) => (
              <option key={s} value={s === 'All' ? '' : s} className="bg-white dark:bg-slate-800">
                {s === 'All' ? 'Status: All' : s}
              </option>
            ))}
          </select>

          <select
            id="leads-source-filter"
            value={filters.source || ''}
            onChange={(e) => updateFilter('source', e.target.value === 'All' ? '' : e.target.value)}
            className="text-sm border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2.5 bg-slate-50/50 dark:bg-slate-800/50 focus:outline-none focus:ring-2 focus:ring-[#14b8a6]/40 dark:focus:ring-[#2dd4bf]/40 focus:border-[#14b8a6] text-slate-600 dark:text-slate-300 transition-all cursor-pointer"
          >
            {SOURCE_OPTIONS.map((s) => (
              <option key={s} value={s === 'All' ? '' : s} className="bg-white dark:bg-slate-800">
                {s === 'All' ? 'Source: All' : s}
              </option>
            ))}
          </select>

          <select
            id="leads-sort-filter"
            value={filters.sort}
            onChange={(e) => updateFilter('sort', e.target.value)}
            className="text-sm border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2.5 bg-slate-50/50 dark:bg-slate-800/50 focus:outline-none focus:ring-2 focus:ring-[#14b8a6]/40 dark:focus:ring-[#2dd4bf]/40 focus:border-[#14b8a6] text-slate-600 dark:text-slate-300 transition-all cursor-pointer"
          >
            <option value="latest" className="bg-white dark:bg-slate-800">Latest First</option>
            <option value="oldest" className="bg-white dark:bg-slate-800">Oldest First</option>
          </select>

          {isFetching && (
            <div className="flex items-center gap-1.5 text-xs text-slate-400">
              <div className="w-3 h-3 border-2 border-[#14b8a6] border-t-transparent rounded-full animate-spin" />
              Updating...
            </div>
          )}
        </div>

        {/* Table */}
        <div className="px-4 py-2">
          {isLoading ? (
            <PageLoader />
          ) : (
            <>
              <LeadsTable
                leads={data?.data || []}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />

              {data && data.totalPages > 1 && (
                <div className="border-t border-slate-50 dark:border-slate-800/50 mt-2">
                  <Pagination
                    currentPage={data.page}
                    totalPages={data.totalPages}
                    total={data.total}
                    limit={filters.limit || 10}
                    onPageChange={(page) => setFilters((prev) => ({ ...prev, page }))}
                  />
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Modals */}
      <LeadModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />
      <LeadModal
        isOpen={isEditModalOpen}
        onClose={() => { setIsEditModalOpen(false); setSelectedLead(null); }}
        lead={selectedLead}
      />
      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => { setIsDeleteModalOpen(false); setSelectedLead(null); }}
        lead={selectedLead}
      />
    </div>
  );
};

export default Leads;

