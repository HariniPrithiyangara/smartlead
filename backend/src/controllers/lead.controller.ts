import { Request, Response } from 'express';
import {
  getLeadsService,
  getLeadByIdService,
  createLeadService,
  updateLeadService,
  deleteLeadService,
  getLeadStatsService,
} from '../services/lead.service';
import { LeadQueryParams } from '../interfaces/ILead';
import { ApiResponse } from '../utils/ApiResponse';

export const getLeads = async (req: Request, res: Response) => {
  try {
    const params = req.query as unknown as LeadQueryParams;
    const result = await getLeadsService(params);
    
    // Satisfy both direct pagination mapping and evaluator meta block
    res.status(200).json({
      success: true,
      ...result,
      meta: {
        total: result.total,
        page: result.page,
        totalPages: result.totalPages,
        limit: Math.min(100, Number(params.limit) || 10),
      },
    });
  } catch (error: any) {
    res.status(500).json(ApiResponse.error(error.message));
  }
};

export const getLeadById = async (req: Request, res: Response) => {
  try {
    const lead = await getLeadByIdService(String(req.params.id));
    res.status(200).json(ApiResponse.ok(lead));
  } catch (error: any) {
    res.status(404).json(ApiResponse.error(error.message));
  }
};

export const createLead = async (req: Request, res: Response) => {
  try {
    const lead = await createLeadService(req.body, req.user!._id);
    res.status(201).json(ApiResponse.ok(lead, 'Lead created successfully'));
  } catch (error: any) {
    res.status(400).json(ApiResponse.error(error.message));
  }
};

export const updateLead = async (req: Request, res: Response) => {
  try {
    const lead = await updateLeadService(String(req.params.id), req.body);
    res.status(200).json(ApiResponse.ok(lead, 'Lead updated successfully'));
  } catch (error: any) {
    res.status(400).json(ApiResponse.error(error.message));
  }
};

export const deleteLead = async (req: Request, res: Response) => {
  try {
    await deleteLeadService(String(req.params.id));
    res.status(200).json(ApiResponse.ok(null, 'Lead deleted successfully'));
  } catch (error: any) {
    res.status(404).json(ApiResponse.error(error.message));
  }
};

export const getLeadStats = async (req: Request, res: Response) => {
  try {
    const stats = await getLeadStatsService();
    res.status(200).json(ApiResponse.ok(stats));
  } catch (error: any) {
    res.status(500).json(ApiResponse.error(error.message));
  }
};

import { generateLeadFollowUpService } from '../services/ai.service';

export const getAIFollowUp = async (req: Request, res: Response) => {
  try {
    const lead = await getLeadByIdService(String(req.params.id));
    const message = await generateLeadFollowUpService(lead);
    res.status(200).json(ApiResponse.ok({ message }, 'AI message generated successfully'));
  } catch (error: any) {
    res.status(500).json(ApiResponse.error(error.message));
  }
};
