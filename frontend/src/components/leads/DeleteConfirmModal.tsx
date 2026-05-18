import React from 'react';
import { Modal } from '../common/Modal';
import { Loader } from '../common/Loader';
import { AlertTriangle } from 'lucide-react';
import { useDeleteLead } from '../../hooks/useLeads';
import { Lead } from '../../types/lead.types';
import { toast } from 'sonner';

interface DeleteConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  lead: Lead | null;
}

export const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({ isOpen, onClose, lead }) => {
  const deleteLead = useDeleteLead();

  const handleDelete = async () => {
    if (!lead) return;
    try {
      await deleteLead.mutateAsync(lead._id);
      toast.success('Lead deleted successfully');
      onClose();
    } catch (err: any) {
      toast.error(err?.response?.data?.message || 'Failed to delete lead');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Delete Lead" size="sm">
      <div className="text-center py-2">
        <div className="w-12 h-12 bg-red-50 dark:bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <AlertTriangle size={24} className="text-red-500" />
        </div>
        <p className="text-sm text-slate-600 dark:text-slate-300 mb-1">
          Are you sure you want to delete{' '}
          <span className="font-semibold text-slate-900 dark:text-white">{lead?.name}</span>?
        </p>
        <p className="text-xs text-slate-400 dark:text-slate-500">This action cannot be undone.</p>
      </div>
      <div className="flex gap-3 mt-6">
        <button onClick={onClose} className="btn-secondary flex-1 justify-center">
          Cancel
        </button>
        <button
          onClick={handleDelete}
          disabled={deleteLead.isPending}
          className="flex-1 bg-red-500 hover:bg-red-600 text-white font-medium px-4 py-2 rounded-lg text-sm transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {deleteLead.isPending && <Loader size={16} />}
          Delete Lead
        </button>
      </div>
    </Modal>
  );
};

