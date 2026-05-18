import { Router } from 'express';
import {
  getLeads,
  getLeadById,
  createLead,
  updateLead,
  deleteLead,
  getLeadStats,
  getAIFollowUp,
} from '../controllers/lead.controller';
import { authMiddleware } from '../middleware/auth.middleware';
import { requireRole } from '../middleware/rbac.middleware';
import { validate } from '../middleware/validate.middleware';
import { createLeadSchema, updateLeadSchema } from '../validations/lead.validation';

const router = Router();

// All lead routes require authentication
router.use(authMiddleware);

router.get('/stats', getLeadStats);
router.get('/', getLeads);
router.get('/:id', getLeadById);
router.post('/:id/ai-followup', getAIFollowUp);
router.post('/', validate(createLeadSchema), createLead);
router.put('/:id', validate(updateLeadSchema), updateLead);

// Only admins can delete leads
router.delete('/:id', requireRole('admin'), deleteLead);

export default router;
