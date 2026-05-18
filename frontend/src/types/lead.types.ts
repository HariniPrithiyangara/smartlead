export type LeadStatus = 'New' | 'Contacted' | 'Qualified' | 'Lost';
export type LeadSource = 'Website' | 'Referral' | 'Instagram' | 'LinkedIn' | 'Cold Outreach' | 'Event';

export interface Lead {
  _id: string;
  name: string;
  email: string;
  company?: string;
  phone?: string;
  status: LeadStatus;
  source: LeadSource;
  notes?: string;
  createdBy: { name: string; email: string } | string;
  createdAt: string;
  updatedAt: string;
}

export interface LeadFormData {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  status: LeadStatus;
  source: LeadSource;
  notes?: string;
}

export interface LeadFilters {
  search: string;
  status: string;
  source: string;
  sort: 'latest' | 'oldest';
  page: number;
  limit: number;
}

export interface PaginatedLeads {
  success: boolean;
  data: Lead[];
  total: number;
  page: number;
  totalPages: number;
}

export interface LeadStats {
  total: number;
  qualified: number;
  newLeads: number;
  lost: number;
  contacted: number;
}
