import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Sparkles, Copy, Check } from 'lucide-react';
import { Modal } from '../common/Modal';
import { Loader } from '../common/Loader';
import { useCreateLead, useUpdateLead, useAIFollowUp } from '../../hooks/useLeads';
import { Lead, LeadFormData } from '../../types/lead.types';
import { toast } from 'sonner';

const leadSchema = z.object({
  name:    z.string().min(2, 'Name is required'),
  email:   z.string().email('Valid email required'),
  company: z.string().optional(),
  phone:   z.string().optional(),
  status:  z.enum(['New', 'Contacted', 'Qualified', 'Lost']),
  source:  z.enum(['Website', 'Referral', 'Instagram', 'LinkedIn', 'Cold Outreach', 'Event']),
  notes:   z.string().optional(),
});

type LeadSchemaType = z.infer<typeof leadSchema>;

interface LeadModalProps {
  isOpen: boolean;
  onClose: () => void;
  lead?: Lead | null;
}

export const LeadModal: React.FC<LeadModalProps> = ({ isOpen, onClose, lead }) => {
  const isEditing = !!lead;
  const createLead = useCreateLead();
  const updateLead = useUpdateLead();
  const aiFollowUp = useAIFollowUp();

  const [aiMessage, setAiMessage] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  // Reset local state when modal opens/closes
  useEffect(() => {
    if (!isOpen) {
      setAiMessage(null);
      setCopied(false);
    }
  }, [isOpen]);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<LeadSchemaType>({
    resolver: zodResolver(leadSchema),
    defaultValues: lead ? {
      name: lead.name,
      email: lead.email,
      company: lead.company || '',
      phone: lead.phone || '',
      status: lead.status,
      source: lead.source,
      notes: lead.notes || '',
    } : {
      status: 'New',
      source: 'Website',
    },
  });

  // Sync form values when the selected lead changes
  useEffect(() => {
    if (lead) {
      reset({
        name: lead.name,
        email: lead.email,
        company: lead.company || '',
        phone: lead.phone || '',
        status: lead.status,
        source: lead.source,
        notes: lead.notes || '',
      });
    } else {
      reset({
        name: '',
        email: '',
        company: '',
        phone: '',
        status: 'New',
        source: 'Website',
        notes: '',
      });
    }
  }, [lead, reset]);

  const onSubmit = async (data: LeadSchemaType) => {
    try {
      if (isEditing && lead) {
        await updateLead.mutateAsync({ id: lead._id, data });
        toast.success('Lead updated successfully');
      } else {
        await createLead.mutateAsync(data as LeadFormData);
        toast.success('Lead created successfully');
      }
      reset();
      onClose();
    } catch (err: any) {
      toast.error(err?.response?.data?.message || 'Something went wrong');
    }
  };

  const handleGenerateAI = async () => {
    if (!lead) return;
    try {
      const message = await aiFollowUp.mutateAsync(lead._id);
      setAiMessage(message);
      toast.success('AI message generated!');
    } catch (err: any) {
      toast.error(err?.response?.data?.message || 'Failed to generate message');
    }
  };

  const copyToClipboard = () => {
    if (aiMessage) {
      navigator.clipboard.writeText(aiMessage);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      toast.success('Copied to clipboard!');
    }
  };

  const sendEmail = () => {
    if (aiMessage && lead) {
      const subject = encodeURIComponent('Following up on your inquiry');
      const body = encodeURIComponent(aiMessage);
      window.location.href = `mailto:${lead.email}?subject=${subject}&body=${body}`;
    }
  };

  const sendWhatsApp = () => {
    if (aiMessage && lead?.phone) {
      // Clean phone number (remove spaces, plus, etc.)
      const cleanPhone = lead.phone.replace(/[^0-9]/g, '');
      const text = encodeURIComponent(aiMessage);
      window.open(`https://wa.me/${cleanPhone}?text=${text}`, '_blank');
    }
  };

  const isLoading = createLead.isPending || updateLead.isPending;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={isEditing ? 'Edit Lead' : 'Add New Lead'} size="md">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* AI Follow-up Section - Only show when editing an existing lead */}
        {isEditing && (
          <div className="mb-4">
            {!aiMessage ? (
              <button
                type="button"
                onClick={handleGenerateAI}
                disabled={aiFollowUp.isPending}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-[#14b8a6]/30 bg-teal-50 dark:bg-[#14b8a6]/10 text-teal-700 dark:text-teal-400 font-medium hover:bg-teal-100 dark:hover:bg-[#14b8a6]/20 transition-colors shadow-sm"
              >
                {aiFollowUp.isPending ? <Loader size={16} /> : <Sparkles size={16} className="text-teal-600 dark:text-teal-400" />}
                {aiFollowUp.isPending ? 'Generating Intelligence...' : '✨ Generate AI Follow-up Message'}
              </button>
            ) : (
              <div className="bg-gradient-to-br from-teal-50 to-slate-50 dark:from-[#14b8a6]/10 dark:to-slate-800/50 rounded-xl p-4 border border-teal-100 dark:border-teal-900/30 relative group">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-teal-700 dark:text-teal-400 uppercase tracking-wider flex items-center gap-1">
                    <Sparkles size={12} /> AI Suggested Follow-up
                  </span>
                  <div className="flex flex-wrap items-center justify-end gap-2">
                    <button
                      type="button"
                      onClick={copyToClipboard}
                      title="Copy to clipboard"
                      className="flex items-center gap-1.5 text-xs font-medium text-slate-500 hover:text-teal-600 dark:text-slate-400 dark:hover:text-teal-400 transition-colors bg-white/50 dark:bg-slate-800/50 px-2 py-1 rounded-md border border-slate-200 dark:border-slate-700"
                    >
                      {copied ? <Check size={14} /> : <Copy size={14} />}
                      {copied ? 'Copied!' : 'Copy'}
                    </button>
                    {lead?.phone && (
                      <button
                        type="button"
                        onClick={sendWhatsApp}
                        className="flex items-center gap-1.5 text-xs font-medium text-white bg-green-500 hover:bg-green-600 transition-colors px-3 py-1 rounded-md shadow-sm"
                      >
                        WhatsApp
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={sendEmail}
                      className="flex items-center gap-1.5 text-xs font-medium text-white bg-[#14b8a6] hover:bg-teal-600 transition-colors px-3 py-1 rounded-md shadow-sm"
                    >
                      Email
                    </button>
                  </div>
                </div>
                <p className="text-sm text-slate-700 dark:text-slate-300 whitespace-pre-wrap leading-relaxed">{aiMessage}</p>
              </div>
            )}
          </div>
        )}

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="form-label">Full Name *</label>
            <input {...register('name')} className="form-input" placeholder="John Doe" />
            {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>}
          </div>
          <div>
            <label className="form-label">Email *</label>
            <input {...register('email')} className="form-input" placeholder="john@example.com" type="email" />
            {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="form-label">Company</label>
            <input {...register('company')} className="form-input" placeholder="Acme Corp" />
          </div>
          <div>
            <label className="form-label">Phone</label>
            <input {...register('phone')} className="form-input" placeholder="+91 98765 43210" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="form-label">Status *</label>
            <select {...register('status')} className="form-input">
              <option value="New">New</option>
              <option value="Contacted">Contacted</option>
              <option value="Qualified">Qualified</option>
              <option value="Lost">Lost</option>
            </select>
          </div>
          <div>
            <label className="form-label">Source *</label>
            <select {...register('source')} className="form-input">
              <option value="Website">Website</option>
              <option value="Referral">Referral</option>
              <option value="Instagram">Instagram</option>
              <option value="LinkedIn">LinkedIn</option>
              <option value="Cold Outreach">Cold Outreach</option>
              <option value="Event">Event</option>
            </select>
          </div>
        </div>

        <div>
          <label className="form-label">Notes</label>
          <textarea
            {...register('notes')}
            className="form-input resize-none"
            rows={3}
            placeholder="Additional notes about this lead..."
          />
        </div>

        <div className="flex items-center justify-end gap-3 pt-2 border-t border-slate-100 dark:border-slate-700/50">
          <button type="button" onClick={onClose} className="btn-secondary">
            Cancel
          </button>
          <button type="submit" disabled={isLoading} className="btn-primary">
            {isLoading && <Loader size={16} />}
            {isEditing ? 'Save Changes' : 'Create Lead'}
          </button>
        </div>
      </form>
    </Modal>
  );
};

