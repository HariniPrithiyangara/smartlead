import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { leadsApi } from '../api/leads.api';
import { LeadFilters, LeadFormData } from '../types/lead.types';
import { useDebounce } from './useDebounce';

export function useLeads(filters: Partial<LeadFilters>) {
  const debouncedSearch = useDebounce(filters.search || '', 500);

  return useQuery({
    queryKey: ['leads', { ...filters, search: debouncedSearch }],
    queryFn: () => leadsApi.getAll({ ...filters, search: debouncedSearch }),
    placeholderData: (prev) => prev,
    staleTime: 30_000,
  });
}

export function useLeadStats() {
  return useQuery({
    queryKey: ['leads', 'stats'],
    queryFn: leadsApi.getStats,
    staleTime: 60_000,
  });
}

export function useCreateLead() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: LeadFormData) => leadsApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['leads'] });
    },
  });
}

export function useUpdateLead() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<LeadFormData> }) =>
      leadsApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['leads'] });
    },
  });
}

export function useDeleteLead() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => leadsApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['leads'] });
    },
  });
}

export function useAIFollowUp() {
  return useMutation({
    mutationFn: (id: string) => leadsApi.generateAIFollowUp(id),
  });
}
