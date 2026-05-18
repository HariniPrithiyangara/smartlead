import axiosInstance from './axiosInstance';
import { LeadFilters, LeadFormData, PaginatedLeads, Lead, LeadStats } from '../types/lead.types';
import { getMockLeads, MOCK_LEADS, MOCK_STATS } from '../utils/mockData';

// Set to true via .env to use mock data (no backend needed)
const USE_MOCK = import.meta.env.VITE_USE_MOCK_API === 'true';

let mockLeads = [...MOCK_LEADS];
let nextId = mockLeads.length + 1;

export const leadsApi = {
  getAll: async (filters: Partial<LeadFilters>): Promise<PaginatedLeads> => {
    if (USE_MOCK) {
      await delay(300);
      return getMockLeads(
        filters.search,
        filters.status,
        filters.source,
        filters.sort,
        filters.page,
        filters.limit
      );
    }
    const params = new URLSearchParams();
    if (filters.search) params.set('search', filters.search);
    if (filters.status) params.set('status', filters.status);
    if (filters.source) params.set('source', filters.source);
    if (filters.sort) params.set('sort', filters.sort);
    if (filters.page) params.set('page', String(filters.page));
    if (filters.limit) params.set('limit', String(filters.limit));
    const res = await axiosInstance.get(`/leads?${params.toString()}`);
    return res.data;
  },

  getById: async (id: string): Promise<Lead> => {
    if (USE_MOCK) {
      await delay(200);
      const lead = mockLeads.find((l) => l._id === id);
      if (!lead) throw new Error('Lead not found');
      return lead;
    }
    const res = await axiosInstance.get(`/leads/${id}`);
    return res.data.data;
  },

  create: async (data: LeadFormData): Promise<Lead> => {
    if (USE_MOCK) {
      await delay(400);
      const newLead: Lead = {
        _id: String(nextId++),
        ...data,
        createdBy: { name: 'You', email: 'you@example.com' },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      mockLeads.unshift(newLead);
      return newLead;
    }
    const res = await axiosInstance.post('/leads', data);
    return res.data.data;
  },

  update: async (id: string, data: Partial<LeadFormData>): Promise<Lead> => {
    if (USE_MOCK) {
      await delay(400);
      const idx = mockLeads.findIndex((l) => l._id === id);
      if (idx === -1) throw new Error('Lead not found');
      mockLeads[idx] = { ...mockLeads[idx], ...data, updatedAt: new Date().toISOString() };
      return mockLeads[idx];
    }
    const res = await axiosInstance.put(`/leads/${id}`, data);
    return res.data.data;
  },

  delete: async (id: string): Promise<void> => {
    if (USE_MOCK) {
      await delay(300);
      mockLeads = mockLeads.filter((l) => l._id !== id);
      return;
    }
    await axiosInstance.delete(`/leads/${id}`);
  },

  getStats: async (): Promise<LeadStats> => {
    if (USE_MOCK) {
      await delay(200);
      return {
        ...MOCK_STATS,
        total: mockLeads.length + 2410,
        newLeads: mockLeads.filter((l) => l.status === 'New').length + 316,
        qualified: mockLeads.filter((l) => l.status === 'Qualified').length + 842,
        lost: mockLeads.filter((l) => l.status === 'Lost').length + 41,
        contacted: mockLeads.filter((l) => l.status === 'Contacted').length + 1207,
      };
    }
    const res = await axiosInstance.get('/leads/stats');
    return res.data.data;
  },

  generateAIFollowUp: async (id: string): Promise<string> => {
    const res = await axiosInstance.post(`/leads/${id}/ai-followup`);
    return res.data.data.message;
  },
};

function delay(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}
