import { Lead, LeadStats, PaginatedLeads } from '../types/lead.types';

// ─── Mock Leads ─────────────────────────────────────────────────────────────
export const MOCK_LEADS: Lead[] = [
  {
    _id: '1',
    name: 'Alice Smith',
    email: 'alice@acme.co',
    company: 'Acme Corp',
    status: 'New',
    source: 'Website',
    createdBy: { name: 'Sarah Chen', email: 'sarah@example.com' },
    createdAt: '2023-10-24T10:00:00Z',
    updatedAt: '2023-10-24T10:00:00Z',
  },
  {
    _id: '2',
    name: 'Bob Johnson',
    email: 'bob@globex.inc',
    company: 'Globex Inc',
    status: 'Qualified',
    source: 'Referral',
    createdBy: { name: 'Sarah Chen', email: 'sarah@example.com' },
    createdAt: '2023-10-23T10:00:00Z',
    updatedAt: '2023-10-23T10:00:00Z',
  },
  {
    _id: '3',
    name: 'Carol White',
    email: 'carol@soylent.co',
    company: 'Soylent Corp',
    status: 'Contacted',
    source: 'Cold Outreach',
    createdBy: { name: 'Sarah Chen', email: 'sarah@example.com' },
    createdAt: '2023-10-21T10:00:00Z',
    updatedAt: '2023-10-21T10:00:00Z',
  },
  {
    _id: '4',
    name: 'David Brown',
    email: 'david@initech.io',
    company: 'Initech',
    status: 'Lost',
    source: 'Event',
    createdBy: { name: 'Sarah Chen', email: 'sarah@example.com' },
    createdAt: '2023-10-19T10:00:00Z',
    updatedAt: '2023-10-19T10:00:00Z',
  },
  {
    _id: '5',
    name: 'Eve Davis',
    email: 'eve@umbrella.co',
    company: 'Umbrella Corp',
    status: 'Qualified',
    source: 'Website',
    createdBy: { name: 'Sarah Chen', email: 'sarah@example.com' },
    createdAt: '2023-10-18T10:00:00Z',
    updatedAt: '2023-10-18T10:00:00Z',
  },
  {
    _id: '6',
    name: 'Frank Miller',
    email: 'frank@massive.com',
    company: 'Massive Dynamic',
    status: 'New',
    source: 'LinkedIn',
    createdBy: { name: 'Sarah Chen', email: 'sarah@example.com' },
    createdAt: '2023-10-15T10:00:00Z',
    updatedAt: '2023-10-15T10:00:00Z',
  },
  {
    _id: '7',
    name: 'Grace Lee',
    email: 'grace@wayne.com',
    company: 'Wayne Enterprises',
    status: 'Qualified',
    source: 'Instagram',
    createdBy: { name: 'Sarah Chen', email: 'sarah@example.com' },
    createdAt: '2023-10-14T10:00:00Z',
    updatedAt: '2023-10-14T10:00:00Z',
  },
  {
    _id: '8',
    name: 'Henry Ford',
    email: 'henry@stark.io',
    company: 'Stark Industries',
    status: 'Contacted',
    source: 'Referral',
    notes: 'Interested in enterprise plan',
    createdBy: { name: 'Sarah Chen', email: 'sarah@example.com' },
    createdAt: '2023-10-13T10:00:00Z',
    updatedAt: '2023-10-13T10:00:00Z',
  },
];

export const MOCK_STATS: LeadStats = {
  total: 2420,
  qualified: 845,
  newLeads: 324,
  lost: 42,
  contacted: 1209,
};

// ─── Mock API helpers ────────────────────────────────────────────────────────
export function getMockLeads(
  search = '',
  status = '',
  source = '',
  sort = 'latest',
  page = 1,
  limit = 10
): PaginatedLeads {
  let results = [...MOCK_LEADS];

  if (search) {
    const q = search.toLowerCase();
    results = results.filter(
      (l) =>
        l.name.toLowerCase().includes(q) ||
        l.email.toLowerCase().includes(q) ||
        (l.company?.toLowerCase().includes(q) ?? false)
    );
  }
  if (status) results = results.filter((l) => l.status === status);
  if (source) results = results.filter((l) => l.source === source);

  results.sort((a, b) =>
    sort === 'oldest'
      ? new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      : new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  const total = results.length;
  const start = (page - 1) * limit;
  return {
    success: true,
    data: results.slice(start, start + limit),
    total,
    page,
    totalPages: Math.ceil(total / limit),
  };
}
