import { Schema, model } from 'mongoose';
import { ILead } from '../interfaces/ILead';

const LeadSchema = new Schema<ILead>(
  {
    name:      { type: String, required: true, trim: true },
    email:     { type: String, required: true, trim: true, lowercase: true },
    company:   { type: String, trim: true },
    phone:     { type: String, trim: true },
    status:    {
      type: String,
      enum: ['New', 'Contacted', 'Qualified', 'Lost'],
      default: 'New',
    },
    source: {
      type: String,
      enum: ['Website', 'Referral', 'Instagram', 'LinkedIn', 'Cold Outreach', 'Event'],
      required: true,
    },
    notes:     { type: String },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
);

// Compound index for filtering performance
LeadSchema.index({ status: 1, source: 1, createdAt: -1 });
// Full-text search index
LeadSchema.index({ name: 'text', email: 'text', company: 'text' });

export const Lead = model<ILead>('Lead', LeadSchema);
