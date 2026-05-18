import { SortOrder } from 'mongoose';
import { Lead } from '../models/Lead.model';
import { ILead, LeadQueryParams } from '../interfaces/ILead';
import { CreateLeadInput, UpdateLeadInput } from '../validations/lead.validation';
import { Types } from 'mongoose';

export const getLeadsService = async (params: LeadQueryParams) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const filter: Record<string, any> = {};

  if (params.status) filter.status = params.status;
  if (params.source) filter.source = params.source;
  if (params.search) {
    filter.$or = [
      { name: { $regex: params.search, $options: 'i' } },
      { email: { $regex: params.search, $options: 'i' } },
      { company: { $regex: params.search, $options: 'i' } },
    ];
  }

  const sort: { [key: string]: SortOrder } =
    params.sort === 'oldest' ? { createdAt: 1 } : { createdAt: -1 };

  const page = Math.max(1, Number(params.page) || 1);
  const limit = Math.min(100, Number(params.limit) || 10);
  const skip = (page - 1) * limit;

  const [data, total] = await Promise.all([
    Lead.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .populate('createdBy', 'name email')
      .lean(),
    Lead.countDocuments(filter),
  ]);

  return { data, total, page, totalPages: Math.ceil(total / limit) };
};

export const getLeadByIdService = async (id: string) => {
  const lead = await Lead.findById(id).populate('createdBy', 'name email');
  if (!lead) throw new Error('Lead not found');
  return lead;
};

export const createLeadService = async (
  data: CreateLeadInput,
  userId: Types.ObjectId
) => {
  return await Lead.create({ ...data, createdBy: userId });
};

export const updateLeadService = async (id: string, data: UpdateLeadInput) => {
  const lead = await Lead.findByIdAndUpdate(id, data, { new: true, runValidators: true });
  if (!lead) throw new Error('Lead not found');
  return lead;
};

export const deleteLeadService = async (id: string) => {
  const lead = await Lead.findByIdAndDelete(id);
  if (!lead) throw new Error('Lead not found');
  return lead;
};

export const getLeadStatsService = async () => {
  const [total, qualified, newLeads, lost] = await Promise.all([
    Lead.countDocuments(),
    Lead.countDocuments({ status: 'Qualified' }),
    Lead.countDocuments({ status: 'New' }),
    Lead.countDocuments({ status: 'Lost' }),
  ]);
  return { total, qualified, newLeads, lost, contacted: total - qualified - newLeads - lost };
};
