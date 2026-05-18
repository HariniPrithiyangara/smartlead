import Papa from 'papaparse';
import { format } from 'date-fns';
import { Lead } from '../types/lead.types';

export function useCSVExport() {
  const exportToCSV = (leads: Lead[]) => {
    const rows = leads.map((lead) => ({
      Name: lead.name,
      Email: lead.email,
      Company: lead.company || '',
      Phone: lead.phone || '',
      Status: lead.status,
      Source: lead.source,
      'Added Date': format(new Date(lead.createdAt), 'MMM dd, yyyy'),
      Notes: lead.notes || '',
    }));

    const csv = Papa.unparse(rows);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `smartleads-export-${format(new Date(), 'yyyy-MM-dd')}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return { exportToCSV };
}
