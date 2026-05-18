import React from 'react';
import { LeadStatus } from '../../types/lead.types';

interface BadgeProps {
  status: LeadStatus;
}

const statusMap: Record<LeadStatus, string> = {
  New: 'badge-new',
  Qualified: 'badge-qualified',
  Contacted: 'badge-contacted',
  Lost: 'badge-lost',
};

export const StatusBadge: React.FC<BadgeProps> = ({ status }) => {
  return <span className={statusMap[status]}>{status}</span>;
};
